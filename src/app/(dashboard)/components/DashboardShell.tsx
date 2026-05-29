// src/app/(dashboard)/components/DashboardShell.tsx
"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import type { Session } from "next-auth";
import {
  Box, Drawer, AppBar, Toolbar, Typography, List, ListItem,
  ListItemButton, ListItemIcon, ListItemText, IconButton, Avatar,
  Divider, Tooltip, Chip,
} from "@mui/material";
import {
  Dashboard, FolderOpen, Schedule, Calculate,
  People, Menu, LocalFireDepartment, Logout, ChevronLeft,
} from "@mui/icons-material";
type Role = "ADMIN" | "MANAGER" | "TECHNICIAN" | "VIEWER";

const DRAWER_WIDTH = 240;

interface NavItem {
  label: string;
  icon: React.ReactNode;
  href: string;
  roles: Role[];
}

const NAV_ITEMS: NavItem[] = [
  { label: "Dashboard", icon: <Dashboard />, href: "/dashboard", roles: ["ADMIN", "MANAGER", "TECHNICIAN", "VIEWER"] },
  { label: "Projects", icon: <FolderOpen />, href: "/dashboard/projects", roles: ["ADMIN", "MANAGER", "TECHNICIAN", "VIEWER"] },
  { label: "Timesheets", icon: <Schedule />, href: "/dashboard/timesheets", roles: ["ADMIN", "MANAGER", "TECHNICIAN"] },
  { label: "Address Calculator", icon: <Calculate />, href: "/dashboard/address-calculator", roles: ["ADMIN", "MANAGER", "TECHNICIAN"] },
  { label: "Users", icon: <People />, href: "/dashboard/admin/users", roles: ["ADMIN"] },
];

const ROLE_COLOR: Record<Role, "error" | "warning" | "info" | "default"> = {
  ADMIN: "error",
  MANAGER: "warning",
  TECHNICIAN: "info",
  VIEWER: "default",
};

interface Props {
  session: Session;
  children: React.ReactNode;
}

export default function DashboardShell({ session, children }: Props) {
  const [open, setOpen] = useState(true);
  const pathname = usePathname();
  const router = useRouter();
  const userRole = session.user.role as Role;
  const visibleNav = NAV_ITEMS.filter((item) => item.roles.includes(userRole));

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      {/* AppBar */}
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, bgcolor: "secondary.main" }}
        elevation={0}
      >
        <Toolbar>
          <IconButton color="inherit" edge="start" onClick={() => setOpen(!open)} sx={{ mr: 2 }}>
            {open ? <ChevronLeft /> : <Menu />}
          </IconButton>
          <LocalFireDepartment sx={{ mr: 1, color: "primary.light" }} />
          <Typography variant="h6" fontWeight={700} sx={{ flexGrow: 1 }}>
            Fire Alarm Ops
          </Typography>
          <Chip
            label={userRole}
            color={ROLE_COLOR[userRole]}
            size="small"
            sx={{ mr: 2, fontWeight: 600 }}
          />
          <Tooltip title={`${session.user.name} — Sign out`}>
            <IconButton color="inherit" onClick={() => signOut({ callbackUrl: "/login" })}>
              <Logout />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <Drawer
        variant="persistent"
        open={open}
        sx={{
          width: open ? DRAWER_WIDTH : 0,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: DRAWER_WIDTH,
            boxSizing: "border-box",
            bgcolor: "secondary.main",
            color: "white",
            borderRight: "none",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ p: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, py: 1 }}>
            <Avatar sx={{ bgcolor: "primary.main", width: 36, height: 36, fontSize: 14 }}>
              {session.user.name?.charAt(0)}
            </Avatar>
            <Box>
              <Typography variant="body2" fontWeight={600} noWrap>
                {session.user.name}
              </Typography>
              <Typography variant="caption" sx={{ opacity: 0.7 }} noWrap>
                {session.user.email}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Divider sx={{ borderColor: "rgba(255,255,255,0.12)" }} />
        <List sx={{ px: 1, py: 1 }}>
          {visibleNav.map((item) => (
            <ListItem key={item.href} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                onClick={() => router.push(item.href)}
                selected={pathname === item.href}
                sx={{
                  borderRadius: 1.5,
                  "&.Mui-selected": {
                    bgcolor: "primary.main",
                    "&:hover": { bgcolor: "primary.dark" },
                  },
                  "&:hover": { bgcolor: "rgba(255,255,255,0.08)" },
                }}
              >
                <ListItemIcon sx={{ color: "inherit", minWidth: 40 }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{ fontSize: 14, fontWeight: 500 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          mt: 8,
          bgcolor: "background.default",
          minHeight: "100vh",
          transition: "margin 0.2s",
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
