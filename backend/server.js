import express from 'express'
import dotenv from 'dotenv'
import path from 'path'
import https from 'https'
import colors from 'colors'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import connectDB from './config/db.js'
import formationRoutes from './routes/formationRoutes.js'
import userRoutes from './routes/userRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import emailRoutes from './routes/emailRoutes.js'
import paymentRoutes from './routes/paymentRoutes.js'
// import { fdatasync } from 'fs'
import fs from 'fs'
import { ok } from 'assert'
// import { errorMonitor } from 'nodemailer/lib/mailer'
const __dirname = path.resolve()

dotenv.config({ path: '../.env' })

connectDB()

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
  res.send('API running securely')
})

const sslServer = https.createServer(
  {
    key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem')),
  },
  app
)

// to provent CORS Error — Access-Control-Allow-Origin
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  )
  next()
})

app.use('/api/formations', formationRoutes)
app.use('/api/upload', uploadRoutes)
app.use('/api/users', userRoutes)
app.use('/api/email', emailRoutes)
app.use('/api/payments', paymentRoutes)
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

app.use(notFound)
app.use(errorHandler)

// const PORT = process.env.PORT || 5050

// app.listen(
//   PORT,
//   console.log(
//     `server running in ${process.env.NODE_ENV} on port ${PORT}`.yellow.bold
//   )
// )

sslServer.listen(5050, () => console.log('Hello from SSL server'))
