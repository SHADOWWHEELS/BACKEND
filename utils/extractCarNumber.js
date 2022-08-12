import { spawn } from "child_process"

const extractCarNumber = async (req, res, next) => {
  // try {
    const { filePath } = req.body
    const childPython = spawn("python", ['main.py', filePath]);

    childPython.stdout.on('data', (data) => {
      const registerationNumber = data.toString().trim().replace(/ /g, "").replace(/[^a-zA-Z0-9]/, "")
        req.body.registerationNumber = registerationNumber;
        next();
    })

    childPython.stderr.on('data', (error) => {
        console.log(`${error}`);
        return res.sendStatus(500);
    })
    
  // } catch (error) {
  //   console.log(`${error}`)
  //   return res.sendStatus(500)
  // }
}

export default extractCarNumber
