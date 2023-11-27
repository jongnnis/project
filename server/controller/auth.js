import * as authRepository from '../data/auth.js'
// import formidable from 'formidable'
import bcrypt from 'bcrypt'
import {config} from '../config.js'
// import jwt from 'jsonwebtoken'

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
    const {name, ssn1, ssn2, phone} = req.body
    const check = await authRepository.sendMessage(code, phone)
    res.status(200).json({code})
}

// 회원가입 /auth/signup
export async function signup(req, res){
    const {userid, userpw, name, ssn1, ssn2, hp} = req.body
    const found = await authRepository.findByUserHp(hp)
    console.log(userpw)
    if (found){
        return res.status(409).json({message: `{hp}로 이미 가입된 아이디가 있습니다`})
    }
    const hashed = await bcrypt.hash(userpw, config.bcrypt.saltRounds)
    console.log(3)
    const users = await authRepository.createUser({
        userid,
        userpw: hashed,
        name,
        ssn1,
        ssn2,
        hp
    })
    res.status(201).json({message:'가입되었습니다.', users})
}

// function createJwtToken(userid){
//     return jwt.sign({userid}, config.jwt.secretKey, {expiresIn:config.jwt.expiresInSec})
// }