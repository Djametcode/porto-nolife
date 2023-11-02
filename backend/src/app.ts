import 'dotenv/config'
import express, { Response, response } from 'express'
const app = express();

//database connect
import { connectDB } from './db/connectDB';

app.get('/', (res: Response) => {
    res.status(200).json("Hello")
})

const startServer = async () => {
    try {
        await connectDB(process.env.MONGO_URL)
        app.listen(3000, () => console.log("Sever running"))
    } catch (error) {
        console.log(error)
    }
}

startServer()
