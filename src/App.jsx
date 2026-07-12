// ===================== import page ===============================
import Homepage from "./pagehome/Homepage";
import CreatePost from "./posts/CreatePost";
import Showpost from "./posts/Showpost";
// ===================== import page ===============================
// ===================== Pibliotique ===================
import { Route , Routes  } from "react-router-dom";
import NotFound from "./pagehome/NotFond";
import RegisterPage from "./pagehome/Register";
import Profiel from "./pagehome/Profiel";
import UserProvider from "./context/UserPrivider";
// ===================== Pibliotique ===================
function App() {
  return (
    <>
   <UserProvider>
    <Routes>
      <Route path="/" element={<Homepage  />}/>
      <Route path="/register" element={<RegisterPage  />} />
      <Route path="/createpost" element={<CreatePost/>}/>
      <Route path="/Showpost/:idPost" element={<Showpost/>} />
      <Route path="/profile/:idUser" element={<Profiel/>} />
      <Route path="*" element={<NotFound/>}/>
      </Routes>
   </UserProvider>
   </>
  )
}
export default App
