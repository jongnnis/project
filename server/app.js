import express from 'express'
import authRouter from './router/auth.js'
import cors from 'cors'
import morgan from 'morgan'
import { config } from './config.js'

const app = express()

app.use(morgan("dev"))
app.use(cors())
app.use(express.json())
app.use('/auth', authRouter)

app.use((req,res,next)=>{
    res.sendStatus(404)
})


app.listen(config.host.port, ()=>{
    console.log('서버가 실행중입니다.')
})