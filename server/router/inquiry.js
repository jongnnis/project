import express from 'express'
import * as inquiryController from '../controller/inquiry.js'
import {isAuth} from '../middleware/auth.js';

const router = express.Router()

// 고객문의 글 생성
router.post('/write', isAuth, inquiryController.createInquiry)
// 자신이 쓴 문의하기 글 보기
router.get('/myInquiry', isAuth, inquiryController.getInquiry)
// 문의하기 글 수정     수정 못하게 하기로함....
// router.put('/update/:id', isAuth, inquiryController.updateInqury)
// 문의하기 글 삭제
// router.delete('')
// -------------
// 관리자 페이지 - 문의하기 답변 예정


export default router