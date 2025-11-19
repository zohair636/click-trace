import { create } from 'zustand'
import type { AppStoreTypes } from './types'

export const useAppStore = create<AppStoreTypes>((set) => ({
  isStarted: false,
  setIsStarted: (value: boolean) => set({ isStarted: value }),
}))
