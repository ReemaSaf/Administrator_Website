import './App.css';
import { HomePage } from './components/Home/HomePage';
// import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Delay } from './components/Delay/Delay';
import { Availability } from './components/Availability/Availability';
import { Login } from './components/Home/Login';
import { createContext } from 'react';
import useCaseFirebase from "./components/Firebase/useCaseFirebase";
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import ResetPassword from './components/Reset/ResetPassword';

export const collectionContext = createContext()
function App() {
  const firebaseContext = useCaseFirebase();
  return (
    <collectionContext.Provider value={{
      auth: firebaseContext
    }}>
      <Router>
        <Routes>

          <Route path="/" element={<PrivateRoute><HomePage /></PrivateRoute>} />
          <Route path="/delay" element={<PrivateRoute><Delay /></PrivateRoute>} />
          <Route path="/availavility" element={<PrivateRoute><Availability /></PrivateRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="login/reset" element={<ResetPassword />} />
          <Route path='*' element={<div>Page Not Found</div>}
          />
        </Routes>
      </Router>
    </collectionContext.Provider>
  );
}

export default App;
