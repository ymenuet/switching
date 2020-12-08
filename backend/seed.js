import dotenv from 'dotenv'
import colors from 'colors'
import users from './data/users.js'
import formations from './data/formations.js'
import User from './models/User.js'
import Formation from './models/Formation.js'
import Video from './models/Video.js'
import Order from './models/Order.js'
import connectDB from './config/db.js'

dotenv.config()

connectDB()

const importData = async (doNotExit = false) => {
  try {
    await Video.deleteMany()
    await Formation.deleteMany()
    await Order.deleteMany()
    const createdUsers = await User.insertMany(users)
    const adminUser = createdUsers[0]._id
    const sampleFormations = formations.map((formation) => {
      return { ...formation, user: adminUser }
    })
    await Formation.insertMany(sampleFormations)
    console.log('Data imported!'.green.inverse)
    process.exit(0)
  } catch (err) {
    console.log(`Error: ${err.message}`.red.inverse)
    process.exit(1)
  }
}

const destroyData = async (doNotExit = false) => {
  try {
    await Video.deleteMany()
    await Formation.deleteMany()
    await Order.deleteMany()
    await User.deleteMany()

    console.log('Data destroyed!'.blue.inverse)
    if (!doNotExit) {
      process.exit(0)
    }
  } catch (error) {
    console.log(`Error: ${err.message}`.red.inverse)
    process.exit(1)
  }
}

if (process.argv[2] === '-d') {
  destroyData()
} else if (process.argv[2] === '-i') {
  importData()
} else if (process.argv[2] === '-s') {
  await destroyData(true)
  await importData()
}
