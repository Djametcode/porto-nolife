import 'dotenv/config'
import { v2 as cloudinary } from 'cloudinary'
import cors from 'cors'
import express, { Response, response } from 'express'
const app = express();

//database connect
import { connectDB } from './db/connectDB';
import { authRouter } from './route/authRoute';
import { postRouter } from './route/postRoute';

cloudinary.config({
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
    cloud_name: process.env.CLOUD_NAME
})

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/api/v17/no-life/auth', authRouter)
app.use('/api/v17/no-life/post', postRouter)

const startServer = async () => {
    try {
        await connectDB(process.env.MONGO_URL)
        app.listen(3000, () => console.log("Sever running"))
    } catch (error) {
        console.log(error)
    }
}

startServer()
