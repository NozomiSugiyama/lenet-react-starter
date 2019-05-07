// @flow
import * as React from 'react'
import './Button.modules.css'

type Props = {
  className?: string,
  component?: 'button' | 'div'
}

const Button = ({ component = 'div', className, ...props }: Props) => {
  const Component = component
  return <Component className={[className, 'Button'].join(' ')} {...props} />
}

export default Button
