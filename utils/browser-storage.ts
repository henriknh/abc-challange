const setItem = (key: string, value: string): void => {
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem(key, value)
  } else if (typeof sessionStorage !== 'undefined') {
    // Fallback to sessionStorage if localStorage is not supported
    sessionStorage.setItem(key, value)
  } else {
    // If neither localStorage nor sessionStorage is supported
    console.log('Web Storage is not supported in this environment.')
  }
}

const getItem = (key: string): string | null => {
  if (typeof localStorage !== 'undefined') {
    return localStorage.getItem(key)
  } else if (typeof sessionStorage !== 'undefined') {
    // Fallback to sessionStorage if localStorage is not supported
    return sessionStorage.getItem(key)
  } else {
    // If neither localStorage nor sessionStorage is supported
    console.log('Web Storage is not supported in this environment.')
    return null
  }
}

const removeItem = (key: string): void => {
  if (typeof localStorage !== 'undefined') {
    localStorage.removeItem(key)
  } else if (typeof sessionStorage !== 'undefined') {
    // Fallback to sessionStorage if localStorage is not supported
    sessionStorage.removeItem(key)
  } else {
    // If neither localStorage nor sessionStorage is supported
    console.log('Web Storage is not supported in this environment.')
  }
}

const browserStorage = { setItem, getItem, removeItem }

export default browserStorage
