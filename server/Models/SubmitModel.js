const mongoose = require('mongoose')

const Schema = mongoose.Schema

const SubmitSchema = new Schema({
  contest: { type: String, required: true },
  challenge: { type: String, required: true },
  user: { type: String, required: true },
  score: { type: Number, required: true },
  status: { type: String, required: true },
  test_result: { type: Array, required: true },
  script: { type: String, required: true }
}, { timestamps: true })

const SubmitModel = mongoose.model('submit', SubmitSchema)

module.exports = SubmitModel