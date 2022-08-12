//Imporing modules
import jwt from 'jsonwebtoken' //for verifying the jwt recieved

const authorization = (req, res, next) => {
  try {
    const authToken = req.headers.authorization //Getting the auth header

    if (!authToken) return res.status(403).json({ message: 'Not Allowed' })

    const accessToken = authToken.split(' ')[1]; //extracting the accessToken

    const { id } = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET) //Verifying if it is valid

    if (!id) return res.status(403).json({ message: 'Not Allowed' }) //If not send back an error

    req.body.id = id //Attaching the id back to request body
    next()
  } catch (error) {
    console.log(`${error}`)
    return res.sendStatus(500)
  }
}

export default authorization
