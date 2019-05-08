// @flow

import React from 'react'
import ReactDOM from 'react-dom'
import Root from '../../control/Root'
import Shadow from '../../effect/Shadow'
import type { Node } from 'react'
import './dialog.modules.css'

type DialogProps = {
  children: Node,
  className?: string,
  onCancel: () => void,
  style?: any,
  visible: boolean
}

type DialogState = {
  onClick: (e: any) => void,
  size?: [number, number]
}

class _Dialog extends React.Component<DialogProps, DialogState> {
  componentWillMount() {
    this.setState({
      onClick: e => {
        const { onCancel = () => undefined } = this.props

        // eslint-disable-next-line  react/no-find-dom-node
        const hostElement = ReactDOM.findDOMNode(this)
        if (hostElement && !hostElement.contains(e.target)) onCancel()
      },
      size: undefined
    })
  }

  componentDidMount() {
    const { visible } = this.props

    if (visible) setTimeout(() => window.addEventListener('click', this.state.onClick, false), 1)

    // eslint-disable-next-line  react/no-find-dom-node
    const hostElement = ReactDOM.findDOMNode(this)

    if (!hostElement) return
    // eslint-disable-next-line flowtype-errors/show-errors
    const rect = hostElement.getBoundingClientRect()

    this.setState({
      size: [rect.width, rect.height]
    })
  }

  componentWillReceiveProps({ visible }) {
    if (this.props.visible !== visible) {
      if (visible) setTimeout(() => window.addEventListener('click', this.state.onClick, false), 1)
      else window.removeEventListener('click', this.state.onClick, false)
    }
  }

  componentWillUnmount() {
    if (this.props.visible) window.removeEventListener('click', this.state.onClick, false)
  }

  render() {
    const { children, className, style, visible, ...props } = this.props

    return (
      <Shadow
        blur={20}
        // eslint-disable-next-line react/no-children-prop
        children={visible ? children : this.state.size ? undefined : children}
        className={[className, 'Dialog', visible ? 'Visible' : this.state.size ? 'Hidden' : undefined].join(' ')}
        depth={0.5}
        offset={7}
        spread={1}
        style={{
          width: this.state.size ? this.state.size[0] + 'px' : undefined,
          height: this.state.size ? this.state.size[1] + 'px' : undefined,
          transform: !this.state.size
            ? undefined
            : [
                'translateX(50vw) translateX(' + -this.state.size[0] / 2 + 'px)',
                visible ? 'translateY(50vh) translateY(' + -this.state.size[1] / 2 + 'px)' : 'translateY(100vh)'
              ].join(' '),
          ...style
        }}
        {...props}
      />
    )
  }
}

const Dialog = (props: DialogProps) => (
  <Root className={props.visible ? 'DialogRoot' : ''} node={<_Dialog {...props} />} />
)

export default Dialog
