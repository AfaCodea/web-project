import React from 'react';
import CrudTable from '../components/CrudTable';

export default function KRS() {
  return (
    <CrudTable
      title="Data KRS"
      localStorageKey="krs"
      fields={[
        { name: 'nim', label: 'NIM', required: true },
        { name: 'nama', label: 'Nama Mahasiswa', required: true },
        { name: 'kode', label: 'Kode Mata Kuliah', required: true },
        { name: 'matkul', label: 'Nama Mata Kuliah', required: true },
        { name: 'sks', label: 'SKS', required: true, type: 'number', placeholder: '3' },
      ]}
    />
  );
} 