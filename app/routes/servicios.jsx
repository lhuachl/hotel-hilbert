import React from "react"
import Navbar from "../components/estaticos/Navbar"
import Footer from "../components/estaticos/Footer"
import Gymcard from "../components/estaticos/Gymcard"

export const meta = () => [
  { title: "Servicios 3D | Hotel Hilbert" },
  { name: "description", content: "Explora nuestros servicios premium en 3D." },
]

export default function Servicios() {
  return (
    <>
      <Navbar />

      <main className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-8">
            Nuestros Servicios
          </h1>
          <Gymcard />
        </div>
      </main>

      <Footer />
    </>
  )
}