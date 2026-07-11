// import with mui
import Container from '@mui/material/Container';
import { Link } from 'react-router-dom';
// ============================================== appBar  ======================================  
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Cards from './Cards';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { information } from "../context/Userinformation";
import {pasDeProfiel} from "../constants/constants";
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
import DialogTitle from '@mui/material/DialogTitle';
// ======================== fin Dialog ==================
//=============== hooks =====================================
import { useEffect, useRef, useState , useReducer , useContext} from 'react';
//=============== hooks =====================================
//================== piblitique =================================
import { v4 as uuidv4 } from "uuid";
import { Typography } from '@mui/material';
//================== piblitique ================================
// ======================= reducer ================================
import reducer from '../reducers/homeReducer';
// ======================== reducer ================================
// ========================= service ==========================
import {Login , Lougout , DelatePoste , AllPosts}  from '../service/api';
// ========================= service ==========================
export default function Homepage({ getInformation }) {
    // ==================== Debut contxet ================================
  const {token , user}  = useContext(information)
  // ==================== Fin contxet ================================
  const elment = useRef(null);
  const [isData, setIsData] = useState(false);
  const [numberPage, setNumberPage] = useState(1);
  const [posts , dispatch] = useReducer(reducer, []);
  const [openDialog, setopenDialog] = useState(false)
  const [loading, setLoading] = useState(true);
  const [status , setStatus] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [openDialogSuprimer, setOpenDialogSuprimer] = useState(false);
  const [idPost, setIdPost] = useState(null);
   const profielLink = `/profile/`+user.id;
  const [informationLogin, setInformationLogin] = useState({
    use: "test4316",
    pasw: "token43"
  })

// ====================== close snackbar ==========================
function handleClose(){
    setOpenSnackbar(false);
  }
  // ====================== close snackbar ==========================
  // ====================== close dialog ==========================
    function handleCloseDialog() {
    setOpenDialog(false);
  }
// ====================== close dialog ==========================
  // ========================= utilisation Useefect pour get Post =======================================
  useEffect(()=>{
    let isActive = true; 
    setLoading(true);
    async function amenerTousPosts()
    {  
    try {
    let resp =  await AllPosts(numberPage);
          if (!isActive) return;
          if (resp.data.data.length > 0) {
            
            dispatch({ type: "getAllPosts", payload: {data:resp.data.data} });
            setIsData(true);
          }
          else {
            setIsData(false);
          }
          setLoading(false);
        } catch (erorr) {
      console.error(erorr)
    }
    }
     amenerTousPosts();
 return () => {
    isActive = false;
  };
  }, [numberPage])
  // ========================= utilisation Useefect pour get Post =======================================
  // ==================== debut logique Dialog ===============
  function handleOpenDialog() {   
    setopenDialog(true);
  }
  // ==================== fin logique Dialog ===============
  // ================== debut Login ====================
  async function LoginCount() {
    try {
      let response = await Login(informationLogin.use , informationLogin.pasw)
          getInformation(response.data.token , response.data.user);        
          setInformationLogin({ use: "", pasw: "" })
    } catch (erore) {
      console.error(erore)
    }
    setopenDialog(false)
  }
  // ================== fin Login ====================
  // =================== Lougout ========================
  function logout() {
  Lougout();
  getInformation("" , { username: "", profile_image: pasDeProfiel });
  }
  // =================== Lougout ========================
  // =============== logique pour suprimer post =========================
  // ================= delate ===========================
   async function delatePost()
  {
   try{
    let response = await DelatePoste(idPost , token)
 dispatch({ type: "delatePost", payload: {idPost : idPost} });
    setStatus(response);
    setOpenSnackbar(true);
    }
    catch(error){
      console.error(error);
      setStatus(false);
      setOpenSnackbar(true);
    }
  }
  // ================= delate ===========================
  function handleCloseSuprimer()
  {
    setOpenDialogSuprimer(false);
  }
  function handleOpenSuprimer(idPost)
  {
 setIdPost(idPost);
    setOpenDialogSuprimer(true);
  }
  function handleConfirmSuprimer()
  {
    delatePost();
    setOpenDialogSuprimer(false);
  }
  // ============== logique pour suprimer post =========================
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (isData && entry.isIntersecting && !loading) {
          setNumberPage((n) => n + 1);       
        }
      }
    )
    if (elment.current) {
      observer.observe(elment.current);
    }
    return () => observer.disconnect();
}, [isData, loading])
  // ========================= ui  get Post  =======================================
  let post = posts.map((el) => {
    const imageUrl = typeof el.image === 'string' ? el.image : null; 
  const avatarUrl = typeof el.author.profile_image === 'string' ? el.author.profile_image : null;
    return  <Cards key={uuidv4()} body={el.body} id={el.id} created_at={el.created_at} profil_image={avatarUrl} tages={el.tags} isUser={user.email === el.author.email} useNam={el.author.username} coment={el.comments_count} srcs={imageUrl} delatePost={handleOpenSuprimer} />
  })
  // je essaie de faire une page unique pour update post et showPost  state={"showPost"}
  // ========================= ui  get Post =======================================
  return (
    <>
      <Container maxWidth="sm" >
        {/* ============================================== debut appBar  ======================================  */}
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static" sx={{ borderRadius: 2, backgroundColor: "#e0e0e0", marginTop: 1 }}>
            <Toolbar sx={{ color: 'black', gap: 1, cursor: "pointer" }}>
              <h5 className='grow sm:text-3xl ' >Baba</h5>
              <p className='grow sm:text-2xl hover:underline hover:text-[#123] transition'>Home</p>
             <Link to={profielLink}> <p className='grow sm:text-2xl hover:underline hover:text-[#123] transition'>Profile</p></Link>
              {/* <Button variant="contained"  size="small"  color="success">Login</Button> */}
              <Button size="small" className='ml-2 login-class ' sx={token === "" ? { display: "block" } : { display: "none" }} onClick={handleOpenDialog}> Login</Button>
              <Link to="/register"> <Button size="small" className='ml-2 login-class' sx={token === "" ? { display: "block" } : { display: "none" }}>Register</Button></Link>
              <Stack direction="row" spacing={0.1} sx={token !== "" ? { alignItems: "center", flexGrow: 1, display: "flex" } : { display: "none" }}>
                <Avatar alt={user.username != "" ? user.username[0].toUpperCase() : "a"} src={user.profile_image} />
                <Typography variant='subtitle1' sx={{ fontSize: "16px" }}>{user.username.length > 5 ? user.username.slice(0, 5) : user.username}</Typography>
              </Stack>
              <Button size="small" sx={token !== "" ? { border: "1px solid blue", paddingLeft: 0.3, paddingRight: 0.3, display: "block" } : { display: "none" }} onClick={logout} className='logout' >Logout</Button>

            </Toolbar>
          </AppBar>
        </Box>
        {/* ============================================== fin appBar  ======================================  */}
        {/* ======================== debut posts =============================================*/}
        {post}

        <div id="test" ref={elment} className='h-0.5 w-full bg-red'>

        </div>
        {/* ========================= fin posts =============================================== */}

        {/* ========================================== debut Diailog ====================================== */}
        <Dialog open={openDialog} onClose={handleCloseDialog} disableRestoreFocus>
          <DialogTitle className='text-center' >Login</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              required
              margin="dense"
              sx={{
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
              onChange={(e) => { setInformationLogin({ ...informationLogin, use: e.target.value }) }}
            />
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              name="email"
              label="Password"
              sx={{ "& .MuiFormLabel-asterisk": { display: "none" } }}
              type="password"
              fullWidth
              variant="standard"
              value={informationLogin.pasw}
              onChange={(e) => { setInformationLogin({ ...informationLogin, pasw: e.target.value }) }}
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
          <div className={`w-12 items-center justify-center h-12 rounded-full bg-blue-700 cursor-pointer fixed bottom-0  right-0  mb-2 mr-1 sm:mb-4 sm:mr-4  hover:bg-blue-600 hover:text-amber-50 text-white transition ${token ? "flex" : "hidden"}`}>
            <AddIcon sx={{ color: "while", fontSize: "38px" }} />
          </div>
        </Link>

      {/* ========================================== fin Add post ==================================== */}
      <Snackbar
              open={openSnackbar}
              autoHideDuration={2000}
              onClose={handleClose}
            >
             {  status ?  <Alert severity="success">Post supprimé avec succès</Alert> : <Alert severity="error">Erreur lors de la suppression du post</Alert>}
              </Snackbar>
                {/* //  ========================= Dialog ======================================= */}
     <Dialog
        open={openDialogSuprimer}
        onClose={handleCloseSuprimer}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        role="alertdialog"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            si tu supprime ce post il sera supprimé définitivement et tu ne pourra pas le récuperer
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseSuprimer}>
            Annuler
          </Button>
          <Button onClick={handleConfirmSuprimer} sx={{color:"red"}}>Suprimer</Button>
        </DialogActions>
      </Dialog>
    {/* // ======================== Dialog =======================================  */}
      </Container>
    </>
  )
}