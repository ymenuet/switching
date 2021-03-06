import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import classes from '../../styles/Formations.module.css'
import { getUserFormations } from '../../actions/userActions'

const Dashboard = () => {
  const { loading, data: formations } = useSelector(
    (state) => state.userFormations
  )
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUserFormations())
  }, [dispatch])
  return (
    <div>
      <h1 className='py-4 text-center'>Mes cours</h1>
      <>
        {formations &&
          formations.map((formation) => {
            return (
              <div className={classes.Formation} key={formation._id}>
                <h3>{formation.title}</h3>
                <p>Description: {formation.shortDescription}</p>

                <div className={classes.FormationImgs}>
                  <img src={formation.logo} alt={formation.logo} />
                  <img
                    src={formation.backgroundImage}
                    alt={formation.backgroundImage}
                  />
                  <img src={formation.thumbnail} alt={formation.thumbnail} />
                  {formation.videos.map((video) => {
                    return (
                      <div>
                        <iframe
                          src={video.url}
                          width='640'
                          height='480'
                          frameborder='0'
                          allow='autoplay; fullscreen'
                          allowfullscreen
                        ></iframe>
                      </div>
                    )
                  })}

                  <p>
                    <a href='https://vimeo.com/485087260'>
                      Strange bunny video
                    </a>{' '}
                    from{' '}
                    <a href='https://vimeo.com/user128138613'>nicofraisse</a> on{' '}
                    <a href='https://vimeo.com'>Vimeo</a>.
                  </p>
                </div>
              </div>
            )
          })}
      </>
    </div>
  )
}

export default Dashboard
