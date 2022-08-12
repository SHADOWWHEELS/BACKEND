//Importing the modules
import { Router } from 'express' //importing the Router
import login from '../controllers/login.js' //Controller for login
import authorization from '../Middleware/authorization.js' //middleware for validating jwt
import register from '../controllers/register.js' //Controller for register
import loadUser from '../controllers/loadUser.js' //Controller for loading the user
import handleFileUpload from '../Middleware/handleFileUpload.js' //handling file upload
const route = Router()

route.post('/register', handleFileUpload, register) //register route
route.post('/login', login) //login route
route.get('/load-user', authorization, loadUser) //load user route

export default route
