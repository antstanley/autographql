export default {
  human: {
    1: {
      id: 1,
      name: 'Han Solo',
      friends: [
        { id: 2, name: 'Chewbacca' },
        { id: 3, name: 'Luke Skywalker' },
        { id: 4, name: 'Princess Leia' }
      ],
      appearsIn: [4, 5, 6, 7],
      secretBackstory: '',
      homePlanet: 'Correllia'
    },
    2: {
      id: 2,
      name: 'Chewbacca',
      friends: [
        { id: 1, name: 'Han Solo' },
        { id: 3, name: 'Luke Skywalker' },
        { id: 4, name: 'Princess Leia' }
      ],
      appearsIn: [4, 5, 6, 7, 8],
      secretBackstory: '',
      homePlanet: 'Kashyyyk'
    },
    3: {
      id: 3,
      name: 'Luke Skywalker',
      friends: [
        { id: 1, name: 'Han Solo' },
        { id: 2, name: 'Chewbacca' },
        { id: 4, name: 'Princess Leia' }
      ],
      appearsIn: [4, 5, 6, 7, 8],
      secretBackstory: ''
    },
    4: {
      id: 4,
      name: 'Princess Leia',
      friends: [
        { id: 1, name: 'Han Solo' },
        { id: 2, name: 'Chewbacca' },
        { id: 3, name: 'Luke Skywalker' }
      ],
      appearsIn: [4, 5, 6, 7, 8],
      secretBackstory: ''
    }
  },
  droid: {
    5: {
      id: 5,
      name: 'R2D2',
      friends: [
        { id: 1, name: 'Han Solo' },
        { id: 2, name: 'Chewbacca' },
        { id: 3, name: 'Luke Skywalker' },
        { id: 4, name: 'Princess Leia' }
      ],
      appearsIn: [1, 2, 3, 4, 5, 6, 7],
      secretBackstory: '',
      primaryFunction: 'Pilot droid'
    },
    6: {
      id: 6,
      name: 'C3PO',
      friends: [
        { id: 1, name: 'Han Solo' },
        { id: 2, name: 'Chewbacca' },
        { id: 3, name: 'Luke Skywalker' }
      ],
      appearsIn: [4, 5, 6, 7, 8],
      secretBackstory: '',
      primaryFunction: 'Protocal Droid'
    }
  }
}
