import React from 'react';
import CrudTable from '../components/CrudTable';

export default function Dosen() {
  return (
    <CrudTable
      title="Data Dosen"
      localStorageKey="dosen"
      fields={[
        { name: 'nip', label: 'NIP', required: true },
        { name: 'nama', label: 'Nama', required: true },
        { name: 'tgl', label: 'Tanggal Lahir', required: true, placeholder: 'dd/mm/yyyy' },
      ]}
    />
  );
} 