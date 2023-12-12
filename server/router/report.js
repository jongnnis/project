import express from 'express'
import * as reportController from '../controller/report.js'
import {body} from 'express-validator'
import {validate} from '../middleware/validator.js'
import {isAuth} from '../middleware/auth.js';

const router = express.Router()

const validateReport = [
    body('location')
        .trim()
        .notEmpty()
        .withMessage('location은 반드시 입력해야 함'),
    body('text')
        .trim()
        .notEmpty()
        .withMessage('text는 반드시 입력해야 함'),
    validate
]

// 불편신고 글 생성
router.post('/write', isAuth, reportController.upload.single('file'), validateReport, reportController.createreport)

// 불편신고 데이터 불러오기 (관리자 페이지)
router.get('/all', reportController.ViewReport )   // isAuth,

// 불편신고 데이터 신고완료
router.put('/check/:id',reportController.DoneReport)

export default router