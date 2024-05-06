import { HTMLAttributeAnchorTarget, ReactNode } from 'react'

export type LinkAction = {
  action?: () => void
  href?: string
  _target?: HTMLAttributeAnchorTarget
  children: ReactNode
}
