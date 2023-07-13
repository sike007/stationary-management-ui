import { Route, Routes } from "react-router-dom"
import Header from "./Header"
import Headera from "./Headera"
const PageRoutes2 = () => {
    return (
        <Routes>
          <Route exact path="/" element={<Header />} />
          <Route exact path="/admin" element={<Headera />} />
          <Route exact path="/admin/System" element={<Headera />} />
          <Route exact path="/student" element={<Headera />} />
          <Route exact path="/about" element={<Headera />} />
          <Route exact path="/contact" element={<Headera />} />
        </Routes>
    )
  }
  export default PageRoutes2