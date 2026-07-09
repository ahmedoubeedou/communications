// ===================== import page ===============================
import Homepage from "./pagehome/Homepage";
import CreatePost from "./posts/CreatePost";
import Showpost from "./posts/Showpost";
// ===================== import page ===============================
//================ user Information ====================================
import { information } from "./context/Userinformation";
import { useState } from "react";
//================ user Information ====================================
// ===================== Pibliotique ===================
import { Route , Routes  } from "react-router-dom";
import NotFound from "./pagehome/NotFond";
import RegisterPage from "./pagehome/Register";
import Profiel from "./pagehome/Profiel";
// ===================== Pibliotique ===================
function App() {
  const [token , setToken ] = useState(()=>{
  if(localStorage.getItem("token") === null){
   return "";
    }else{
      return localStorage.getItem("token");
    }
  })
  // ============ userInformation================
  function getInformation(token)
  {
    setToken(token)
  }
  // ============ userInformation================
  return (
    <>
    <information.Provider value={token}>
    <Routes>

      <Route path="/" element={<Homepage getInformation={getInformation}/>} />
      <Route path="/register" element={<RegisterPage/>} />
      <Route path="/createpost" element={<CreatePost/>}/>
      <Route path="/Showpost/:idPost" element={<Showpost/>} />
      <Route path="/profile/:idUser" element={<Profiel/>} />
      <Route path="*" element={<NotFound/>}/>
      </Routes>
     </information.Provider>
   </>
  )
}
export default App
