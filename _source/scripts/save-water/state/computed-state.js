/**
 * people + year -> water usage
 * water price + sewer price -> total water price
 * total water price + water usage -> water price
 *
 */

/**
 * house year options:
 * old = before 1980
 * standard = from 1980 to 2010
 * modern = after 2010 OR my home has been upgraded with high-efficiency fixtures
 */

const defaults = Object.freeze({
  // Presets
  peopleCount: 3,
  housingUnitYear: 'standard',
  // Price presets
  waterPrice: 11,
  sewerPrice: 28,
})

class State {
  constructor() {
    this.state = {
      // Presets
      peopleCount: null,
      housingUnitYear: null,
      // Price presets
      waterPrice: null,
      sewerPrice: null,
      // Totals
      totalUsage: null,
      totalCost: null,
    }
  }

  _getValue(key) {
    if (this.state[key] !== null) {
      return this.state[key]
    } else if (defaults[key] !== null) {
      return defaults[key]
    } else if (key in this.state || key in defaults) {
      return null
    } else {
      throw Error("Can't get the value of unknow key")
    }
  }

  _getValuePair(key) {
    if (this.state[key] !== null) {
      return { value: this.state[key], isModified: true }
    } else if (defaults[key] !== null) {
      return { value: defaults[key], isModified: false }
    } else if (key in this.state || key in defaults) {
      return { value: null, isModified: false }
    } else {
      throw Error("Can't get the value of unknow key")
    }
  }

  getUIState() {
    const uiState = {
      // Presets
      peopleCount: this._getValuePair('peopleCount'),
      housingUnitYear: this._getValuePair('housingUnitYear'),
      // Price presets
      waterPrice: this._getValuePair('waterPrice'),
      sewerPrice: this._getValuePair('sewerPrice'),
      // Totals
      totalUsage: this._getValuePair('totalUsage'),
      totalCost: this._getValuePair('totalCost'),
    }

    /**
     * waterPrice + sewerPrice = totalPrice
     * totalPrice * waterUsage = totalCost
     */

    if (uiState.totalUsage.value == null) {
      let volumePerPerson = 0
      // Formulas from https://www.home-water-works.org/about/calculator
      if (uiState.housingUnitYear.value === 'old') {
        uiState.totalUsage.value = 87.41 * Math.pow(uiState.peopleCount.value, 0.69) * 30.4
      } else if (uiState.housingUnitYear.value === 'standard') {
        uiState.totalUsage.value = 67.251 * Math.pow(uiState.peopleCount.value, 0.6541) * 30.4
      } else if (uiState.housingUnitYear.value === 'modern') {
        uiState.totalUsage.value = 59.58 * Math.pow(uiState.peopleCount.value, 0.53) * 30.4
      } else {
        throw new Error('Unknown house type')
      }
      uiState.totalUsage.value = Math.round(uiState.totalUsage.value)
    }

    return uiState
  }

  setStateValue(key, value) {
    if (key in this.state) {
      this.state[key] = value
    } else {
      throw new Error('Unknow key passed to setStateValue')
    }
  }
}

const CoreStateValue = {
  // Presets
  peopleCount: 3,
  housingUnitYear: '2000',
  // Price presets
  waterPrice: 11,
  sewerPrice: 28,
  // Totals
  totalWaterUsage: 280,
  totalWaterPrice: 30,

  // Utilities
  // =========
  // showerUsageMinutesDayPerson: 10,
  // showerSpeedGPM: 5,
  // toiletUsageTimesDayPerson: 5,
  // toiletVolume: 4.25,
  // bathroomFaucetUsageMinutesDayPerson: 15,
  // bathroomFaucetGPM: 4.1,
  // kitchenFaucetUsageMinutesDay: 30,
  // kitchenFaucetGPM: 6,
  // dishwasherUsageWeek: 7,
  // dishwasherVolume: 30,
  // washMachineUsageMonth: 2,
  // washMachineVolume: 200,
  // otherVolume: 0,

  // Saving options
  // ==============
  uses: [
    {
      category: 'shower',
      name: 'Shower',
      isExpanded: false,
      cost: 5,
      inputs: [
        {
          value: 10,
          unit: 'minute/person/day',
          name: 'Average amount of time each household person spends in shower',
          isModified: false,
        },
        {
          value: 5,
          unit: 'gpm',
          name: 'Showerhead Capacity',
          isModified: false,
        },
      ],
      opportunities: [
        {
          id: 'showerhead-raptor-1',
          upfrontCost: 8,
          savings: 500,
          name: 'Replace showerhead with Raptor 1',
          isSelected: true,
        },
        {
          id: 'showerhead-raptor-2',
          upfrontCost: 18,
          savings: 490,
          name: 'Replace showerhead with Raptor 2',
          isSelected: false,
        },
      ],
    },
    {
      category: 'toilet',
      name: 'Toilet',
      cost: 15,
      isExpanded: true,
      inputs: [
        {
          value: 10,
          unit: 'minute/person/day',
          name: 'Average amount of time each household person spends in shower',
          isModified: false,
        },
        {
          value: 5,
          unit: 'gpm',
          name: 'Showerhead Capacity',
          isModified: false,
        },
      ],
      opportunities: [
        {
          id: 'new-toilet-1',
          upfrontCost: 120,
          savings: 200,
          name: 'Replace New toilet 1',
          isSelected: true,
        },
        {
          id: 'new-toilet-2',
          upfrontCost: 150,
          savings: 180,
          name: 'Replace New toilet 2',
          isSelected: false,
        },
      ],
    },
  ],
}

module.exports = State
