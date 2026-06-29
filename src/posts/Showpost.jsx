import {  Link,  useParams , useLocation} from "react-router-dom";
import Card from "../pagehome/Cards";
import { Button, Container } from "@mui/material";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import "./post.css";
import { useEffect, useState  } from "react";
import Fab from '@mui/material/Fab';
import EditIcon from '@mui/icons-material/Edit';
import SendIcon from '@mui/icons-material/Send';
import TextField from '@mui/material/TextField';
import axios from "axios";
export default function Showpost()
{
    const {idPost} = useParams()
    // const ShowPost = useLocation();
    // console.log(ShowPost.state)
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
                
                    axios.get(`https://tarmeezacademy.com/api/v1/posts/${idPost}`)
                  .then((res)=>{
 setPostInformation(res.data.data)
 
                  }).catch((error)=>{      
  console.error(error);
  setIdPostNull(true)
                  })
              
            },[comentaireAjouter])
    // ====================== GET posts avec leur donner ===================================
// ================================ Create comentaire =================================
async function createComentaire()
{
    const token = localStorage.getItem("token")
    const headr = {
        "Authorization":`Bearer ${token}`,
        "Content-Type":"multipart/form-data"
    }
   await  axios.post(`https://tarmeezacademy.com/api/v1/posts/${idPost}/comments` , 
        {
    "body": bodyComantaire
}, {headers:headr}
).catch((error)=>{
    console.error(error);
})
console.log("comment ajouter ")
setEcrireComantaire(false)
setComentaireAjouter(true);
}
// ================================ Create comentaire =================================

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
   {postInformation.author.username} Post
</h3>
<Card body={postInformation.body} created_at={postInformation.created_at} profil_image={postInformation.author.profile_image} tages={postInformation.tags} useNam={postInformation.author.username} coment={postInformation.comments_count} srcs = {postInformation.image} comments={postInformation.comments} />
 {/* ==============  */}
<div className={`w-full  justify-around items-center m-2 ${ecrireComantaire ? "hidden":"flex"}`}>
<p className="text-base font-medium text-gray-600 flex items-center gap-2 hover:text-blue-500 transition-colors duration-300 cursor-pointer">
  
  Ajouter un commentaire
</p>
 <Fab color="secondary" aria-label="edit" onClick={()=>{setEcrireComantaire(true)}} >
        <EditIcon  />
      </Fab>
    </div>  
     {/* ==============  */}
    {/* ==============  */}
    <div className={`w-full  justify-around items-center mt-4 ${ecrireComantaire ? "flex":"hidden"}`}>
        <TextField id="outlined-basic" label="VoterComment" variant="outlined" value={bodyComantaire} onChange={(event)=>{setBodyComantaire(event.target.value)}}/>
         <Button variant="contained" endIcon={<SendIcon />} onClick={createComentaire}>
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