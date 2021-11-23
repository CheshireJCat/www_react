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
            bottom: { xs: 50, md: 'auto' },
            right: { xs: 0, md: 'auto' },
            top: { md: 16, xs: 'auto' },
            left: { md: 16, xs: 'auto' },
        }}>
            <SpeedDial
                ariaLabel="菜单"
                direction={mobile ? 'up' : 'down'}
                // icon={<Home onClick={() => navigate(navs[0].to)} />}
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
                        icon={<Icon sx={{ fontSize: 30 }} onClick={() => navigate(to)} />}
                        tooltipTitle={name}
                    />
                ))}
            </SpeedDial>
        </Box>
    );
}