import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App: React.FC = () => {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/agent/add" element={<AgentForm />} />
          <Route path="/agent/edit/:id" element={<AgentForm />} />
          <Route path="/agent" element={<AgentList />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
};
export default App;
