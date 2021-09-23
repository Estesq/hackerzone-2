const Company = require('../Models/CompanyModel')
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
exports.adminRegister = (req, res) => {
  const { email, password, full_name, phone_number, company, company_size, country, role } = req.body
  let hashpass = bcrypt.hashSync(password, 8)
  Company.create({ email, password: hashpass, full_name, phone_number, company, company_size, country, role }, (err, result) => {
    if (err) res.send({ err: `RegistrationErr: ${err}` })
    else if (result) {
      res.send({ msg: `Registration Successful!` })
    }
    else res.send({ err: 'Something went wrong!' })
  })
}
exports.adminLogin = (req, res) => {
  const { email, password } = req.body
  Company.findOne({ email }, (docerr, doc) => {
    if (docerr) {
      res.json({ err: docerr })
    }
    else if (doc === undefined || doc === null) {
      res.send({ msg: 'Email not registered!' })
    }
    else {
      if (bcrypt.compareSync(password, doc.password)) {
        jwt.sign({
          data: email
        }, authpasskey, { expiresIn: '1h' }, (autherr, authtoken) => {
          if (authtoken) {
            res.status(200).json({ authtoken })
          } else {
            res.json({ err: autherr })
          }
        })
      }
      else {
        res.send({ msg: 'Password doesn\'t match' })
      }
    }
  })
}
exports.adminProfile = (req, res) => {
  const email = req.email
  Company.findOne({ email }, {
    _id: 0,
    full_name: 1,
    email: 1,
    phone_number: 1,
    company: 1,
    company_size: 1,
    country: 1,
    role: 1
  }, (docerr, doc) => {
    if (docerr) {
      res.status(304).send({ err: 'Something went wrong!' })
    }
    else {
      res.status(200).send({ msg: doc })
    }
  })
}



exports.requestCompPassToken = (req, res) => {
  const { email } = req.body
  console.log(req.headers.origin)
  Company.findOne(req.body, (docerr, doc) => {
    if (doc.email) {
      let passtoken = uid(6)
      client.hset(passtoken, doc.email, (rerr, rreply) => {
        console.log(rreply)
        resetPassMail(doc.full_name, doc.email, passtoken, "company", req.headers.origin)
        res.send({ msg: `Check Your email! Further instructions send to your email.` })
      })
    }
    else {
      res.send({ err: "Email not registered!" })
    }
  })

}

exports.resetCompPassword = (req, res) => {
  const { password, passkey } = req.body
  client.get(passkey, (rerr, rreply) => {
    if (rerr) {
      res.send({ msg: "Expired key! Resend Email!" })
    }
    else {
      var hashpass = bcrypt.hashSync(password, 8)
      Company.findOneAndUpdate({ email: rreply }, { password: hashpass }, (docerr, doc) => {
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