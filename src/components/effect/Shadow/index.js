// @flow

import React from 'react'
import './shadow.modules.css'

let toBoxShadow = ({ blur, depth, offset, position, spread }) =>
  [
    position === 'left' ? -offset + 'px' : position === 'right' ? offset + 'px' : '0',
    position === 'top' ? -offset + 'px' : position === 'bottom' ? offset + 'px' : '0',
    blur + 'px',
    spread + 'px',
    'rgba(0, 0, 0, ' + depth + ')'
  ].join(' ')

type ShadowProps = {
  blur?: number,
  className?: string,
  depth?: number,
  offset?: number,
  position?: 'top' | 'left' | 'right' | 'bottom',
  spread?: number,
  style: any
}

const Shadow = ({
  blur = 6,
  className,
  depth = 0.3,
  offset = 2,
  position = 'bottom',
  spread = 0,
  style,
  ...props
}: ShadowProps) => (
  <div
    className={[className, 'Shadow'].join(' ')}
    style={{
      boxShadow: toBoxShadow({
        blur: blur,
        depth: depth,
        offset: offset,
        position: position,
        spread: spread
      }),
      zIndex: offset,
      ...style
    }}
    {...props}
  />
)

export default Shadow
