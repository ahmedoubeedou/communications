import { Box, Button, Typography, Stack } from "@mui/material";
import { Home, SearchOff } from "@mui/icons-material";
import { Link } from "react-router-dom";
export default function NotFound() {
  return (
    <Box
      className="min-h-screen flex items-center justify-center bg-gray-50 px-4"
      sx={{ fontFamily: "Inter, sans-serif" }}
    >
      <Box className="max-w-lg w-full text-center">

        {/* Illustration */}
        <Box className="flex justify-center mb-8">
          <Box
            className="relative flex items-center justify-center"
            sx={{ width: 200, height: 200 }}
          >
            <Box
              className="absolute inset-0 rounded-full"
              sx={{ backgroundColor: "#EEF2FF" }}
            />
            <SearchOff
              sx={{ fontSize: 80, color: "#6366F1", position: "relative", zIndex: 1 }}
            />
            <Box
              className="absolute -top-2 -right-2 rounded-full flex items-center justify-center shadow-md"
              sx={{ width: 56, height: 56, backgroundColor: "#6366F1" }}
            >
              <Typography sx={{ color: "white", fontWeight: 700, fontSize: "13px", lineHeight: 1 }}>
                404
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Grand 404 */}
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: "6rem", md: "9rem" },
            fontWeight: 900,
            background: "linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            letterSpacing: "-0.04em",
            lineHeight: 1,
            mb: 2,
          }}
        >
          404
        </Typography>

        {/* Titre */}
        <Typography
          variant="h4"
          className="text-gray-800"
          sx={{ fontWeight: 600, fontSize: { xs: "1.4rem", md: "1.75rem" }, mb: 1.5 }}
        >
          Page introuvable
        </Typography>

        {/* Description */}
        <Typography
          variant="body1"
          className="text-gray-500"
          sx={{ maxWidth: 380, mx: "auto", lineHeight: 1.7, mb: 4 }}
        >
          Oops ! La page que vous cherchez n&apos;existe pas ou a été déplacée.
          Vérifiez l&apos;URL ou revenez à l&apos;accueil.
        </Typography>

        {/* Boutons */}
        <Link to="/">
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2} justifyContent="center" sx={{ mb: 5 }}>
          <Button
            variant="contained"
            size="large"
            startIcon={<Home />}
            sx={{
              backgroundColor: "#6366F1",
              "&:hover": { backgroundColor: "#4F46E5" },
              borderRadius: "12px",
              textTransform: "none",
              fontWeight: 600,
              px: 3,
              py: 1.4,
              boxShadow: "0 4px 14px rgba(99,102,241,0.35)",
            }}
          >
            Retour à l&apos;accueil
          </Button>
        </Stack>
</Link>
        {/* Liens rapides */}
        <Box className="border-t border-gray-100 pt-6">
          <Typography variant="body2" className="text-gray-400 mb-3" sx={{ fontSize: "0.82rem", mb: 1.5 }}>
            Liens utiles
          </Typography>
          <Stack direction="row" spacing={3} justifyContent="center" flexWrap="wrap">
            {["Accueil", "Contact", "À propos", "Support"].map((label) => (
              <Typography
                key={label}
                component="a"
                href="#"
                variant="body2"
                sx={{
                  color: "#6366F1",
                  textDecoration: "none",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  "&:hover": { textDecoration: "underline" },
                }}
              >
                {label}
              </Typography>
            ))}
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}