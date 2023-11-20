import * as registRepository from '../data/regist.js'

// 
function randomNumber(){
    const min = 100000
    const max = 999999
    return Math.floor(Math.random()*(max - min +1) + min)
}

export async function sendMessage(req, res, next){
    console.log(2)
    const code = randomNumber()
    const {name, ssn1, ssn2, phone} = req.body
    const check = await registRepository.check(code, phone)
    res.status(200).json({code})
}