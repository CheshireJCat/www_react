
import { ArrowUpward } from "@mui/icons-material";
import { Fab } from "@mui/material";
import { SxProps, Theme } from "@mui/system";
import { useState, useEffect, useRef } from "react";

interface Props<T> {
    scrollRef: React.RefObject<T>;
    sx?: SxProps<Theme>
}

function GoTop<T extends HTMLElement>({ scrollRef, sx }: Props<T>) {
    const [show, setShow] = useState(false);
    const lastTime = useRef(0)
    const timer = useRef(0)

    useEffect(() => {
        const scrollFunc = (e: any) => {
            const now = +new Date()
            const run = () => setShow(e.target.scrollTop > e.target.clientHeight)
            if (now - lastTime.current >= 1000) {
                lastTime.current = now;
                run()
            } else {
                window.clearTimeout(timer.current)
                timer.current = window.setTimeout(run, 20)
            }
        }
        if (!scrollRef.current) return;
        scrollRef.current.addEventListener("scroll", scrollFunc)
        return () => {
            scrollRef.current && scrollRef.current.addEventListener("scroll", scrollFunc)
        }
    }, [])

    const scrollTop = () => {
        if (scrollRef.current) {
            console.log(scrollRef.current)
            scrollRef.current.scroll({
                top: 0,
                behavior: "smooth"
            })
        }
    }
    console.log(sx)
    return show ? <Fab color="primary" size="small" sx={{ ...sx }} onClick={scrollTop}>
        <ArrowUpward />
    </Fab> : null

}
export default GoTop