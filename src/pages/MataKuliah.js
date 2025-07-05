import React, { useEffect, useState } from 'react';
import { Box, Typography, Card, CardContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, TextField, Stack, Paper } from '@mui/material';

export default function MataKuliah() {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({ kode: '', nama: '', sks: '' });
  const [editIdx, setEditIdx] = useState(-1);

  useEffect(() => {
    const mk = JSON.parse(localStorage.getItem('matakuliah') || '[]');
    setData(mk);
  }, []);

  useEffect(() => {
    localStorage.setItem('matakuliah', JSON.stringify(data));
  }, [data]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    if (!form.kode || !form.nama || !form.sks) return;
    if (editIdx === -1) {
      setData([...data, form]);
    } else {
      const newData = [...data];
      newData[editIdx] = form;
      setData(newData);
      setEditIdx(-1);
    }
    setForm({ kode: '', nama: '', sks: '' });
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
      <Typography variant="h5" fontWeight="bold" mb={2}>Data Mata Kuliah</Typography>
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center">
              <TextField name="kode" label="Kode" value={form.kode} onChange={handleChange} required size="small" />
              <TextField name="nama" label="Nama Mata Kuliah" value={form.nama} onChange={handleChange} required size="small" />
              <TextField name="sks" label="SKS" value={form.sks} onChange={handleChange} required size="small" type="number" min="1" />
              <Button type="submit" variant="contained" color="primary">{editIdx === -1 ? 'Tambah' : 'Update'}</Button>
              {editIdx !== -1 && <Button type="button" variant="outlined" color="secondary" onClick={() => { setForm({ kode: '', nama: '', sks: '' }); setEditIdx(-1); }}>Batal</Button>}
            </Stack>
          </form>
        </CardContent>
      </Card>
      <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Kode</TableCell>
              <TableCell>Nama Mata Kuliah</TableCell>
              <TableCell>SKS</TableCell>
              <TableCell align="center">Aksi</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((mk, i) => (
              <TableRow key={i}>
                <TableCell>{mk.kode}</TableCell>
                <TableCell>{mk.nama}</TableCell>
                <TableCell>{mk.sks}</TableCell>
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