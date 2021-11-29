import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import CatchingPokemonOutlinedIcon from '@mui/icons-material/CatchingPokemonOutlined';
import navs from '@/config/navs';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery, useTheme } from '@mui/material';

export default function QuickNav() {
    const navigate = useNavigate()
    const theme = useTheme()
    const mobile = useMediaQuery(theme.breakpoints.down('md'));
    return (
        <Box sx={{
            position: 'fixed',
            bottom: { xs: 5, md: 'auto' },
            right: { xs: 5, md: "auto" },
            left: { xs: "auto", md: 16 },
            top: { md: 16, xs: 'auto' },
            zIndex: 10,
        }}>
            <SpeedDial
                sx={{
                    ".MuiSpeedDial-fab": {
                        backgroundColor: "secondary.main",
                        width: "40px",
                        height: "40px"
                    }
                }}
                ariaLabel="菜单"
                direction={mobile ? 'up' : 'down'}
                icon={<CatchingPokemonOutlinedIcon />}
            >

                {navs.map(({ name, Icon, to }) => (
                    <SpeedDialAction
                        sx={{
                            backgroundColor: "secondary.main",
                            ":hover": {
                                backgroundColor: "secondary.light",
                            }
                        }}
                        key={name}
                        onClick={() => navigate(to, { replace: name === "home" ? true : false })}
                        icon={<Icon sx={{ fontSize: 30 }} />}
                        tooltipTitle={name}
                    />
                ))}
            </SpeedDial>
        </Box>
    );
}