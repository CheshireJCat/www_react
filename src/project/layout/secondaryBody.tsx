import { Box } from "@mui/system"

const SecondaryBody: React.FC = ({ children }) => {
    return <Box py={2} bgcolor="secondary.main" height="100%" overflow="auto">{children}</Box>
}

export default SecondaryBody