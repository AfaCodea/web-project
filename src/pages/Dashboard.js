import React from 'react';
import { AppBar, Toolbar, Typography, Box, Grid, Card, CardContent, Paper } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import PersonIcon from '@mui/icons-material/Person';
import BookIcon from '@mui/icons-material/Book';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Legend } from 'recharts';

const COLORS = ['#1976d2', '#43a047', '#fbc02d'];

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      counts: { mahasiswa: 0, dosen: 0, matakuliah: 0 },
      chartData: [],
      barData: []
    };
  }

  componentDidMount() {
    const mahasiswa = JSON.parse(localStorage.getItem('mahasiswa') || '[]');
    const dosen = JSON.parse(localStorage.getItem('dosen') || '[]');
    const matakuliah = JSON.parse(localStorage.getItem('matakuliah') || '[]');
    this.setState({
      counts: {
        mahasiswa: mahasiswa.length,
        dosen: dosen.length,
        matakuliah: matakuliah.length,
      },
      chartData: [
        { name: 'Mahasiswa', value: mahasiswa.length },
        { name: 'Dosen', value: dosen.length },
        { name: 'Mata Kuliah', value: matakuliah.length },
      ],
      barData: [
        { name: 'Data', Mahasiswa: mahasiswa.length, Dosen: dosen.length, 'Mata Kuliah': matakuliah.length },
      ]
    });
  }

  render() {
    const { counts, chartData, barData } = this.state;
    const summary = [
      { label: 'Jumlah Mahasiswa', value: counts.mahasiswa, icon: <SchoolIcon fontSize="large" color="primary" /> },
      { label: 'Jumlah Dosen', value: counts.dosen, icon: <PersonIcon fontSize="large" color="primary" /> },
      { label: 'Jumlah Mata Kuliah', value: counts.matakuliah, icon: <BookIcon fontSize="large" color="primary" /> },
    ];
    return (
      <Box sx={{ flex: 1 }}>
        <AppBar position="static" color="default" elevation={2} sx={{ mb: 4 }}>
          <Toolbar>
            <Typography variant="h5" fontWeight="bold" color="primary">Dashboard Analitik</Typography>
          </Toolbar>
        </AppBar>
        <Grid container spacing={3} mb={4}>
          {summary.map((item, idx) => (
            <Grid item xs={12} sm={6} md={4} key={item.label}>
              <Card sx={{ display: 'flex', alignItems: 'center', p: 2, boxShadow: 3 }}>
                <Box sx={{ mr: 2 }}>{item.icon}</Box>
                <CardContent sx={{ flex: 1 }}>
                  <Typography variant="subtitle1">{item.label}</Typography>
                  <Typography variant="h5" fontWeight="bold">{item.value}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2, height: 340 }}>
              <Typography variant="subtitle1" fontWeight="bold" mb={2}>Distribusi Data (Pie Chart)</Typography>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie data={chartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2, height: 340 }}>
              <Typography variant="subtitle1" fontWeight="bold" mb={2}>Perbandingan Data (Bar Chart)</Typography>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={barData}>
                  <XAxis dataKey="name" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="Mahasiswa" fill="#1976d2" />
                  <Bar dataKey="Dosen" fill="#43a047" />
                  <Bar dataKey="Mata Kuliah" fill="#fbc02d" />
                </BarChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    );
  }
} 