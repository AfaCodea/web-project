import React, { useEffect, useState } from 'react';
import { Box, Typography, Card, CardContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, TextField, Stack, Paper } from '@mui/material';

export default function CrudTable({ title, fields, localStorageKey }) {
  const initialForm = Object.fromEntries(fields.map(f => [f.name, '']));
  const [data, setData] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editIdx, setEditIdx] = useState(-1);

  useEffect(() => {
    setData(JSON.parse(localStorage.getItem(localStorageKey) || '[]'));
  }, [localStorageKey]);

  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(data));
  }, [data, localStorageKey]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    for (const f of fields) {
      if (f.required && !form[f.name]) return;
    }
    if (editIdx === -1) {
      setData([...data, form]);
    } else {
      const newData = [...data];
      newData[editIdx] = form;
      setData(newData);
      setEditIdx(-1);
    }
    setForm(initialForm);
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
      <Typography variant="h5" fontWeight="bold" mb={2}>{title}</Typography>
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center">
              {fields.map(f => (
                <TextField
                  key={f.name}
                  name={f.name}
                  label={f.label}
                  value={form[f.name]}
                  onChange={handleChange}
                  required={f.required}
                  size="small"
                  type={f.type || 'text'}
                  placeholder={f.placeholder}
                />
              ))}
              <Button type="submit" variant="contained" color="primary">{editIdx === -1 ? 'Tambah' : 'Update'}</Button>
              {editIdx !== -1 && <Button type="button" variant="outlined" color="secondary" onClick={() => { setForm(initialForm); setEditIdx(-1); }}>Batal</Button>}
            </Stack>
          </form>
        </CardContent>
      </Card>
      <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              {fields.map(f => <TableCell key={f.name}>{f.label}</TableCell>)}
              <TableCell align="center">Aksi</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, i) => (
              <TableRow key={i}>
                {fields.map(f => <TableCell key={f.name}>{row[f.name]}</TableCell>)}
                <TableCell align="center">
                  <Button onClick={() => handleEdit(i)} size="small" variant="outlined">Edit</Button>
                  <Button onClick={() => handleDelete(i)} size="small" color="error" variant="outlined" sx={{ ml: 1 }}>Hapus</Button>
                </TableCell>
              </TableRow>
            ))}
            {data.length === 0 && <TableRow><TableCell colSpan={fields.length + 1} align="center">Belum ada data</TableCell></TableRow>}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
} 