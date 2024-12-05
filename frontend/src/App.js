import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import FormEditor from "./components/FormEditor";
import FormPreview from "./components/FormPreview";
import FormFill from "./components/FormFill";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact component={FormEditor} />
        <Route path="/preview/:id" exact component={FormPreview} />
        <Route path="/fill/:id" exact component={FormFill} />
      </Routes>
    </Router>
  );
}

export default App;
