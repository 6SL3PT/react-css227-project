import { useRef, useEffect } from 'react'

const useClickOutside = (handler) => {
    const domNodeRef = useRef()

    useEffect(() => {
        const handlerActiveCondition = (e) => {
            domNodeRef.current && !domNodeRef.current.contains(e.target) && handler()
        }
        document.addEventListener('mousedown', handlerActiveCondition)

        return () => {
            document.removeEventListener('mousedown', handlerActiveCondition)
        }
    })

    return domNodeRef
}

export default useClickOutside
