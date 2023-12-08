import * as inquiryRepository from '../data/inquiry.js'
import * as authRepository from '../data/auth.js'

// 문의하기 글 생성   /inquiry/write
export async function createInquiry(req, res, next){
    const {category, title, text} = req.body;
    const inquiry = await inquiryRepository.create(category, title, text, req.userId)
    res.status(201).json(inquiry)
}

// 나의 문의하기 내역    /inquiry/
export async function getInquiry(req, res){
    const user = await authRepository.getById(req.userId)
    const inquiry = await inquiryRepository.getAllByUserid(user.userid)
    res.status(200).json(inquiry)
}

// 문의하기 글 수정   /inquiry/update       수정 못하게 하기로함....
// export async function updateInqury(req, res){
//     // 문의하기 _id
//     const id = req.params.id
//     const {category, title, text} = req.body;
//     const update = await inquiryRepository.update(id, category, title, text)
//     res.status(201).json({message: '수정되었습니다', update})
// }