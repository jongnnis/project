import * as authRepository from '../data/auth.js'

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
    const {userid, password, name, ssn1, ssn2, hp} = req.body
    const found = await authRepository.findByUserid(hp)
    if (found){
        return res.status(409).json({message: `{hp}로 이미 가입된 아이디가 있습니다`})
    }
    const user = {
        userid,
        password,
        name,
        ssn1,
        ssn2,
        hp
    }
    const users = await authRepository.createUser(user)
    res.status(201).json({message:'가입되었습니다.', users})
}