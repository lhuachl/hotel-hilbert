import React, { Suspense } from 'react';

export default function ServiceCard({ servicio, reverse }) {
  return (
    <div className={`flex flex-col md:flex-row items-center gap-8 ${reverse ? 'md:flex-row-reverse' : ''}`}>      
      {/* Modelo 3D o imagen */}
      <div className="w-full md:w-1/2 h-64 bg-gray-100 rounded-lg overflow-hidden">
        <Suspense fallback={<div className="flex items-center justify-center h-full">Cargando...</div>}>
          {servicio.modelComponent}
        </Suspense>
      </div>

      {/* Información del servicio */}
      <div className="w-full md:w-1/2">
        <h3 className="text-3xl font-bold mb-4">{servicio.nombre}</h3>
        <p className="text-gray-700 mb-4">{servicio.descripcion}</p>

        <ul className="list-disc list-inside mb-4">
          {servicio.caracteristicas.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>

        <div className="flex items-center space-x-4">
          <span className="text-lg font-semibold">Precio:</span>
          <span>{servicio.precio}</span>
          <span className="ml-auto bg-yellow-400 text-white px-2 py-1 rounded">{servicio.rating} ⭐</span>
        </div>
      </div>
    </div>
  );
}
