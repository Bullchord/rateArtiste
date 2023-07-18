import "./App.css";
import React, { useState } from "react";

import LargeHome from "./Home/LargeHome";
import { AuthProvider } from "./AuthContext";
function App() {
  // const [userAddress, setUserAddress] = useState('0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199');
 
  return (
    <div className="container">
      <AuthProvider>
        <LargeHome  />
      </AuthProvider>
    </div>
  );
}

export default App;
