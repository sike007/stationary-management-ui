import Logo from "../Logo";
import SideNavigation3 from "../SideNavigation3";
import { useLocation } from "react-router-dom"

const Headerb = () => {
    const location = useLocation();
  return (
    <>
      <header className="App-header">
        <Logo />
        <h2>Stationary Management System</h2>
        <SideNavigation3 />
      </header>
    </>
  );
};
export default Headerb;