import * as authRepository from '../data/auth.js'
// import formidable from 'formidable'
import bcrypt from 'bcrypt'
import {config} from '../config.js'
// import jwt from 'jsonwebtoken'
import multer from 'multer'      // 파일업로드 할때 사용
import path from 'path'

// 아이디 중복확인 함수 /auth/userid_check
export async function useridCheck(req, res){
    console.log(4)
    const userid = req.body
    console.log(userid.userid)
    const found = await authRepository.findByUserId(userid.userid)
    if (found){
        return res.status(409).json({message: '이 아이디로 등록된 계정이 이미 있습니다'})
    } else{
        return res.status(201).json({message: '사용가능한 아이디 입니다'})
    }
}

// 
function randomNumber(){
    const min = 100000
    const max = 999999
    return Math.floor(Math.random()*(max - min +1) + min)
}

// 본인인증 함수 /auth/check
export async function check(req, res, next){
    console.log(2)
    const code = randomNumber()
    console.log(code)
    const {name, ssn1, ssn2, phone, none} = req.body
    const check = await authRepository.sendMessage(code, phone)
    res.status(200).json({code})
}


// 회원가입 /auth/signup
export async function signup(req, res){
    const {userid, userpw, name, ssn1, ssn2, hp} = req.body
    const found = await authRepository.findByUserHp(hp)
    if (found){
        return res.status(409).json({message: `{hp}로 이미 가입된 아이디가 있습니다`})
    }
    const hashed = await bcrypt.hash(userpw, config.bcrypt.saltRounds)
    const users = await authRepository.createUser({
        userid,
        userpw: hashed,
        name,
        ssn1,
        ssn2,
        hp,
        img: `../uploads/${filename}`
    })
    res.status(201).json({message:'가입되었습니다.', users})
}

let filename

// 파일이 저장될 폴더 설정
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './/uploads/'); 
    },
    filename: function (req, file, cb) {
        filename = Date.now() + path.extname(file.originalname)
      cb(null, filename); // 파일명을 고유하게 설정
    },
  });
// 미들웨어 설정
export const upload = multer({ storage: storage });

// /auth/test
export async function testFile(req, res){
    try {
        console.log(filename)
        // 파일이 성공적으로 업로드되었을 때의 처리
        console.log('파일 업로드 성공');
        res.status(200).json({ message: '파일 업로드 성공' });
      } catch (error) {
        // 오류 발생 시 처리
        console.error('파일 업로드 실패', error);
        res.status(500).json({ message: '파일 업로드 실패' });
      }
}

// 나중에 토큰할거
// function createJwtToken(userid){
//     return jwt.sign({userid}, config.jwt.secretKey, {expiresIn:config.jwt.expiresInSec})
// }