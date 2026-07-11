import {  Link,  useParams , useLocation} from "react-router-dom";
import Card from "../pagehome/Cards";
import { Button, Container } from "@mui/material";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import "./post.css";
import { useContext, useEffect, useState  } from "react";
import Fab from '@mui/material/Fab';
import EditIcon from '@mui/icons-material/Edit';
import SendIcon from '@mui/icons-material/Send';
import TextField from '@mui/material/TextField';
import { information } from "../context/Userinformation";
import {getPostUser , CreateComentaire , UpdatePost} from "../service/api";
export default function Showpost()
{
    const token = useContext(information);
    const {idPost} = useParams()
    const informationPost  = useLocation();
    const ShowOrUpdate = informationPost.state;
    const [idPostNull , setIdPostNull ]= useState(false)
    const [comentaireAjouter , setComentaireAjouter] = useState(false)
    const [bodyComantaire , setBodyComantaire ] = useState("");
    const [ecrireComantaire , setEcrireComantaire] = useState(false);
    const [postInformation , setPostInformation] = useState({comments:[],
tags:[],author:{
        profile_image:"",
        username:""
    }})
    // ====================== GET posts avec leur donner ===================================
    useEffect(()=>{
        async function getPostUserId()
        {
try{
const response = await getPostUser(idPost);
 setPostInformation(response.data.data)
                  }catch(error){  
  console.error(error);
  setIdPostNull(true)
                  }
        }
        getPostUserId();
            },[comentaireAjouter])
    // ====================== GET posts avec leur donner ===================================
// ================================ Create comentaire =================================
async function createComentaire()
{
try{
await CreateComentaire(bodyComantaire , token , idPost);
}
catch(error){
    console.error(error);
}
setEcrireComantaire(false)
setComentaireAjouter(true);
}
// ================================ Create comentaire =================================
// ================= update Post ==========================================
async function updatePost(){
   try{
    await UpdatePost(idPost , bodyComantaire , token)
   }
catch(error){
    console.error(error);
}
setEcrireComantaire(false)
setComentaireAjouter(true);
}
// ================= update Post ==========================================
   if(idPostNull)
   {
    return (
    <>
 <Container maxWidth="sm" sx={{ height:"100vh", gap:"6px" ,display:"flex",flexDirection:"column", alignItems:"center" , justifyContent:"space-around"}}>
    <div><h3 className="text-2xl font-bold text-gray-800 tracking-wide text-center mb-7 w-full border-b-2 border-blue-500 pb-2 inline-block hover:text-blue-500 transition-colors duration-300 cursor-default">
   Post n'existe pas
</h3>

</div>
<Link to="/">
<div className="link-home-page">
    Aller aux Home page <ArrowForwardIcon/>
</div>
</Link>
</Container>
    </>
    )
   }
   if(!idPostNull) { 
    return (
    <>
 <Container maxWidth="sm" sx={{ height:"100vh", gap:"6px" ,display:"flex",flexDirection:"column", alignItems:"center" , justifyContent:"space-around"}}>
    <div><h3 className="text-2xl font-bold text-gray-800 tracking-wide text-center mb-7 w-full border-b-2 border-blue-500 pb-2 inline-block hover:text-blue-500 transition-colors duration-300 cursor-default">
   {postInformation.author.username} Post {ShowOrUpdate==="showpost"? "View":"Modifier"}
</h3>
<Card body={postInformation.body} created_at={postInformation.created_at} profil_image={postInformation.author.profile_image} tages={postInformation.tags} useNam={postInformation.author.username} coment={postInformation.comments_count} srcs = {postInformation.image} comments={postInformation.comments} />
 {/* ==============  */}
<div className={`w-full  justify-around items-center m-2 ${ecrireComantaire ? "hidden":"flex"}`}>
<p className="text-base font-medium text-gray-600 flex items-center gap-2 hover:text-blue-500 transition-colors duration-300 cursor-pointer">
{ShowOrUpdate==="showpost"? "Ajouter un commentaire":"Modifier le body du post"}
  
</p>
 <Fab color="secondary" aria-label="edit" onClick={()=>{setEcrireComantaire(true)}} >
        <EditIcon  />
      </Fab>
    </div>  
     {/* ==============  */}
    {/* ==============  */}
    <div className={`w-full  justify-around items-center mt-4 ${ecrireComantaire ? "flex":"hidden"}`}>
        <TextField id="outlined-basic" label={ShowOrUpdate==="showpost"? "Ajouter un commentaire":"Modifier le body du post"} variant="outlined" value={bodyComantaire} onChange={(event)=>{setBodyComantaire(event.target.value)}}/>
         <Button variant="contained" endIcon={<SendIcon />} onClick={ShowOrUpdate==="showpost" ? createComentaire : updatePost}>
  Envoyer
</Button>

    </div>
       {/* ==============  */}
</div>
<Link to="/">
<div className="link-home-page">
    Aller aux Home page <ArrowForwardIcon/>
</div>
</Link>
</Container>
    </>
    )
}
}