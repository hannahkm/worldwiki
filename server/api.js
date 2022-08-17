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

// anything else falls to this "not found" case
router.all('*', (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`)
  res.status(404).send({ msg: 'API route not found' })
})

module.exports = router

// WORLD API CALLS

// get a world given its ID
router.get('/world', (req, res) => {
  World.findById(req.query.worldId).then((world) => {
    res.send(world)
  })
})

// create a new ID -- worlds are initialized with empty info box and empty sections
router.get('/newWorld', (req, res) => {
  const newWorld = new World({
    pageId: mongoose.Types.ObjectId(),
    pageName: req.query.worldName,
    pageAuthor: String,
    pageDescription: req.query.worldDescription,
    infoBox: {
      infoImage: req.query.infoImageURL,
      infoSections: new Map()
    },
    sections: new Map()
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
      world.infoBox.infoSections.set(req.body.sectionName, new Map())
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
      world.infoBox.infoSections.get(req.body.sectionName).set(req.body.contentLabel, req.body.contentValue)
      world.save().then((w) => res.send(w))
    }
  })
})

// edit a section of a world
router.post('/world/editSection', (req, res) => {
  World.findOne({
    pageId: req.body.worldId
  }).then((world) => {
    world.sections.set(req.body.sectionName, req.body.sectionContent)
    world.save().then((w) => res.send(w))
  })
})
