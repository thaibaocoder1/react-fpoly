import useProductHome from "@hooks/useProductHome";
import { useMemo } from "react";
import ProductFeature from "../components/ProductFeature";
import ProductLatest from "../components/ProductLatest";
import ProductSkeleton from "../components/ProductSkeleton";

const ListProductFeatudataPage = () => {
  const { data } = useProductHome();
  const memoizedProducts = useMemo(() => {
    if (!data || !data.products) return;
    return data.products.slice(0, 8);
  }, [data]);

  if (!data || !data.products || data.products.length === 0) {
    return (
      <div className="grid grid-cols-4 gap-3 mx-auto w-[85%]">
        <ProductSkeleton length={8} />
      </div>
    );
  }
  return (
    <div className="w-[85%] flex flex-wrap mx-auto">
      <ProductLatest data={memoizedProducts} />
      <div className="py-[90px] w-full grid grid-cols-3 md-lg:grid-cols-2 md:grid-cols-1 gap-6">
        <ProductFeature
          title="Featured Products"
          products={[data.products.slice(0, 3), data.products.slice(3, 6)]}
        />
        <ProductFeature
          title="Hot Products"
          products={[data.products.slice(6, 9), data.products.slice(9, 12)]}
        />
        <ProductFeature
          title="Discount Products"
          products={[data.products.slice(12, 15), data.products.slice(15, 18)]}
        />
      </div>
    </div>
  );
};

export default ListProductFeatudataPage;
