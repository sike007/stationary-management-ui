import { Route, Routes } from "react-router-dom"
import About from "./About"
import Contact from "./Contact"
import NotFound from "./NotFound"
import AdminSystem from "./AdminSystem"
const PageRoutes = () => {
    return (
        <Routes>
          <Route exact path="/" element={<AdminSystem />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/contact" element={<Contact />} />
          <Route path='*' element={<NotFound />}/>
        </Routes>
    )
  }
  export default PageRoutes