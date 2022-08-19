/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/

const express = require('express')
const mongoose = require('mongoose')

// import models so we can interact with the database
const User = require('./models/user')
const World = require('./models/world')

// import authentication library
const auth = require('./auth')

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router()

const socketManager = require('./server-socket')

router.post('/login', auth.login)
router.post('/logout', auth.logout)
router.get('/whoami', (req, res) => {
  if (!req.user) {
    // not logged in
    return res.send({})
  }

  res.send(req.user)
})

// HELPER FUNCTIONS
const addToMap = (m, key, value) => {
  const newMap = new Map([[key, value]])
  return new Map([...m, ...newMap])
}

// USER API CALLS

router.get('/user', (req, res) => {
  User.findById(req.query.userid).then((user) => {
    res.send(user)
  })
})

router.post('/initsocket', (req, res) => {
  // do nothing if user not logged in
  if (req.user) socketManager.addUser(req.user, socketManager.getSocketFromSocketID(req.body.socketid))
  res.send({})
})

router.get('/activeUsers', (req, res) => {
  res.send({ activeUsers: socketManager.getAllConnectedUsers() })
})

router.post('/user/addWorld', (req, res) => {
  User.findById(req.body.userId).then((user) => {
    if (user) {
      user.ownedWorlds = [...user.ownedWorlds, req.body.worldId]
      user.save().then((u) => res.send(u))
    } else {
      res.send({})
    }
  })
})

// WORLD API CALLS

// get a world given its ID
router.get('/getOrCreateBlankWorld', (req, res) => {
  World.findOne({
    pageId: req.query.worldId
  }).then((world) => {
    if (world) {
      res.send(world)
    } else {
      const newWorld = new World({
        pageId: mongoose.Types.ObjectId(),
        pageName: '',
        pageAuthor: req.query.userId,
        pageDescription: '',
        infoBox: {
          infoImage: '',
          infoSections: new Map([])
        },
        sections: new Map([])
      })
      newWorld.save().then((w) => res.send(w))
    }
  })
})

// create a new ID -- worlds are initialized with empty info box and empty sections
router.post('/newWorld', (req, res) => {
  const newWorld = new World({
    pageId: mongoose.Types.ObjectId(),
    pageName: req.query.worldName,
    pageAuthor: '',
    pageDescription: req.query.worldDescription,
    infoBox: {
      infoImage: req.query.infoImageURL,
      infoSections: new Map([])
    },
    sections: new Map([])
  })
  newWorld.save().then((u) => res.send(u))
})

// edit the world's name
router.post('/world/editName', (req, res) => {
  World.findOne({
    pageId: req.body.worldId
  }).then((world) => {
    world.pageName = req.body.worldName
    world.save().then((w) => res.send(w))
  })
})

// edit the world's description
router.post('/world/editDescription', (req, res) => {
  World.findOne({
    pageId: req.body.worldId
  }).then((world) => {
    world.pageDescription = req.body.worldDescription
    world.save().then((w) => res.send(w))
  })
})

// add a new info section, if it doesn't already exist
router.post('/world/newInfoSection', (req, res) => {
  World.findOne({
    pageId: req.body.worldId
  }).then((world) => {
    if (!world.infoBox.infoSections.has(req.body.sectionName)) {
      const newInfoSections = addToMap(world.infoBox.infoSections, req.body.sectionName, req.body.sectionContent)
      world.infoBox.infoSections = newInfoSections
      world.save().then((w) => res.send(w))
    } else {
      res.send(world)
    }
  })
})

// edit a row of a section of a world's info box
router.post('/world/editInfoSection', (req, res) => {
  World.findOne({
    pageId: req.body.worldId
  }).then((world) => {
    if (!world.infoBox.infoSections.has(req.body.sectionName)) {
      res.send({})
    } else {
      const newInfoSubSections = addToMap(world.infoBox.infoSections.get(req.body.sectionName), req.body.contentLabel, req.body.contentValue)
      const newInfoSections = addToMap(world.infoBox.infoSections, req.body.sectionName, newInfoSubSections)
      world.infoBox.infoSections = newInfoSections
      world.save().then((w) => res.send(w))
    }
  })
})

// add a new section, if it doesn't already exist
router.post('/world/newSection', (req, res) => {
  World.findOne({
    pageId: req.body.worldId
  }).then((world) => {
    if (!world.sections.has(req.body.sectionName)) {
      world.sections = addToMap(world.sections, req.body.sectionName, req.body.sectionContent)
      world.save().then((w) => {
        res.send(w)
      })
    } else {
      res.send(world)
    }
  })
})

// edit a section of a world
router.post('/world/editSection', (req, res) => {
  World.findOne({
    pageId: req.body.worldId
  }).then((world) => {
    const newSections = addToMap(world.sections, req.body.sectionName, req.body.sectionContent)
    world.sections = newSections
    world.save().then((w) => res.send(w))
  })
})

// anything else falls to this "not found" case
router.all('*', (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`)
  res.status(404).send({ msg: 'API route not found' })
})

module.exports = router
