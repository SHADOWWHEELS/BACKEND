//Importing modules 
import { genSalt, hash } from 'bcrypt' //for encrypting the password
import { basename } from 'path' //for path manipulations
import jwt from 'jsonwebtoken' //JSON WEB TOKEN for generating the access token
import Users from '../model/Users.js' //importing the user model

const register = async (req, res) => {
  try {
    const {
      name,
      phoneNumber,
      email,
      registerationNumber,
      filePath,
      password
    } = req.body

    //Validation for name
    if (name === undefined || name === null || name.trim().length === 0)
      return res.status(400).json({ message: 'Name is required ' })
    if (!/^([a-z]+[ ]*){2,155}$/i.test(name))
      return res.status(400).json({ message: 'Invalid name' })

    //Validation for phone number
    if (
      phoneNumber === undefined ||
      phoneNumber === null ||
      phoneNumber.trim().length === 0
    )
      return res.status(400).json({ message: 'Phone number is required ' })
    if (!/^[0-9]{10}$/.test(phoneNumber))
      return res.status(400).json({ message: 'Invalid phone number' })

    //Validation for email
    if (email === undefined || email === null || email.trim().length === 0)
      return res.status(400).json({ message: 'Email is required ' })
    if (!/^[a-zA-Z0-9_+-]+@[a-z-]{2,15}(\.[a-z]{2,8}){1,2}$/.test(email))
      return res.status(400).json({ message: 'Invalid email' })

    //Validation for registeration plate
    if (
      registerationNumber === undefined ||
      registerationNumber === null ||
      registerationNumber.trim().length === 0
    )
      return res.status(400).json({ message: 'Registeration number is required ' })

    //Validation for password
    if (
      password === undefined ||
      password === null ||
      password.trim().length === 0
    )
      return res.status(400).json({ message: 'Password is requied ' })
    if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[ !"#$%&'()*+,-.\/:;<=>?@[\]^_`{|}~])(?=^.{8,16}$).*$/.test(
        password
      )
    )
      return res.status(400).json({ message: 'Password is weak' })

    //Checking if phone number exists
    const phoneNumberCount = await Users.find({ phoneNumber }).countDocuments()
    if (phoneNumberCount > 0)
      return res
        .status(409)
        .json({ message: 'Phone number already already exists' })

    //Checking if email exists
    const emailCount = await Users.find({ email }).countDocuments()
    if (emailCount > 0)
      return res.status(409).json({ message: 'Email already exists ' })

    //Checking if registeration number exists
    const registerationNumberCount = await Users.find({
      registerationNumber
    }).countDocuments()
    if (registerationNumberCount > 0)
      return res
        .status(409)
        .json({ message: 'Registeration number already exists' })

    //Encrypting the password
    const salt = await genSalt(10)
    const hashedPassword = await hash(password, salt)

    //Setting the image url
    const imageURL = `${req.protocol}://${req.hostname}:${process.env.PORT}/uploads/${basename(
      filePath
    )}`

    //Saving the user
    const user = Users({
      name,
      phoneNumber,
      email,
      registerationNumber,
      password: hashedPassword,
      carImage: imageURL
    })
    const { _doc } = await user.save();
    
    //Generating the access token
    const accessToken = jwt.sign({ id: _doc._id }, process.env.ACCESS_TOKEN_SECRET);

    //Deleting the hash password feild in the saved object
    delete _doc.password;

    const data = { ..._doc, accessToken }

    //Sending back the saved object
    res.status(201).json({
      message: 'Account successfully created',
      data
    })
  } catch (error) {
    console.log(`${error}`)
    return res.sendStatus(500)
  }
}

export default register
