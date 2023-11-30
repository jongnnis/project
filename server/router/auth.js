import express from 'express'
import {body} from 'express-validator'
import {validate} from '../middleware/validator.js'
import * as authController from '../controller/auth.js'
import multer from 'multer'      // 파일업로드 할때 사용
import path from 'path'

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

// multer 설정
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'uploads/');
//     },
//     filename: function (req, file, cb) {
//         // 파일명을 userid로 설정
//         console.log(req.body)
//         const userid = req.body.userid || 'unknown_user';
//         cb(null, userid + path.extname(file.originalname));
//     },
// });

// const upload = multer({ storage: storage });

// 아이디 중복 확인
router.post('/userid_check', authController.useridCheck)
// 본인인증
router.post('/check', authController.check)
// 회원가입
router.post('/signup', authController.upload.single('file'), authController.signup)

// 파일받기 test
router.post('/test', authController.upload.single('file'), authController.testFile)

export default router