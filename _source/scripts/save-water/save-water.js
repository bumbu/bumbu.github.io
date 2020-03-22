import React, { useState } from 'react'
import * as ReactDOM from 'react-dom'

/**
 * TODO
 * Interactions
 * * Collapse usage sections
 * * Collapse opportunities sections
 * * Merge opportunities sections
 * * Refactor components Section -> Row -> Specific row type
 * * Replace arrows with icons
 */

const CoreState = {
  // Presets
  peopleCount: 3,
  housingUnitYear: '2000',
  // Price precets
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

const StyleRow = {
  display: 'flex',
  alignItems: 'stretch',
  borderBottom: '1px solid #eee',
}
const StyleCol0 = {
  width: '20px',
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
  width: '60px',
  borderRight: '1px solid #ccc',
  fontSize: '12px',
  fontFamily: `"Lucida Console", Monaco, monospace`,
  padding: '3px 2px 3px 6px',
  textAlign: 'left',
  wordBreak: 'break-word',
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

const Row = ({ value, unit, description, showSelector, isSelected }) => {
  return (
    <div style={StyleRow}>
      <div style={StyleCol0}>
        {showSelector === true ? (
          <input
            type="radio"
            name={'a' + Math.random()}
            value="male"
            checked={isSelected === true}
          />
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

const Sections = {
  PRICE_DETAILS: 'PRICE_DETAILS',
  SHOWER_DETAILS: 'SHOWER_DETAILS',
  TOILET_DETAILS: 'TOILET_DETAILS',
  BATHROOM_FAUCET_DETAILS: 'BATHROOM_FAUCET_DETAILS',
  KITCHEN_FAUCET_DETAILS: 'KITCHEN_FAUCET_DETAILS',
  DISHWASHER_DETAILS: 'DISHWASHER_DETAILS',
  WASHING_MACHINE_DETAILS: 'WASHING_MACHINE_DETAILS',
}

const SaveWatterContainer = () => {
  const [householdCount, setHouseholdCount] = useState(4)
  const [tick, setTick] = useState(0) // Used to trigger component rerender
  const onChange = (key, value) => {
    // ComputedState.userSet(key, value)
    // CoreState.userSet(name, value);
    setTick(tick + 1)
  }
  return (
    <div>
      <div>
        <SectionTitle title="How much am I paying today?" />
        <Row value={CoreState.peopleCount} unit={'people'} description={'living in household'} />
        <Row
          value={CoreState.housingUnitYear}
          unit={'year'}
          description={'when last renovation took place, or build year otherwise'}
        />
        <Row
          value={CoreState.totalWaterPrice}
          unit={'per month'}
          description={'paid for water + sewer'}
        />
        <RowShowMore />
        <Row
          value={CoreState.totalWaterUsage}
          unit={'gallon/ month'}
          description={'water is used'}
        />
        <Row value={CoreState.waterPrice} unit={'1000 gallon'} description={'water price'} />
        <Row value={CoreState.sewerPrice} unit={'1000 gallon'} description={'sewer price'} />
      </div>
      <div>
        <SectionTitle title="How is my water used?" />
        {CoreState.uses.map(use => {
          return (
            <div key={use.category}>
              <RowHeader
                value={use.cost}
                unit={'/month'}
                description={use.name}
                isExpanded={true}
              />
              {use.inputs.map(input => {
                return <Row value={input.value} unit={input.unit} description={input.name} />
              })}
            </div>
          )
        })}
      </div>
      <div>
        <SectionTitle
          title="How can I save money?"
          col1="Upfront cost"
          col2="Savings in 10 years"
        />
        <div>
          {CoreState.uses.map(use => {
            if (use.isExpanded) {
              return (
                <>
                  {use.opportunities.map(opportunity => {
                    return (
                      <Row
                        value={opportunity.upfrontCost}
                        unit={opportunity.savings}
                        description={opportunity.name}
                        showSelector={true}
                        isSelected={opportunity.isSelected}
                      />
                    )
                  })}
                </>
              )
            } else {
              const opportunity = use.opportunities.reduce((prev, curr) => {
                if (prev == null && curr.isSelected === true) {
                  return curr
                } else {
                  return prev
                }
              }, null)
              return (
                <Row
                  value={opportunity.upfrontCost}
                  unit={opportunity.savings}
                  description={
                    <>
                      <div>{opportunity.name}</div>
                      <div>
                        <a href="#">↓ show all options for {use.name}</a>
                      </div>
                    </>
                  }
                  showSelector={true}
                  isSelected={true}
                />
              )
            }
          })}
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

ReactDOM.render(<SaveWatterContainer />, document.getElementById('save-water-wrapper'))
