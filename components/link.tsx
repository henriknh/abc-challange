import { HTMLAttributeAnchorTarget, ReactNode } from 'react'

export type LinkType = {
  href: string
  _target?: HTMLAttributeAnchorTarget
  children: ReactNode
}
