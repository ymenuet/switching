import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  getFormationDetails,
  updateFormation,
} from '../../actions/formationActions'
import FormContainer from '../../components/FormContainer'
import { FORMATION_UPDATE_RESET } from '../../constants/formationConstants'
import axios from 'axios'
// import { FORMATION_UPDATE_RESET } from '../constants/formationConstants'

const FormationEdit = (props: any) => {
  const formationId = props.match.params.id

  const [title, setTitle] = useState('')
  const [shortDescription, setShortDescription] = useState('')
  const [longDescription, setLongDescription] = useState('')
  const [logo, setLogo] = useState('')
  const [backgroundImage, setBackgroundImage] = useState('')
  const [thumbnail, setThumbnail] = useState('')
  const [demoVideo, setDemoVideo] = useState('')
  const [price, setPrice] = useState(0)
  const [difficulty, setDifficulty] = useState(2)
  const [logoUploading, setLogoUploading] = useState(false)
  const [bgImageUploading, setBgImageUploading] = useState(false)
  const [thumbnailUploading, setThumbnailUploading] = useState(false)

  const dispatch = useDispatch()

  const formationDetails = useSelector((state: any) => state.formationDetails)
  const { loading, error, formation } = formationDetails

  const formationUpdate = useSelector((state: any) => state.formationUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = formationUpdate

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: FORMATION_UPDATE_RESET })
      props.history.push('/admin/formation-list')
    } else {
      if (formation?.name || formation?._id !== formationId) {
        dispatch(getFormationDetails(formationId))
      } else {
        setTitle(formation.title)
        setShortDescription(formation.shortDescription)
        setLongDescription(formation.longDescription)
        setLogo(formation.logo)
        setBackgroundImage(formation.backgroundImage)
        setThumbnailUploading(formation.thumbnail)
        setBackgroundImage(formation.backgroundImage)
        setThumbnail(formation.thumbnail)
        setDemoVideo(formation.demoVideo)
        setPrice(formation.price)
        setDifficulty(formation.difficulty)
      }
    }
  }, [dispatch, formationId, props.history, formation, successUpdate])

  const submitHandler = (e: any) => {
    e.preventDefault()
    dispatch(
      updateFormation({
        _id: formationId,
        title,
        shortDescription,
        longDescription,
        logo,
        backgroundImage,
        thumbnail,
        demoVideo,
        price,
        difficulty,
      })
    )
  }

  const uploadFileHandler = async (e: any) => {
    const file = e.target.files[0]
    const imgKind = e.target.id
    const formData = new FormData()
    formData.append('image', file)

    switch (imgKind) {
      case 'logo-file':
        setLogoUploading(true)
        break
      case 'background-image-file':
        setBgImageUploading(true)
        break
      case 'thumbnail-file':
        setThumbnailUploading(true)
    }
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
      const { data } = await axios.post('/api/upload', formData, config)

      switch (imgKind) {
        case 'logo-file':
          setLogo(data)
          setLogoUploading(false)
          break
        case 'background-image-file':
          setBackgroundImage(data)
          setBgImageUploading(false)
          break
        case 'thumbnail-file':
          setThumbnail(data)
          setThumbnailUploading(false)
      }
    } catch (err) {
      console.log(err)
      setLogoUploading(false)
      setBgImageUploading(false)
      setThumbnailUploading(false)
    }
  }

  return (
    <>
      <Link to='/admin/formation-list'>Go back</Link>
      <FormContainer>
        <h1>Edit formation</h1>
        {loadingUpdate && <p>Loading update</p>}
        {errorUpdate && <p>{errorUpdate}</p>}
        {error && <p>{JSON.stringify(error)}</p>}
        {loading ? (
          <p>Loading</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <form onSubmit={submitHandler}>
            <label htmlFor=''>Title</label>
            <input
              type='text'
              placeholder='Enter title'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <label htmlFor=''>Short Description</label>
            <input
              type='text'
              placeholder='Enter short description'
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
            />
            <label htmlFor=''>Long Description</label>
            <input
              type='text'
              placeholder='Enter long description'
              value={longDescription}
              onChange={(e) => setLongDescription(e.target.value)}
            />

            <label htmlFor=''>Logo</label>
            <input
              type='text'
              placeholder='Enter logo'
              value={logo}
              onChange={(e) => setLogo(e.target.value)}
            />
            <label>Select a file:</label>
            <input
              type='file'
              id='logo-file'
              // custom
              onChange={uploadFileHandler}
            ></input>
            {logoUploading && <p>Uploading...</p>}

            <label htmlFor=''>Background Image</label>
            <input
              type='text'
              placeholder='Enter Background Image'
              value={backgroundImage}
              onChange={(e) => setBackgroundImage(e.target.value)}
            />

            <label>Select a file:</label>
            <input
              type='file'
              id='background-image-file'
              // custom
              onChange={uploadFileHandler}
            ></input>
            {bgImageUploading && <p>Uploading...</p>}

            <label htmlFor=''>Thumbnail</label>
            <input
              type='text'
              placeholder='Enter Thumbnail'
              value={thumbnail}
              onChange={(e) => setThumbnail(e.target.value)}
            />

            <label>Select a file:</label>
            <input
              type='file'
              id='thumbnail-file'
              // custom
              onChange={uploadFileHandler}
            ></input>
            {thumbnailUploading && <p>Uploading...</p>}

            <label htmlFor=''>Demo Video</label>
            <input
              type='text'
              placeholder='Enter Demo Video'
              value={demoVideo}
              onChange={(e) => setDemoVideo(e.target.value)}
            />

            <label htmlFor=''>price</label>
            <input
              type='number'
              placeholder='Enter Price'
              value={price}
              onChange={(e) => setPrice(parseInt(e.target.value))}
            />

            <label htmlFor=''>Difficulty</label>
            <input
              type='number'
              placeholder='Enter Difficulty'
              value={difficulty}
              onChange={(e) => setDifficulty(parseInt(e.target.value))}
            />

            <button type='submit'>Update</button>
          </form>
        )}
      </FormContainer>
    </>
  )
}

export default FormationEdit
