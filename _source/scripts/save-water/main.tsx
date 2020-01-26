import React, { useState } from 'react'
import * as ReactDOM from 'react-dom'
import { ComputedState, StateKeys } from './components/computed-state'

// const Hello = function({ name }: { name: string }) {
//   return <div>Hello from react! {name}</div>
// }

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

// const localState = new ComputedState()

const StyleRow = {
  display: 'flex',
  alignItems: 'stretch',
  borderBottom: '1px solid #eee',
}
const StyleCol0 = {
  width: '20px',
  // borderRight: '1px solid #ccc',
  fontSize: '14px',
  fontFamily: `"Lucida Console", Monaco, monospace`,
  textAlign: 'right',
  padding: '3px 3px 3px 3px',
}
const StyleCol1 = {
  width: '40px',
  borderRight: '1px solid #ccc',
  fontSize: '14px',
  fontFamily: `"Lucida Console", Monaco, monospace`,
  textAlign: 'right',
  padding: '3px 6px 3px 2px',
}
const StyleCol2 = {
  width: '50px',
  borderRight: '1px solid #ccc',
  fontSize: '12px',
  fontFamily: `"Lucida Console", Monaco, monospace`,
  padding: '3px 2px 3px 6px',
  textAlign: 'left',
}
const StyleCol3 = { flex: '1 0 0', padding: '3px 2px 3px 6px', alignSelf: 'flex-start' }

const SectionTitle = ({ title, col1, col2 }) => {
  return (
    <div style={StyleRow}>
      <div style={StyleCol0}></div>
      <div style={{ ...StyleCol1, borderRight: '1px solid transparent' }}>{col1}</div>
      <div style={{ ...StyleCol2, borderRight: '1px solid transparent' }}>{col2}</div>
      <div style={{ ...StyleCol3, fontSize: '24px', textAlign: 'left' }}>{title}</div>
    </div>
  )
}

const Row = ({ value, unit, description, showSelector }) => {
  return (
    <div style={StyleRow}>
      <div style={StyleCol0}>
        {showSelector === true ? (
          <input type="radio" name={'a' + Math.random()} value="male" checked={true} />
        ) : null}
      </div>
      <div style={StyleCol1}>
        {showSelector ? (
          value
        ) : (
          <input
            type="text"
            value={value}
            style={{
              border: '1px solid #ccc',
              padding: '2px',
              width: '100%',
              display: 'block',
              textAlign: 'right',
              background: 'transparent',
              fontSize: '14px',
              fontFamily: `"Lucida Console", Monaco, monospace`,
            }}
          />
        )}
      </div>
      <div style={StyleCol2}>{unit}</div>
      <div style={StyleCol3}>{description}</div>
    </div>
  )
}

const RowHeader = ({ value, unit, description, isExpanded }) => {
  const style = { fontWeight: 'bold', alignSelf: 'center', fontSize: '18px' }
  return (
    <div style={StyleRow}>
      <div style={StyleCol0}></div>
      <div style={{ ...StyleCol1, ...style }}>{value}</div>
      <div style={{ ...StyleCol2, ...style, fontSize: '14px' }}>{unit}</div>
      <div style={{ ...StyleCol3, ...style }}>
        {isExpanded === true ? <a>↑</a> : isExpanded === false ? <a>↓</a> : null}
        {description}
      </div>
    </div>
  )
}

const RowShowMore = () => {
  return (
    <div style={StyleRow}>
      <div style={StyleCol0}></div>
      <div style={StyleCol1}></div>
      <div style={StyleCol2}></div>
      <div style={{ ...StyleCol3, fontSize: '12px', textAlign: 'left' }}>
        <a href="#">↓ show more settings</a>
      </div>
    </div>
  )
}

const SaveWatterContainer = () => {
  const [householdCount, setHouseholdCount] = useState<number>(4)
  const [tick, setTick] = useState<number>(0) // Used to trigger component rerender
  const onChange = (key: StateKeys, value: string | number) => {
    ComputedState.userSet(key, value)
    // CoreState.userSet(name, value);
    setTick(tick + 1)
  }
  return (
    <div>
      <div>
        <SectionTitle title="How much am I paying today?" />
        <Row value={3} unit={'people'} description={'living in household'} />
        <Row
          value={'1990 -2000'}
          unit={'year'}
          description={'when last renovation took place, or build year otherwise'}
        />
        <Row value={'$30'} unit={'per month'} description={'paid for water + sewer'} />
        <RowShowMore />
        <Row value={'280'} unit={'gallon/ month'} description={'water is used'} />
        <Row value={'$11'} unit={'1000 gallon'} description={'water price'} />
        <Row value={'$28'} unit={'1000 gallon'} description={'sewer price'} />
      </div>
      <div>
        <SectionTitle title="How is my water used?" />
        <div>
          <RowHeader value={'$5'} unit={'/month'} description={'Shower'} isExpanded={true} />
          <Row
            value={'10'}
            unit={'minutes/ day/ person'}
            description={'Average amount of time each household person spends in shower'}
          />
          <Row value={'5.0'} unit={'gpm'} description={'Showerhead volume'} />
        </div>
        <RowHeader value={'$15'} unit={'/month'} isExpanded={false} description={'Toilet'} />
        <RowHeader
          value={'$15'}
          unit={'/month'}
          isExpanded={false}
          description={'Bathroom faucet'}
        />
        <RowHeader
          value={'$15'}
          unit={'/month'}
          isExpanded={false}
          description={'Kitchen faucet'}
        />
        <RowHeader value={'$15'} unit={'/month'} isExpanded={false} description={'Dishwasher'} />
        <RowHeader
          value={'$15'}
          unit={'/month'}
          expandable={true}
          description={'Washing machine'}
        />
      </div>
      <div>
        <SectionTitle
          title="How can I save money?"
          col1="Upfront cost"
          col2="Savings in 10 years"
        />
        <div>
          {/* <RowHeader value={'$5'} unit={'/month'} description={'Shower'} /> */}
          <Row
            value={'$8'}
            unit={'$500'}
            description={
              <>
                <div>
                  Replace showerhead with <a href="#">Raptor 1</a>
                </div>
                <div>
                  <a href="#">↓ show all options</a>
                </div>
              </>
            }
            showSelector={true}
          />
          <Row
            value={'$120'}
            unit={'$400'}
            description={
              <>
                <div>
                  Replace toilet with any modern (e.g.<a href="#">Funny seat</a>)
                </div>
                <div>
                  <a href="#">↓ show all options</a>
                </div>
              </>
            }
            showSelector={true}
          />
          <Row
            value={'-'}
            unit={'-'}
            description={
              <>
                <div>No options for bathroom faucet. Good job!</div>
                <div>
                  <a href="#">↓ show all options</a>
                </div>
              </>
            }
            showSelector={false}
          />
        </div>
      </div>
      <div>
        Total upfront cost: $120
        <br />
        Total saving in 1 years: $180
        <br />
        Total saving in 5 years: $1380
        <br />
        Total saving in 10 years: $2880
        <br />
        These changes will pay off in 4 months.
      </div>
    </div>
  )
}

ReactDOM.render(
  <SaveWatterContainer />,
  document.getElementById('save-water-wrapper') as HTMLElement
)
