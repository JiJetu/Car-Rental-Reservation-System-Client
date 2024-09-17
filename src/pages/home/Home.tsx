import ChooseUs from "./ChooseUs";
import FeaturedCars from "./FeaturedCars";
import Hero from "./Hero";
import Testimonials from "./Testimonials";

const Home = () => {
  return (
    <div>
      <Hero />
      <FeaturedCars />
      <ChooseUs />
      <Testimonials />
    </div>
  );
};

export default Home;
