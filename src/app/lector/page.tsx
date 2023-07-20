import dynamic from 'next/dynamic';
import SessionGuard from '../components/SessionGuard';

const LectorContent = dynamic(() => import('./templates/Lector'));

export default function ProductPage () {
  return (
    <SessionGuard>
      <LectorContent />
    </SessionGuard>
  );
}