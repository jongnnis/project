import { config } from '../config.js'
import express from 'express'
import coolsms from 'coolsms-node-sdk'

export async function check(code, phone){
    const mysms = coolsms.default;

    const apiKey = config.sms.apiKey
    const apiSecret = config.sms.apiSecret
    const fromNum = config.sms.fromNum
    console.log(code)
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