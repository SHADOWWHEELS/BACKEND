//Importing modules
import mongoose from 'mongoose' //for checking the Object Id
import Users from '../model/Users.js' //importing the schema

const loadUser = async (req, res) => {
  try {
    const { id } = req.body

    //Checking if id is forwarded
    if (!id) return res.status(403).json({ message: 'Not Allowed' })

    //Checking if id is valid Object Id
    if (!mongoose.isValidObjectId(id))
      return res.status(403).json({ message: 'Not Allowed' })

    //Searching if it exists in database
    const user = await Users.findById(id)

    //If not return back an error
    if (!user) return res.status(403).json({ message: 'Not Allowed' })

    const { _doc } = user

    //Deleting id and password from response object
    delete _doc._id
    delete _doc.password

    //Sending back response
    return res.status(200).json(_doc)
  } catch (error) {
    console.log(`${error}`)
    return res.sendStatus(500)
  }
}

export default loadUser
