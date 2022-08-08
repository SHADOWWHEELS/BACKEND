import mongoose from 'mongoose'

const coordinates = new mongoose.Schema({
  latitude: {
    type: String
  },
  longitude: {
    type: String
  }
})

const lastLoginSchema = new mongoose.Schema({
  timestamp: {
    type: Date,
    defaul: Date.now
  },
  location: {
    type: coordinates
  }
})

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    lowercase: true,
    max: [155, 'Name too long'],
    min: [2, 'Name too short'],
    required: [true, 'Name is required'],
    validate: {
      validator: value => /^([a-z]+[ ]*){2,155}$/i.test(value),
      message: props => `${props.value} is not a valid name`
    }
  },
  phoneNumber: {
    type: String,
    trim: true,
    required: [true, 'Phone number is required'],
    unique: [true, 'Phone number already registered'],
    validate: {
      validator: value => /^[0-9]{10}$/.test(value),
      message: props => `${props.value} is not a valid phone number`
    }
  },
  email: {
    type: String,
    trim: true,
    required: [true, 'Email is required'],
    unique: [true, 'Email already registered'],
    validate: {
      validator: value =>
        /^[a-zA-Z0-9_+-]+@[a-z-]{2,15}(\.[a-z]{2,8}){1,2}$/.test(value),
      message: props => `${props.value} is not a valid email`
    }
  },
  registerationNumber: {
    type: String,
    trim: true,
    lowercase: true,
    unique: [true, 'Registeration number already registered'],
    required: [true, 'Registeration number of vehical is required']
  },
  carImage: {
    type: String,
    trim: true,
    required: [true, 'Vehical image is required']
  },
  password: {
    type: String,
    required: [true, 'Password is required']
  },
  lastLogin: {
    type: lastLoginSchema,
  },
  createdOn: {
    type: Date,
    default: Date.now
  }
})

export default new mongoose.model("Users", userSchema);
