import { config } from '../config.js'
import express from 'express'
import coolsms from 'coolsms-node-sdk'
import SQ from 'sequelize'
import { sequelize } from '../db/database.js'

const DataTypes = SQ.DataTypes;

export const user_info = sequelize.define(   
    'user',
    {
        userid: {
            type: DataTypes.STRING(50),
            allowNull: false,
            primaryKey: true
        },
        userpw: {
            type: DataTypes.STRING(128),
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        ssn1: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        ssn2: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        hp: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
    },
    {timestamps: false}
)


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

// 중복 아이디 확인
export async function findByUserId(userid){
    return user_info.findOne({where: {userid}})
}

// 핸드폰 번호로 회원찾기
export async function findByUserHp(hp){
    return user_info.findOne({where: {hp}})
}

// 회원 생성
export async function createUser(user){
    return user_info.create(user).then((data)=> data.dataValues.userid);
}