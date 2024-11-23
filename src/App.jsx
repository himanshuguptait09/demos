import { Routes, Route } from "react-router-dom";
import './custom.css'
import PrivateRoute from "./PrivateRoute/PrivateRoute";
function App() {

  return (
    <div className="body">
      <Routes>
        <Route path="/*" element={<PrivateRoute />} />
      </Routes>
    </div>

  )
}

export default App
