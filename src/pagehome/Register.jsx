import { useState , useRef  } from "react";
import {TextField,Button,CircularProgress, Divider} from "@mui/material";
import {   HowToRegOutlined} from "@mui/icons-material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import InputAdornment from '@mui/material/InputAdornment';
import HttpsIcon from '@mui/icons-material/Https';
import PersonIcon from '@mui/icons-material/Person';
import MarkEmailUnreadIcon from '@mui/icons-material/MarkEmailUnread';
import Container from '@mui/material/Container';
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import LoginIcon from '@mui/icons-material/Login';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import Alert from '@mui/material/Alert';
import { Link } from "react-router-dom";
import {EnvoyerInformation} from "../service/api"
function getStrength(pwd) {
  if (!pwd) return 0;
  let s = 0;
  if (pwd.length >= 8) s++;
  if (/[A-Z]/.test(pwd)) s++;
  if (/[a-z]/.test(pwd)) s++;
  if (/[0-9]/.test(pwd)) s++;
  if (/[^A-Za-z0-9]/.test(pwd)) s++;
  return s;
}
const FIELD_SX = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "12px",
    backgroundColor: "rgba(255,255,255,0.03)",
    color: "black",
    fontSize: "14px",
    "& fieldset": { borderColor: "rgba(255,255,255,0.1)" },
    "&:hover fieldset": { borderColor: "rgba(139,92,246,0.45)" },
    "&.Mui-focused fieldset": { borderColor: "#8b5cf6", borderWidth: "1.5px" },
    "&.Mui-error fieldset": { borderColor: "rgba(239,68,68,0.7)" },
  },
  "& .MuiInputLabel-root": { color: "#64748b", fontSize: "14px" },
  "& .MuiInputLabel-root.Mui-focused": { color: "#a78bfa" },
  "& .MuiInputLabel-root.Mui-error": { color: "#f87171" },
  "& .MuiFormHelperText-root": { fontSize: "12px", ml: "2px" },
  "& .MuiInputAdornment-root svg": { fontSize: "19px", color: "#475569" },
};
export default function RegisterPage() {
  const [form, setForm] = useState({ name: "", email: "", username: "", password: "" });
  const [errors, setErrors] = useState({});
  const [showPwd, setShowPwd] = useState(false);
 const[fortpas , setFortpass] = useState(getStrength(form.password))
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
const [messsage , setMessage ] = useState(false);
const [entrer , setEntrer ] = useState(false);
const [messageValide , setMessageValide] = useState("");
// ======================= phot ==========
const [preview, setPreview] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef(null);
 const [urlProfiel , setUrlProfiel] = useState(null);
  const handleFile = (file) => {
    if (!file || !file.type.startsWith("image/")) return;
    const url = URL.createObjectURL(file);
    
    setPreview(url);
    setUrlProfiel(file);
  };
 
  const handleChangePhoto = (e) => handleFile(e.target.files[0]);
 
  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    handleFile(e.dataTransfer.files[0]);
  };
  // ======================== fin ===================
  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Le nom complet est requis.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Adresse e-mail invalide.";
    if (form.username.length < 3) e.username = "Minimum 3 caractères.";
    if (form.password.length < 6) e.password = "Minimum 6 caractères.";
    return e;
  };

  const handleChange = ({ target: { name, value } }) => {

    if(name === "password")
    {
      setFortpass(getStrength(value));
     
    }
    if(messsage) setMessage(false);
    setForm((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
     setLoading(true);
    await new Promise((r) => setTimeout(r, 2000));
     setLoading(false);
    setSuccess(true)
    
    
  };
  // ========================= counte prais ================
  if(entrer)
  {
    return(
      <>
     <Container 
      maxWidth="sm" 
      sx={{ 
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center", 
        height: "100vh",
       
        background: "#123" 
      }}
    >
   
      <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 text-center max-w-xs w-full transform transition-all hover:scale-105 duration-300">
        <div className="w-16 h-16 bg-[#123] text-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-inner">
         <LoginIcon sx={{color:"white" , fontSize:"40px"}}/>
        </div>
        <h1 className="text-2xl font-extrabold text-gray-800 mb-2 tracking-tight">
          Bienvenue
        </h1>
        <Link to="/">
        <button className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold text-lg py-3 px-6 rounded-2xl shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-indigo-500/30 hover:from-blue-600 hover:to-indigo-700 active:scale-95 transition-all duration-150 flex items-center justify-center gap-2 group">
          <span>Entrer</span>
          {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 transform group-hover:translate-x-1 transition-transform">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5l6 6m0 0l-6 6m6-6H3" />
          </svg> */}
        </button>
        </Link>
      </div>
    </Container>
      
      </>
    );
  }
  // ========================= counte prais ================
//===================== logique =========================
async function envoyerInformation()
{
  try{
   await EnvoyerInformation(urlProfiel , form.username , form.password , form.name , form.email)
        setEntrer(true);
  }
  catch(error){
    if (error.response) {
      
      console.error("Détails de l'erreur de validation :", error.response.data);
      setMessageValide(error.response.data.message)
      setMessage(true);
      
    } else {
      console.error("Erreur réseau ou autre :", error.message);
    }
setSuccess(false)
  }
}
  /* ── Success screen ── */
  if (success) {
    return (
     <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      {/* Ambient glow backdrop */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-violet-600/10 blur-[120px]" />
        <div className="absolute top-1/3 left-1/3 w-[300px] h-[300px] rounded-full bg-emerald-500/5 blur-[100px]" />
      </div>
      <div className="relative w-full max-w-md">
        {/* Card */}
        <div className="bg-[#f5f5f5] text-black backdrop-blur-xl border border-slate-700/50 rounded-3xl p-10 flex flex-col items-center text-center gap-6 shadow-2xl shadow-black/40">
 
          {/* Success badge */}
          <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-black text-xs font-medium px-3 py-1.5 rounded-full">
            {/* <CheckCircleOutlineIcon sx={{ fontSize: 14 }} /> */}
            Compte activé
          </div>
 
          {/* Photo upload zone */}
          <div className="flex flex-col items-center gap-3">
            {/* Hidden file input */}
            <input
              ref={inputRef}
              id="photo-upload"
              type="file"
              accept="image/*"
              className="sr-only"
              onChange={handleChangePhoto}
            />
 
            {/* Label acts as the clickable avatar */}
            <label
              htmlFor="photo-upload"
              onDrop={handleDrop}
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              className={`
                relative w-24 h-24 rounded-full cursor-pointer group
                ring-2 transition-all duration-300
                ${dragOver
                  ? "ring-violet-400 scale-105"
                  : "ring-slate-700 hover:ring-violet-500/60"
                }
              `}
            >
              {/* Avatar / preview */}
              {preview ? (
                <img
                  src={preview}
                  alt="Photo de profil"
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <div className="w-full h-full rounded-full text-black bg-slate-800 border border-slate-700 flex items-center justify-center">
                  <AccountCircleIcon sx={{ fontSize: 48, color: "#64748b" }} />
                </div>
              )}
 
              {/* Camera overlay on hover */}
              <div className="absolute inset-0 rounded-full bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center gap-1">
                <PhotoCameraIcon sx={{ fontSize: 22, color: "white" }} />
                <span className="text-black text-[10px] font-medium leading-none">
                  Modifier
                </span>
              </div>
            </label>
 
            {/* Upload hint */}
            <p className="text-black text-xs">
              {preview ? "Cliquez pour changer la photo" : "Ajouter une photo de profil"}
            </p>
          </div>
 
          {/* Identity */}
          <div className="space-y-1">
            <h2 className="text-xl font-semibold text-black tracking-tight">
              Bienvenue, <span className="text-black">{form?.name ?? "Utilisateur"}</span>
            </h2>
            <p className="text-black text-sm leading-relaxed">
              Votre compte est prêt. Vous pouvez commencer dès maintenant.
            </p>
          </div>
 
          {/* Divider */}
          <div className="w-full h-px bg-slate-800" />
 
          {/* CTA */}
          <div className="w-full flex flex-col gap-3">
           
              <Button
                fullWidth
                variant="contained"
                onClick={envoyerInformation}
                sx={{
                  borderRadius: "14px",
                  textTransform: "none",
                  fontWeight: 600,
                  fontSize: "0.9rem",
                  py: 1.4,
                  background: "linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)",
                  boxShadow: "0 0 24px rgba(124,58,237,0.35)",
                  "&:hover": {
                    background: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)",
                    boxShadow: "0 0 32px rgba(139,92,246,0.45)",
                  },
                }}
              >
                Entrer dans l'application
              </Button>
         
 
         
          </div>
        </div>
 
        
      </div>
    </div>
    );
  }
  // ============= ui fort password ===============
 

  /* ── Register form ── */
  return (
    <>
    
    <div className="min-h-screen bg-[#123] flex items-center justify-center px-4 relative overflow-hidden">
      {/* Ambient blobs */}
      
      <div className="absolute -top-32 -right-32 w-[480px] h-[480px] rounded-full bg-violet-600/5 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-indigo-600/5 blur-3xl pointer-events-none" />
     
      <div className="relative z-10 w-full max-w-md pt-12 ">
        {messsage? <Alert severity="error" sx={{position:"absolute",top:0 , right:0 , left:0,}}>{messageValide}</Alert>:""}
      
        <div className="bg-[#f5f5f5] border border-slate-800 rounded-2xl p-8 shadow-xl shadow-black/40">

          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-white border border-violet-500/20 flex items-center justify-center shrink-0">
              <HowToRegOutlined sx={{ fontSize: 20, color: "black" }} />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-black leading-tight">Créer un compte</h1>
       
            </div>
          </div>

          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">

            {/* Name */}
            <TextField
              label="Nom d'utilisateur"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="userName"
              fullWidth
              error={!!errors.name}
              helperText={errors.name}
              sx={FIELD_SX}
              slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <PersonIcon />
              </InputAdornment>
            ),
          },
        }}
            />

            {/* Email */}
            <TextField
              label="E-mail"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="votre email"
              fullWidth
              error={!!errors.email}
              helperText={errors.email}
            slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <MarkEmailUnreadIcon />
              </InputAdornment>
            ),
          },
        }}
              sx={FIELD_SX}
            />

            {/* Username */}
            <TextField
              label="UserName"
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="Name"
              fullWidth
              error={!!errors.username}
              helperText={errors.username}
             slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <PersonAddAltIcon />
              </InputAdornment>
            ),
          },
        }}
              sx={FIELD_SX}
            />

            {/* Password */}
            <div className="flex flex-col gap-2">
              <TextField
              sx={{gap:2}}
                label="Mot de passe"
                name="password"
                type={showPwd ? "text" : "password"}
                value={form.password}
                onChange={handleChange}
                placeholder="password"
                fullWidth
                error={!!errors.password}
                helperText={errors.password}
                sx={FIELD_SX}
                slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <HttpsIcon />
              </InputAdornment>
            ),
            endAdornment:(
              <InputAdornment position="end" sx={{ cursor:"pointer"}} >
                {showPwd?  <VisibilityIcon onClick={()=>{setShowPwd(false)}}/>:<VisibilityOffIcon onClick={()=>{setShowPwd(true)}}/>}
              </InputAdornment>
            )
          },
        }}
              />

              {/* Strength indicator */}
                <div className="w-[80%] m-auto flex items-center flex-col justify-between">
                    <div className="w-full flex items-center justify-between">
                  <div className={` h-1 grow ${fortpas>=1 && form.password.length >=1 ?" bg-red-400":""}`}></div>
                  <div className={`h-1 grow ${fortpas>=2?"bg-amber-400":""}`}></div>
                  <div className={`h-1 grow ${fortpas>=3?"bg-blue-400":""}`}></div>
                  <div className={`h-1 grow ${fortpas>=4?"bg-amber-500":""}`}  style={fortpas>=4?{backgroundColor:"#123"}:{}}></div>
                  </div>
                   <p className={`text-xs font-medium transition-colors ${
                    fortpas === 1 ? "text-red-400" :
                   fortpas  === 2 ? "text-amber-400" :
                    fortpas  === 3 ? "text-blue-400" :
                    "text-emerald-400"
                  }`}>
                      {fortpas<=0?"":fortpas==1?"mode passe faible":fortpas==2?"mode passe moins ":"mode passe securiter"}
                  </p>
</div>                  

            </div>

            {/* Submit */}
            <Button
              type="submit"
              variant="contained"
              fullWidth
             
              disabled={loading}
              startIcon={!loading && <HowToRegOutlined />}
              sx={{
                mt: 0.5,
                py: 1.4,
                borderRadius: "12px",
                backgroundColor: "#8b5cf6",
                textTransform: "none",
                fontSize: "14px",
                fontWeight: 600,
                letterSpacing: "0.02em",
                boxShadow: "0 0 24px rgba(139,92,246,0.25)",
                "&:hover": { backgroundColor: "#7c3aed", boxShadow: "0 0 32px rgba(139,92,246,0.35)" },
                "&.Mui-disabled": { backgroundColor: "rgba(139,92,246,0.35)", color: "rgba(255,255,255,0.6)" },
              }}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <CircularProgress size={16} sx={{ color: "rgba(255,255,255,0.8)" }} />
                  Création en cours…
                </span>
              ) : (
                "Créer mon compte"
              )}
            </Button>

            <Divider sx={{ borderColor: "rgba(255,255,255,0.06)" }}>
              <span className="text-slate-600 text-xs px-2">ou</span>
            </Divider>

            <div className="text-center text-slate-500 text-sm">
              Déjà un compte ?{" "}
              <Link to="/">
              <p className="text-violet-400 font-medium inline hover:text-violet-300 transition-colors underline-offset-2 hover:underline">
                Se connecter
              </p>
              </Link>
            </div>
          </form>
        </div>

        
      </div>
    </div> </>
  );
}
