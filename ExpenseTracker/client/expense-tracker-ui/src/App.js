import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Navbar from "./Navbar";
import ExpenseForm from "./ExpenseForm";
import ExpenseList from "./ExpenseList";
import Home from "./Home";
import NotFound from "./NotFound";
import Registration from "./Registration";
import LoginPage from "./LoginPage";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/expense/add" element={<ExpenseForm />} />
          <Route path="/expense/edit/:id" element={<ExpenseForm />} />
          <Route path="/expense" element={<ExpenseList />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<Registration />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}
export default App;
