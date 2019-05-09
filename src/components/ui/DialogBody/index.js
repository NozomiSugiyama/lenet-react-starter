// @flow

import React from 'react'
import './dialogBody.modules.css'

type DialogBodyProps = {
  className?: string
}

const DialogBody = ({ className, ...props }: DialogBodyProps) => {
  return <div className={[className, 'DialogBody'].join(' ')} {...props} />
}

export default DialogBody
