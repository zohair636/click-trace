import type { ReactNode } from 'react'

export const renderIcon = (icon: string | ReactNode) => {
  if (!icon) return null
  if (typeof icon === 'string') {
    return <img src={icon} alt={icon} loading="lazy" />
  } else {
    return icon
  }
}
