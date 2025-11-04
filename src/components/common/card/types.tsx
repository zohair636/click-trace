import type { MouseEventHandler, ReactNode } from 'react'

export interface CommonCardProps {
  title?: string | ReactNode
  description?: string | ReactNode
  children?: ReactNode
  wrapperClassName?: string
  headerClassName?: string
  className?: string
  onClick?: MouseEventHandler<HTMLDivElement>
}
