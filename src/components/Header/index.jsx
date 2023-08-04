import { Box, Typography } from "@mui/material";
import Logo from "../Logo";
import SideNavigation from "../SideNavigation";

const Header = () => {
  return (
    <>
      <header className="App-header">
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: '10px'}}>
          <Logo />
          <Typography variant="h5" component="div" sx={{marginLeft: '10px'}}>
            Stationery Management System
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', }}>
          <Typography variant="h6" component="div" sx={{fontWeight: '300', }}>
            {sessionStorage.getItem('name')}
          </Typography>
          <SideNavigation />
        </Box>
      </header>
    </>
  );
};
export default Header;
