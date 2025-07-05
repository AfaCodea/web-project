import React, { useEffect, useState } from 'react';
import { Box, Typography, Card, CardContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, TextField, Stack, Paper } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';

export default function Nilai() {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({ nim: '', nama: '', kode: '', matkul: '', nilai: '' });
  const [editIdx, setEditIdx] = useState(-1);
  const [mahasiswa, setMahasiswa] = useState([]);
  const [matakuliah, setMatakuliah] = useState([]);

  useEffect(() => {
    setData(JSON.parse(localStorage.getItem('nilai') || '[]'));
    setMahasiswa(JSON.parse(localStorage.getItem('mahasiswa') || '[]'));
    setMatakuliah(JSON.parse(localStorage.getItem('matakuliah') || '[]'));
  }, []);

  useEffect(() => {
    localStorage.setItem('nilai', JSON.stringify(data));
  }, [data]);

  const handleChange = e => {
    let { name, value } = e.target;
    if (name === 'nilai') {
      // Hanya angka 0-100
      value = value.replace(/[^0-9]/g, '');
      if (value !== '' && (parseInt(value) < 0 || parseInt(value) > 100)) return;
    }
    setForm({ ...form, [name]: value });
  };

  const handleNimChange = (e, val) => {
    if (val) {
      setForm({ ...form, nim: val.nim, nama: val.nama });
    } else {
      setForm({ ...form, nim: '', nama: '' });
    }
  };

  const handleKodeChange = (e, val) => {
    if (val) {
      setForm({ ...form, kode: val.kode, matkul: val.nama });
    } else {
      setForm({ ...form, kode: '', matkul: '' });
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!form.nim || !form.nama || !form.kode || !form.matkul || form.nilai === '') return;
    if (editIdx === -1) {
      setData([...data, form]);
    } else {
      const newData = [...data];
      newData[editIdx] = form;
      setData(newData);
      setEditIdx(-1);
    }
    setForm({ nim: '', nama: '', kode: '', matkul: '', nilai: '' });
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
      <Typography variant="h5" fontWeight="bold" mb={2}>Data Nilai</Typography>
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center">
              <Autocomplete
                options={mahasiswa}
                getOptionLabel={option => `${option.nim} - ${option.nama}`}
                value={form.nim ? mahasiswa.find(m => m.nim === form.nim) || null : null}
                onChange={handleNimChange}
                renderInput={params => <TextField {...params} label="NIM" size="small" required />}
                sx={{ minWidth: 180 }}
              />
              <TextField name="nama" label="Nama Mahasiswa" value={form.nama} size="small" InputProps={{ readOnly: true }} sx={{ minWidth: 180 }} />
              <Autocomplete
                options={matakuliah}
                getOptionLabel={option => `${option.kode} - ${option.nama}`}
                value={form.kode ? matakuliah.find(mk => mk.kode === form.kode) || null : null}
                onChange={handleKodeChange}
                renderInput={params => <TextField {...params} label="Kode Mata Kuliah" size="small" required />}
                sx={{ minWidth: 180 }}
              />
              <TextField name="matkul" label="Nama Mata Kuliah" value={form.matkul} size="small" InputProps={{ readOnly: true }} sx={{ minWidth: 180 }} />
              <TextField name="nilai" label="Nilai (0-100)" value={form.nilai} onChange={handleChange} required size="small" sx={{ maxWidth: 100 }} />
              <Button type="submit" variant="contained" color="primary">{editIdx === -1 ? 'Tambah' : 'Update'}</Button>
              {editIdx !== -1 && <Button type="button" variant="outlined" color="secondary" onClick={() => { setForm({ nim: '', nama: '', kode: '', matkul: '', nilai: '' }); setEditIdx(-1); }}>Batal</Button>}
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
              <TableCell>Nilai</TableCell>
              <TableCell align="center">Aksi</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((n, i) => (
              <TableRow key={i}>
                <TableCell>{n.nim}</TableCell>
                <TableCell>{n.nama}</TableCell>
                <TableCell>{n.kode}</TableCell>
                <TableCell>{n.matkul}</TableCell>
                <TableCell>{n.nilai}</TableCell>
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