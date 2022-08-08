import { Router } from "express"; //Importing router to create routes
import handleFileUpload from "../Middleware/handleFileUpload.js"; //MiddleWare to handle file upload
import extractCarNumber from "../Utils/extractCarNumber.js"; //Utility for image processing
import handleBackcameraImage from "../controllers/handleBackcameraImage.js" // Controller for detecting stalking and sending the notification
const route = Router(); //Initializing the route

route.post('/backcamera-image', handleFileUpload, extractCarNumber, handleBackcameraImage); //Route for getting the back camera images

export default route;