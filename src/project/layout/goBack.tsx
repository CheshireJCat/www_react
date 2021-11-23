import { ArrowBack } from "@mui/icons-material"
import { useNavigate } from "react-router"
import { Fab } from '@mui/material'

const GoBack: React.FC = () => {
    const navigate = useNavigate()
    return <Fab color="primary" aria-label="back" sx={{ position: "fixed", left: "16px", top: "16px", display: { md: "flex", xs: "none" } }}>
        <ArrowBack onClick={() => navigate(-1)} />
    </Fab>
}

export default GoBack