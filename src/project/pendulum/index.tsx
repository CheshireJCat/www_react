import { useEffect, useRef } from "react"
import vPendulum from "@/util/pendulum"
import { Box } from "@mui/material"

const Pendulum: React.FC = () => {
    const ref = useRef<HTMLCanvasElement>(null)
    const exist = useRef(false);
    useEffect(() => {
        if (ref.current && !exist.current) {
            new vPendulum(ref.current, {
                dotColor: "#2e7d32",
                lineColor: "#fff",
                shadowColor: "#ffffff"
            })
            exist.current = true
        }
    }, [])
    // return <Box ref={ref} sx={{height:"100%"}}></Box>
    return <Box ref={ref} sx={{ position: "absolute", width: "100%", height: "100%", top: 0, left: 0, zIndex: -1, opacity: 0.5 }}></Box>
}

export default Pendulum