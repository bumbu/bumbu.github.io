import React, { useState, useEffect } from 'react'
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
  const { wall, onClick, isEditMode } = props
  const isEmpty = wall.isEmpty === true && !isEditMode

  return (
    <div onClick={isEmpty ? null : onClick} className="huskyRock__card">
      <div className="huskyRock__cardImage">
        <img src={getImageURI(wall.image)} alt={wall.name} />
      </div>
      <div className="huskyRock__cardTitle">{wall.name}</div>
      <div className="huskyRock__cardCount">
        {isEmpty ? 'no routes' : Object.values(wall.routes).length}
      </div>
    </div>
  )
}

const WallPage = props => {
  const query = useQuery()
  const history = useHistory()
  const routeKey = query.get('route')
  let { wall, isEditMode } = props
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
            const name =
              route.name != null
                ? route.name
                : route.description != null
                ? route.description.slice(0, 16) + '...'
                : 'No name'
            return (
              <option value={key} key={key}>
                [{route.grade.name}][{route.type.key}] {name}
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
            {currentRoute.risk.key !== ROUTE_RISKS.LOW.key ? (
              <li>{currentRoute.risk.name}</li>
            ) : null}
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
      <a
        className="huskyRock__infoTitle"
        href="https://github.com/bumbu/bumbu.github.io/issues"
        target="_blank">
        Submit feedback
      </a>
    </div>
  )
}

const Container = () => {
  const query = useQuery()
  const history = useHistory()
  const wallKey = query.get('wall')
  const isEditMode = !!query.get('edit')
  const currentWall = wallKey in WALLS ? WALLS[wallKey] : null
  const [expandedInfo, setExpandedInfo] = useState(null)

  const setCurrentWall = wallKey => {
    history.push(`?wall=${wallKey}`)
  }

  useEffect(() => {
    document.querySelector('.post__header').style.display = wallKey ? 'none' : 'block'
  })

  return currentWall == null ? (
    <div>
      <div className="huskyRock__cardsSection">
        {Object.entries(WALLS).map(([key, wall]) => {
          return (
            <WallCard
              wall={wall}
              key={key}
              isEditMode={isEditMode}
              onClick={() => setCurrentWall(key)}
            />
          )
        })}
      </div>
      <div className="huskyRock__infoSectionWrapper">
        <div className="huskyRock__infoSection">
          <a className="huskyRock__infoTitle" onClick={() => setExpandedInfo('disclaimer')}>
            Disclaimer (expand)
          </a>
          {expandedInfo === 'disclaimer' ? (
            <div className="huskyRock__infoContent">
              <p>
                Rock climbing and mountaineering in general is a dangerous pastime that can lead to
                serious injury or worse. You should not undertake these without proper training or
                equipment.
              </p>
              <p>
                By using this site you acknowledge that the information therein may be out of date
                or inaccurate and you agree that the no one can be held liable for any damage that
                may be caused by use of this website.
              </p>
            </div>
          ) : null}
          <a className="huskyRock__infoTitle" onClick={() => setExpandedInfo('new')}>
            How to add new routes (expand)
          </a>
          {expandedInfo === 'new' ? (
            <div className="huskyRock__infoContent">
              <h4>If you know software engineering:</h4>
              <p>First time instalation</p>
              <ol>
                <li>
                  Go to{' '}
                  <a href="https://github.com/bumbu/bumbu.github.io" target="_blank">
                    github
                  </a>
                  , download a local copy of this website
                </li>
                <li>
                  Run <code>npm install</code> to install required node modules. You must have NPM
                  installed on your computer.
                </li>
                <li>
                  Run <code>bundle install</code> to install required ruby modules. You must have
                  Ruby installed on your computer.
                </li>
              </ol>
              <p>Adding routes:</p>
              <ol>
                <li>
                  Run <code>npm start</code>. This will start a local server.
                </li>
                <li>Visit the provided URI from console, you should see the local website.</li>
                <li>Go to Husky Rock page, click on the wall you're interested to edit</li>
                <li>
                  In the browser tab add <code>&edit=1</code> to the URL (e.g.{' '}
                  <code>localhost:4000/husky-rock/?wall=east-side-south-facing&edit=1</code>
                </li>
                <li>
                  You should see something like this: <img src={getImageURI('editor.png')} alt="" />
                </li>
                <li>Clicking on an existing rock (grey rectangle) will select it</li>
                <li>Clicking on the same rock again will unset it</li>
                <li>
                  Clicking 2 times outside the rocks will create a new one (think of it as top-left
                  and bottom-right corner)
                </li>
                <li>
                  After you finished creating the route, copy the contents of the textbox under the
                  map. It contains the new route data.
                </li>
                <li>
                  Open file <code>data.js</code> and replace the entire wall object with this new
                  object
                </li>
                <li>Add a title and description if available</li>
                <li>
                  Add grade, route type and risk using existing object (e.g.{' '}
                  <code>ROUTE_GRADES.HARD</code>)
                </li>
                <li>Save file. Wait for JS to regenerate. Now you can preview your route.</li>
                <li>To add a new route, refresh the tab, and start again from point 5</li>
              </ol>
              <p>Submitting a PR:</p>
              <ol>
                <li>After you added all desired routes, stop the server</li>
                <li>
                  Run <code>npm run build</code> to generate new code
                </li>
                <li>Commit and submit a PR</li>
              </ol>
              <h4>Otherwise (works only for 1 route):</h4>
              <ul>
                <li>
                  Open the wall page (e.g. <code>bumbu.me/husky-rock/?wall=north-roof</code>)
                </li>
                <li>
                  In browser address bar add <code>&edit=1</code> at the end (e.g.{' '}
                  <code>bumbu.me/husky-rock/?wall=north-roof&edit=1</code>
                </li>
                <li>See above section how to create a new route (points 6-9)</li>
                <li>Bellow the map there's a text box with new data, you'll need it later.</li>
                <li>
                  After you've created the route, go to{' '}
                  <a
                    target="_blank"
                    href="https://github.com/bumbu/bumbu.github.io/blob/master/_source/scripts/husky-rock/data.js">
                    github
                  </a>{' '}
                  and click "edit the file" (you need to register first).
                </li>
                <li>Replace the correct variable with the content of the text box</li>
                <li>Submit the pull request</li>
              </ul>
            </div>
          ) : null}
          <a
            className="huskyRock__infoTitle"
            href="https://github.com/bumbu/bumbu.github.io/issues"
            target="_blank">
            Submit feedback
          </a>
        </div>
      </div>
    </div>
  ) : (
    <WallPage wall={currentWall} isEditMode={isEditMode} />
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
