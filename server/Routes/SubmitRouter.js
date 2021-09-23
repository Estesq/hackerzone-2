const { submitScript, challengeResults, contestResults } = require('../Controllers/SubmitController')
const authverify = require('../functions/authverify')

const SubmitRouter = require('express').Router()

SubmitRouter.post('/challenge_results', authverify, challengeResults)
SubmitRouter.post('/contest_results', authverify, contestResults)
SubmitRouter.post('/script', authverify, submitScript)

module.exports = SubmitRouter
