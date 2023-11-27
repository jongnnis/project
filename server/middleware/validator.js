// import { validationResult } from "express-validator";

// export const validate = (req, res, next)=>{
//     const errors = validationResult(req)
//     if (errors.isEmpty()){
//         return next()
//     }
//     return res.status(400).json({message: errors.array()[0].msg})
// }

// 회원가입에서 validate 할 필요 없을 듯