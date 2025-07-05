import React from 'react';
import { AppBar, Toolbar, Typography, Box, Grid, Card, CardContent, Paper, Avatar, Stack } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import PersonIcon from '@mui/icons-material/Person';
import BookIcon from '@mui/icons-material/Book';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import InsertChartOutlinedIcon from '@mui/icons-material/InsertChartOutlined';
import CountUp from 'react-countup';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Legend, AreaChart, Area } from 'recharts';

const COLORS = ['#1976d2', '#43a047', '#fbc02d'];
const GRADIENTS = [
  'linear-gradient(135deg, #1976d2 0%, #64b5f6 100%)',
  'linear-gradient(135deg, #43a047 0%, #a5d6a7 100%)',
  'linear-gradient(135deg, #fbc02d 0%, #fff176 100%)',
];

const dummyTrend = [
  { name: 'Jan', Mahasiswa: 2000, Dosen: 120, Matkul: 250 },
  { name: 'Feb', Mahasiswa: 2100, Dosen: 125, Matkul: 260 },
  { name: 'Mar', Mahasiswa: 2200, Dosen: 130, Matkul: 270 },
  { name: 'Apr', Mahasiswa: 2300, Dosen: 135, Matkul: 280 },
  { name: 'Mei', Mahasiswa: 2500, Dosen: 150, Matkul: 300 },
];

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      counts: { mahasiswa: 0, dosen: 0, matakuliah: 0 },
      chartData: [],
      barData: [],
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
      ],
    });
  }

  render() {
    const { counts, chartData, barData } = this.state;
    const isAllZero = counts.mahasiswa === 0 && counts.dosen === 0 && counts.matakuliah === 0;
    const summary = [
      { label: 'Jumlah Mahasiswa', value: counts.mahasiswa, icon: <SchoolIcon fontSize="large" />, gradient: GRADIENTS[0] },
      { label: 'Jumlah Dosen', value: counts.dosen, icon: <PersonIcon fontSize="large" />, gradient: GRADIENTS[1] },
      { label: 'Jumlah Mata Kuliah', value: counts.matakuliah, icon: <BookIcon fontSize="large" />, gradient: GRADIENTS[2] },
    ];
    return (
      <Box sx={{ flex: 1 }}>
        <AppBar position="static" color="default" elevation={2} sx={{ mb: 4, borderRadius: 2 }}>
          <Toolbar>
            <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
              <AnalyticsIcon />
            </Avatar>
            <Box>
              <Typography variant="h5" fontWeight="bold" color="primary">Dashboard Analitik</Typography>
              <Typography variant="body2" color="text.secondary">Pantau data kampus Anda secara real-time</Typography>
            </Box>
          </Toolbar>
        </AppBar>
        <Box sx={{ background: '#f5f7fa', borderRadius: 3, p: 3, mb: 4 }}>
          <Grid container spacing={3}>
            {summary.map((item, idx) => (
              <Grid item xs={12} sm={6} md={4} key={item.label}>
                <Card sx={{
                  display: 'flex',
                  alignItems: 'center',
                  p: 2,
                  boxShadow: 6,
                  background: item.gradient,
                  color: '#fff',
                  borderRadius: 3,
                  minHeight: 120,
                }}>
                  <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.15)', width: 56, height: 56, mr: 2 }}>
                    {item.icon}
                  </Avatar>
                  <CardContent sx={{ flex: 1 }}>
                    <Typography variant="subtitle1" fontWeight="bold">{item.label}</Typography>
                    <Typography variant="h4" fontWeight="bold">
                      <CountUp end={item.value} duration={1.2} separator="," />
                    </Typography>
                    {item.value === 0 && (
                      <Typography variant="caption" color="#fff" sx={{ opacity: 0.85 }}>
                        Belum ada data
                      </Typography>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper sx={{ p: 3, height: 380, borderRadius: 3, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', mb: 3 }}>
              <Typography variant="subtitle1" fontWeight="bold" mb={2} align="left" sx={{ width: '100%' }}>Distribusi Data (Pie Chart)</Typography>
              {isAllZero ? (
                <Box sx={{ textAlign: 'center', color: 'grey.500', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 220 }}>
                  <InsertChartOutlinedIcon sx={{ fontSize: 56, mb: 1, color: 'grey.400' }} />
                  <Typography variant="body2">Belum ada data untuk ditampilkan</Typography>
                </Box>
              ) : (
                <ResponsiveContainer width="60%" height={260}>
                  <PieChart>
                    <Pie data={chartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={110} label>
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper sx={{ p: 3, height: 380, borderRadius: 3, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <Typography variant="subtitle1" fontWeight="bold" mb={2} align="left" sx={{ width: '100%' }}>Perbandingan Data (Bar Chart)</Typography>
              {isAllZero ? (
                <Box sx={{ textAlign: 'center', color: 'grey.500', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 220 }}>
                  <InsertChartOutlinedIcon sx={{ fontSize: 56, mb: 1, color: 'grey.400' }} />
                  <Typography variant="body2">Belum ada data untuk ditampilkan</Typography>
                </Box>
              ) : (
                <ResponsiveContainer width="90%" height={260}>
                  <BarChart data={barData}>
                    <XAxis dataKey="name" />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Mahasiswa" fill="#1976d2" radius={[8, 8, 0, 0]} />
                    <Bar dataKey="Dosen" fill="#43a047" radius={[8, 8, 0, 0]} />
                    <Bar dataKey="Mata Kuliah" fill="#fbc02d" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </Paper>
          </Grid>
        </Grid>
        <Box sx={{ mt: 4, background: '#fff', borderRadius: 3, p: 3, boxShadow: 2 }}>
          <Typography variant="subtitle1" fontWeight="bold" mb={2}>Tren Data (Area Chart)</Typography>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={dummyTrend} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorMhs" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1976d2" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#1976d2" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorDosen" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#43a047" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#43a047" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorMatkul" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#fbc02d" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#fbc02d" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Area type="monotone" dataKey="Mahasiswa" stroke="#1976d2" fillOpacity={1} fill="url(#colorMhs)" />
              <Area type="monotone" dataKey="Dosen" stroke="#43a047" fillOpacity={1} fill="url(#colorDosen)" />
              <Area type="monotone" dataKey="Matkul" stroke="#fbc02d" fillOpacity={1} fill="url(#colorMatkul)" />
            </AreaChart>
          </ResponsiveContainer>
        </Box>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} mt={4}>
          <Paper sx={{ p: 3, flex: 1, borderRadius: 3, background: 'linear-gradient(135deg, #1976d2 0%, #64b5f6 100%)', color: '#fff', boxShadow: 3 }}>
            <Typography variant="h6" fontWeight="bold">Insight</Typography>
            {isAllZero ? (
              <Typography variant="body2" mt={1}>Tambahkan data mahasiswa, dosen, atau mata kuliah untuk melihat insight analitik di sini.</Typography>
            ) : (
              <>
                <Typography variant="body1" mt={1}>Mahasiswa terbanyak di Teknik Informatika (dummy)</Typography>
                <Typography variant="body2" mt={1}>Pertumbuhan data mahasiswa konsisten naik setiap bulan.</Typography>
              </>
            )}
          </Paper>
          <Paper sx={{ p: 3, flex: 1, borderRadius: 3, background: 'linear-gradient(135deg, #43a047 0%, #a5d6a7 100%)', color: '#fff', boxShadow: 3 }}>
            <Typography variant="h6" fontWeight="bold">Statistik Lainnya</Typography>
            {isAllZero ? (
              <Typography variant="body2" mt={1}>Belum ada statistik tambahan. Silakan tambahkan data terlebih dahulu.</Typography>
            ) : (
              <>
                <Typography variant="body1" mt={1}>Dosen aktif meningkat 5% (dummy)</Typography>
                <Typography variant="body2" mt={1}>Jumlah mata kuliah bertambah setiap semester.</Typography>
              </>
            )}
          </Paper>
        </Stack>
      </Box>
    );
  }
} 