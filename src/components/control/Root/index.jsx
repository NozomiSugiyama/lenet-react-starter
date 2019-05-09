// @flow
import React, { useState, useEffect } from 'react'
import type { Element } from 'react'
import { render, unmountComponentAtNode } from 'react-dom'

const Root = ({ node }: { node: Element<any> }) => {
  const [element, setElement] = useState<HTMLElement | null>(null)

  useEffect(() => {
    const element = document.createElement('div')
    document.body.appendChild(element)
    setElement(element)
    return () => {
      unmountComponentAtNode(element)
      document.body.removeChild(element)
    }
  }, [])

  element && setTimeout(() => render(node || <div />, element), 0)

  return null
}

export default Root

class DocumentWithBody extends Document {
  // $FlowFixMe
  body: HTMLBodyElement
}

declare var document: DocumentWithBody
