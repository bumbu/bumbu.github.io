const ROUTE_TYPES = {
  AR: { key: 'AR', name: 'All Rocks Hands and Feet', description: '' },
  ARF: { key: 'ARF', name: 'All Rocks Feet', description: '' },
  ARH: { key: 'ARH', name: 'All Rocks Hands', description: '' },
  noF: { key: 'noF', name: 'No Rocks Feet', description: '' },
  ENG: { key: 'ENG', name: 'English', description: '' },
}

const ROUTE_GRADES = {
  EASY: { key: 'EASY', name: 'Easy', ydsGrade: '5.6', order: 1 },
  EASY_MODERATE: { key: 'EASY_MODERATE', name: 'Easy-moderate', ydsGrade: '5.8', order: 2 },
  MODERATE: { key: 'MODERATE ', name: 'Moderate', ydsGrade: '5.9', order: 3 },
  MODERATE_HARD: { key: 'MODERATE_HARD ', name: 'Moderate-hard', ydsGrade: '5.10', order: 4 },
  HARD: { key: 'HARD', name: 'Hard', ydsGrade: '5.11-', order: 5 },
  VERY_HARD: { key: 'VERY_HARD', name: 'Very hard', ydsGrade: '5.11+', order: 6 },
  EXTREMELY_HARD: { key: 'EXTREMELY_HARD', name: 'Extremely hard', ydsGrade: '5.12-', order: 7 },
  EXTREME: { key: 'EXTREME', name: 'Extreme', ydsGrade: '5.12+', order: 8 },
}

const WALLS = {
  ['south-tower']: {
    key: 'south-tower',
    name: 'South Tower',
    image: 'south-tower.png',
    width: 303,
    height: 485,
    rocks: {
      edge1: {
        width: 10,
        height: 30,
        top: 387,
        left: 12,
        type: 'edge',
      },
      rock1: {
        width: 11,
        height: 13,
        top: 414,
        left: 45,
      },
      rock2: {
        width: 9,
        height: 14,
        left: 100,
        top: 408,
      },
      rock3: {
        width: 7,
        height: 11,
        top: 407,
        left: 149,
      },
      rock4: {
        width: 11,
        height: 13,
        top: 392,
        left: 162,
      },
      rock5: {
        width: 12,
        height: 16,
        top: 383,
        left: 214,
      },
      edge2: {
        width: 10,
        height: 30,
        top: 412,
        left: 294,
        type: 'edge',
      },
      rock6: {
        width: 31,
        height: 22,
        left: 53,
        top: 335,
      },
      rock7: {
        width: 8,
        height: 7,
        left: 91,
        top: 327,
      },
      rock8: {
        width: 12,
        height: 12,
        left: 52,
        top: 291,
      },
      rock9: {
        width: 16,
        height: 17,
        left: 99,
        top: 265,
      },
      rock10: {
        width: 7,
        height: 12,
        left: 131,
        top: 216,
      },
      rock11: {
        width: 6,
        height: 12,
        left: 153,
        top: 173,
      },
      rock12: {
        width: 6,
        height: 12,
        left: 153,
        top: 173,
      },
      rock13: {
        width: 17,
        height: 22,
        left: 150,
        top: 140,
      },
      pocket1: {
        width: 6,
        height: 6,
        left: 123,
        top: 352,
      },
      rock14: {
        width: 7,
        height: 11,
        left: 115,
        top: 309,
      },
      rock15: {
        width: 12,
        height: 20,
        left: 168,
        top: 267,
      },
      rock16: {
        width: 16,
        height: 12,
        left: 200,
        top: 202,
      },
    },
    routes: {
      route1: {
        name: null,
        description: 'Low traverse, left to right; Tricky beta',
        type: ROUTE_TYPES.ARF,
        grade: ROUTE_GRADES.HARD,
        sequence: [
          {
            key: 'edge1',
            type: 'start',
          },
          {
            key: 'rock1',
          },
          {
            key: 'rock2',
          },
          {
            key: 'rock3',
          },
          {
            key: 'rock4',
          },
          {
            key: 'rock5',
          },
          {
            key: 'edge2',
            type: 'end',
          },
        ],
      },
      route2: {
        name: "Mohler's Mayhem",
        description: 'Stem start to 1st hold',
        type: ROUTE_TYPES.ENG,
        grade: ROUTE_GRADES.VERY_HARD,
        sequence: [
          {
            key: 'rock6',
            type: 'start',
          },
          {
            key: 'rock7',
          },
          {
            key: 'rock8',
          },
          {
            key: 'rock9',
          },
          {
            key: 'rock10',
          },
          {
            key: 'rock11',
          },
          {
            key: 'rock12',
          },
          {
            key: 'rock13',
            type: 'end',
          },
        ],
      },
      route3: {
        name: 'Jingus',
        description: null,
        type: ROUTE_TYPES.noF,
        grade: ROUTE_GRADES.EXTREMELY_HARD,
        sequence: [
          {
            key: 'rock6',
            type: 'start',
          },
          {
            key: 'pocket1',
            type: 'start',
          },
          {
            key: 'rock14',
          },
          {
            key: 'rock15',
          },
          {
            key: 'rock16',
          },
          {
            key: 'rock13',
            type: 'end',
          },
        ],
      },
    },
  },
}

module.exports = {
  ROUTE_TYPES,
  ROUTE_GRADES,
  WALLS,
}