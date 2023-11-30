import multer from 'multer'      // 파일업로드 할때 사용
import path from 'path'

export const upload = multer({ storage: storage });