import Herosection from "../components/estaticos/Herosection";
import Navbar from "../components/estaticos/Navbar";
import FeaturedRooms from "../components/estaticos/FeaturedRooms";
import ServicesGrid from "../components/estaticos/ServicesGrid";
import AboutSection from "../components/estaticos/AboutSection";
import Footer from "../components/estaticos/Footer";
export const meta = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <>
      <Navbar />
      <Herosection />
      <FeaturedRooms />
      <ServicesGrid />
      <AboutSection />
      <Footer />
    </>
  );
}
