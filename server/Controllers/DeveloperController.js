const Developer = require('../Models/DeveloperModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const chalk = require('chalk');
const { uid } = require('rand-token')
const resetPassMail = require('../functions/resetPassMail');
const authpasskey = process.env.AUTH_PASS_KEY
var redis = require('redis');
var retryStrategy = require("node-redis-retry-strategy");

var client = redis.createClient({
  host: 'redis.acme.com',
  username: process.env.REDIS_DB,
  password: process.env.REDIS_PASSWORD,
  url: process.env.REDIS_URL,
  retry_strategy: retryStrategy({
    number_of_retry_attempts: 20,
    wait_time: 600000,
    delay_of_retry_attempts: 1000
  })
});
client.on('connect', function () {
  console.log(`Redis: ${chalk.bold.green("connected")}`);
});
exports.userRegister = (req, res) => {
  const { full_name, email, password } = req.body
  var hashpass = bcrypt.hashSync(password, 8)
  Developer.create({ full_name, email, password: hashpass }, (err, result) => {
    if (err) res.send({ err: `RegistrationErr: ${err}` })
    else if (result) {
      res.send({ msg: `Registration Successful!` })
    }
    else res.send({ err: 'Something went wrong!' })
  })
}
exports.userLogin = (req, res) => {
  const { email, password } = req.body
  Developer.findOne({ email }, (docerr, doc) => {
    if (docerr) {
      res.json({ err: docerr })
    }
    else if (doc === null || doc === undefined) {
      res.send({ err: 'Email not registered!' })
    }
    else {
      if (bcrypt.compareSync(password, doc.password)) {
        jwt.sign({
          data: email
        }, authpasskey, { expiresIn: '24h' }, (autherr, authtoken) => {
          if (authtoken) {
            res.status(200).json({ authtoken })
          } else {
            res.json({ err: autherr })
          }
        })
      }
      else {
        res.send({ err: 'Password doesn\'t match' })
      }
    }
  })
}
exports.userProfile = (req, res) => {
  const email = req.email
  Developer.findOne({ email }, { _id: 0, full_name: 1, email: 1 }, (docerr, doc) => {
    if (docerr) {
      res.status(304).send({ err: 'Something went wrong!' })
    }
    else {
      res.status(200).send({ msg: doc })
    }
  })
}
exports.requestDevPassToken = (req, res) => {
  const { email } = req.body
  console.log(req.headers.origin)
  Developer.findOne(req.body, (docerr, doc) => {
    if (doc.email) {
      let passtoken = uid(6)
      client.set(passtoken, doc.email, (rerr, rreply) => {
        console.log(rreply)
        resetPassMail(doc.full_name, doc.email, passtoken, "developer", req.headers.origin)
        res.send({ msg: `Check Your email! Further instructions send to your email.` })
      })
    }
    else {
      res.send({ err: "Email not registered!" })
    }
  })

}
exports.resetDevPassword = (req, res) => {
  const { password, passkey } = req.body
  client.get(passkey, (rerr, rreply) => {
    if (rerr) {
      res.send({ msg: "Expired key! Resend Email!" })
    }
    else {
      var hashpass = bcrypt.hashSync(password, 8)
      Developer.findOneAndUpdate({ email: rreply }, { password: hashpass }, (docerr, doc) => {
        if (docerr) {
          res.send("Something Went wrong")
        }
        else {
          console.log("doc", doc)
          res.send({ msg: "Password changed Successfully!" })
        }
      })
    }
  })
}