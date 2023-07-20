import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Link from "next/link";
import SessionMenu from "./sessionMenu";

const links = [
   { label: "Listar", href: "/lector" },
   { label: "Crear", href: "/registrar" },
];

export default async function HeaderComponent() {
   const session = await getServerSession(authOptions);

   return (
      <header>
         {session && (
            <nav className="dark flex items-center justify-between px-4 py-2">
               <div>
                  <ul className="flex items-center justify-between">
                     {links.map(({ label, href }) => (
                        <li key={`${href}${label}`} className="mr-6">
                           <Link href={href}>
                              <span className="text-blue-500 hover:text-blue-800">{label}</span>
                           </Link>
                        </li>
                     ))}
                  </ul>
               </div>
               <div>{session.user?.image && <SessionMenu session={session} />}</div>
            </nav>
         )}
      </header>
   );
}
