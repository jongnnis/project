import express from 'express'
import * as registController from '../controller/regist.js'

const router = express.Router()

router.post('/check', registController.sendMessage)
console.log(1)

export default router