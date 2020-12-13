import path from 'path'
import express from 'express'
import multer from 'multer'
const router = express.Router()

const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, 'uploads/')
  },
  filename(req, file, callback) {
    callback(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    )
  },
})

// in util folder?
const checkFileType = (file, callback) => {
  const filetypes = /jpg|jpeg|png/
  const validExtensionName = filetypes.test(
    path.extname(file.originalname).toLowerCase()
  )
  const validMimetype = filetypes.test(file.mimetype)
  if (validExtensionName && validMimetype) {
    return callback(null, true)
  } else {
    callback('JPG/JPEG/PNG images only!')
  }
}

const upload = multer({
  storage,
  fileFilter: (req, file, callback) => {
    checkFileType(file, callback)
  },
})

router.post('/', upload.single('image'), (req, res) => {
  res.send(`/${req.file.path}`)
})

export default router
