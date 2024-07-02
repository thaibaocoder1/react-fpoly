import useProduct from "@hooks/useProduct";
import ListPage from "@modules/client/Product/pages/ListPage";
import { filtersObj } from "@utils/Filters";
import { useEffect, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { NavLink, useSearchParams } from "react-router-dom";

const Shop = () => {
  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    ...filtersObj,
    _category: searchParams.get("category") || "",
  });
  const { productList, pagination } = useProduct(filters);
  const handleFiltersChange = (page) => {
    setFilters((prev) => ({ ...prev, _page: page }));
  };
  useEffect(() => {
    const category = searchParams.get("category") || "";
    setFilters((prev) => ({
      ...prev,
      _category: category,
    }));
  }, [searchParams]);
  return (
    <>
      <section
        className={`bg-[url('https://vending-cdn.kootoro.com/torov-cms/upload/image/1669358914523-kh%C3%A1i%20ni%E1%BB%87m%20qu%E1%BA%A3ng%20c%C3%A1o%20banner%20tr%C3%AAn%20website.jpg')] h-[250px] mt-6 bg-cover bg-no-repeat relative bg-left`}
      >
        <div className="absolute left-0 top-0 w-full h-full bg-[#2422228a]">
          <div className="w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto">
            <div className="flex flex-col justify-center gap-1 items-center h-full w-full text-white">
              <h2 className="text-3xl font-bold">Shop Page</h2>
              <div className="flex justify-center items-center gap-2 text-lg w-full">
                <NavLink to="/">Home</NavLink>
                <span className="pt-1">
                  <IoIosArrowForward />
                </span>
                <span>Shop</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ListPage
        products={productList}
        pagination={pagination}
        onChange={handleFiltersChange}
      />
    </>
  );
};

export default Shop;