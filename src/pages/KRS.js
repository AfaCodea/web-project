import React, { useEffect, useState } from 'react';
import { Box, Typography, Card, CardContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, TextField, Stack, Paper } from '@mui/material';

export default function KRS() {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({ nim: '', nama: '', kode: '', matkul: '', sks: '' });
  const [editIdx, setEditIdx] = useState(-1);

  useEffect(() => {
    const krs = JSON.parse(localStorage.getItem('krs') || '[]');
    setData(krs);
  }, []);

  useEffect(() => {
    localStorage.setItem('krs', JSON.stringify(data));
  }, [data]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    if (!form.nim || !form.nama || !form.kode || !form.matkul || !form.sks) return;
    if (editIdx === -1) {
      setData([...data, form]);
    } else {
      const newData = [...data];
      newData[editIdx] = form;
      setData(newData);
      setEditIdx(-1);
    }
    setForm({ nim: '', nama: '', kode: '', matkul: '', sks: '' });
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
      <Typography variant="h5" fontWeight="bold" mb={2}>Data KRS</Typography>
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center">
              <TextField name="nim" label="NIM" value={form.nim} onChange={handleChange} required size="small" />
              <TextField name="nama" label="Nama Mahasiswa" value={form.nama} onChange={handleChange} required size="small" />
              <TextField name="kode" label="Kode Mata Kuliah" value={form.kode} onChange={handleChange} required size="small" />
              <TextField name="matkul" label="Nama Mata Kuliah" value={form.matkul} onChange={handleChange} required size="small" />
              <TextField name="sks" label="SKS" value={form.sks} onChange={handleChange} required size="small" type="number" min="1" />
              <Button type="submit" variant="contained" color="primary">{editIdx === -1 ? 'Tambah' : 'Update'}</Button>
              {editIdx !== -1 && <Button type="button" variant="outlined" color="secondary" onClick={() => { setForm({ nim: '', nama: '', kode: '', matkul: '', sks: '' }); setEditIdx(-1); }}>Batal</Button>}
            </Stack>
          </form>
        </CardContent>
      </Card>
      <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>NIM</TableCell>
              <TableCell>Nama Mahasiswa</TableCell>
              <TableCell>Kode Mata Kuliah</TableCell>
              <TableCell>Nama Mata Kuliah</TableCell>
              <TableCell>SKS</TableCell>
              <TableCell align="center">Aksi</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((k, i) => (
              <TableRow key={i}>
                <TableCell>{k.nim}</TableCell>
                <TableCell>{k.nama}</TableCell>
                <TableCell>{k.kode}</TableCell>
                <TableCell>{k.matkul}</TableCell>
                <TableCell>{k.sks}</TableCell>
                <TableCell align="center">
                  <Button onClick={() => handleEdit(i)} size="small" variant="outlined">Edit</Button>
                  <Button onClick={() => handleDelete(i)} size="small" color="error" variant="outlined" sx={{ ml: 1 }}>Hapus</Button>
                </TableCell>
              </TableRow>
            ))}
            {data.length === 0 && <TableRow><TableCell colSpan={6} align="center">Belum ada data</TableCell></TableRow>}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
} 