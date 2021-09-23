
var tmp = require('tmp');
var fs = require('fs');
const scriptExecutor = require('../functions/scriptExecutor');
const Submit = require('../Models/SubmitModel');
const Rank = require('../Models/RankModel');

exports.submitScript = (req, res) => {
  let user = req.email
  let { language, script, contest, challenge, test_cases, points } = req.body
  let ext = language === "python" ? ".py" : language === "javascript" ? ".js" : null
  let command = language === "python" ? "python" : language === "javascript" ? "node" : null

  tmp.file({ prefix: 'projectA-', postfix: ext, keep: true }, function (ferr, path, fd, cleanupCallback) {
    var passed = 0
    var test_result = new Array;
    if (ferr) {
      cleanupCallback()
      res.status(400).send({ msg: `FileCreationErr: ${ferr}` });
    }
    else {
      fs.writeFileSync(path, script)
      for (i = 0; i < test_cases.length; i++) {
        let response = scriptExecutor(command, path, test_cases[i].test_input)
        if (response.message) {
          let output_status = response.message === test_cases[i].test_output
          test_result.push(output_status)
          if (output_status) {
            passed++;
          }
        }
        else {
          test_result.push(false)
        }
      }
      let chances = passed / test_cases.length
      let percent = chances * 100
      let score = points * chances
      let status = score === points ? "Accepted" : "Wrong Answer"
      cleanupCallback()
      Submit.create({ contest, challenge, user, score, status, test_result, script }, (sdocerr, sdoc) => {
        if (sdocerr) {
          res.status(400).send({ msg: `SubmitErr: ${sdocerr}` })
        }
        else {
          Rank.findOneAndUpdate(
            { contest, challenge, user },
            { score, percent },
            {
              new: true,
              upsert: true,
              rawResult: true
            }, (rdocerr, rdoc) => {
              if (rdocerr) {
                res.status(400).send({ msg: `RankErr: ${rdocerr}` })
              }
              else {
                res.status(200).send({ Rank: rdoc, Submit: sdoc })
              }
            })
        }
      })
    }
  });
}

exports.challengeResults = (req, res) => {
  let user = req.email
  let { contest, challenge } = req.body
  Submit.find({ contest, challenge, user }, (err, result) => {
    if (err) {
      res.status(400).send({ msg: `SubmitErr: ${err}` })
    }
    else {
      res.status(200).send(result)
    }
  })
}
exports.contestResults = (req, res) => {
  let user = req.email
  let { contest } = req.body
  Submit.find({ contest, user }, (err, result) => {
    if (err) {
      res.status(400).send({ msg: `SubmitErr: ${err}` })
    }
    else {
      res.status(200).send(result)
    }
  })
}