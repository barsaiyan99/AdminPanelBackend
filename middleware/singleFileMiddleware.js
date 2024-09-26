import multer from 'multer';
import  storage  from '../cloudConfig.js'; 

export default function singleFileMiddleware(fileName) {
  const upload = multer({ storage });
  return upload.single(fileName);
}
