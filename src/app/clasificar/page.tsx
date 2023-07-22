import dynamic from 'next/dynamic';
import SessionGuard from '../components/SessionGuard';

const ClasificarContent = dynamic(() => import('./templates/Clasificar'));

export default function ClassifyPage () {
    return (
        <SessionGuard>
            <ClasificarContent />
        </SessionGuard>
    );
}