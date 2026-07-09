import axios from 'axios';
export  async function  Login(username , password)
{
 
    try{
     let response = await axios.post("https://tarmeezacademy.com/api/v1/login",
        {
          "username": username,
          "password": password
        })
          localStorage.setItem("token", response.data.token)
          localStorage.setItem("user", JSON.stringify(response.data.user))
          return response;
        // })
    }   
    catch(error)
    {
       console.error("Erure de Login Count : "+error)
    } 
}
export  function Lougout()
{
 localStorage.removeItem("token");
 localStorage.removeItem("user");
}

export async function DelatePoste(idPost , token)
{
try{
   await axios.delete(`https://tarmeezacademy.com/api/v1/posts/${idPost}` , {
      headers: {
        "Authorization": `Bearer ${token}`  
  } })
  return true;
} catch(eror)
{
    console.error(eror);
    return false;
}
}
export async function AllPosts(numberPage)
{
   let response = await axios.get(`https://tarmeezacademy.com/api/v1/posts?page=${numberPage}`)
   return response;
}

export async function getUserPostsApi(id){
    try{
 let response = await axios.get(`https://tarmeezacademy.com/api/v1/users/${id}/posts`)
 return response;
    }catch(erore)
    {
        console.error(erore);
    }
}

export async function getUser(id)
{
    try{
        
    let response = await axios.get(`https://tarmeezacademy.com/api/v1/users/${id}`);
       return response;
    }catch(error){
   console.error(error);
    }
    

}