// components/ui/Logo.tsx
import Link from "next/link";

export default function Logo() {
  return (
    <Link
      href="/"
      className="group flex flex-col items-start z-50 hover:opacity-80 transition-opacity"
    >
      {/* Título Principal */}
      <div className="flex items-center leading-none">
        <span className="text-2xl font-bold tracking-tighter text-[#1d1d1f]">
          iClub <span className="font-bold">Perú</span>
        </span>
        <span className="text-[#0071e3] text-2xl font-bold leading-none mb-[2px]">
          .
        </span>
      </div>

      {/* Subtítulo VISIBLE SIEMPRE */}
      <span className="text-[11px] text-[#86868b] font-medium tracking-wide -mt-[5px] group-hover:text-[#0071e3] transition-colors">
        Expertos en Apple
      </span>
    </Link>
  );
}
