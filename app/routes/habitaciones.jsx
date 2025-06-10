import Navbar from "../components/estaticos/Navbar";
import Footer from "../components/estaticos/Footer";
// Puedes importar y usar un componente de habitaciones aquí:
import FeaturedRooms from "../components/estaticos/FeaturedRooms";

export const meta = () => {
  return [
    { title: "Habitaciones | Hotel Hilbert" },
    { name: "description", content: "Explora nuestras habitaciones disponibles en Hotel Hilbert." },
  ];
};

export default function Habitaciones() {
  return (
    <>
      <Navbar />
      <FeaturedRooms />
      <Footer />
    </>
  );
}