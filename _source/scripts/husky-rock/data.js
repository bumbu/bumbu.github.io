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
  MODERATE: { key: 'MODERATE', name: 'Moderate', ydsGrade: '5.9', order: 3 },
  MODERATE_HARD: { key: 'MODERATE_HARD', name: 'Moderate-hard', ydsGrade: '5.10', order: 4 },
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

const southTowerWall = {
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
      label: 'edge',
    },
    edge2: {
      width: 10,
      height: 30,
      top: 412,
      left: 294,
      label: 'edge',
    },
    edge3: {
      top: 1,
      left: 182,
      width: 24,
      height: 6,
      label: 'edge',
    },
    edge4: {
      top: 8,
      left: 226,
      width: 20,
      height: 7,
      label: 'edge',
    },
    edge5: {
      top: 477,
      left: 180,
      width: 32,
      height: 6,
    },
    edge6: {
      top: 303,
      left: 233,
      width: 6,
      height: 17,
      label: 'edge',
    },
    edge7: {
      top: 274,
      left: 287,
      width: 7,
      height: 31,
      label: 'edge',
    },
    pocket1: {
      width: 6,
      height: 6,
      left: 123,
      top: 352,
      label: 'pocket',
    },
    pocket2: {
      top: 237,
      left: 132,
      width: 6,
      height: 6,
      label: 'pocket',
    },
    pocket3: {
      top: 383,
      left: 204,
      width: 6,
      height: 6,
      label: 'pocket',
    },
    pocket4: {
      top: 391,
      left: 243,
      width: 6,
      height: 6,
      label: 'pocket',
    },
    notch1: {
      top: 369,
      left: 240,
      width: 4,
      height: 10,
      label: 'notch',
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
      width: 14,
      height: 9,
      left: 53,
      top: 348,
      label: 'bottom edge',
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
    rock31: {
      top: 360,
      left: 149,
      width: 11,
      height: 13,
    },
    rock32: {
      top: 379,
      left: 26,
      width: 8,
      height: 10,
    },
    rock33: {
      top: 376,
      left: 85,
      width: 10,
      height: 9,
    },
    rock34: {
      top: 350,
      left: 164,
      width: 10,
      height: 12,
    },
    rock35: {
      top: 236,
      left: 87,
      width: 10,
      height: 10,
    },
    rock37: {
      top: 131,
      left: 233,
      width: 21,
      height: 11,
    },
    rock38: {
      top: 351,
      left: 135,
      width: 7,
      height: 6,
    },
    rock39: {
      top: 242,
      left: 156,
      width: 10,
      height: 7,
    },
    rock40: {
      top: 163,
      left: 242,
      width: 16,
      height: 10,
    },
    rock41: {
      top: 76,
      left: 242,
      width: 19,
      height: 19,
    },
    rock42: {
      top: 465,
      left: 10,
      width: 11,
      height: 7,
    },
    rock43: {
      top: 467,
      left: 60,
      width: 10,
      height: 8,
    },
    rock44: {
      top: 469,
      left: 75,
      width: 12,
      height: 7,
    },
    rock45: {
      top: 469,
      left: 105,
      width: 12,
      height: 6,
    },
    rock46: {
      top: 469,
      left: 131,
      width: 12,
      height: 6,
    },
    rock47: {
      top: 464,
      left: 147,
      width: 12,
      height: 9,
    },
    rock48: {
      top: 469,
      left: 168,
      width: 12,
      height: 7,
    },
    rock49: {
      top: 472,
      left: 232,
      width: 11,
      height: 5,
    },
    rock50: {
      top: 471,
      left: 250,
      width: 13,
      height: 5,
    },
    rock51: {
      top: 461,
      left: 266,
      width: 18,
      height: 12,
    },
    rock52: {
      top: 352,
      left: 33,
      width: 8,
      height: 11,
    },
    rock53: {
      top: 229,
      left: 62,
      width: 13,
      height: 13,
    },
    rock54: {
      top: 188,
      left: 114,
      width: 14,
      height: 9,
    },
    rock55: {
      top: 391,
      left: 186,
      width: 6,
      height: 6,
      label: 'microhold',
    },
    rock56: {
      top: 325,
      left: 135,
      width: 8,
      height: 9,
    },
    rock57: {
      top: 194,
      left: 165,
      width: 19,
      height: 12,
    },
    rock58: {
      top: 322,
      left: 174,
      width: 8,
      height: 10,
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
          label: 'start',
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
          label: 'end',
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
          label: 'start',
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
          label: 'end',
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
          label: 'start',
        },
        {
          key: 'pocket1',
          label: 'start',
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
          label: 'end',
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
          key: 'edge3',
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
          label: 'start',
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
          label: 'end',
        },
      ],
    },
    route8: {
      name: null,
      description: 'Classic 5.9',
      type: ROUTE_TYPES.ARF,
      grade: ROUTE_GRADES.MODERATE,
      risk: ROUTE_RISKS.LOW,
      sequence: [
        {
          key: 'rock31',
        },
        {
          key: 'rock17',
        },
        {
          key: 'rock30',
        },
        {
          key: 'rock15',
        },
        {
          key: 'rock18',
        },
        {
          key: 'rock12',
        },
        {
          key: 'rock19',
        },
      ],
    },
    route9: {
      name: 'Hobbit Pockets',
      description: 'Tough highstep; Sitstart',
      type: ROUTE_TYPES.ENG,
      grade: ROUTE_GRADES.HARD,
      risk: ROUTE_RISKS.LOW,
      sequence: [
        {
          key: 'rock1',
        },
        {
          key: 'rock2',
        },
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
          key: 'rock12',
        },
        {
          key: 'rock13',
        },
      ],
    },
    route10: {
      name: "Rubik's cube",
      description: 'Left to right',
      type: ROUTE_TYPES.ARF,
      grade: ROUTE_GRADES.EXTREMELY_HARD,
      risk: ROUTE_RISKS.LOW,
      sequence: [
        {
          key: 'rock32',
        },
        {
          key: 'rock33',
        },
        {
          key: 'rock34',
        },
        {
          key: 'pocket3',
        },
        {
          key: 'pocket4',
        },
        {
          key: 'edge2',
        },
      ],
    },
    route11: {
      name: 'Curly Fries',
      description: 'Lots of texture, figure it out',
      type: ROUTE_TYPES.ARF,
      grade: ROUTE_GRADES.MODERATE_HARD,
      risk: ROUTE_RISKS.LOW,
      sequence: [
        {
          key: 'rock6',
        },
        {
          key: 'pocket1',
        },
        {
          key: 'rock8',
        },
        {
          key: 'rock35',
        },
        {
          key: 'rock12',
        },
        {
          key: 'rock19',
        },
      ],
    },
    route12: {
      name: 'Dance of the Leopardslug',
      description: 'Airy',
      type: ROUTE_TYPES.ARF,
      grade: ROUTE_GRADES.HARD,
      risk: ROUTE_RISKS.HIGH,
      sequence: [
        {
          key: 'notch1',
          label: 'notch below crack only',
        },
        {
          key: 'rock15',
        },
        {
          key: 'rock10',
        },
        {
          key: 'rock19',
        },
        {
          key: 'rock37',
        },
        {
          key: 'rock22',
        },
        {
          key: 'rock23',
        },
        {
          key: 'edge3',
        },
      ],
    },
    route13: {
      name: 'Tower of power',
      description: null,
      type: ROUTE_TYPES.ENG,
      grade: ROUTE_GRADES.VERY_HARD,
      risk: ROUTE_RISKS.HIGH,
      sequence: [
        {
          key: 'rock38',
        },
        {
          key: 'rock7',
        },
        {
          key: 'rock9',
        },
        {
          key: 'rock39',
        },
        {
          key: 'rock16',
        },
        {
          key: 'rock40',
        },
        {
          key: 'rock20',
        },
        {
          key: 'rock41',
        },
        {
          key: 'rock23',
        },
        {
          key: 'edge3',
        },
      ],
    },
    route14: {
      name: null,
      description: 'Classic low traverse',
      type: ROUTE_TYPES.ARH,
      grade: ROUTE_GRADES.EASY_MODERATE,
      risk: ROUTE_RISKS.LOW,
      sequence: [
        {
          key: 'rock42',
        },
        {
          key: 'rock43',
        },
        {
          key: 'rock44',
        },
        {
          key: 'rock45',
        },
        {
          key: 'rock46',
        },
        {
          key: 'rock47',
        },
        {
          key: 'rock48',
        },
        {
          key: 'rock49',
        },
        {
          key: 'rock50',
        },
        {
          key: 'rock51',
        },
      ],
    },
    route15: {
      name: 'Airwolf',
      description: 'Establish on 1st hold; No texture hold; Big block out for feet',
      type: ROUTE_TYPES.ARF,
      grade: ROUTE_GRADES.HARD,
      risk: ROUTE_RISKS.HIGH,
      sequence: [
        {
          key: 'rock27',
        },
        {
          key: 'rock52',
        },
        {
          key: 'rock8',
        },
        {
          key: 'rock53',
        },
        {
          key: 'rock54',
        },
        {
          key: 'rock13',
        },
      ],
      notes: [
        {
          key: 'rock6',
          text: 'out!',
        },
      ],
    },
    route16: {
      name: 'Toasted Harshmellows',
      description: 'Microedge 1st hold - yikes!',
      type: ROUTE_TYPES.noF,
      grade: ROUTE_GRADES.EXTREMELY_HARD,
      risk: ROUTE_RISKS.LOW,
      sequence: [
        {
          key: 'rock55',
        },
        {
          key: 'rock56',
        },
        {
          key: 'rock39',
        },
        {
          key: 'rock57',
        },
        {
          key: 'rock13',
        },
      ],
    },
    route17: {
      name: null,
      description: null,
      type: ROUTE_TYPES.ARF,
      grade: ROUTE_GRADES.MODERATE_HARD,
      risk: ROUTE_RISKS.LOW,
      sequence: [
        {
          key: 'rock56',
        },
        {
          key: 'rock58',
        },
        {
          key: 'rock15',
        },
        {
          key: 'rock39',
        },
        {
          key: 'rock10',
        },
        {
          key: 'rock12',
        },
        {
          key: 'rock19',
        },
      ],
    },
    route18: {
      name: null,
      description: null,
      type: ROUTE_TYPES.ENG,
      grade: ROUTE_GRADES.HARD,
      risk: ROUTE_RISKS.LOW,
      sequence: [
        {
          key: 'rock56',
        },
        {
          key: 'rock58',
        },
        {
          key: 'rock15',
        },
        {
          key: 'rock39',
        },
        {
          key: 'rock10',
        },
        {
          key: 'rock12',
        },
        {
          key: 'rock19',
        },
      ],
    },
    route19: {
      name: null,
      description: null,
      type: ROUTE_TYPES.noF,
      grade: ROUTE_GRADES.VERY_HARD,
      risk: ROUTE_RISKS.LOW,
      sequence: [
        {
          key: 'rock56',
        },
        {
          key: 'rock58',
        },
        {
          key: 'rock15',
        },
        {
          key: 'rock39',
        },
        {
          key: 'rock10',
        },
        {
          key: 'rock12',
        },
        {
          key: 'rock19',
        },
      ],
    },
    route20: {
      name: 'Schizo',
      description: 'Left side of body on left side of crack; Right side on right',
      type: ROUTE_TYPES.AR,
      grade: ROUTE_GRADES.HARD,
      risk: ROUTE_RISKS.LOW,
      sequence: [
        {
          key: 'edge5',
        },
        {
          key: 'rock19',
        },
      ],
    },
    route21: {
      name: 'Schizo',
      description: 'Left side of body on left side of crack; Right side on right',
      type: ROUTE_TYPES.noF,
      grade: ROUTE_GRADES.VERY_HARD,
      risk: ROUTE_RISKS.LOW,
      sequence: [
        {
          key: 'edge5',
        },
        {
          key: 'rock19',
        },
      ],
    },
    route22: {
      name: 'Adhesion',
      description: null,
      type: ROUTE_TYPES.ARF,
      grade: ROUTE_GRADES.VERY_HARD,
      risk: ROUTE_RISKS.LOW,
      sequence: [
        {
          key: 'rock6',
        },
        {
          key: 'rock7',
        },
        {
          key: 'rock30',
        },
        {
          key: 'edge6',
          type: 'left side only',
        },
        {
          key: 'edge7',
        },
      ],
    },
  },
}

const northRoof = {
  key: 'north-roof',
  name: 'North Roof',
  image: 'north-roof.png',
  width: 965,
  height: 850,
  rocks: {
    edge1: {
      top: 24,
      left: 451,
      width: 73,
      height: 25,
      label: 'edge',
    },
    edge2: {
      top: 16,
      left: 276,
      width: 65,
      height: 27,
      label: 'edge',
    },
    edge3: {
      top: 8,
      left: 110,
      width: 85,
      height: 24,
      label: 'edge',
    },
    edge4: {
      top: 369,
      left: 807,
      width: 32,
      height: 71,
      label: 'edge',
    },
    edge5: {
      top: 4,
      left: 4,
      width: 51,
      height: 30,
      label: 'edge',
    },
    rock0: {
      top: 425,
      left: 739,
      width: 41,
      height: 38,
    },
    rock1: {
      top: 252,
      left: 679,
      width: 26,
      height: 18,
    },
    rock2: {
      top: 209,
      left: 638,
      width: 34,
      height: 23,
    },
    rock3: {
      top: 187,
      left: 559,
      width: 44,
      height: 26,
    },
    rock4: {
      top: 122,
      left: 490,
      width: 24,
      height: 30,
    },
    rock5: {
      top: 433,
      left: 453,
      width: 61,
      height: 26,
    },
    rock6: {
      top: 252,
      left: 364,
      width: 22,
      height: 26,
    },
    rock7: {
      top: 95,
      left: 290,
      width: 41,
      height: 31,
    },
    rock8: {
      top: 416,
      left: 195,
      width: 51,
      height: 86,
    },
    rock9: {
      top: 240,
      left: 87,
      width: 19,
      height: 28,
    },
    rock10: {
      top: 160,
      left: 79,
      width: 33,
      height: 37,
    },
    rock11: {
      top: 555,
      left: 268,
      width: 27,
      height: 54,
    },
    rock12: {
      top: 457,
      left: 354,
      width: 28,
      height: 18,
    },
    rock13: {
      top: 205,
      left: 165,
      width: 28,
      height: 27,
    },
    rock14: {
      top: 750,
      left: 209,
      width: 42,
      height: 30,
    },
    rock15: {
      top: 782,
      left: 390,
      width: 63,
      height: 33,
    },
    rock16: {
      top: 786,
      left: 518,
      width: 26,
      height: 25,
    },
    rock17: {
      top: 775,
      left: 571,
      width: 40,
      height: 32,
    },
    rock18: {
      top: 775,
      left: 679,
      width: 40,
      height: 38,
    },
    rock19: {
      top: 794,
      left: 739,
      width: 36,
      height: 24,
    },
    rock20: {
      top: 784,
      left: 845,
      width: 57,
      height: 33,
    },
    rock21: {
      top: 451,
      left: 128,
      width: 34,
      height: 34,
    },
    rock22: {
      top: 466,
      left: 533,
      width: 38,
      height: 27,
    },
    rock23: {
      top: 367,
      left: 683,
      width: 54,
      height: 31,
    },
    rock24: {
      top: 209,
      left: 217,
      width: 23,
      height: 21,
    },
    rock25: {
      top: 527,
      left: 739,
      width: 39,
      height: 46,
    },
    rock26: {
      top: 402,
      left: 512,
      width: 55,
      height: 55,
    },
    rock27: {
      top: 364,
      left: 266,
      width: 75,
      height: 55,
    },
    rock28: {
      top: 295,
      left: 89,
      width: 39,
      height: 51,
    },
    rock29: {
      top: 124,
      left: 131,
      width: 44,
      height: 43,
    },
    rock30: {
      top: 535,
      left: 194,
      width: 29,
      height: 34,
    },
    rock31: {
      top: 531,
      left: 381,
      width: 59,
      height: 53,
    },
    rock32: {
      top: 516,
      left: 548,
      width: 53,
      height: 55,
    },
    rock33: {
      top: 301,
      left: 577,
      width: 34,
      height: 32,
    },
    rock34: {
      top: 293,
      left: 386,
      width: 31,
      height: 44,
    },
    rock35: {
      top: 44,
      left: 99,
      width: 44,
      height: 72,
    },
    rock36: {
      top: 579,
      left: 169,
      width: 46,
      height: 61,
    },
    rock37: {
      top: 365,
      left: 118,
      width: 30,
      height: 37,
    },
    rock38: {
      top: 145,
      left: 44,
      width: 30,
      height: 45,
    },
    rock39: {
      top: 48,
      left: 46,
      width: 40,
      height: 40,
    },
    rock40: {
      top: 354,
      left: 569,
      width: 38,
      height: 50,
    },
    rock41: {
      top: 244,
      left: 405,
      width: 40,
      height: 26,
      label: 'hole in crack',
    },
    rock42: {
      top: 185,
      left: 249,
      width: 42,
      height: 32,
    },
  },
  routes: {
    route1: {
      name: null,
      description: null,
      type: ROUTE_TYPES.ARF,
      grade: ROUTE_GRADES.MODERATE_HARD,
      risk: ROUTE_RISKS.LOW,
      sequence: [
        {
          key: 'rock0',
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
          key: 'edge1',
        },
      ],
    },
    route2: {
      name: '3-rock classic',
      description: null,
      type: ROUTE_TYPES.noF,
      grade: ROUTE_GRADES.HARD,
      risk: ROUTE_RISKS.LOW,
      sequence: [
        {
          key: 'rock5',
        },
        {
          key: 'rock6',
        },
        {
          key: 'rock7',
        },
        {
          key: 'edge2',
        },
      ],
    },
    route3: {
      name: '3-rock classic (variation)',
      description: null,
      type: ROUTE_TYPES.ARF,
      grade: ROUTE_GRADES.MODERATE_HARD,
      risk: ROUTE_RISKS.LOW,
      sequence: [
        {
          key: 'rock5',
        },
        {
          key: 'rock6',
        },
        {
          key: 'rock7',
        },
        {
          key: 'edge2',
        },
      ],
    },
    route4: {
      name: '3-rock classic (variation)',
      description: 'Layback crack to tooth',
      type: ROUTE_TYPES.noF,
      grade: ROUTE_GRADES.HARD,
      risk: ROUTE_RISKS.LOW,
      sequence: [
        {
          key: 'rock5',
        },
        {
          key: 'rock6',
        },
        {
          key: 'rock7',
        },
        {
          key: 'edge2',
        },
      ],
    },
    route5: {
      name: 'Monkey Trap',
      description: null,
      type: ROUTE_TYPES.noF,
      grade: ROUTE_GRADES.VERY_HARD,
      risk: ROUTE_RISKS.LOW,
      sequence: [
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
          key: 'edge3',
        },
      ],
    },
    route6: {
      name: 'Tuff Enuf!',
      description: 'Sit start',
      type: ROUTE_TYPES.ARF,
      grade: ROUTE_GRADES.EXTREMELY_HARD,
      risk: ROUTE_RISKS.LOW,
      sequence: [
        {
          key: 'rock11',
        },
        {
          key: 'rock12',
        },
        {
          key: 'rock13',
        },
        {
          key: 'edge3',
        },
      ],
    },
    route7: {
      name: null,
      description: 'Traverse - designation for feet',
      type: ROUTE_TYPES.ARH,
      grade: ROUTE_GRADES.EASY,
      risk: ROUTE_RISKS.LOW,
      sequence: [
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
          key: 'rock17',
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
      ],
    },
    route8: {
      name: 'Balance master',
      description: 'Left to right',
      type: ROUTE_TYPES.ARF,
      grade: ROUTE_GRADES.VERY_HARD,
      risk: ROUTE_RISKS.LOW,
      sequence: [
        {
          key: 'rock21',
          label: 'start',
        },
        {
          key: 'rock12',
        },
        {
          key: 'rock22',
        },
        {
          key: 'rock23',
        },
        {
          key: 'edge4',
        },
      ],
    },
    route9: {
      name: 'Dyonsoar',
      description: 'Classic dyno',
      type: ROUTE_TYPES.ARF,
      grade: ROUTE_GRADES.MODERATE_HARD,
      risk: ROUTE_RISKS.LOW,
      sequence: [
        {
          key: 'rock21',
        },
        {
          key: 'rock13',
        },
        {
          key: 'rock24',
        },
        {
          key: 'edge3',
        },
      ],
    },
    route10: {
      name: '8th Dwarf',
      description: 'Slopey!',
      type: ROUTE_TYPES.ARF,
      grade: ROUTE_GRADES.HARD,
      risk: ROUTE_RISKS.LOW,
      sequence: [
        {
          key: 'rock25',
        },
        {
          key: 'rock26',
        },
        {
          key: 'rock27',
        },
        {
          key: 'rock28',
        },
        {
          key: 'rock29',
        },
        {
          key: 'edge3',
        },
      ],
    },
    route11: {
      name: null,
      description: 'Finish left corner',
      type: ROUTE_TYPES.ARF,
      grade: ROUTE_GRADES.MODERATE_HARD,
      risk: ROUTE_RISKS.LOW,
      sequence: [
        {
          key: 'rock30',
          label: 'start',
        },
        {
          key: 'rock31',
        },
        {
          key: 'rock32',
        },
        {
          key: 'rock0',
        },
        {
          key: 'rock33',
        },
        {
          key: 'rock34',
        },
        {
          key: 'rock13',
        },
        {
          key: 'rock10',
        },
        {
          key: 'rock35',
        },
        {
          key: 'edge5',
        },
      ],
    },
    route12: {
      name: 'Edge Zeppelin',
      description: null,
      type: ROUTE_TYPES.ARF,
      grade: ROUTE_GRADES.VERY_HARD,
      risk: ROUTE_RISKS.LOW,
      sequence: [
        {
          key: 'rock14',
          label: 'feet only',
        },
        {
          key: 'rock36',
          label: 'feet only',
        },
        {
          key: 'rock21',
        },
        {
          key: 'rock37',
        },
        {
          key: 'rock28',
        },
        {
          key: 'rock9',
        },
        {
          key: 'rock38',
        },
        {
          key: 'rock39',
        },
        {
          key: 'edge3',
        },
      ],
    },
    route13: {
      name: 'MLF Overhang',
      description: null,
      type: ROUTE_TYPES.ARF,
      grade: ROUTE_GRADES.HARD,
      risk: ROUTE_RISKS.LOW,
      sequence: [
        {
          key: 'rock22',
        },
        {
          key: 'rock40',
        },
        {
          key: 'rock41',
        },
        {
          key: 'rock42',
        },
        {
          key: 'edge2',
        },
      ],
    },
  },
}

const eastSideNorthFacing = {
  key: 'east-side-south-facing',
  name: 'East Side, South Facing',
  image: 'east-side-south-facing.png',
  width: 1000,
  height: 1016,
  rocks: {
    rock1: {
      top: 899,
      left: 946,
      width: 16,
      height: 54,
      label: 'edge',
    },
    rock2: {
      top: 566,
      left: 922,
      width: 30,
      height: 54,
      label: 'edge',
    },
    rock3: {
      top: 272,
      left: 748,
      width: 36,
      height: 49,
      label: 'edge',
    },
    rock4: {
      top: 237,
      left: 642,
      width: 60,
      height: 21,
      label: 'edge',
    },
    rock5: {
      top: 11,
      left: 191,
      width: 69,
      height: 39,
      label: 'edge',
    },
  },
  routes: {
    route1: {
      name: 'Edge traverse',
      description: null,
      type: ROUTE_TYPES.ARF,
      grade: ROUTE_GRADES.EASY,
      risk: ROUTE_RISKS.MODERATE,
      sequence: [
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
      ],
    },
  },
}

const WALLS = {
  [southTowerWall.key]: southTowerWall,
  [northRoof.key]: northRoof,
  [eastSideNorthFacing.key]: eastSideNorthFacing,
}

module.exports = {
  ROUTE_TYPES,
  ROUTE_GRADES,
  ROUTE_RISKS,
  WALLS,
}
