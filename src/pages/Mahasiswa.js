import React, { useEffect, useState } from 'react';
import { Box, Typography, Card, CardContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, TextField, Stack, Paper } from '@mui/material';

export default function Mahasiswa() {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({ nim: '', nama: '', tgl: '' });
  const [editIdx, setEditIdx] = useState(-1);

  useEffect(() => {
    const mhs = JSON.parse(localStorage.getItem('mahasiswa') || '[]');
    setData(mhs);
  }, []);

  useEffect(() => {
    localStorage.setItem('mahasiswa', JSON.stringify(data));
  }, [data]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    if (!form.nim || !form.nama || !form.tgl) return;
    if (editIdx === -1) {
      setData([...data, form]);
    } else {
      const newData = [...data];
      newData[editIdx] = form;
      setData(newData);
      setEditIdx(-1);
    }
    setForm({ nim: '', nama: '', tgl: '' });
  };

  const handleEdit = idx => {
    setForm(data[idx]);
    setEditIdx(idx);
  };

  const handleDelete = idx => {
    if (window.confirm('Hapus data ini?')) {
      setData(data.filter((_, i) => i !== idx));
    }
  };

  return (
    <Box>
      <Typography variant="h5" fontWeight="bold" mb={2}>Data Mahasiswa</Typography>
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center">
              <TextField name="nim" label="NIM" value={form.nim} onChange={handleChange} required size="small" />
              <TextField name="nama" label="Nama" value={form.nama} onChange={handleChange} required size="small" />
              <TextField name="tgl" label="Tanggal Lahir" value={form.tgl} onChange={handleChange} required size="small" placeholder="dd/mm/yyyy" />
              <Button type="submit" variant="contained" color="primary">{editIdx === -1 ? 'Tambah' : 'Update'}</Button>
              {editIdx !== -1 && <Button type="button" variant="outlined" color="secondary" onClick={() => { setForm({ nim: '', nama: '', tgl: '' }); setEditIdx(-1); }}>Batal</Button>}
            </Stack>
          </form>
        </CardContent>
      </Card>
      <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>NIM</TableCell>
              <TableCell>Nama</TableCell>
              <TableCell>Tanggal Lahir</TableCell>
              <TableCell align="center">Aksi</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((m, i) => (
              <TableRow key={i}>
                <TableCell>{m.nim}</TableCell>
                <TableCell>{m.nama}</TableCell>
                <TableCell>{m.tgl}</TableCell>
                <TableCell align="center">
                  <Button onClick={() => handleEdit(i)} size="small" variant="outlined">Edit</Button>
                  <Button onClick={() => handleDelete(i)} size="small" color="error" variant="outlined" sx={{ ml: 1 }}>Hapus</Button>
                </TableCell>
              </TableRow>
            ))}
            {data.length === 0 && <TableRow><TableCell colSpan={4} align="center">Belum ada data</TableCell></TableRow>}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
} 