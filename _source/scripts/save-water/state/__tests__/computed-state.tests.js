const State = require('./../computed-state')

class Node {
  constructor(props) {
    this.reinit(props)
  }

  // Allow update node props for tests
  reinit(props) {
    if (props.key == null) {
      throw new Error('Node name should always be given')
    }
    this.key = props.key
    this.props = props
  }

  computeValue() {
    if (this.props.userValue != null) {
      this.computedValue = wrap(this.props.userValue, true)
    } else if (this.hasChildren() && this.props.relationship != null) {
      let childWithoutValue = null
      const childValues = []

      // calculate values for all children, if one can't be calculated, remember it
      for (let child of this.props.children) {
        if (child.canCalculateValue()) {
          child.computeValue()
          childValues.push(child.computedValue)
        } else if (childWithoutValue != null) {
          throw new Error("can't have 2 children with uncomputable value")
        } else {
          childWithoutValue = child
          childValues.push(null)
        }
      }

      // if all children have values, calculate parent
      if (childWithoutValue == null) {
        const parentValue = this.props.relationship.getValue({
          parent: this,
          childValues,
          childWithoutValue,
        })
        // return wrap(parentValue)
        this.computedValue = wrap(parentValue)
      } else {
        throw new Error('writeme 2')
      }
      // if one child can't have a value, calculate it based off parent (throw error if can't calculate for parrent)
      // if multiple children can't have a value, throw error
    } else if (this.props.default != null) {
      this.computedValue = wrap(this.props.default)
    } else {
      throw new Error("Can't compute node value")
    }
  }

  hasChildren() {
    return this.props.children != null && this.props.children.length > 1
  }

  isValueForced() {
    if (this.props.userValue != null) {
      return true
    } else if (this.props.children != null && this.props.children.length > 1) {
      // If all children have a forced value, then it's forced, no otherwise
      return this.props.children.every(child => child.isValueForced())
    }

    return false
  }

  canCalculateValue() {
    if (this.isValueForced()) {
      // When value is forced, job done
      return true
    } else if (this.props.default != null) {
      // If we have a default as a back-up, we'll use it if needed
      return true
    } else if (this.hasChildren()) {
      // If we don't have forced or default value, we need all child values
      return this.props.children.every(child => child.canCalculateValue())
    }

    return false
  }
}

class MultiplyRelationship {
  static getValue({ parent, childValues, childWithoutValue }) {
    const childrenProduct = childValues.reduce(
      (acc, curr) => (curr != null ? acc * curr.value : acc),
      1
    )
    if (childWithoutValue == null) {
      return childrenProduct
    } else {
      throw new Error('Imlement me 1')
    }
  }
}

class SumRelationship {}

function getValues(node) {
  // Compute all values for nodes
  node.computeValue()

  // Store all values
  const result = {}
  collectValues(node, result)

  // Clean up
  cleanUp(node)

  return result
}

function collectValues(node, collector) {
  collector[node.key] = node.computedValue
  node.props.children && node.props.children.forEach(child => collectValues(child, collector))
}

function cleanUp(node) {
  node.computedValue = null
  node.props.children && node.props.children.forEach(cleanUp)
}

function wrap(value, isModified = false) {
  return { value, isModified }
}

describe('testing one depth structure', () => {
  it('should return default value', () => {
    const totalCost = new Node({
      key: 'totalCost',
      default: 10,
    })

    const values = getValues(totalCost)

    expect(values).toEqual({ totalCost: wrap(10) })
  })

  it('should return set value', () => {
    const totalCost = new Node({
      key: 'totalCost',
      default: 10,
      userValue: 20,
    })

    const values = getValues(totalCost)

    expect(values).toEqual({ totalCost: wrap(20, true) })
  })

  it('shold fail when not able to compute the value', () => {
    const totalCost = new Node({
      key: 'totalCost',
    })
    const getValuesFn = () => getValues(totalCost)

    // Assert

    expect(getValuesFn).toThrow()
  })
})

describe('testing two depth structure', () => {
  let totalUsage, totalPrice, totalCost
  beforeEach(() => {
    totalUsage = new Node({
      key: 'totalUsage',
      default: 15,
    })
    totalPrice = new Node({
      key: 'totalPrice',
      default: 7,
    })
    totalCost = new Node({
      key: 'totalCost',
      children: [totalPrice, totalUsage],
      relationship: MultiplyRelationship,
    })
  })

  it('should compute values when no values are set', () => {
    // Arrange

    const values = getValues(totalCost)

    expect(values).toEqual({ totalCost: wrap(105), totalUsage: wrap(15), totalPrice: wrap(7) })
  })

  // TODO set a child
  // TODO set the parent
  // TODO have default on parent
  // TODO have default on parent, set the child without default
  // TODO have default on parent, set both children
})

// Multiple children
// Multiple levels
// Influencial defaults

// describe('testing the structure', () => {
//   let bath, other, totalUsage, waterPrice, sewerPrice, totalPrice, totalCost
//   beforeEach(() => {
//     bath = new Node({ key: 'bath', default: 10 })
//     other = new Node({ key: 'other' })
//     totalUsage = new Node({
//       key: 'totalUsage',
//       default: 15,
//       children: [bath, other],
//       relationship: MultiplyRelationship,
//     })
//     waterPrice = new Node({ key: 'waterPrice', default: 12 })
//     sewerPrice = new Node({ key: 'sewerPrice', default: 17 })
//     totalPrice = new Node({
//       key: 'totalPrice',
//       children: [waterPrice, sewerPrice],
//       relationship: SumRelationship,
//     })
//     totalCost = new Node({
//       key: 'totalCost',
//       children: [totalPrice, totalUsage],
//       relationship: MultiplyRelationship,
//     })
//   })

//   it('should compute values when no values are set', () => {
//     // Arrange

//     const values = getValues(totalCost)

//     expect(values).toEqual({ totalCost: wrap(100) })
//   })
// })

// describe('happy path', () => {
//   it('should have default value for peopleCount, housingUnitYear, waterPrice, sewerPrice', () => {
//     const state = new State()

//     // Act

//     const uiState = state.getUIState()
//     expect(uiState.peopleCount).toEqual({ value: 3, isModified: false })
//     expect(uiState.housingUnitYear).toEqual({ value: 'standard', isModified: false })
//     expect(uiState.waterPrice).toEqual({ value: 11, isModified: false })
//     expect(uiState.sewerPrice).toEqual({ value: 28, isModified: false })
//   })

//   it('should precompute totalUsage and totalCost based on default values (standard home)', () => {
//     const state = new State()

//     // Act

//     const uiState = state.getUIState()
//     expect(uiState.totalUsage).toEqual({ value: 4194, isModified: false })
//     expect(uiState.totalPrice).toEqual({ value: 1, isModified: false })
//   })

//   it('should precompute totalUsage and totalCost for old houses', () => {
//     const state = new State()

//     state.setStateValue('housingUnitYear', 'old')

//     const uiState = state.getUIState()
//     expect(uiState.totalUsage).toEqual({ value: 5671, isModified: false })
//     expect(uiState.totalPrice).toEqual({ value: 1, isModified: false })
//   })

//   it('should precompute totalUsage and totalCost for modern houses', () => {
//     const state = new State()

//     state.setStateValue('housingUnitYear', 'modern')

//     const uiState = state.getUIState()
//     expect(uiState.totalUsage).toEqual({ value: 3242, isModified: false })
//     expect(uiState.totalPrice).toEqual({ value: 1, isModified: false })
//   })

//   it('should return totalUsage if set by user', () => {
//     const state = new State()

//     state.setStateValue('totalUsage', 130)

//     const uiState = state.getUIState()
//     expect(uiState.totalUsage).toEqual({ value: 130, isModified: true })
//   })

//   // Usage should vary based on people count
// })
