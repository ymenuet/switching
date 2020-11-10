import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import connectDB from './config/db.js'
import formationRoutes from './routes/formationRoutes.js'
// import { errorMonitor } from 'nodemailer/lib/mailer'

dotenv.config()

connectDB()

const app = express()

app.get('/', (req, res) => {
  res.send('API running')
})

app.use('/api/formations', formationRoutes)

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(
    `server running in ${process.env.NODE_ENV} on port ${PORT}`.yellow.bold
  )
)
