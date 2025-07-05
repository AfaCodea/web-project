import React from 'react';
import CrudTable from '../components/CrudTable';

export default function Mahasiswa() {
  return (
    <CrudTable
      title="Data Mahasiswa"
      localStorageKey="mahasiswa"
      fields={[
        { name: 'nim', label: 'NIM', required: true },
        { name: 'nama', label: 'Nama', required: true },
        { name: 'tgl', label: 'Tanggal Lahir', required: true, placeholder: 'dd/mm/yyyy' },
      ]}
    />
  );
} 