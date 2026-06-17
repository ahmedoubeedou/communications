// import with mui
import Container from '@mui/material/Container';
import { Link } from 'react-router-dom';
// ============================================== appBar  ======================================  
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Cards from './Cards';
// ============================================== appBar  ====================================== 
// ================= photo utilisateur =========================

import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
// ================= photo utilisateur =========================
// ============================ button add Post ===========================
import AddIcon from '@mui/icons-material/Add';
// ============================ button add Post===========================
// =========================== dialog =========================
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
// ======================== fin Dialog ==================
//=============== hooks =====================================
import { useEffect, useState } from 'react';
//=============== hooks =====================================
//================== piblitique =================================
import { v4 as uuidv4 } from "uuid";
import axios from 'axios';
import { Typography } from '@mui/material';
//================== piblitique ================================


export default function Homepage({getInformation}){
const [posts , setPost] = useState([]);
const [openDialog , setopenDialog] = useState(false)
const [userInformation , setUerInformation] = useState(()=>{
  try{
    const userinfor = localStorage.getItem("user");
    return userinfor ? JSON.parse(userinfor):{username:"",profile_image:""};
  }catch(er)
  {
        console.error(er)
    return {username:"",profile_image:""};
  }
})
const [informationLogin , setInformationLogin] = useState({
    use:"test4316",
    pasw : "token43"
})
const [token , setToken] = useState( localStorage.getItem("token") === null ?"" : localStorage.getItem("token") )
// ==================== Debut getTokenLocalStorage ================================
// ==================== Fin getTokenLocalStorage ================================
// ========================= ui  get Post =======================================
  let post =  posts.map((el)=>{
    
       return <Cards key={uuidv4()}  created_at={el. created_at} profil_image={el.author.profile_image} tages={el.tags} useNam={el.author.username} coment={el.comments_count} srcs = {el.image}/>
    })
// ========================= ui  get Post =======================================
// ========================= utilisation Useefect pour get Post =======================================
    useEffect(()=>{
        try{
           
  axios.get("https://tarmeezacademy.com/api/v1/posts")
         .then((resp)=>{
            // console.log(resp.data.data)
            // uiPost(resp.data.data)
              setPost( resp.data.data)
         })
       
        }catch(erorr)
        {
            console.error(erorr)
        }
       
    } , [])
// ========================= utilisation Useefect pour get Post =======================================
// ==================== debut logique Dialog ===============
function handleCloseDialog()
{
    setopenDialog(false)
}
function handleOpenDialog(){
 setopenDialog(true);
}
// ==================== fin logique Dialog ===============
// ================== debut Login ====================
function LoginCount()
{
    // console.log(informationLogin.use , informationLogin.pasw);
    try{
    axios.post("https://tarmeezacademy.com/api/v1/login",
{
     "username" : informationLogin.use,
    "password" : informationLogin.pasw
}).then((response)=>{
    // console.log(response)
    localStorage.setItem("token" , response.data.token)
    localStorage.setItem("user" , JSON.stringify( response.data.user))
    setToken(response.data.token)
     getInformation(response.data.token);
    setUerInformation(response.data.user);
    // console.log(response.data)
     setInformationLogin({   use:"", pasw : ""})
})
    }catch(erore)
    {
        console.error(erore)
    }
   
    setopenDialog(false)
}
// ================== fin Login ====================
// =================== Lougout ========================
function logout()
{
localStorage.removeItem("token");
localStorage.removeItem("user");
setToken("");
}
// =================== Lougout ========================
    return (
        <>
          <Container maxWidth="sm" >
              {/* ============================================== debut appBar  ======================================  */}
                 <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{borderRadius:2 , backgroundColor:"#e0e0e0"  ,marginTop:1}}>
        <Toolbar sx={{color:'black' , gap:1 , cursor:"pointer"}}>
        <h5 className='grow sm:text-3xl ' >Baba</h5>
        <p  className='grow sm:text-2xl hover:underline hover:text-[#123] transition'>Home</p>
        <p  className='grow sm:text-2xl hover:underline hover:text-[#123] transition'>Profile</p>
          {/* <Button variant="contained"  size="small"  color="success">Login</Button> */}
            <Button size="small" className='ml-2 login-class ' sx={token === "" ? {display:"block"}:{display:"none"}}  onClick={handleOpenDialog}> Login</Button>
         <Link to="/register"> <Button size="small" className='ml-2 login-class' sx={token === "" ? {display:"block"}:{display:"none"}}>Register</Button></Link>
            <Stack direction="row" spacing={0.1} sx={token !== "" ?{alignItems:"center" ,flexGrow:1,display:"flex"}:{display:"none"}}>
      <Avatar alt={userInformation.username != "" ?userInformation.username[0].toUpperCase():"a"} src = {userInformation.profil_image}  />
      <Typography variant='subtitle1' sx={{fontSize:"16px"}}>{userInformation.username}</Typography>
    </Stack>
          <Button size="small" sx={token !== "" ?{ border:"1px solid blue" , paddingLeft:0.3,paddingRight:0.3 , display:"block"} : {display:"none"}} onClick={logout} className='logout' >Logout</Button>
       
        </Toolbar>
      </AppBar>
    </Box>
          {/* ============================================== fin appBar  ======================================  */}
          {/* ======================== debut posts =============================================*/}
         {post}
         {/* ========================= fin posts =============================================== */}

         {/* ========================================== debut Diailog ====================================== */}
           <Dialog open={openDialog} onClose={handleCloseDialog} disableRestoreFocus>
        <DialogTitle className='text-center' >Login</DialogTitle>
        <DialogContent>
         
            <TextField
              autoFocus
              required
              margin="dense"
              sx = {{
      // On cible la classe spécifique de l'étoile générée par MUI
      '& .MuiFormLabel-asterisk': {
        display: 'none',
      },
              }}
              id="name"
              name="text"
              label="userName"
              type="text"
              fullWidth
              variant="standard"
              value={informationLogin.use}
              onChange={(e)=>{setInformationLogin({...informationLogin , use:e.target.value})}}
            />

            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              name="email"
              label="Password"
              sx={{"& .MuiFormLabel-asterisk":{display:"none"}}}
              type="password"
              fullWidth
              variant="standard"
               value={informationLogin.pasw}
              onChange={(e)=>{setInformationLogin({...informationLogin , pasw:e.target.value})}}
            />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={LoginCount}>
            Login
          </Button>
        </DialogActions>
      </Dialog>
               {/* ========================================== fin Diailog ====================================== */}
               {/* ========================================== debut Add post ==================================== */}
               <Link to="/createpost">
                <div className={`w-12 items-center justify-center h-12 rounded-full bg-blue-700 cursor-pointer fixed bottom-0  right-0  mb-2 mr-1 sm:mb-4 sm:mr-4  hover:bg-blue-600 hover:text-amber-50 text-white transition ${token?"flex":"hidden"}`}>
                 <AddIcon sx={{color:"while" , fontSize:"38px"}} />
                </div>
                </Link>
                {/* ========================================== fin Add post ==================================== */}
      </Container>
        </>
    )
}