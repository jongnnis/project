import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import authRouter from './router/auth.js'
import inquiryRouter from './router/inquiry.js'
import reportRouter from './router/report.js'
import { config } from './config.js'
import { connectDB } from './db/database.js';

const app = express()

app.use('/uploads', express.static('uploads'))
app.use(morgan("dev"))
app.use(cors())
app.use(express.json())
app.use('/auth', authRouter)
app.use('/inquiry', inquiryRouter)
app.use('/report', reportRouter)

app.use((req,res,next)=>{
    res.sendStatus(404)
})

// DB연결
connectDB().then(db=>{
    console.log('init!')
    const server=app.listen(config.host.port)
    // initSocket(server)  //나중에 할거
}).catch(console.error)
