import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center bg-gradient-to-r from-[#f58529] to-[#f7a800] px-6 py-4">
      {/* Logo o nombre */}
      <Link className="text-white text-2xl font-semibold font-sans" href={"/"}>
        Encuentro.
      </Link>

      {/* Botón de añadir nuevo */}
      <Link
        className="bg-white text-gray-800 py-2 px-4 rounded-full text-sm font-semibold transition-all hover:bg-gray-200"
        href={"/addTopic"}
      >
        Añadir nuevo
      </Link>
    </nav>
  );
}
