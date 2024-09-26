import jwt from 'jsonwebtoken'
const generateToken = (user) => {
  return jwt.sign({ id:user._id,email:user.email }, process.env.KEY, { expiresIn: '4h' })
}

export default generateToken
  