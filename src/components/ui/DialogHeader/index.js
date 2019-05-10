// @flow

import React from 'react'
import './dialogHeader.modules.css'

type DialogHeaderProps = {
  className?: string
}

const DialogHeader = ({ className, ...props }: DialogHeaderProps) => (
  <div className={[className, 'DialogHeader'].join(' ')} {...props} />
)

export default DialogHeader
