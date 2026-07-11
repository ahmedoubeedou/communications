import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import { useParams , Link } from "react-router-dom";
import { useEffect, useState , useContext } from "react";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Snackbar from '@mui/material/Snackbar';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { information } from "../context/Userinformation";
import Button from '@mui/material/Button';
import "./page.css";
import Card from "./Cards";
import { v4 as uuidv4 } from "uuid";
import Alert from '@mui/material/Alert';
import {DelatePoste , getUserPostsApi , getUser}  from '../service/api';
export default function Profiel()
{
    const { idUser } = useParams();
    const [idUserNull , setIdUserNull ]= useState(false)
    const [userInformation , setUserInformation] = useState({username:"",name:"",email:"",profile_image:"/"})
    const [userPosts , setUserPosts] = useState([])
    const [open , setOpen] = useState(false);
    const [status , setStatus] = useState(false);
    const [idPost , setIdPost] = useState(null);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const {token,user} = useContext(information)

   async function delatePost(id)
  {
    try{
        let response = await DelatePoste(id , token);
       setStatus(response);
         setOpenSnackbar(true);
    } 
    catch(erore)
    {
      console.error(erore)
        setStatus(false);
      setOpenSnackbar(true);
    }
  }
  function handleCloseSuprimer() {
    delatePost(idPost);
    setOpen(false);
  }
  function handleClickOpen(id) {
    setIdPost(id);
    setOpen(true);
  }
  function handleClose(){
    setOpenSnackbar(false);
  }
  function handleCloseDialog() {
    setOpen(false);
  }
    async function getUserPosts()
    {
      try{
 let response = await getUserPostsApi(idUser);
      setUserPosts(response.data.data)
      setIdUserNull(true)
      }  catch(error)
      {
     console.error(error);
      }
    }
     useEffect(()=>{
      async function getUserPost()
      {
        try{     
        let response = await getUser(idUser)
                setUserInformation(response.data.data)
                getUserPosts();
           } catch(error){
                console.error(error);
                setIdUserNull(true)
            }
             }
             getUserPost();
    },[status])  
    let userPost = userPosts.map((el)=>{
           return  <Card  key={uuidv4()} body={el.body} id={el.id} created_at={el.created_at} profil_image={el.author.profile_image} tages={el.tags} isUser={userInformation.email === el.author.email} useNam={el.author.username} coment={el.comments_count} srcs={el.image} delatePost={handleClickOpen} />
    })
    if(idUserNull)
    {
 return(
       
        <Container maxWidth="sm" sx={{ display: "flex", flexDirection: "column" , background: "#123", alignItems: "center",minHeight: "100vh" }}>
            <h2 className='text-3xl text-white m-3  p-3' >Bienvenue {userInformation.username}</h2>
            <Stack direction="row" spacing={2} sx={{width:"98%" , height:"160px" , justifyContent:"space-between", alignItems:"center", padding:"1px 10px"}} >
<img src={userInformation?.profile_image} alt="Non img" className='image-profile text-white text-center text-[12px]'/>
<div>
    <p className='text-white'> <span className='font-bold'>userNom</span> : {userInformation.username}</p>
    <p className='text-white'><span className='font-bold'>Nom</span> : {userInformation.name}</p>
    <p className='text-white'><span className='font-bold'>Email</span> : {userInformation.email}</p>
</div>

            </Stack>
            <h2 className='m-2 text-white font-bold'>Votre Posts</h2>
           {userPost}
           <Link to="/">
<div className="link-home-page-profiel">
    Aller aux Home page <ArrowForwardIcon/>
</div>
</Link>

<Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={handleClose}
      
     
      >
       {  status ?  <Alert severity="success">Post supprimé avec succès</Alert> : <Alert severity="error">Erreur lors de la suppression du post</Alert>}
        </Snackbar>
            {/* //  ========================= Dialog ======================================= */}
     <Dialog
        open={open}
        onClose={handleClose}
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
          <Button onClick={handleCloseDialog}>
            Annuler
          </Button>
          <Button onClick={handleCloseSuprimer} sx={{color:"red"}}>Suprimer</Button>
        </DialogActions>
      </Dialog>
    {/* // ======================== Dialog =======================================  */}
        </Container>
    )
    }
    else{
        return (
               <Container maxWidth="sm" sx={{ display: "flex", flexDirection: "column" , background: "#123", alignItems: "center",height: "100vh" }}>
            <h2 className='text-3xl text-white m-3  p-3' >Cette ID n'existe pas</h2>
           
       
           <Link to="/">
<div className="link-home-page-profiel">
    Aller aux Home page <ArrowForwardIcon/>
</div>
</Link>
        </Container>
        )
    }
   
}