import React from 'react';
import CrudTableNilai from '../components/CrudTableNilai';

export default function Nilai() {
  return (
    <CrudTableNilai
      title="Data Nilai"
      localStorageKey="nilai"
    />
  );
} 