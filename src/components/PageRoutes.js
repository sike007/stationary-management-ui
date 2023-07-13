import { Route, Routes } from "react-router-dom"
import Student from "./Student"
import Home from "./Home"
import About from "./About"
import Contact from "./Contact"
import NotFound from "./NotFound"
import Login from "./Login"
import DashboardAdmin from "./DashboardAdmin"
import DashboardStudent from "./DashboardStudent"
const PageRoutes = () => {
    return (
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/contact" element={<Contact />} />
          <Route exact path="/student" element={<Student />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/login1" element={<DashboardAdmin />} />
          {/* <Route exact path="/login2" element={<DashboardStudent />} /> */}
          <Route path='*' element={<NotFound />}/>
        </Routes>
    )
  }
  export default PageRoutes