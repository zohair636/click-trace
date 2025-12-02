export const setSessionStorage = (key: string, value: unknown): void => {
  sessionStorage.setItem(key, JSON.stringify(value))
}

export const getSessionStorage = (key: string) => {
  const getSavedValue = sessionStorage.getItem(key)
  if (getSavedValue === null) return null
  return JSON.parse(getSavedValue)
}

export const removeSessionStorageItem = (key: string) => {
  sessionStorage.removeItem(key)
}

export const removeAllFromSessionStorage = () => {
  sessionStorage.clear()
}
