import { forwardRef } from 'react'
import { renderIcon } from '../../../utils/icon-utils'
import { Button } from '../../ui/button'
import type { CommonButtonProps } from './types'

const CommonButton = forwardRef<HTMLButtonElement, CommonButtonProps>(
  ({ label, leftIcon, rightIcon, tooltip, ...rest }, ref) => {
    return (
      <Button ref={ref} title={tooltip} {...rest}>
        {leftIcon && renderIcon(leftIcon)}
        {label}
        {rightIcon && renderIcon(rightIcon)}
      </Button>
    )
  },
)

CommonButton.displayName = 'CommonButton'

export default CommonButton
