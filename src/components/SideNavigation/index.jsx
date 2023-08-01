import { Avatar, Box, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import { useState } from "react";
import useToken from "../App/useToken";
import { useNavigate } from "react-router-dom";

const SideNavigation = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const handleOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const navigate = useNavigate();
    const handleClose = () => {
        setAnchorEl(null);
    };

    const { token, setToken } = useToken();
    const settings = [];
    if (token === "admin")
        settings.push(["Inventory", "/"], ["Transactions", "/transactions"]);
    if (token === "student")
        settings.push(["Order item", "/"], ["My Transactions", "/transactions"]);
    return (
        <Box>
            <IconButton id="side-navigation" onClick={handleOpen} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                {settings.map(([setting, link]) => (
                    <MenuItem key={setting} onClick={() => {
                        navigate(link)
                        handleClose()
                    }
                    }>
                        <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                ))}
                <MenuItem key="Logout" onClick={() => {
                    setToken({ token: null })
                    navigate('/')
                    window.location.reload()
                }
                }>
                    <Typography textAlign="center">Logout</Typography>
                </MenuItem>
            </Menu>
        </Box>);
}

export default SideNavigation;