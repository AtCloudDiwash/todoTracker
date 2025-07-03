//import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { UserDetailsProvider } from "./context/userDetailsContext";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <AuthProvider>
    <UserDetailsProvider>
      <App />
    </UserDetailsProvider>
  </AuthProvider>
  ///</StrictMode>
);
