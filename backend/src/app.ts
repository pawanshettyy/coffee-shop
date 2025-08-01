import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import teamRoutes from './routes/team'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/team', teamRoutes)

mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => console.log('🛢️ MongoDB connected'))
  .catch((err) => console.error('MongoDB error:', err))

export default app
