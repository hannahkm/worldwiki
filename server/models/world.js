const mongoose = require('mongoose')

const WorldSchema = new mongoose.Schema({
  pageId: String,
  pageName: String,
  pageAuthor: String,
  pageDescription: String,
  infoBox: {
    infoImage: String,
    infoSections: {
      type: Map,
      of: String
    }
  },
  sections: {
    type: Map,
    of: String
  }
})

// compile model from schema
module.exports = mongoose.model('world', WorldSchema)
