import express from 'express'
import Team from '../models/Team'

const router = express.Router()

router.get('/', async (req, res) => {
  const members = await Team.find()
  res.json(members)
})

router.post('/', async (req, res) => {
  const { name, image } = req.body
  const member = new Team({ name, image })
  await member.save()
  res.status(201).json(member)
})

export default router
