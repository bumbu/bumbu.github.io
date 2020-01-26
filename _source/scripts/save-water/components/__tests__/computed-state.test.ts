import { ComputedState, StateKeys } from './../computed-state'

// const CoreState = {
//   // Presets
//   consumersCount: 'number',
//   housingUnitGeneration: '2000',
//   // Totals
//   totalWaterUsageMonth: 2400, // gallons
//   totalWaterUsageMonth_fromUser: null,
//   waterPrice: 0.001437,
//   waterPrice_fromUser: null,
//   totalPriceMonth: ['totalWaterUsageMonth', () => this.waterPrice * this.totalWaterUsageMonth],
//   totalPriceMonth_fromUser: null,
//   // Shower
//   showerheadUsageMinutesDay: 5, // minutes
//   showerheadUsageMinutesDay_fromUser: null,
//   showerheadGPM: 5, // gpm
//   showerheadGPM_fromUser: null,
// }

describe('happy path', () => {
  const state: typeof ComputedState = ComputedState
  afterEach(() => {
    state.reset()
  })

  const userSetValues: Array<StateKeys> = [
    'consumersCount',
    'housingUnitGeneration',
    'totalWaterUsageMonth',
    'waterUsagePersonDay',
    'waterPrice',
  ]
  for (let key of userSetValues) {
    it(`should return user set value for ${key}`, () => {
      state.userSet(key, 123)

      expect(state[key]).toBe(123)
    })
  }

  it('should give correct totalWaterUsageMonth without any changes', () => {
    // Act

    expect(state.totalWaterUsageMonth).toBe(9600)
  })

  it('should correctly compute total price per month', () => {
    state.userSet('consumersCount', 1)
    state.userSet('waterUsagePersonDay', 100)
    state.userSet('waterPrice', 0.01)

    expect(state.totalPriceMonth).toBe(30)
  })
})
