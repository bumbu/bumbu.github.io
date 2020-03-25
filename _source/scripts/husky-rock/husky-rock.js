import React, { useState } from 'react'
import * as ReactDOM from 'react-dom'
import { BrowserRouter as Router, useLocation, useHistory } from 'react-router-dom'
import { ROUTE_TYPES, ROUTE_GRADES, WALLS } from './data'

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

const WallCard = props => {
  const { wall, onClick } = props

  return (
    <div onClick={onClick} className="huskyRock__card">
      <div onClick={onClick} className="huskyRock__cardImage">
        <img src={getImageURI(wall.image)} alt={wall.name} />
      </div>
      <div onClick={onClick} className="huskyRock__cardTitle">
        {wall.name}
      </div>
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
  if (isEditMode) {
    currentRoute = {
      name: null,
      description: null,
      type: ROUTE_TYPES.AR,
      grade: ROUTE_GRADES.EASY,
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
      rocks: Object.assign(wall.rocks, tempRocks),
      routes: {
        ...wall.routes,
        // Att temp route to wall
        [newRouteKey]: currentRoute,
      },
    }
  }
  function addRock(ev, rockKey) {
    ev.preventDefault()
    ev.stopPropagation()
    setTempSequence(tempSequence.concat({ key: rockKey }))
  }
  function onMapClick(ev) {
    const clickPoint = {
      top: (ev.clientY - ev.target.getBoundingClientRect().y) / scale,
      left: (ev.clientX - ev.target.getBoundingClientRect().x) / scale,
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
      setTempRocks({ [newRockKey]: rock })
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
                [{route.grade.name}] {route.name || route.description || route.grade}
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
              const curr = wall.rocks[sequence.key]
              const labelPosition = getRockLabel(curr, scale)
              if (sequence.type === 'start') {
                return (
                  <text
                    x={labelPosition.left}
                    y={labelPosition.top}
                    key={`text-${index}`}
                    className="small"
                    dominantBaseline="hanging"
                    fill="red"
                    textAnchor="middle">
                    start
                  </text>
                )
              } else if (sequence.type === 'end') {
                return (
                  <text
                    x={labelPosition.left}
                    y={labelPosition.top}
                    key={`text-${index}`}
                    className="small"
                    dominantBaseline="hanging"
                    fill="red"
                    textAnchor="middle">
                    end
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
                return (
                  <div
                    className="huskyRock__mapSequenceStep huskyRock__mapSequenceStep--default"
                    key={rockKey}
                    style={{
                      top: rock.top * scale,
                      left: rock.left * scale,
                      width: rock.width * scale,
                      height: rock.height * scale,
                    }}
                    onClick={ev => {
                      addRock(ev, rockKey)
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
        </div>
      </div>
      {isEditMode ? (
        <textarea
          value={JSON.stringify(wall, undefined, 2)}
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
