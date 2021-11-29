import { useEffect } from "react"

const useBodySbgc = () => {
    useEffect(() => {
        document.body.classList.add("sbgc")
        return () => {
            document.body.classList.remove("sbgc")
        }
    }, [])
}
export default useBodySbgc