
import Link from 'next/link';

const links = [
    { label: 'Listar', href: '/lector' },
    { label: 'Crear', href: '/registrar' }
  ];

export default async function HeaderComponent () {
  

  return (
    <header>
        <nav className='dark flex items-center justify-between px-4 py-2'>
          <div>
            <ul className='flex items-center justify-between'>
              {links.map(({ label, href }) => (
                <li key={`${href}${label}`} className='mr-6'>
                  <Link href={href}>
                    <span className='text-blue-500 hover:text-blue-800'>{label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>
    </header>
  );
}
