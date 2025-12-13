import type React from 'react'

export interface CommonDialogProps {
  trigger?: React.ReactNode
  title?: string | React.ReactNode
  description?: string | React.ReactNode
  children: React.ReactNode
  open: boolean
  onOpenChange: (open: boolean) => void
  className?: string
}
