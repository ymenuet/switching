import React from 'react'

const footerStyle = {
  position: 'absolute' as 'absolute',
  width: '100vw',
  border: '1px solid',
  bottom: '0',
  left: '0',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '50px',
}

const footer = () => {
  return <div style={footerStyle}>Footer</div>
}

export default footer
