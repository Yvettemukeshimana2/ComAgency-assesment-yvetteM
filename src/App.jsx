import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
 import Form from "./component/Form"
import Customer from "./component/Customer"
 const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Form />} />
          <Route path="/Customer" element={<Customer />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
