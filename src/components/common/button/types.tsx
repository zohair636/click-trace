import type { ButtonHTMLAttributes, ReactNode } from 'react'

export interface CommonButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string | ReactNode
  leftIcon?: string | ReactNode
  rightIcon?: string | ReactNode
  tooltip?: string
}
