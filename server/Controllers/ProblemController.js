const Problem = require('../Models/ProblemModel')
var tmp = require('tmp');
var fs = require('fs');
const scriptExecutor = require('../functions/scriptExecutor');

exports.add = (req, res) => {
  let { email } = req
  Problem.create({ ...req.body, createdBy: email }, (err, result) => {
    if (err) res.send(err)
    res.send(result)
  })
}
exports.list = (req, res) => {
  let limit = req.query.page ? parseInt(req.query.page) * 10 + 10 : 10
  let skip = req.query.page ? parseInt(req.query.page) * 10 : 0
  Problem.find().skip(skip).limit(limit).exec((err, result) => {
    if (err) res.send(err)
    res.send(result)
  })
}

exports.adminChallenges = (req, res) => {
  Problem.find({ createdBy: req.email }, (err, result) => {
    if (err) res.status(500).send(err)
    else res.status(200).send(result)
  })
}

exports.single = (req, res) => {
  let { name } = req.params
  Problem.findOne({ name }, (err, result) => {
    if (err) res.send(err)
    res.send(result)
  })
}
exports.run = (req, res) => {
  let { language, code, samples } = req.body
  let ext = language === "python" ? ".py" : language === "javascript" ? ".js" : null
  let command = language === "python" ? "python" : language === "javascript" ? "node" : null
  var output = new Array()
  var output_error = ''
  var passed = 0
  var failed = samples.length

  tmp.file({ prefix: 'projectA-', postfix: ext, keep: true }, function (ferr, path, fd, cleanupCallback) {
    if (ferr) {
      res.status(400).send({ msg: `FileCreationErr: ${ferr}` });
    }
    else {
      fs.writeFileSync(path, code)
      for (i = 0; i < samples.length; i++) {

        let response = scriptExecutor(command, path, samples[i].sample_input)
        if (response.message) {
          let status = response.message === samples[i].sample_output
          if (status) {
            passed++
            failed--
          }
          response = {
            ...response,
            status,
            input: samples[i].sample_input,
            expected: samples[i].sample_output,
            output: response.message
          }
          output.push(response)
        }
        else {
          output_error = response.error
        }
      }
      if (output_error != '') {
        //let msg1 = output_error.split(path.substring(0, path.length - 3)).join("Solution");
        res.send({ error: output_error })
      }
      else {
        res.send({ output, passed, failed })
      }
    }
    cleanupCallback()
  });
}
exports.compile = (req, res) => {
  let { language, code, input } = req.body
  let ext = language === "python" ? ".py" : language === "javascript" ? ".js" : null
  let command = language === "python" ? "python" : language === "javascript" ? "node" : null
  tmp.file({ prefix: 'projectA-', postfix: ext, keep: true }, function (ferr, path, fd, cleanupCallback) {
    if (ferr) {
      res.status(400).send({ msg: `FileCreationErr: ${ferr}` });
    }
    else {
      console.log(path, fd)
      fs.writeFileSync(path, code)
      let response = scriptExecutor(command, path, input)
      res.send(response)
    }
    cleanupCallback()
  })
}