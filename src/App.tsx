// src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthService from './AuthService';
import Callback from './Callback';
import Home from './Home';

const App = () => {
  const login = () => {
    AuthService.login();
  };

  const logout = () => {
    AuthService.logout();
  };

  return (
      <Router>
        <div>
          <button onClick={login}>Login</button>
          <button onClick={logout}>Logout</button>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/callback" element={<Callback />} />
          </Routes>
        </div>
      </Router>
  );
};

// const Home = () => {
//   const [user, setUser] = React.useState(null);
//
//   React.useEffect(() => {
//     AuthService.getUser().then(setUser);
//   }, []);
//
//   return (
//       <div>
//         <h1>Home</h1>
//         {user ? <div>Welcome, {user.profile.name}</div> : <div>Please log in.</div>}
//       </div>
//   );
// };

export default App;
