import { useState } from "react";
import {TextField,Button,CircularProgress, Divider} from "@mui/material";
import {   HowToRegOutlined} from "@mui/icons-material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import InputAdornment from '@mui/material/InputAdornment';
import HttpsIcon from '@mui/icons-material/Https';
import PersonIcon from '@mui/icons-material/Person';
import MarkEmailUnreadIcon from '@mui/icons-material/MarkEmailUnread';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import Alert from '@mui/material/Alert';
// import Input from '@mui/material/Input';
import { Link } from "react-router-dom";
import axios from "axios";
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
//   pour le password devient visible n;est pas fait jusque maintent
  const [showPwd, setShowPwd] = useState(false);
//   pour le password devient visible n;est pas fait jusque maintent
 const[fortpas , setFortpass] = useState(getStrength(form.password))
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
const [messsage , setMessage ] = useState(false);
const [messageValide , setMessageValide] = useState("");
  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Le nom complet est requis.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Adresse e-mail invalide.";
    if (form.username.length < 3) e.username = "Minimum 3 caractères.";
    if (form.password.length < 6) e.password = "Minimum 8 caractères.";
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
    await new Promise((r) => setTimeout(r, 3000));
    
     setLoading(false);
    
  };
//===================== logique =========================
async function envoyerInformation()
{
  try{
 let resp = await      axios.post("https://tarmeezacademy.com/api/v1/register",
{
    "username":form.username,
        "name": form.name,
        "email":form.email,
        "password":form.password
}
       )
        console.log(resp)
        localStorage.setItem("token",resp.data.token)
     
        setSuccess(true);
          
  }
  catch(error){

    if (error.response) {
      
      console.error("Détails de l'erreur de validation :", error.response.data);
      setMessageValide(error.response.data.message)
      setMessage(true);
    } else {
      console.error("Erreur réseau ou autre :", error.message);
    }
  }

}
  /* ── Success screen ── */
  if (success) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white  border border-slate-800 rounded-2xl p-10 flex flex-col items-center text-center gap-4">
          <div className="w-16 h-16 rounded-full bg-black border border-emerald-500/25 text-white flex items-center justify-center">
            <AccountCircleIcon sx={{ fontSize: 34, color: "white" }} />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-black mb-1">Compte créé !</h2>
            <p className="text-black text-sm">
              Bienvenue,{" "}
              <span className="text-black font-medium">{form.name}</span>. Votre compte est prêt.
            </p>
          </div>
          <Link to="/">
          <Button
            fullWidth
            variant="outlined"
           
            sx={{
              mt: 1, borderRadius: "12px", textTransform: "none", fontWeight: 500,
              borderColor: "rgba(139,92,246,0.35)", color: "#a78bfa",
              "&:hover": { borderColor: "#8b5cf6", backgroundColor: "rgba(139,92,246,0.07)" },
            }}
          >
            Entrer
          </Button>
          </Link>
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
              label="UserName"
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
              label="Nom d'utilisateur"
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
              onClick={envoyerInformation}
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
