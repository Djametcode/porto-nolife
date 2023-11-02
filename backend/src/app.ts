import 'dotenv/config'
import cors from 'cors'
import express, { Response, response } from 'express'
const app = express();

//database connect
import { connectDB } from './db/connectDB';
import { authRouter } from './route/authRoute';

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false, limit: 10000000 }))
app.use('/api/v17/no-life', authRouter)

const startServer = async () => {
    try {
        await connectDB(process.env.MONGO_URL)
        app.listen(3000, () => console.log("Sever running"))
    } catch (error) {
        console.log(error)
    }
}

startServer()
