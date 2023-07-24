import { Route, Routes } from "react-router-dom"
import Headera from "./Headera"
import Headerb from "./Headerb"
const PageRoutes2 = () => {
    return (
        <Routes>
          <Route exact path="/" element={<Headerb />} />
          <Route exact path="/about" element={<Headera />} />
          <Route exact path="/contact" element={<Headera />} />
          <Route exact path="/transaction" element={<Headera/>}/>
        </Routes>
    )
  }
  export default PageRoutes2