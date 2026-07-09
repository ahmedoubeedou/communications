// ====================== ui of mui ===========================
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import HomeIcon from '@mui/icons-material/Home';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import Alert from '@mui/material/Alert';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
// =================================== hoks ================================================
import {  useRef, useState } from 'react';
// =================================== hoks ================================================
import "./post.css";
import axios from 'axios';
import { Link } from 'react-router-dom';
export default function CreatePost()
{
    
    // const [postInformation , setpost]
    const changeInputvalue = useRef(null)
    const [srcs , setSrcs ] = useState("/");
    const [shoisephoto , setShoisephoto ] = useState(false);
    const [postInformation , setPostInformation] = useState({titel:"",body:"",ImgeUrl:null}); 
    const [openSnackBarr , setOpenSnackBarr] = useState(false)
    const [messageSnackBar , setMessageSnackBar] = useState("")

    // ======================= debut logique apparait un image et disparait le button et le contraire ==================================
    function updateuifiel(event)
    {
         setSrcs(URL.createObjectURL(event.target.files[0]))
         setShoisephoto(true);
         setPostInformation({...postInformation , ImgeUrl:event.target.files[0]})
        //    console.log(event.target.files[0])
           
    }
      function updateuiphoto()
    {
       
        setShoisephoto(false);
        changeInputvalue.current.value="";
       
    }
    // ======================= fin logique apparait un image et disparait le button et le contraire ==================================
    const handleClose = ()=>{
         setTimeout(()=>{
     setOpenSnackBarr(false);
         },3000)
    }
        // ================= request cree un post ======================================

    async function  createpost()
    {
        const formDatas = new FormData();
        formDatas.append("body",postInformation.body)
        formDatas.append("image",postInformation.ImgeUrl)
        formDatas.append("title",postInformation.titel)
        // console.log("=================="+)
        const token = localStorage.getItem("token");
        
    //   console.log(postInformation)
    const headr = {
        "Authorization":`Bearer ${token}`,
        "Content-Type":"multipart/form-data"
    }
    try{
 await axios.post("https://tarmeezacademy.com/api/v1/posts",
         formDatas,{
         headers:headr
        }
    )
    updateuiphoto();
    setPostInformation({titel:"",body:"",ImgeUrl:{}})
    setMessageSnackBar("post cree");
    // setOpenSnackBarr(true);
    }
    catch(eror){
          let apiMessage = "erure de configuration";
        if(eror.responsee)
        {
                  apiMessage= eror.response.data.message;
        }
        else if(eror.request)
        {
                    apiMessage = "Essayer voter conexion";
        }
        
    //    console.error(eror.apiMessageponsee.data.message)

        setMessageSnackBar("post non cree "+apiMessage);
    }finally{
setOpenSnackBarr(true);  
handleClose();
    }
    }
    // ================= request cree un post ======================================
    // ===================== action pour le Snack barr ========================
    
     
  

    return(
    <>
     <Container maxWidth="sm" sx={{background:"#123" ,padding:"20px", minHeight:"100vh", display:"flex", justifyContent:"center", alignItems:"center" , overflow:"hidden"}}>
       <Container maxWidth="sm" sx={{background:"#eeeeee" , minHeight:"300px" , borderRadius:"20px",padding:"20px", display:"flex",gap:"2px",flexDirection:"column", justifyContent:"space-around", alignItems:"center"}}> 
           <Typography variant='h4' className='text-center text-black grow-2 flex items-center justify-center'>Cree votre Post</Typography>
           <div className='flex flex-col gap-4 w-[80%]grow-2 justify-around '>
           <TextField 
           id="outlined-basic" 
           label="Title" 
           variant="outlined"  
           value={postInformation.titel}
           onChange={(e)=>{setPostInformation({...postInformation , titel:e.target.value})}}
           />
           
           <textarea
           
           placeholder='Ecrire Votre Body' className='p-1 min-h-5 test-areas'
           value={postInformation.body}
           onChange={(e)=>{setPostInformation({...postInformation , body:e.target.value})}}
           ></textarea>
           <div></div>
           </div>
           <div className='w-[90%] border-sty min-h-22 bg-white relative overflow-hidden'>
            <input 
            ref={changeInputvalue}
            id="id-photo"
            type="file"
            className={`'w-full h-22  border-amber-100' ${shoisephoto?"hidden":"block"}`}
             placeholder='ll'
             onChange={updateuifiel}
             style={{ display: "none" }}
            />
            <label htmlFor="id-photo" className="text-[13px] sm:text-[16px] cursor-pointer ml-2" style={shoisephoto?{display:"none"}:{display:"inline"}}>
        Choisir une photo <span className="m-0.1 sm:m-1"></span>(.png.jpeg .jpg)
      </label>
           <div className={`'absolute icon-clos-photo text-start' ${shoisephoto?"block":"hidden"}`} >
 <CloseIcon sx={{color:"black",cursor:"pointer",fontSize:"26px"}} onClick={updateuiphoto}/>
           </div>
             
              <img src={srcs} alt="not" className={`'absolute inset-0' ${shoisephoto?"block":"hidden"}`} onClick={updateuiphoto}/>
              
           </div>
            <Stack direction="column" spacing={6}  sx={shoisephoto?{display:"flex"}:{display:"none"}}>
       <div></div>
      <Button variant="contained" endIcon={<SendIcon />}  onClick={createpost}>
        Cree
      </Button>
      {/* ============== message alert =============================== */}
        
    </Stack>
         
           <Link to="/">
             <div className='text-blue-600 underline hover:space-x-0.5 transition  cursor-pointer flex items-center justify-center '>
                 <HomeIcon sx={{color:"black", marginRight:"4px",marginLeft:"6px"}}/>
                Aller aux home page 
               
             </div>
             </Link>
                  <Alert icon={messageSnackBar === "post cree" ?<CheckIcon fontSize="inherit" />:<CloseIcon fontSize="inherit" color="red"/>} severity={messageSnackBar === "post cree"?"success":"error"} sx={openSnackBarr?{display:"flex"}:{display:"none"}} className='w-full'>
      {messageSnackBar}
    </Alert>
      </Container>

      </Container>
    </>
    )
}