// src/components/layout/ThemeRegistry.tsx
"use client";

import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { useMemo } from "react";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#C0392B",       // Fire red
      dark: "#922B21",
      light: "#E74C3C",
      contrastText: "#fff",
    },
    secondary: {
      main: "#2C3E50",       // Dark slate
      light: "#34495E",
      contrastText: "#fff",
    },
    background: {
      default: "#F5F6FA",
      paper: "#FFFFFF",
    },
    error: { main: "#E74C3C" },
    warning: { main: "#F39C12" },
    success: { main: "#27AE60" },
    info: { main: "#2980B9" },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontWeight: 700 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 600 },
    h4: { fontWeight: 600 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
  },
  shape: { borderRadius: 8 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { textTransform: "none", fontWeight: 600 },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: { boxShadow: "0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.06)" },
      },
    },
  },
});

export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
