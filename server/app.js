import express from 'express'
import registRouter from './router/regist.js'
import cors from 'cors'
import morgan from 'morgan'

const app = express()

app.use(morgan("dev"))
app.use(cors())
app.use(express.json())
app.use('/regist', registRouter)

app.use((req,res,next)=>{
    res.sendStatus(404)
})


app.listen(8080, ()=>{
    console.log('서버가 실행중입니다.')
})