import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import AllDrafts from "@/pages/AllDrafts";
import Templates from "@/pages/Templates";
import AllProjects from "@/pages/AllProjects";
import Starred from "@/pages/Starred";
import Trash from "@/pages/Trash";
import DesignCanvas from "@/pages/DesignCanvas";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/drafts" element={<AllDrafts />} />
        <Route path="/templates" element={<Templates />} />
        <Route path="/projects" element={<AllProjects />} />
        <Route path="/starred" element={<Starred />} />
        <Route path="/trash" element={<Trash />} />
        <Route path="/design/:projectId" element={<DesignCanvas />} />
      </Routes>
    </Router>
  );
}
