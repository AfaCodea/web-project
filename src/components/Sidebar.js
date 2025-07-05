import React from 'react';
import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography, Box, Avatar } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SchoolIcon from '@mui/icons-material/School';
import PersonIcon from '@mui/icons-material/Person';
import BookIcon from '@mui/icons-material/Book';
import AssignmentIcon from '@mui/icons-material/Assignment';
import GradeIcon from '@mui/icons-material/Grade';
import StorageIcon from '@mui/icons-material/Storage';
import { Link, useLocation } from 'react-router-dom';

const drawerWidth = 240;

const menu = [
  { path: '/dashboard', label: 'Dashboard', icon: <DashboardIcon /> },
  { path: '/mahasiswa', label: 'Mahasiswa', icon: <SchoolIcon /> },
  { path: '/dosen', label: 'Dosen', icon: <PersonIcon /> },
  { path: '/matakuliah', label: 'Mata Kuliah', icon: <BookIcon /> },
  { path: '/krs', label: 'KRS', icon: <AssignmentIcon /> },
  { path: '/nilai', label: 'Nilai', icon: <GradeIcon /> },
];

export default function Sidebar() {
  const location = useLocation();
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box', background: '#232c3d', color: '#fff' },
      }}
    >
      <Box sx={{ p: 0, mt: 1 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 1, mt: '12px' }}>
          <Avatar sx={{ bgcolor: 'primary.main', width: 56, height: 56, mb: 1 }}>
            <StorageIcon fontSize="large" />
          </Avatar>
        </Box>
        <Typography variant="h6" fontWeight="bold" sx={{ mb: 0.5, textAlign: 'center' }}>
          SISTEM BASIS DATA TERPUSAT
        </Typography>
        <Typography variant="body2" sx={{ mb: 2, textAlign: 'center' }}>
          Universitas Pelita Harapan
        </Typography>
        <List>
          {menu.map((item) => (
            <ListItem key={item.path} disablePadding>
              <ListItemButton
                component={Link}
                to={item.path}
                selected={location.pathname === item.path}
                sx={{
                  borderRadius: 2,
                  mb: 0.5,
                  color: location.pathname === item.path ? '#232c3d' : '#fff',
                  background: location.pathname === item.path ? '#fff' : 'transparent',
                  '&:hover': { background: '#fff2', color: '#fff' },
                }}
              >
                <ListItemIcon sx={{ color: location.pathname === item.path ? '#232c3d' : '#fff' }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
} 