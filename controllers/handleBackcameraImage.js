import Stalkers from "../model/Stalkers.js"

const handleBackcameraImage = async (req, res) => {
  try {
    const { id, filePath, registerationNumber, geoCoordinates } = req.body

    console.log({ id, filePath, registerationNumber, geoCoordinates })
  } catch (error) {
    console.log(`${error}`)
    return res.sendStatus(500)
  }
}

export default handleBackcameraImage
