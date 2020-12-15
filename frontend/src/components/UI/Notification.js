import React from 'react'

const Notification = (props) => {
  return (
    <div className={`my-3 alert alert-${props.type}`} role='alert'>
      <h4 className='alert-heading'>{props.title}</h4>
      <p>{props.message1}</p>
      {props.message2 && (
        <>
          <hr />
          <p className='mb-0'>{props.message2}</p>
        </>
      )}
    </div>
  )
}

export default Notification
