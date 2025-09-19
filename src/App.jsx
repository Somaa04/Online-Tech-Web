import Navbar from "./Components/Navbar/Navbar";
import Hero from "./Components/Hero/Hero";
import Service from "./Components/Service/Service";
import Banner from "./Components/Banner/Banner";
import Cards from "./Components/Cards/Cards";
import Login from "./Components/Login";
import Footer from "./Components/Footer";
export default function App() {
  return (
    <div >
      <Navbar/>
      <Hero/>
      <Service/>
      <Banner/>
      <Cards/>
      <Login/>
      <Footer/>
    </div>
  );
}
