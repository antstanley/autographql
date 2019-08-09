import StarWarsData from './starwars/data.mjs'

const human = (args, context) => {
  return StarWarsData.human[args.id]
}

const allHumans = (args, context) => {
  const humanArray = Array.prototype.slice.call(StarWarsData.human, 0)
  return humanArray
}

const droid = (args, context) => {
  return StarWarsData.droid[args.id]
}

const allDroids = (args, context) => {
  const droidArray = Array.prototype.slice.call(StarWarsData.droid, 0)
  return droidArray
}

export default {
  human,
  allHumans,
  droid,
  allDroids
}
