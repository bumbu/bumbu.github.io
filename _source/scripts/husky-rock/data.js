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

const ROUTE_RISKS = {
  LOW: { key: 'LOW', name: 'Low risk of injury' },
  MODERATE: { key: 'MODERATE', name: 'Risk of injury' },
  HIGH: { key: 'HIGH', name: 'Risk of serious injury.' },
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
      edge2: {
        width: 10,
        height: 30,
        top: 412,
        left: 294,
        type: 'edge',
      },
      pocket1: {
        width: 6,
        height: 6,
        left: 123,
        top: 352,
        type: 'pocket',
      },
      pocket2: {
        top: 237,
        left: 132,
        width: 6,
        height: 6,
        type: 'pocket',
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
      rock17: {
        top: 325,
        left: 154,
        width: 14,
        height: 16,
      },
      rock18: {
        top: 230,
        left: 171,
        width: 18,
        height: 12,
      },
      rock19: {
        top: 164,
        left: 181,
        width: 14,
        height: 14,
      },
      rock20: {
        top: 124,
        left: 210,
        width: 13,
        height: 18,
      },
      rock21: {
        top: 105,
        left: 235,
        width: 14,
        height: 8,
      },
      rock22: {
        top: 79,
        left: 194,
        width: 9,
        height: 14,
      },
      rock23: {
        top: 47,
        left: 199,
        width: 14,
        height: 7,
      },
      rock24: {
        top: 30,
        left: 160,
        width: 13,
        height: 13,
      },
      rock25: {
        top: 1,
        left: 182,
        width: 24,
        height: 6,
      },
      rock26: {
        top: 336,
        left: 24,
        width: 6,
        height: 33,
      },
      rock27: {
        top: 360,
        left: 114,
        width: 7,
        height: 17,
      },
      rock28: {
        top: 322,
        left: 249,
        width: 16,
        height: 15,
      },
      rock29: {
        top: 318,
        left: 200,
        width: 8,
        height: 10,
      },
      rock30: {
        top: 310,
        left: 150,
        width: 11,
        height: 8,
      },
    },
    routes: {
      route1: {
        name: null,
        description: 'Low traverse, left to right; Tricky beta',
        type: ROUTE_TYPES.ARF,
        grade: ROUTE_GRADES.HARD,
        risk: ROUTE_RISKS.LOW,
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
        risk: ROUTE_RISKS.LOW,
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
        risk: ROUTE_RISKS.LOW,
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
      route4: {
        name: 'Air to Spare',
        description: null,
        type: ROUTE_TYPES.noF,
        grade: ROUTE_GRADES.VERY_HARD,
        risk: ROUTE_RISKS.HIGH,
        sequence: [
          {
            key: 'rock17',
          },
          {
            key: 'rock15',
          },
          {
            key: 'rock18',
          },
          {
            key: 'rock19',
          },
          {
            key: 'rock20',
          },
          {
            key: 'rock21',
          },
          {
            key: 'rock22',
          },
          {
            key: 'rock23',
          },
          {
            key: 'rock24',
          },
          {
            key: 'rock25',
          },
        ],
      },
      route5: {
        name: 'Four to Flag',
        description: 'Use cheater rock if short',
        type: ROUTE_TYPES.noF,
        grade: ROUTE_GRADES.HARD,
        risk: ROUTE_RISKS.LOW,
        sequence: [
          {
            key: 'rock17',
          },
          {
            key: 'rock15',
          },
          {
            key: 'rock18',
          },
          {
            key: 'rock19',
          },
        ],
      },
      route6: {
        name: '5.13 Bigwall problem',
        description: 'Wicked finish',
        type: ROUTE_TYPES.noF,
        grade: ROUTE_GRADES.EXTREMELY_HARD,
        risk: ROUTE_RISKS.LOW,
        sequence: [
          {
            key: 'rock6',
          },
          {
            key: 'pocket1',
          },
          {
            key: 'rock14',
          },
          {
            key: 'rock9',
          },
          {
            key: 'pocket2',
          },
          {
            key: 'rock10',
          },
          {
            key: 'rock19',
          },
        ],
      },
      route7: {
        name: 'Albatross',
        description: null,
        type: ROUTE_TYPES.ARF,
        grade: ROUTE_GRADES.VERY_HARD,
        risk: ROUTE_RISKS.LOW,
        sequence: [
          {
            key: 'rock26',
            type: 'start',
          },
          {
            key: 'rock27',
          },
          {
            key: 'rock5',
          },
          {
            key: 'rock28',
          },
          {
            key: 'rock29',
          },
          {
            key: 'rock30',
          },
          {
            key: 'rock8',
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
  ROUTE_RISKS,
  WALLS,
}
