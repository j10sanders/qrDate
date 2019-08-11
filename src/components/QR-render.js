
import React, { Fragment } from 'react';
import QRCode from 'qrcode.react';
import ScanOrShow from '../scenes/ScanOrShow'

const QrRender = ({ qAndAs, user }) => {
  console.log(user, "IUHDAHIUDSA")
  const fullObject = JSON.stringify({ firstName: user.firstName, userId: user.id, qAndAs })
  console.log(fullObject, "full")
  return (
    <Fragment>
      <p style={{ textAlign: 'center' }}>
        Lookin good,
        {' '}
        {user.firstName.charAt(0).toUpperCase() + user.firstName.slice(1)}
      </p>
      <ScanOrShow myResults={qAndAs} />
      <QRCode value={fullObject} size={256} renderAs="svg" style={{ display: 'block', margin: 'auto' }} fgColor="#7d4cdb" />
    </Fragment>

  )
}

export default QrRender