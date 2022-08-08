import mongoose from 'mongoose'

const coordinates = new mongoose.Schema({
  latitude: {
    type: String,
    required: [true, 'Latitude is required']
  },
  longitude: {
    type: String,
    required: [true, 'Longitude is requied']
  }
})

const stalkerSchema = new mongoose.Schema({
  id: {
    type: mongoose.ObjectId,
    required: [true, "User's Id is required"],
    unique: [true, 'User Id already exists']
  },
  lastStalkerRegisterNumber: {
    type: String,
    required: [true, "Victim's registeration number is required"]
  },
  start: {
    type: coordinates,
    required: [true, 'Start coordintes are required']
  },
  currentLocation: {
    type: coordinates,
    required: [true, 'Current coordintes are required']
  },
  distance: {
    type: Number,
    required: [true, 'Distance is required']
  },
  vechicleImage: {
    type: String,
    required: [true, "Victim's vehicle images is required"]
  }
})

export default new mongoose.model('Stalker', stalkerSchema)
