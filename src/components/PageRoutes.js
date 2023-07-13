import { Route, Routes } from "react-router-dom"
import Student from "./Student"
import Admin from "./Admin"
import Login from "./Home"
import About from "./About"
import Contact from "./Contact"
import NotFound from "./NotFound"

const PageRoutes = () => {
    return (
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/contact" element={<Contact />} />
          <Route exact path="/student" element={<Student />} />
          {/* protected routes */}
          <Route exact path="/admin" element={<Admin />} />
          {/* catch all */}
          <Route path='*' element={<NotFound />}/>
        </Routes>
    )
  }
  export default PageRoutes
