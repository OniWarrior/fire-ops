// src/components/layout/Footer.tsx
import { Box, Container, Typography, Grid, Link as MuiLink, Divider } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { LocalFireDepartment } from "@mui/icons-material";

const FOOTER_LINKS = {
  Product: ["Features", "Pricing", "Changelog"],
  Company: ["About", "Contact", "Privacy Policy"],
  Resources: ["Documentation", "Support", "Status"],
};

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "#080C14",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        pt: 8,
        pb: 4,
        color: "rgba(255,255,255,0.6)",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={6}>
          {/* Brand column */}
          <Grid item xs={12} md={4}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
              <Image src="/fire_ops_logo.png" alt="Fire Alarm Ops" width={36} height={36}
                style={{ borderRadius: 6 }} />
              <Typography
                sx={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: "1.2rem",
                  fontWeight: 700,
                  letterSpacing: "0.04em",
                  color: "#fff",
                  textTransform: "uppercase",
                }}
              >
                Fire Alarm <Box component="span" sx={{ color: "#E8521A" }}>Ops</Box>
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ lineHeight: 1.8, maxWidth: 280 }}>
              The all-in-one operations platform built for fire alarm professionals.
            </Typography>
          </Grid>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <Grid item xs={6} md={2} key={category}>
              <Typography
                variant="overline"
                sx={{
                  color: "#fff",
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  display: "block",
                  mb: 2,
                }}
              >
                {category}
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                {links.map((link) => (
                  <MuiLink
                    key={link}
                    component={Link}
                    href="#"
                    underline="none"
                    sx={{
                      color: "rgba(255,255,255,0.5)",
                      fontSize: "0.875rem",
                      fontFamily: "'Barlow', sans-serif",
                      transition: "color 0.2s",
                      "&:hover": { color: "#E8521A" },
                    }}
                  >
                    {link}
                  </MuiLink>
                ))}
              </Box>
            </Grid>
          ))}
        </Grid>

        <Divider sx={{ borderColor: "rgba(255,255,255,0.06)", mt: 6, mb: 3 }} />

        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 2 }}>
          <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.3)" }}>
            © {new Date().getFullYear()} Fire Alarm Ops. All rights reserved.
          </Typography>
          <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.3)" }}>
            Built for the field.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
