// ===================== import page ===============================
import Homepage from "./pagehome/Homepage";
import CreatePost from "./posts/CreatePost";
// ===================== import page ===============================
//================ user Information ====================================
import { information } from "./context/Userinformation";
import { useState } from "react";
//================ user Information ====================================
// ===================== Pibliotique ===================
import { Route , Routes } from "react-router-dom";
import NotFound from "./pagehome/NotFond";
import RegisterPage from "./pagehome/Register";
// ===================== Pibliotique ===================
function App() {
  const [token , setToken ] = useState("")
  // ============ userInformation================
  function getInformation(token)
  {
    setToken(token)
  }
  // ============ userInformation================
  return (
    <>
    <Routes>
      <Route path="/" element={ <information.Provider value={token}><Homepage getInformation={getInformation}/></information.Provider>} />
      <Route path="/register" element={<RegisterPage/>} />
      <Route path="/createpost" element={<CreatePost/>}/>
      <Route path="*" element={<NotFound/>}/>
      </Routes>
   </>
  )
}

export default App
