import { Suspense } from 'react';
import VillasClient from './VillasClient';

export default function VillasPage() {
  return (
    <Suspense fallback={<div>Loading Villas...</div>}>
      <VillasClient />
    </Suspense>
  );
}