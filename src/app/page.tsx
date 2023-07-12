import Link from 'next/link';

const links = [
  { label: 'Listar', href: '/lector' },
  { label: 'Crear', href: '/registrar' }
];

export default function Home() {
  return (
    <main className="app-center p-24">
      <div className='app-card'>
        <h1 className='pb-4 px-2'>MirArt</h1>
        <p className="text-lg text-center mb-8">
        Este es un proyecto de ejemplo que utiliza Next.js y MongoDB para crear una aplicación con funcionalidades como la visualización y registro de artículos.
        </p>
        <div className="space-x-4 app-center">
          <Link href="/lector">
            <span className="text-blue-500 underline">Ir a la página de lectura</span>
          </Link>
          <Link href="/registrar">
            <span className="text-blue-500 underline">Ir a la página de registro</span>
          </Link>
        </div>
      </div>
    </main>
  )
}
