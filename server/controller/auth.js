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
    console.log(code)
    const {name, ssn1, ssn2, phone, none} = req.body
    const check = await authRepository.sendMessage(code, phone)
    res.status(200).json({code})
}

// 파일이 저장될 폴더 지정
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, path.join(__dirname, '../uploads')); // 파일이 저장될 폴더 지정
//     },
//     filename: function (req, file, cb) {
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//         const fileExtension = path.extname(file.originalname);
//         cb(null, file.fieldname + '-' + uniqueSuffix + fileExtension);
//     },
// });

// const upload = multer({ storage: storage }); 

// 회원가입 /auth/signup
export async function signup(req, res){
//     // ... (기존 코드)

//     try {
//         // 파일 업로드 처리
//         const uploadMiddleware = upload.single('file'); // 'file'은 form에서 전송된 파일의 필드명
//         uploadMiddleware(req, res, async (err) => {
//             if (err) {
//                 console.error('파일 업로드 중 에러:', err);
//                 return res.status(500).json({ message: 'Internal Server Error' });
//             }

//             // 파일 업로드 성공 시 파일 정보를 데이터베이스에 저장
//             const { userid, userpw, name, ssn1, ssn2, hp } = req.body;
//             const file = req.file; // 업로드된 파일의 정보는 req.file에 있음

//             const found = await authRepository.findByUserHp(hp);

//             if (found) {
//                 return res.status(409).json({ message: `{hp}로 이미 가입된 아이디가 있습니다` });
//             }

//             const hashed = await bcrypt.hash(userpw, config.bcrypt.saltRounds);

//             // 파일 경로나 파일명을 데이터베이스에 저장
//             const users = await authRepository.createUser({
//                 userid,
//                 userpw: hashed,
//                 name,
//                 ssn1,
//                 ssn2,
//                 hp,
//                 filePath: file ? file.path : null, // 파일이 업로드된 경우에만 저장
//             });

//             res.status(201).json({ message: '가입되었습니다.', users });
//         });
//     } catch (error) {
//         console.error('에러 발생', error);
//         res.status(500).json({ message: 'Internal Server Error' });
//     }
// }
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