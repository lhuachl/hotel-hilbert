import Navbar from "../components/estaticos/Navbar";
import Footer from "../components/estaticos/Footer";
import HistoriaCard from "../components/estaticos/HistoriaCard";
export default function Historia() {
  return (
    <>
      <Navbar />
      <main>
        <h1>Historia del Hotel</h1>
        <p>Bienvenido a la historia del hotel.</p>
        <HistoriaCard />
      </main>
      <Footer />
    </>
  );
}
