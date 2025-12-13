import { type FC } from 'react'
import { cn } from '../../../lib/utils'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../ui/dialog'
import type { CommonDialogProps } from './types'

const CommonDialog: FC<CommonDialogProps> = ({
  trigger,
  title,
  description,
  children,
  open,
  onOpenChange,
  className,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent
        className={cn('bg-secondary border-neutral-700', className)}
      >
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  )
}

export default CommonDialog
