import { mapValues } from 'lodash'
import { computed } from '../../../../_site/assets/js/main'

const State = {
  // Presets
  consumersCount: 4,
  housingUnitGeneration: '2000',
  // Totals
  totalWaterUsageMonth: 0, // gallons
  waterUsagePersonDay: 80, // gallons
  waterPrice: 0.01428, // $ per gallon
  totalPriceMonth: 0,
}

// interface State {
//   // Presets
//   consumersCount: number
//   housingUnitGeneration: string
//   // Totals
//   totalWaterUsageMonth: number
//   waterUsagePersonDay: number // gallons
//   waterPrice: number
//   totalPriceMonth: number
// }

export type StateKeys = keyof typeof State

export const ComputedState = {
  // Presets
  get consumersCount() {
    return this._data.consumersCount
  },
  // TODO
  get housingUnitGeneration() {
    return this._data.housingUnitGeneration
  },

  // Totals
  get totalWaterUsageMonth() {
    if (this._userSetData.totalWaterUsageMonth) {
      return this._data.totalWaterUsageMonth
    } else {
      return this.consumersCount * this.waterUsagePersonDay * 30
    }
  },
  get waterUsagePersonDay() {
    return this._data.waterUsagePersonDay
  },
  get waterPrice() {
    return this._data.waterPrice
  },
  get totalPriceMonth() {
    return this.totalWaterUsageMonth * this.waterPrice
  },

  // Inner values
  _data: { ...State },
  _userSetData: mapValues(State, () => false),

  // Public setter
  userSet(key: StateKeys, value: string | number) {
    this._userSetData[key] = true
    this._data[key] = value
  },

  // couldn't find any way to clone this object
  reset() {
    this._data = { ...State }
    this._userSetData = mapValues(State, () => false)
  },
}
