// ============================================== card  ======================================  
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import BorderColorIcon from '@mui/icons-material/BorderColor';

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
             
         <div className='flex gap-4 items-center  '>
            <div className='w-10 h-10 rounded-full flex items-center justify-center bg-amber-600 p-1 border-1 m-1 object-cover bg-cover'>
            <img src={profil_image} className='w-[40px] h-[40px] rounded-full bg-center  bg-size[100%]' />
            </div>
            <span>{useNam}</span>
         </div>
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