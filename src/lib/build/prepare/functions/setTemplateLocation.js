const path = require('path')

const templateLocation = relativeLocation => {
  return path.join(__dirname, relativeLocation)
}

module.exports = templateLocation
