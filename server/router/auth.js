import express from 'express'
import * as authController from '../controller/auth.js'

const router = express.Router()

// 아이디 중복 확인
router.post('/userid_check', authController.useridCheck)
// 본인인증
router.post('/check', authController.check)
// 회원가입
router.post('/signup', authController.signup)

export default router