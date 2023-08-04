import { Box, Typography } from "@mui/material";
import Logo from "../Logo";
import SideNavigation from "../SideNavigation";


const Header = () => {
  
  return (
    <>
      <header className="App-header">
        <Box sx={{ display: 'flex', alignItems: 'center', marginTop: "0px", marginLeft: "20px" }}>
          <Box sx={{ marginRight: "20px" }}>
            <Logo />
          </Box>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            {'Stationery Management System'}
          </Typography>
          <SideNavigation />
        </Box>
      </header>
    </>
  );
};
export default Header;
