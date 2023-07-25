import { Route, Routes } from "react-router-dom"
import About from "./About"
import Contact from "./Contact"
import NotFound from "./NotFound"
import Student from "./Student"
import Transaction from "./StudentTransactions"
const PageRoutes3 = () => {

    return (
        <Routes>
          <Route exact path="/" element={<Student/>} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/contact" element={<Contact />} />
          <Route exact path="/transaction" element={<Transaction/>}/>
          <Route path='*' element={<NotFound />}/>
        </Routes>
    )
  }
  export default PageRoutes3