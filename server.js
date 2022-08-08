//Importing the modules
import express from 'express' //for creating the APIs
import mongoose from 'mongoose' //for using the mongodb (driver)
import { config } from 'dotenv' //for using the env variables
import { Server } from 'socket.io' //for enabling websockets
import { createServer } from 'http' //for creating the server
import { fileURLToPath } from "url"; //to get file path
import { join, dirname } from "path"; //for manipulating the path
import authRoute from "./routes/auth.js" //import the auth route
import trackingRoute from "./routes/tracking.js" //importing the route

//getting the directory name
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename);

//Enabling the env variables
config()

//Connecting the database
mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log(`Server successfully connected to database`))
  .catch(e => console.log(`${e}`))

//Setting up the server and websockets;
const app = express()
const server = createServer(app)
const io = new Server(server)

//Defining the port on which server works
const port = process.env.PORT || 5000

//Middlewares for expresss -> things which server does after recieving a request and returning a response
app.use(express.json({ limit: "5mb" })) //Allowing only 5 mb of data
app.use("/uploads", express.static(join(__dirname, "/uploads"))) //serving the files on uploads statically
app.use("/api/auth", authRoute); //enabling the auth route
app.use("/api/tracking", trackingRoute); //enabling the tracking route

//Listening to the port
server.listen(port, () => console.log(`Server running at port: ${port}`))
