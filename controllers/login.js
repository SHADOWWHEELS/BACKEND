//Importing the modules
import jwt from 'jsonwebtoken' //JSON WEB TOKEN for generating the access token
import { compare } from 'bcrypt' //for comparing the hashed password with the recieved password
import Users from '../model/Users.js' //importing the user model

const login = async (req, res) => {
  try {
    const { phoneNumber, password } = req.body

    //Validating the phone number
    if (
      phoneNumber === undefined ||
      phoneNumber === null ||
      phoneNumber.trim().length === 0
    )
      return res.status(402).json({ message: 'Phone number is required' })

    if (phoneNumber.trim().length !== 10)
      return res.status(402).json({ message: 'Invalid phone number' })

    //Validating the password
    if (
      password === undefined ||
      password === null ||
      password.trim().length === 0
    )
      return res.status(403).json({ message: 'Password is required' })

    const user = await Users.findOne({ phoneNumber })

    if (!user)
      return res.status(404).json({ message: 'Phone number is not registered' })

    const passwordVerify = await compare(password, user.password)
    if (!passwordVerify)
      return res.status(403).json({ message: 'password is incorrect ' })

    const accessToken = jwt.sign(
      { id: user._id },
      process.env.ACCESS_TOKEN_SECRET
    )
    const { _doc } = user; 

    delete _doc._id
    delete _doc.password

    const data = { ..._doc, accessToken }

    return res.status(200).json(data)
  } catch (error) {
    console.log(`${error}`)
    return res.sendStatus(500)
  }
}

export default login
