import { useState, useEffect } from 'react'

const useDelayMount = (isMounted: boolean, delayTime: number) => {
  const [shouldRender, setShouldRender] = useState(false)

  useEffect(() => {
    let timeoutId: number

    if (isMounted) {
      timeoutId = setTimeout(() => setShouldRender(true), delayTime)
    } else if (!isMounted && shouldRender) {
      setShouldRender(false)
    }

    return () => clearTimeout(timeoutId)
  }, [isMounted, delayTime, shouldRender])

  return shouldRender
}

export default useDelayMount
