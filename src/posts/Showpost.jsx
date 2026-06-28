import {  Link, useLocation, useParams } from "react-router-dom";
import Card from "../pagehome/Cards";
import { Container } from "@mui/material";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import "./post.css";
import { useEffect, useState } from "react";
import axios from "axios";
export default function Showpost()
{
    const {idPost} = useParams()
    // creation de boleane si on aller a catche devient false 
    const [idPostNull , setIdPostNull ]= useState(false)
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
              
            },[])
    // ====================== GET posts avec leur donner ===================================

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