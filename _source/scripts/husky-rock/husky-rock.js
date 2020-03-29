import React, { useState } from 'react'
import * as ReactDOM from 'react-dom'
import { BrowserRouter as Router, useLocation, useHistory } from 'react-router-dom'
import { ROUTE_TYPES, ROUTE_GRADES, ROUTE_RISKS, WALLS } from './data'

const CONTAINER_WIDTH = document.querySelector('#react-container').offsetWidth

// A custom hook that builds on useLocation to parse the query string
function useQuery() {
  return new URLSearchParams(useLocation().search)
}

function getImageURI(name) {
  return `${window.SITE_ROOT}/assets/images/husky-rock/${name}`
}

function getRockCenter(rock, scale = 1) {
  return { left: (rock.left + rock.width / 2) * scale, top: (rock.top + rock.height / 2) * scale }
}

function getRockLabel(rock, scale = 1) {
  // bellow
  return { left: (rock.left + rock.width / 2) * scale, top: (rock.top + rock.height) * scale }
}

function stringifyWall(wall) {
  const encodedWall = {
    ...wall,
  }
  for (let routeKey in encodedWall.routes) {
    const route = encodedWall.routes[routeKey]
    encodedWall.routes[routeKey] = {
      ...route,
      type: `ROUTE_TYPES.${route.type.key}`,
      grade: `ROUTE_GRADES.${route.grade.key}`,
      risk: `ROUTE_RISKS.${route.risk.key}`,
    }
  }

  return JSON.stringify(encodedWall, undefined, 2).replace(
    /\"ROUTE_(\w+\.\w+)\"/g,
    (_match, p1) => 'ROUTE_' + p1
  )
}

const WallCard = props => {
  const { wall, onClick } = props

  return (
    <div onClick={onClick} className="huskyRock__card">
      <div className="huskyRock__cardImage">
        <img src={getImageURI(wall.image)} alt={wall.name} />
      </div>
      <div className="huskyRock__cardTitle">{wall.name}</div>
      <div className="huskyRock__cardCount">{Object.values(wall.routes).length}</div>
    </div>
  )
}

const WallPage = props => {
  const query = useQuery()
  const history = useHistory()
  const routeKey = query.get('route')
  const isEditMode = !!query.get('edit')
  let { wall } = props
  // Return selected route, or first otherwise
  const currentRouteKey = routeKey in wall.routes ? routeKey : Object.keys(wall.routes)[0]
  let currentRoute = wall.routes[currentRouteKey]
  const setRoute = routeKey => {
    history.push(`?wall=${wall.key}&route=${routeKey}`)
  }
  const goBack = () => {
    history.push('?')
  }

  const selectorRouteEntries = Object.entries(wall.routes).sort((a, b) => {
    return a[1].grade.order - b[1].grade.order
  })
  const mapWidth = CONTAINER_WIDTH
  const scale = mapWidth / wall.width
  const mapHeight = wall.height * scale

  // Edit mode data
  const [tempSequence, setTempSequence] = useState([])
  const [tempRocks, setTempRocks] = useState({})
  const [prevClick, setPrevClick] = useState(null)
  // console.log({ tempSequence, tempRocks, prevClick })
  if (isEditMode) {
    currentRoute = {
      name: null,
      description: null,
      type: ROUTE_TYPES.AR,
      grade: ROUTE_GRADES.EASY,
      risk: ROUTE_RISKS.LOW,
      sequence: tempSequence,
    }

    const newRouteKey =
      'route' +
      Object.keys(wall.routes).reduce((acc, curr) => {
        if (curr.substr(0, 5) === 'route') {
          const rockIndex = parseInt(curr.substr(5))
          return isNaN(rockIndex) ? acc : Math.max(acc, rockIndex + 1)
        }
        return acc
      }, 0)

    wall = {
      ...wall,
      // Add temp rocks to the wall
      rocks: { ...wall.rocks, ...tempRocks },
      routes: {
        ...wall.routes,
        // Att temp route to wall
        [newRouteKey]: currentRoute,
      },
    }
  }
  function onRockClick(ev, rockKey) {
    ev.preventDefault()
    ev.stopPropagation()
    const rockSelected = tempSequence.some(sequence => {
      return sequence.key === rockKey
    })
    if (rockSelected) {
      // unselect
      setTempSequence(
        tempSequence.filter(sequence => {
          return sequence.key !== rockKey
        })
      )
      // remove rock from temp rocks
      if (tempRocks[rockKey]) {
        const { [rockKey]: _omit, ...newTempRocks } = tempRocks
        // delete tempRocks[rockKey]
        setTempRocks(newTempRocks)
      }
    } else {
      // select
      setTempSequence(tempSequence.concat({ key: rockKey }))
    }
  }
  function onMapClick(ev) {
    const clickPoint = {
      top: Math.round((ev.clientY - ev.target.getBoundingClientRect().y) / scale),
      left: Math.round((ev.clientX - ev.target.getBoundingClientRect().x) / scale),
    }
    if (prevClick == null) {
      setPrevClick(clickPoint)
    } else {
      // Create new rock
      const rock = {
        top: Math.min(clickPoint.top, prevClick.top),
        left: Math.min(clickPoint.left, prevClick.left),
        width: Math.abs(clickPoint.left - prevClick.left),
        height: Math.abs(clickPoint.top - prevClick.top),
      }
      // Get next rock index key
      const newRockKey =
        'rock' +
        Object.keys(wall.rocks).reduce((acc, curr) => {
          if (curr.substr(0, 4) === 'rock') {
            const rockIndex = parseInt(curr.substr(4))
            return isNaN(rockIndex) ? acc : Math.max(acc, rockIndex + 1)
          }
          return acc
        }, 0)
      setTempRocks({ ...tempRocks, [newRockKey]: rock })
      setTempSequence(tempSequence.concat({ key: newRockKey }))
      setPrevClick(null)
    }
  }

  return (
    <div>
      <div>
        <select
          onChange={ev => {
            setRoute(ev.target.value)
          }}
          value={currentRouteKey}>
          {selectorRouteEntries.map(([key, route]) => {
            return (
              <option value={key} key={key}>
                [{route.grade.name}] {route.name || route.description || 'No name'}
              </option>
            )
          })}
        </select>{' '}
        <button onClick={goBack}>Go back</button>
      </div>
      {!isEditMode ? (
        <div>
          <ul>
            {currentRoute.name ? <li>Name: {currentRoute.name}</li> : null}
            {currentRoute.description ? <li>Description: {currentRoute.description}</li> : null}
            <li>
              Grade: {currentRoute.grade.name} ({currentRoute.grade.ydsGrade})
            </li>
            <li>
              Type: {currentRoute.type.key} ({currentRoute.type.name})
            </li>
          </ul>
        </div>
      ) : null}
      <div className="huskyRock__map" width={mapWidth} height={mapHeight}>
        <img src={getImageURI(wall.image)} alt="" width={mapWidth} height={mapHeight} />

        <div className="huskyRock__mapOverlayLines">
          <svg width={mapWidth} height={mapHeight}>
            {currentRoute.sequence.map((sequence, index) => {
              if (index > 0) {
                const prev = getRockCenter(wall.rocks[currentRoute.sequence[index - 1].key], scale)
                const next = getRockCenter(wall.rocks[currentRoute.sequence[index].key], scale)
                let d = `M${prev.left} ${prev.top} L${next.left} ${next.top}`
                return (
                  <path
                    d={d}
                    key={`line-${index}`}
                    fill="transparent"
                    stroke="#ff0000"
                    strokeWidth="2"
                    strokeDasharray="5 2"
                  />
                )
              }
            })}
            {currentRoute.sequence.map((sequence, index) => {
              const curr = getRockCenter(wall.rocks[sequence.key], scale)
              return (
                <circle
                  key={`dot-${index}`}
                  cx={curr.left}
                  cy={curr.top}
                  r="3"
                  fill="red"
                  stroke="white"
                />
              )
            })}
            {currentRoute.sequence.map((sequence, index) => {
              const rock = wall.rocks[sequence.key]
              const labelPosition = getRockLabel(rock, scale)
              if (sequence.label != null || rock.label != null) {
                return (
                  <text
                    x={labelPosition.left}
                    y={labelPosition.top}
                    key={`text-${index}`}
                    className="small"
                    dominantBaseline="hanging"
                    fill="red"
                    stroke="white"
                    strokeWidth={2}
                    paintOrder="stroke"
                    textAnchor="middle">
                    {sequence.label || rock.label}
                  </text>
                )
              } else {
                return null
              }
            })}
          </svg>
        </div>

        <div className="huskyRock__mapOverlayRocks" onClick={onMapClick}>
          {isEditMode
            ? Object.entries(wall.rocks).map(([rockKey, rock]) => {
                const isSelected = currentRoute.sequence.some(sequence => sequence.key === rockKey)
                const className = isSelected
                  ? 'huskyRock__mapSequenceStep'
                  : 'huskyRock__mapSequenceStep huskyRock__mapSequenceStep--default'
                return (
                  <div
                    className={className}
                    key={rockKey}
                    style={{
                      top: rock.top * scale,
                      left: rock.left * scale,
                      width: rock.width * scale,
                      height: rock.height * scale,
                    }}
                    onClick={ev => {
                      onRockClick(ev, rockKey)
                    }}></div>
                )
              })
            : currentRoute.sequence.map(sequence => {
                const rock = wall.rocks[sequence.key]
                return (
                  <div
                    className="huskyRock__mapSequenceStep"
                    key={sequence.key}
                    style={{
                      top: rock.top * scale,
                      left: rock.left * scale,
                      width: rock.width * scale,
                      height: rock.height * scale,
                    }}></div>
                )
              })}
          {currentRoute.notes &&
            currentRoute.notes.map(note => {
              const rock = wall.rocks[note.key]
              return (
                <div
                  className="huskyRock__mapSequenceNote"
                  key={note.key}
                  style={{
                    top: rock.top * scale,
                    left: rock.left * scale,
                    width: rock.width * scale,
                    height: rock.height * scale,
                  }}>
                  <div className="huskyRock__mapSequenceNoteText">{note.label}</div>
                </div>
              )
            })}
        </div>
      </div>
      {isEditMode ? (
        <textarea
          value={stringifyWall(wall)}
          readOnly={true}
          style={{ width: '80%', height: '500px' }}
        />
      ) : null}
    </div>
  )
}

const Container = () => {
  const query = useQuery()
  const history = useHistory()
  const wallKey = query.get('wall')
  const currentWall = wallKey in WALLS ? WALLS[wallKey] : null

  const setCurrentWall = wallKey => {
    history.push(`?wall=${wallKey}`)
  }

  return currentWall == null ? (
    <div>
      {Object.entries(WALLS).map(([key, wall]) => {
        return <WallCard wall={wall} key={key} onClick={() => setCurrentWall(key)} />
      })}
    </div>
  ) : (
    <WallPage wall={currentWall} />
  )
}

const ContainerWrapper = () => {
  return (
    <Router>
      <Container />
    </Router>
  )
}

ReactDOM.render(<ContainerWrapper />, document.getElementById('react-container'))
