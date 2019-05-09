// @flow
import React from 'react'
import './linerLayout.modules.css'

type LinerLayoutProps = {
  className?: string,
  orientation: 'vertical' | 'horizontal'
}
const LinerLayout = ({ className, orientation = 'vertical', ...props }: LinerLayoutProps) => (
  <div
    className={[
      className,
      'LinerLayout',
      orientation === 'vertical' ? 'Vertical' : orientation === 'horizontal' ? 'Horizontal' : undefined
    ].join(' ')}
    {...props}
  />
)

export default LinerLayout
