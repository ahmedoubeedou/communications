export default function reducer(StateMaintenant, {type , payload}) {
 switch(type)
 {
    case "getAllPosts":
        {
           let copyData = [...StateMaintenant , ...payload.data]  
           return copyData;
        }
        case "delatePost":
            {
                let copyData = StateMaintenant.filter((el) => el.id !== payload.idPost)
                return copyData;
            }
        default : {
            throw "cette type n'existe pas "+type;
            
        }
       
 }
  
}