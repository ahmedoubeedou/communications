// ===================== import page ===============================
import Homepage from "./pagehome/Homepage";
import CreatePost from "./posts/CreatePost";
import Showpost from "./posts/Showpost";
// ===================== import page ===============================
//================ user Information ====================================
import { information } from "./context/Userinformation";
import { useState } from "react";
import {pasDeProfiel} from "./constants/constants"
//================ user Information ====================================
// ===================== Pibliotique ===================
import { Route , Routes  } from "react-router-dom";
import NotFound from "./pagehome/NotFond";
import RegisterPage from "./pagehome/Register";
import Profiel from "./pagehome/Profiel";
// ===================== Pibliotique ===================
function App() {
  const [userInformation , setUserInformation] = useState(()=>{
    let token = "";
    let user =  { username: "", profile_image: pasDeProfiel };
  if(localStorage.getItem("token") !== null){
  token = localStorage.getItem("token");
    }
       const userinfor = localStorage.getItem("user");
          if (userinfor) {
            let correctionProfeilImge = JSON.parse(userinfor);       
            if (typeof correctionProfeilImge.profile_image  !== 'string') {
              correctionProfeilImge.profile_image = pasDeProfiel;
            }
            user = correctionProfeilImge;
            
          }
          return {token , user}
      })
  // ============ userInformation================
  function getInformation(token , user)
  {
   let userinfo = {token ,  user};

    setUserInformation(userinfo)
  }
  // ============ userInformation================
  return (
    <>
    <information.Provider value={userInformation}>
    <Routes>

      <Route path="/" element={<Homepage getInformation={getInformation}/>} />
      <Route path="/register" element={<RegisterPage  getInformation={getInformation}/>} />
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
