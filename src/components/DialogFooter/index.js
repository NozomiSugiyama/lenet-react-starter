// @flow
import React from 'react'
import LinearLayout from '../LinearLayout'
import './dialogFooter.modules.css'

type DialogFooterProps = {
  className?: string
}

const DialogFooter = ({ className, ...props }: DialogFooterProps) => {
  return <LinearLayout className={[className, 'DialogFooter'].join(' ')} orientation="horizontal" {...props} />
}

export default DialogFooter
