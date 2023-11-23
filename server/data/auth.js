import { config } from '../config.js'
import express from 'express'
import coolsms from 'coolsms-node-sdk'

// DB 하기 전 연습용
let users = [
    {
        userid:"apple",
        userpw: '1234',
        name: '김사과',
        ssn1: '000608',
        ssn2: '1234567',
        hp: '01011112222'
    }
]

// 본인인증 메세지 보내기
export async function sendMessage(code, phone){
    const mysms = coolsms.default;

    const apiKey = config.sms.apiKey        // api 인증키
    const apiSecret = config.sms.apiSecret  // api 인증비번
    const fromNum = config.sms.fromNum      // 발신번호
    console.log(code)
    // coolsms 문자 보내는 코드
    const messageService = new mysms(apiKey, apiSecret);

    const params = {
        "text": `[이동의 꿈] 본인확인 인증번호[${code}]입니다. "타인 노출 금지"`,   // 문자 내용
        "to": phone,        // 수신번호 (받는이)
        "from": fromNum     // 발신번호 (보내는이)
    }
    messageService.sendOne(params)
    .then(res => console.log(res))
    .catch(err => console.error(err))
}

// 아이디로 회원찾기
export async function findByUserid(hp){
    const test = users.find((user)=> user.hp === hp)
    console.log(test)
    return test
}

// 회원 생성
export async function createUser(user){
    users.push(user)
    return users
}