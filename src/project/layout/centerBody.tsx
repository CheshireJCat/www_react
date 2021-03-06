import { Container } from "@mui/material"
import { SxProps, Theme } from "@mui/system"

const CenterBody: React.FC<{
    sx?: SxProps<Theme> | undefined,
}> = ({ children, sx }) => {
    return <Container fixed sx={{ pt: 3, height: "100%", ...sx }}>{children}</Container>
}

export default CenterBody