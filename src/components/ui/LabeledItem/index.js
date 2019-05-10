// @flow
import React from 'react'
import type { Node } from 'react'
import './LabeledItem.css'

const LabeledItem = ({ label, children }: { label: string, children: Node }) => (
  <div className="LabeledItem">
    <span>{label}</span>
    <div>{children}</div>
  </div>
)

export default LabeledItem
