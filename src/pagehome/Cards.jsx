// ============================================== card  ======================================  
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
// ============================================== card  ======================================  
export default function Cards({profil_image , useNam , coment , srcs ,  created_at , tages})
{
   let tag = tages.map((el)=>{
    return <button className="m-1 bg-gray-400 text-white rounded-3xl p-1">{el}</button>;
   })
  

    return(
        <>
        {/* ============================================== card  ======================================  */}
          <Card sx={{ minWidth: 345 , borderRadius:2 , marginTop:1.3  }}>
             
      
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
         rum rerum voluptate officiis magnam, necessitatibus et quos quibusdam error animi commodi placeat fuga maxime dignissimos velit!
        </Typography>
        <p className='w-[90%] h-0.5 bg-gray-600 mt-1 ml-1.5'></p>
      </CardContent>
      <CardActions disableSpacing>
        <BorderColorIcon aria-label="add to favorites" /> ({coment}) comment
            {tag}
      </CardActions>
     
    </Card>
          {/* ============================================== card  ======================================  */}


        </>
    )

}