"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const starWars = {
  1: {
    id: 1,
    name: 'Han Solo',
    friends: [{
      id: 2,
      name: 'Chewbacca'
    }, {
      id: 3,
      name: 'Luke Skywalker'
    }, {
      id: 4,
      name: 'Princess Leia'
    }],
    appearsIn: [4, 5, 6, 7],
    secretBackstory: ''
  },
  2: {
    id: 2,
    name: 'Chewbacca',
    friends: [{
      id: 1,
      name: 'Han Solo'
    }, {
      id: 3,
      name: 'Luke Skywalker'
    }, {
      id: 4,
      name: 'Princess Leia'
    }],
    appearsIn: [4, 5, 6, 7, 8],
    secretBackstory: ''
  },
  3: {
    id: 3,
    name: 'Luke Skywalker',
    friends: [{
      id: 1,
      name: 'Han Solo'
    }, {
      id: 2,
      name: 'Chewbacca'
    }, {
      id: 4,
      name: 'Princess Leia'
    }],
    appearsIn: [4, 5, 6, 7, 8],
    secretBackstory: ''
  },
  4: {
    id: 4,
    name: 'Princess Leia',
    friends: [{
      id: 1,
      name: 'Han Solo'
    }, {
      id: 2,
      name: 'Chewbacca'
    }, {
      id: 3,
      name: 'Luke Skywalker'
    }],
    appearsIn: [4, 5, 6, 7, 8],
    secretBackstory: ''
  },
  5: {
    id: 5,
    name: 'R2D2',
    friends: [{
      id: 1,
      name: 'Han Solo'
    }, {
      id: 2,
      name: 'Chewbacca'
    }, {
      id: 3,
      name: 'Luke Skywalker'
    }, {
      id: 4,
      name: 'Princess Leia'
    }],
    appearsIn: [1, 2, 3, 4, 5, 6, 7],
    secretBackstory: ''
  },
  6: {
    id: 6,
    name: 'C3PO',
    friends: [{
      id: 1,
      name: 'Han Solo'
    }, {
      id: 2,
      name: 'Chewbacca'
    }, {
      id: 3,
      name: 'Luke Skywalker'
    }],
    appearsIn: [4, 5, 6, 7, 8],
    secretBackstory: ''
  }
};

const getCharacter = (args, context) => {
  return starWars.human[args.id];
};

var _default = {
  getCharacter
};
exports.default = _default;