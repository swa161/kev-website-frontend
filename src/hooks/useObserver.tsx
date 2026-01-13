
import { useRef, useEffect, useState } from 'react'


export function useObserver(options?: IntersectionObserverInit) {
    const ref = useRef<HTMLElement | null>(null)
    const [visible, setVisible] = useState(false)
    useEffect(() => {
        if (!ref.current) return

        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setVisible(true)
                observer.disconnect()
            }
        }, options)

        observer.observe(ref.current)

        return () => observer.disconnect()
    }, [])

    return { ref, visible }
}