import Link from "next/link";
import { ArrowRight, Battery, Smartphone, Wifi, HardDrive, Camera, ShieldAlert } from "lucide-react";

export default function SoportePage() {
  const services = [
    {
      id: "pantalla",
      name: "Cambio de Pantalla",
      desc: "Repuestos originales para recuperar la nitidez y el tacto original.",
      icon: <Smartphone strokeWidth={1} className="w-24 h-24 text-gray-300 group-hover:text-[#0071e3] transition-colors" />,
    },
    {
      id: "bateria",
      name: "Cambio de Batería",
      desc: "Vuelve a tener autonomía para todo el día. Condición al 100%.",
      icon: <Battery strokeWidth={1} className="w-24 h-24 text-gray-300 group-hover:text-[#0071e3] transition-colors" />,
    },
    {
      id: "faceid",
      name: "Reparación Face ID",
      desc: "Solución a problemas de True Depth y reconocimiento facial.",
      icon: <ShieldAlert strokeWidth={1} className="w-24 h-24 text-gray-300 group-hover:text-[#0071e3] transition-colors" />,
    },
    {
      id: "almacenamiento",
      name: "Aumento de Espacio",
      desc: "¿Sin espacio? Ampliamos la memoria de tu iPhone de forma segura.",
      icon: <HardDrive strokeWidth={1} className="w-24 h-24 text-gray-300 group-hover:text-[#0071e3] transition-colors" />,
    },
    {
      id: "camara",
      name: "Cámaras y Lentes",
      desc: "Limpieza y reparación de cámaras borrosas o cristales rotos.",
      icon: <Camera strokeWidth={1} className="w-24 h-24 text-gray-300 group-hover:text-[#0071e3] transition-colors" />,
    },
    {
      id: "placa",
      name: "Fallas de Placa",
      desc: "Diagnóstico avanzado para problemas de encendido, señal o WiFi.",
      icon: <Wifi strokeWidth={1} className="w-24 h-24 text-gray-300 group-hover:text-[#0071e3] transition-colors" />,
    },
  ];

  return (
    <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-[#f5f5f7] min-h-screen">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER */}
        <div className="mb-16 text-center md:text-left">
           <span className="text-orange-500 font-bold tracking-widest uppercase text-[10px] mb-2 block">
             Servicio Técnico
           </span>
           <h1 className="text-5xl font-semibold text-[#1d1d1f] mb-4 tracking-tight">
             Soporte iClub
           </h1>
           <p className="text-xl text-gray-500 max-w-2xl font-medium mx-auto md:mx-0">
             Expertos certificados. Repuestos originales y garantía real para revivir tu equipo.
           </p>
        </div>

        {/* GRILLA RESPONSIVA */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
           {services.map((service) => (
              <a 
                href={`https://wa.me/51945341516?text=Hola iClub, quiero cotizar el servicio de: ${service.name}`}
                target="_blank"
                key={service.id} 
                // h-full y cursor-pointer
                className="group relative flex flex-col h-full bg-white rounded-[2rem] p-8 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 ease-out cursor-pointer"
              >
                <div className="mb-6 z-10">
                   <span className="inline-block px-3 py-1 rounded-full bg-orange-50 text-orange-600 text-[10px] font-bold uppercase tracking-widest mb-3">
                     Diagnóstico Gratis
                   </span>
                   <h3 className="text-3xl font-semibold text-[#1d1d1f] mb-2 tracking-tight">{service.name}</h3>
                   <p className="text-gray-500 text-sm font-medium line-clamp-2">{service.desc}</p>
                </div>

                {/* Icono Central */}
                <div className="relative w-full h-48 mb-6 flex items-center justify-center">
                  {service.icon}
                </div>

                <div className="mt-auto flex items-end justify-between pt-6 border-t border-gray-100">
                  <div className="flex flex-col gap-1">
                    <span className="text-[#1d1d1f] font-semibold text-lg tracking-tight">Cotizar Reparación</span>
                    <span className="text-[11px] text-gray-400 font-medium uppercase tracking-wide">Respuesta inmediata</span>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg shadow-green-500/30 group-hover:scale-110 transition-all">
                    <ArrowRight size={16} strokeWidth={3} />
                  </div>
                </div>
              </a>
           ))}
        </div>
      </div>
    </main>
  );
}