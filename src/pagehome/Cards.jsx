// ============================================== card  ======================================  
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { v4 as uuidv4 } from "uuid";
import CreateIcon from '@mui/icons-material/Create';
import {  Link} from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import "./page.css";
// import { Typography } from '@mui/material';
// ============================================== card  ======================================  
export default function Cards({id ,profil_image , body , useNam , coment , srcs ,  created_at , tages , comments=[],isUser, delatePost})
{

  
   let tag = tages.map((el)=>{
    return <button className="m-1 bg-gray-400 text-white rounded-3xl p-1">{el}</button>;
   })

  let urlShowPost = `/Showpost/${id}`;
    // ==================== comments ui ===============================
    let uiComments = comments.map((elment)=>{
        return  <Stack key={uuidv4()} direction="row" spacing={7} sx={{alignItems:"center" ,flexGrow:1,display:"flex" , margin:"10px"}}>
      <Avatar alt={elment.author.username != "" ?elment.author.username[0].toUpperCase():"a"} src = {elment.author?.profile_image || "non-photo.png"}  /> <br/>
      <Typography variant='subtitle1' sx={{fontSize:"16px"}}>{elment.body}</Typography>
    </Stack>
    })
    // let urlUpdate =`Editpost/${id}`
     
    return(
        <>
        {/* ============================================== card  ======================================  */}
          <Card sx={{ minWidth: 345 , borderRadius:2 , marginTop:1.3  }}>
             
      <Link  to={urlShowPost} state={"showpost"}>
         <Stack direction="row" spacing={1} sx={{alignItems:"center" ,flexGrow:1,display:"flex"}}>
      <Avatar alt="non photo" src = {profil_image}  />
      <Typography variant='subtitle1' sx={{fontSize:"16px"}}>{useNam}</Typography>
    </Stack>
      <CardMedia
        component="img"
        sx={{margin:"auto" , backgroundSize:"100%" ,backgroundPosition:"center" }}
        image={srcs}
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" sx={{ color: 'text.secondary', marginTop:-2 , marginLeft:-1.8 }}>
        { created_at}
        </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
         {body}
        </Typography>
        <p className='w-[90%] h-0.5 bg-gray-600 mt-1 ml-1.5'></p>
      </CardContent>
      </Link>
      <CardActions disableSpacing sx={{display:"flex" , justifyContent:"space-between",alignItems:"center"}}>
        <div>
           <BorderColorIcon aria-label="add to favorites" /> ({coment}) comment
            {tag} 
        </div>
        <div className="flex  gap-4">
        <Link to={urlShowPost} state={"updatepost"}>
       <div className={`${isUser ? "edit-mon-post":"hidden"}`}>     
       <CreateIcon sx={{color:"white" , fontSize:"30px"}}/>
       </div>
       </Link>
       
       <div className={`${isUser ? "delete-my-post":"hidden"}`} onClick={()=>{delatePost(id)}}>     
       <DeleteIcon  sx={{color:"white" , fontSize:"30px"}}/>
       </div>
       </div>
      </CardActions>
       {uiComments}
    </Card>
          {/* ============================================== card  ======================================  */}


        </>
    )

}