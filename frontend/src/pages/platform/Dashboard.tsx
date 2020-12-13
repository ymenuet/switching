import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import classes from '../../styles/Formations.module.css'
import { getUserFormations } from '../../actions/userActions'

const Dashboard = () => {
  const { loading, success, data: formations } = useSelector(
    (state: any) => state.userFormations
  )
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUserFormations())
  }, [])
  return (
    <div>
      <h1 className='py-4 text-center'>Mes cours</h1>
      <>
        {formations &&
          formations.map((formation: any) => {
            return (
              <div className={classes.Formation}>
                <h3>{formation.title}</h3>
                <p>Description: {formation.shortDescription}</p>

                <div className={classes.FormationImgs}>
                  <img src={formation.logo} alt={formation.logo} />
                  <img
                    src={formation.backgroundImage}
                    alt={formation.backgroundImage}
                  />
                  <img src={formation.thumbnail} alt={formation.thumbnail} />
                  {formation.videos.map((video: any) => {
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
