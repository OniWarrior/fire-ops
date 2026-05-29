// src/app/(marketing)/page.tsx
import { Box, Container, Typography, Button, Stack } from "@mui/material";
import Link from "next/link";
import { East as ArrowRight } from "@mui/icons-material";

export default function LandingPage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <Box
        sx={{
          position: "relative",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
          bgcolor: "#080C14",
        }}
      >
        {/* Background: generated dark industrial scene via CSS + SVG noise */}
        <Box
          aria-hidden
          sx={{
            position: "absolute",
            inset: 0,
            background: `
              radial-gradient(ellipse 80% 60% at 50% 0%, rgba(200,50,20,0.18) 0%, transparent 70%),
              radial-gradient(ellipse 60% 40% at 80% 30%, rgba(232,82,26,0.10) 0%, transparent 60%),
              linear-gradient(180deg, #080C14 0%, #0D1520 60%, #0A0E18 100%)
            `,
          }}
        />

        {/* Subtle grid overlay */}
        <Box
          aria-hidden
          sx={{
            position: "absolute",
            inset: 0,
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
            maskImage: "linear-gradient(180deg, transparent 0%, black 20%, black 70%, transparent 100%)",
          }}
        />

        {/* Animated ember particles */}
        {[...Array(6)].map((_, i) => (
          <Box
            key={i}
            aria-hidden
            sx={{
              position: "absolute",
              width: { xs: 2, md: 3 },
              height: { xs: 2, md: 3 },
              borderRadius: "50%",
              bgcolor: i % 2 === 0 ? "#E8521A" : "#FF8C42",
              left: `${15 + i * 14}%`,
              bottom: "30%",
              opacity: 0,
              animation: `ember${i} ${3 + i * 0.8}s ease-in infinite`,
              animationDelay: `${i * 0.6}s`,
              "@keyframes ember0": { "0%": { opacity: 0, transform: "translateY(0) scale(1)" }, "50%": { opacity: 0.8 }, "100%": { opacity: 0, transform: "translateY(-120px) scale(0.3)" } },
              "@keyframes ember1": { "0%": { opacity: 0, transform: "translateY(0) scale(1)" }, "50%": { opacity: 0.6 }, "100%": { opacity: 0, transform: "translateY(-100px) translateX(20px) scale(0.2)" } },
              "@keyframes ember2": { "0%": { opacity: 0, transform: "translateY(0)" }, "50%": { opacity: 0.9 }, "100%": { opacity: 0, transform: "translateY(-140px) translateX(-15px)" } },
              "@keyframes ember3": { "0%": { opacity: 0, transform: "translateY(0) scale(1.2)" }, "50%": { opacity: 0.7 }, "100%": { opacity: 0, transform: "translateY(-90px) scale(0.1)" } },
              "@keyframes ember4": { "0%": { opacity: 0, transform: "translateY(0)" }, "60%": { opacity: 0.8 }, "100%": { opacity: 0, transform: "translateY(-130px) translateX(10px)" } },
              "@keyframes ember5": { "0%": { opacity: 0, transform: "translateY(0) scale(0.8)" }, "50%": { opacity: 0.5 }, "100%": { opacity: 0, transform: "translateY(-110px) translateX(-20px) scale(0.1)" } },
            }}
          />
        ))}

        {/* Hero content */}
        <Container maxWidth="md" sx={{ position: "relative", zIndex: 1, pt: 16, pb: 12, textAlign: "center" }}>
          {/* Eyebrow */}
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 1,
              px: 2,
              py: 0.75,
              mb: 4,
              borderRadius: 99,
              border: "1px solid rgba(232,82,26,0.35)",
              bgcolor: "rgba(232,82,26,0.08)",
            }}
          >
            <Box sx={{ width: 6, height: 6, borderRadius: "50%", bgcolor: "#E8521A",
              animation: "pulse 2s ease-in-out infinite",
              "@keyframes pulse": { "0%,100%": { opacity: 1 }, "50%": { opacity: 0.3 } },
            }} />
            <Typography sx={{ color: "#E8521A", fontSize: "0.8rem", fontFamily: "'Barlow', sans-serif", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>
              Built for fire alarm professionals
            </Typography>
          </Box>

          <Typography
            variant="h1"
            sx={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 800,
              fontSize: { xs: "3rem", sm: "4.5rem", md: "6rem" },
              lineHeight: 0.95,
              letterSpacing: "-0.02em",
              textTransform: "uppercase",
              color: "#fff",
              mb: 3,
            }}
          >
            Run Your
            <Box
              component="span"
              sx={{
                display: "block",
                background: "linear-gradient(135deg, #E8521A 0%, #FF8C42 50%, #E8521A 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Fire Alarm
            </Box>
            Operations
          </Typography>

          <Typography
            sx={{
              color: "rgba(255,255,255,0.55)",
              fontSize: { xs: "1rem", md: "1.2rem" },
              fontFamily: "'Barlow', sans-serif",
              lineHeight: 1.7,
              maxWidth: 520,
              mx: "auto",
              mb: 5,
            }}
          >
            Project management, device address calculation, and employee timesheets — all in one platform built for the field.
          </Typography>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={2} justifyContent="center">
            <Button
              component={Link}
              href="/register"
              variant="contained"
              size="large"
              endIcon={<ArrowRight />}
              sx={{
                bgcolor: "#E8521A",
                color: "#fff",
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 700,
                fontSize: "1rem",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                px: 4,
                py: 1.75,
                borderRadius: 1.5,
                boxShadow: "0 0 32px rgba(232,82,26,0.35)",
                "&:hover": {
                  bgcolor: "#C0392B",
                  boxShadow: "0 0 48px rgba(232,82,26,0.5)",
                },
              }}
            >
              Get Started Free
            </Button>
            <Button
              component={Link}
              href="/login"
              variant="outlined"
              size="large"
              sx={{
                color: "rgba(255,255,255,0.8)",
                borderColor: "rgba(255,255,255,0.2)",
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 600,
                fontSize: "1rem",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                px: 4,
                py: 1.75,
                borderRadius: 1.5,
                "&:hover": {
                  borderColor: "#E8521A",
                  color: "#E8521A",
                  bgcolor: "transparent",
                },
              }}
            >
              Sign In
            </Button>
          </Stack>
        </Container>

        {/* Orange gradient fade at the bottom of the hero */}
        <Box
          aria-hidden
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "180px",
            background: "linear-gradient(to top, rgba(232,82,26,0.18) 0%, rgba(200,50,20,0.08) 50%, transparent 100%)",
            pointerEvents: "none",
          }}
        />
        {/* Hard fade into the page below */}
        <Box
          aria-hidden
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "80px",
            background: "linear-gradient(to top, #080C14, transparent)",
            pointerEvents: "none",
          }}
        />
      </Box>

      {/* ── Below-the-fold placeholder ───────────────────────── */}
      <Box sx={{ bgcolor: "#080C14", py: 16, textAlign: "center" }}>
        <Typography sx={{ color: "rgba(255,255,255,0.2)", fontFamily: "'Barlow', sans-serif" }}>
          Features section coming soon
        </Typography>
      </Box>
    </>
  );
}
