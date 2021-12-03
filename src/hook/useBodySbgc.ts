import { useEffect } from "react"

const useBodySbgc = () => {
    useEffect(() => {
        document.body.classList.add("sbgc")
        return () => {
            document.body.classList.remove("sbgc")
        }
    }, [])
}

export const useBodyBgImg = (url: string) => {
    useEffect(() => {
        if (url) {
            document.body.style.backgroundImage = `url(${url})`;
        }
        return () => {
            document.body.style.backgroundImage = "";
        }
    }, [])
}

export default useBodySbgc