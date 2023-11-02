import express from 'express'
import { registUser } from '../controller/authController'
const route = express.Router()

route.post('/regist-user', registUser)

export const authRouter = route