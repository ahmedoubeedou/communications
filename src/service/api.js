import axios from 'axios';
export  async function  Login(username , password)
{
     let response = await axios.post("https://tarmeezacademy.com/api/v1/login",
        {
          "username": username,
          "password": password
        })
          localStorage.setItem("token", response.data.token)
          localStorage.setItem("user", JSON.stringify(response.data.user))
          return response;   
}
export  function Lougout()
{
 localStorage.removeItem("token");
 localStorage.removeItem("user");
}

export async function DelatePoste(idPost , token)
{

   await axios.delete(`https://tarmeezacademy.com/api/v1/posts/${idPost}` , {
      headers: {
        "Authorization": `Bearer ${token}`  
  } })
  return true;
}
export async function AllPosts(numberPage)
{
   let response = await axios.get(`https://tarmeezacademy.com/api/v1/posts?page=${numberPage}`)
   return response;
}

export async function getUserPostsApi(id){
 let response = await axios.get(`https://tarmeezacademy.com/api/v1/users/${id}/posts`)
 return response;
}

export async function getUser(id)
{
    let response = await axios.get(`https://tarmeezacademy.com/api/v1/users/${id}`);
       return response;
}

export async function CreatePostApi(body , imageUrl , titel , token)
{
      const formDatas = new FormData();
        formDatas.append("body",body)
        formDatas.append("image",imageUrl)
        formDatas.append("title",titel)
        const headr = {
        "Authorization":`Bearer ${token}`,
        "Content-Type":"multipart/form-data"
    }
         await axios.post("https://tarmeezacademy.com/api/v1/posts",
         formDatas,{
         headers:headr
        }
    )
}
export async function getPostUser(idPost)
{
   const response = await  axios.get(`https://tarmeezacademy.com/api/v1/posts/${idPost}`);
   return response;
}

export async function CreateComentaire(bodyComantaire , token , idPost)
{
const headr = {
        "Authorization":`Bearer ${token}`,
    }
      await  axios.post(`https://tarmeezacademy.com/api/v1/posts/${idPost}/comments` , 
        {
    "body": bodyComantaire
}, {headers:headr})
}

export async function UpdatePost(idPost , bodyComantaire , token)
{
        const headr = {
        "Authorization":`Bearer ${token}`  , 
    }
   await  axios.put(`https://tarmeezacademy.com/api/v1/posts/${idPost}` , 
        {
    "body": bodyComantaire
}, {headers:headr}
)
}

export async function EnvoyerInformation(urlProfiel , username , password , name , email)
{
     let formDat = new FormData()
    formDat.append("username",username)
    formDat.append("password",password)
    if(urlProfiel)
    {
    formDat.append("image",urlProfiel)
    }

    formDat.append("name",name)
    formDat.append("email",email)
 let response =  await axios.post("https://tarmeezacademy.com/api/v1/register",
       formDat
       )
        localStorage.setItem("token",response.data.token)
        localStorage.setItem("user",JSON.stringify(response.data.user));
      return response;
}