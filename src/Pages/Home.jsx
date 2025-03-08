// import { memo } from "react";
import Banner from "../Components/Home_Page_Component/Banner";
import Fact from "../Components/Home_Page_Component/Fact";
import Feature from "../Components/Home_Page_Component/Feature";
import Hero from "../Components/Home_Page_Component/Hero";
import Shopview from "../Components/Home_Page_Component/Shopview";
import TopSelling from "../Components/Home_Page_Component/TopSelling";
const Home = () => {
  return (
    <div>
      <Hero />
      <Feature />
      <Shopview />
      <Banner />
      <TopSelling />
      <Fact />
    </div>
  );
};
export default Home;
