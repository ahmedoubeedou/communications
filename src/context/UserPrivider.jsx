import { useState } from "react";
import { pasDeProfiel } from "../constants/constants";
import { information } from "./Userinformation";
export default function UserProvider({children})
{
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
 <information.Provider value={{userInformation , getInformation}}>
    {children}
 </information.Provider>
    )
}