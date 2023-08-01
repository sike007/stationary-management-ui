import { Route, Routes } from "react-router-dom"
import About from "./About"
import Contact from "./Contact"
import NotFound from "./NotFound"
import AdminSystem from "./AdminSystem"
import AdminReturnable from "./AdminReturnable"
import useToken from "./App/useToken"
import Student from "./Student"
import Transaction from "./StudentTransactions"

const PageRoutes = () => {
  const { token, setToken } = useToken();
  let homePage, transactionPage;
  
  if (token === "admin") {
    homePage = <AdminSystem />
    transactionPage = <AdminReturnable />
  }
  else if (token === "student") {
    homePage = <Student />
    transactionPage = <Transaction />
  }

  return (
    <Routes>
      <Route exact path="/" element={homePage} />
      <Route exact path="/about" element={<About />} />
      <Route exact path="/contact" element={<Contact />} />
      <Route exact path="/transactions" element={transactionPage} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}
export default PageRoutes;