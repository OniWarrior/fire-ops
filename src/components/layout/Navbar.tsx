// src/components/layout/Navbar.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  AppBar, Toolbar, Box, Button, IconButton,
  Drawer, List, ListItem, ListItemButton, ListItemText, useScrollTrigger,
} from "@mui/material";
import { Menu as MenuIcon, Close as CloseIcon } from "@mui/icons-material";
import fire_logo from '../../../public/images/fire_ops_logo.png'

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
];

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const scrolled = useScrollTrigger({
    disableHysteresis: true,
    threshold: 10,
  });

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          bgcolor: scrolled ? "rgba(8, 12, 20, 0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
          transition: "all 0.3s ease",
        }}
      >
        <Toolbar sx={{ px: { xs: 2, md: 6 }, py: 1, justifyContent: "space-between" }}>
          {/* Logo */}
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
            <Image
              src={fire_logo}
              alt="Fire Alarm Ops"
              width={40}
              height={40}
              style={{ borderRadius: 6 }}
            />
            <Box
              component="span"
              sx={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: "1.4rem",
                fontWeight: 700,
                letterSpacing: "0.04em",
                color: "#fff",
                textTransform: "uppercase",
              }}
            >
              Fire Alarm{" "}
              <Box component="span" sx={{ color: "#E8521A" }}>
                Ops
              </Box>
            </Box>
          </Link>

          {/* Desktop nav */}
          <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center", gap: 1 }}>
            {NAV_LINKS.map((link) => (
              <Button
                key={link.href}
                href={link.href}
                sx={{
                  color: "rgba(255,255,255,0.75)",
                  fontFamily: "'Barlow', sans-serif",
                  fontWeight: 500,
                  fontSize: "0.9rem",
                  letterSpacing: "0.02em",
                  "&:hover": { color: "#fff", bgcolor: "transparent" },
                }}
              >
                {link.label}
              </Button>
            ))}
            <Button
              component={Link}
              href="/login"
              variant="outlined"
              sx={{
                ml: 2,
                color: "#fff",
                borderColor: "rgba(255,255,255,0.3)",
                fontFamily: "'Barlow', sans-serif",
                fontWeight: 600,
                "&:hover": {
                  borderColor: "#E8521A",
                  color: "#E8521A",
                  bgcolor: "transparent",
                },
              }}
            >
              Sign In
            </Button>
            <Button
              component={Link}
              href="/register"
              variant="contained"
              sx={{
                ml: 1,
                bgcolor: "#E8521A",
                color: "#fff",
                fontFamily: "'Barlow', sans-serif",
                fontWeight: 700,
                "&:hover": { bgcolor: "#C0392B" },
              }}
            >
              Get Started
            </Button>
          </Box>

          {/* Mobile hamburger */}
          <IconButton
            sx={{ display: { xs: "flex", md: "none" }, color: "#fff" }}
            onClick={() => setDrawerOpen(true)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Mobile drawer */}
      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}
        PaperProps={{ sx: { width: 260, bgcolor: "#0D1117", color: "#fff" } }}
      >
        <Box sx={{ p: 2, display: "flex", justifyContent: "flex-end" }}>
          <IconButton onClick={() => setDrawerOpen(false)} sx={{ color: "#fff" }}>
            <CloseIcon />
          </IconButton>
        </Box>
        <List>
          {NAV_LINKS.map((link) => (
            <ListItem key={link.href} disablePadding>
              <ListItemButton href={link.href} onClick={() => setDrawerOpen(false)}>
                <ListItemText
                  primary={link.label}
                  primaryTypographyProps={{ fontFamily: "'Barlow', sans-serif", fontWeight: 500 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
          <ListItem sx={{ mt: 2, flexDirection: "column", gap: 1 }}>
            <Button fullWidth variant="outlined" component={Link} href="/login"
              sx={{ color: "#fff", borderColor: "rgba(255,255,255,0.3)" }}>
              Sign In
            </Button>
            <Button fullWidth variant="contained" component={Link} href="/register"
              sx={{ bgcolor: "#E8521A", "&:hover": { bgcolor: "#C0392B" } }}>
              Get Started
            </Button>
          </ListItem>
        </List>
      </Drawer>
    </>
  );
}
