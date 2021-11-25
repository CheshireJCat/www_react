import { ArrowBack } from "@mui/icons-material"
import { useNavigate } from "react-router"
import { Fab } from '@mui/material'

const GoBack: React.FC = () => {
    const navigate = useNavigate()
    return <Fab onClick={() => navigate(-1)} color="primary" aria-label="back" sx={{ position: "fixed", left: "16px", top: "16px", display: { md: "flex", xs: "none" } }}>
        <ArrowBack />
    </Fab>
}

export default GoBack