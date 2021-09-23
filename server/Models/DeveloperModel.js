const mongoose = require('mongoose')

const Schema = mongoose.Schema

const DeveloperSchema = new Schema({
  full_name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isActive: { type: Boolean, default: false },
}, { timestamps: true })

const DeveloperModel = mongoose.model('developer', DeveloperSchema)

module.exports = DeveloperModel