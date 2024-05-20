import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import "./styles/tailwind.css";
import Spinner from "./components/spinner/Spinner";
import React from "react";

const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
const ListRecordPage = lazy(() => import("./pages/ListRecordPage/ListRecordPage"));


const MemoizedSpinner = React.memo(Spinner);

function App() {
  return (
    <Router>
      <Suspense fallback={<MemoizedSpinner />}>
        <Routes>
          <Route path="/history" element={<ListRecordPage />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
