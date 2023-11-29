import express from 'express'
import {body} from 'express-validator'
import {validate} from '../middleware/validator.js'
import * as authController from '../controller/auth.js'

const router = express.Router()

// 로그인 validate
const validateCredential = [
    body('userid')
        .trim()
        .notEmpty()
        .withMessage('userid는 반드시 입력해야 함'),
    body('userpw')
        .trim()
        .isLength({min:4})
        .withMessage('userpw는 반드시 4자 이상이여야 함'),
    validate
]

// 회원가입 validate
const validateSignup = [
    ...validateCredential,
    body('name').notEmpty().withMessage('name은 반드시 입력'),
    body('ssn1').notEmpty().withMessage('ssn1는 반드시 입력'),
    body('ssn2').notEmpty().withMessage('ssn1는 반드시 입력'),
    body('hp').notEmpty().withMessage('hp는 반드시 입력'),
    validate
]

// 아이디 중복 확인
router.post('/userid_check', authController.useridCheck)
// 본인인증
router.post('/check', authController.check)
// 회원가입
router.post('/signup', authController.signup)

export default router