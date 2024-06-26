import Banner from "@components/Banner/Banner";
import Categories from "@components/Category/Category";
import ListProductFeaturesPage from "@modules/client/ProductSection/pages/ListProductFeaturesPage";

const Home = () => {
  return (
    <div className="w-full">
      <Banner />
      <Categories />
      <div className="py-[45px]">
        <ListProductFeaturesPage />
      </div>
    </div>
  );
};

export default Home;
