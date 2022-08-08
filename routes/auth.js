//Importing the modules
import { Router } from 'express' //importing the Router
import login from "../controllers/login.js"; //Controller for login
import register from "../controllers/register.js"; //Controller for register
import handleFileUpload from '../Middleware/handleFileUpload.js'; //handling file upload
const route = Router()

route.post('/register', handleFileUpload, register); //register route
route.post('/login', login); //login route

export default route
