import { Tab, Tabs } from "@mui/material";
import { useState } from "react";
import useToken from "../App/useToken";
import { useNavigate } from "react-router-dom";

const VerticalTab = (props) => {

  const [value, setValue] = useState(parseInt(props.activeTab));
  const { token, setToken } = useToken();
  const navigate = useNavigate();
  
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const menuItem = [];
  if (token === "admin")
    menuItem.push(["Inventory", "/"], ["Transactions", "/transactions"]);
  if (token === "student")
    menuItem.push(["Order item", "/"], ["My Transactions", "/transactions"]);

  return (
    
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: 'divider', paddingTop:"30px"}}
      >
        {menuItem.map(([setting, link]) => (
          <Tab label={setting} onClick={() => {navigate(link)}} />
        ))}
      </Tabs>
  
  );
}

export default VerticalTab;