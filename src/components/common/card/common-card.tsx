import { Activity, forwardRef } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../ui/card'
import type { CommonCardProps } from './types'

const CommonCard = forwardRef<HTMLDivElement, CommonCardProps>(
  (
    {
      title,
      description,
      children,
      wrapperClassName,
      headerClassName,
      className,
      onClick,
      ...rest
    },
    ref,
  ) => {
    return (
      <Card ref={ref} {...rest} onClick={onClick} className={wrapperClassName}>
        <CardHeader className={headerClassName}>
          <Activity mode={title ? 'visible' : 'hidden'}>
            <CardTitle>{title}</CardTitle>
          </Activity>
          <Activity mode={description ? 'visible' : 'hidden'}>
            <CardDescription>{description}</CardDescription>
          </Activity>
        </CardHeader>
        <CardContent className={className}>{children}</CardContent>
      </Card>
    )
  },
)

CommonCard.displayName = 'CommonCard'

export default CommonCard
