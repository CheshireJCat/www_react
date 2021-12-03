import { useEffect } from "react"

function useTitle(title = "") {
    useEffect(() => {
        document.title = title || "抱月的窝";
    }, [title]);
}

export default useTitle