import mongoose from 'mongoose'

const TeamSchema = new mongoose.Schema({
  name: String,
  image: String,
})

export default mongoose.model('Team', TeamSchema)
