import React from 'react'
import { Alert, Button } from 'react-bootstrap'

export default ({errorText, onClose, errorTitle}) => {
  if (errorText) {
    return (
      <Alert bsStyle='danger'>
        <h4>{errorTitle}</h4>
        <p>
          {errorText}
        </p>
        <p>
          <Button onClick={onClose}>Ok</Button>
        </p>
      </Alert>
    )
  } else {
    return null
  }
}
