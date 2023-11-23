import { useState, useEffect, useCallback } from 'react'

const breakpoints = {
  xs: 0,
  sm: 600,
  md: 900,
  lg: 1200,
  xl: 1536
}

type queryType = 'up' | 'down' | 'only' | 'between'

type optionsType = {
  start: keyof typeof breakpoints
  end?: keyof typeof breakpoints
}

const useResponsive = () => {
  const [windowDimensions, setWindowDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  })

  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const getSize = useCallback((query: queryType, options: optionsType) => {
    const { width } = windowDimensions
    const { start, end } = options

    if (query === 'up') return width >= breakpoints[start]
    if (query === 'down') return width <= breakpoints[start]
    if (query === 'only' && end) return width >= breakpoints[start] && width <= breakpoints[end]
    if (query === 'between' && end) return width > breakpoints[start] && width < breakpoints[end]

    return false
  }, [windowDimensions])

  return { ...windowDimensions, getSize }
}

export default useResponsive
