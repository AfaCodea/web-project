import React from 'react';
import CrudTable from '../components/CrudTable';

export default function MataKuliah() {
  return (
    <CrudTable
      title="Data Mata Kuliah"
      localStorageKey="matakuliah"
      fields={[
        { name: 'kode', label: 'Kode', required: true },
        { name: 'nama', label: 'Nama Mata Kuliah', required: true },
        { name: 'sks', label: 'SKS', required: true, type: 'number', placeholder: '3' },
      ]}
    />
  );
} 