import MongoDb from 'mongodb'
import express from 'express'
import { config } from '../config.js'
import coolsms from 'coolsms-node-sdk'
import { getUsers } from '../db/database.js'

const ObjectID = MongoDb.ObjectId

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

// 아이디 중복 확인
export async function findByUserid(userid){
    return getUsers().find({userid}).next().then(mapOptionalUser)
}

// 핸드폰 번호로 회원찾기
export async function findByUserHp(hp){
    return getUsers().find({hp}).next().then(mapOptionalUser)
}

// 회원 생성
export async function createUser(user){
    return getUsers().insertOne(user)
    // .then((result)=> result.insertedId.toString())
}

// _id로 회원정보 불러오기
export async function getById(id){
    return getUsers()
        .find({_id: new ObjectID(id)})
        .next()
        .then(mapOptionalUser)
}

// 새로운 비밀번호 설정
export async function updatePW(id, new_hashed){
    return getUsers().findOneAndUpdate(
        {_id: new ObjectID(id)},
        {$set: {userpw: new_hashed}},
        {returnDocument: "after"}
    )
    .then((result)=>result)
    .then(mapOptionalUser)
}

// MongoDb에 저장되어있는 찾은 유저의 정보 _id값도 가져오기
function mapOptionalUser(user){
    return user ? { ...user, id: user._id.toString()} : user;
}

