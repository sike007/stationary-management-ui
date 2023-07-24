import * as React from "react";
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate()
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleabout = () => {
    navigate('/about')
    handleClose()
  }
  const handlecontact = () => {
    navigate('/contact')
    handleClose()
  }
  return (
    <>
      <footer className="App-footer">
        <a href="" onClick={handleabout}>About US</a>
        <a href="" onClick={handlecontact}>Contact US</a>
      </footer>
    </>
  );
};
export default Footer
