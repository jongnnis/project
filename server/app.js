import express from 'express'
import authRouter from './router/auth.js'
import cors from 'cors'
import morgan from 'morgan'
import { config } from './config.js'
import {sequelize } from './db/database.js';

const app = express()

app.use(morgan("dev"))
app.use(cors())
app.use(express.json())
app.use('/auth', authRouter)

app.use((req,res,next)=>{
    res.sendStatus(404)
})


sequelize.sync().then(()=>{
    const server = app.listen(config.host.port);
})