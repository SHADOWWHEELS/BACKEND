//Importing the modules
import { randomBytes } from "crypto"; //for generating random bytes
import { writeFileSync } from "fs"; //for writing base 64 file to disk
import { fileURLToPath } from "url";
import { join, dirname } from "path"; //Manipulating the paths

//getting the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const generateFilePath = (fileType) => {
    const randomString = randomBytes(32).toString('hex');
    const currentTimeStamp = Date.now();
    
    return join(__dirname, `../uploads/${randomString}createOn=${currentTimeStamp}.${fileType}`)
}


const handleFileUpload = async (req, res, next) => {
    try {
        const { file } = req.body;
        
        const fileBASE64 = file.split(";base64,")[1];
        const fileType = file.split(";base64,")[0].split("/")[1];

        const absoluteFilePath = generateFilePath(fileType);

        writeFileSync(absoluteFilePath, fileBASE64, { encoding: "base64" });

        req.body.filePath = absoluteFilePath;
        next();
    } catch(error) {
        console.log(`${error}`)
        return res.sendStatus(500);
    }
}

export default handleFileUpload;