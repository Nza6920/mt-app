import passport from 'koa-passport'
import LocalStrategy from 'passport-local'
import UserModel from '../../dbs/models/users'

passport.use(new LocalStrategy(async function (username, password, done) {
  let where = {
    username
  };
  let res = await UserModel.findOne(where)
  if (res != null) {
    if (res.password === password) {
      return done(null, res);
    } else {
      return done(null, false, '密码错误')
    }
  } else {
    return done(null, false, '用户不存在')
  }
}))

// 写入cookie
passport.serializeUser(function (user, done) {
  done(null, user)
})

// 读出cookie
passport.deserializeUser(function (user, done) {
  return done(null, user)
})

export default passport
