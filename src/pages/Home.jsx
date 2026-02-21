import HeroSection from "../components/HeroSection";
import HomeHeader from "../components/HomeHeader";
import PhotoGallery from "../components/PhotoGallery";

const Home = () => {
  return (
    <div className="mt-[75px]">
      {/* <HomeHeader /> */}
      <HeroSection />
      <PhotoGallery />
    </div>
  );
};

export default Home;
