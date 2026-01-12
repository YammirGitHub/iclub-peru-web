export default function Loading() {
  return (
    <div className="min-h-screen bg-white pt-32 pb-20">
      <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 animate-pulse">
        {/* --- SKELETON COLUMNA IZQUIERDA (Imagen) --- */}
        <div className="lg:col-span-7">
          <div className="sticky top-32 aspect-square bg-gray-100 rounded-[30px] w-full" />
        </div>

        {/* --- SKELETON COLUMNA DERECHA (Info) --- */}
        <div className="lg:col-span-5 flex flex-col gap-8 pt-4">
          {/* Título y Precio */}
          <div>
            <div className="h-4 w-20 bg-gray-200 rounded mb-4" />{" "}
            {/* Tag "Nuevo" */}
            <div className="h-12 w-3/4 bg-gray-200 rounded mb-4" />{" "}
            {/* Título */}
            <div className="h-10 w-1/3 bg-gray-200 rounded" /> {/* Precio */}
          </div>

          {/* Selector Color */}
          <div>
            <div className="h-4 w-16 bg-gray-200 rounded mb-3" />
            <div className="flex gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full bg-gray-200" />
              ))}
            </div>
          </div>

          {/* Selector Almacenamiento */}
          <div className="space-y-3">
            <div className="h-4 w-24 bg-gray-200 rounded mb-3" />
            <div className="h-16 w-full bg-gray-100 rounded-xl" />
            <div className="h-16 w-full bg-gray-100 rounded-xl" />
          </div>

          {/* Botón */}
          <div className="mt-8 bg-gray-100 h-16 rounded-full w-full" />
        </div>
      </div>
    </div>
  );
}
