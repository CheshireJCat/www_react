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
        } else {
            document.body.style.backgroundImage = `none`;
        }
        return () => {
            document.body.style.backgroundImage = "none";
        }
    }, [])
}

export default useBodySbgc