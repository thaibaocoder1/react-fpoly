import Rating from "@components/Rating/Rating";
import { addProductToCart } from "@modules/client/Cart/CartSlice";
import { formatSalePrice } from "@utils/Format";
import toastObj from "@utils/Toast";
import PropTypes from "prop-types";
import { FaEye, FaRegHeart } from "react-icons/fa";
import { RiShoppingCartLine } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const ProductShop = ({ p, styles }) => {
  const dispatch = useDispatch();
  const handleAddToCart = () => {
    dispatch(
      addProductToCart({
        userId: 1,
        quantity: 1,
        productId: p._id,
      })
    );
    toastObj.success("Add to cart success!");
  };
  return (
    <div
      className={`flex transition-all duration-1000 hover:shadow-md hover:-translate-y-3 ${
        styles === "grid"
          ? "flex-col justify-start items-start"
          : "justify-start items-center md-lg:flex-col md-lg:justify-start md-lg:items-start"
      } w-full gap-4 bg-white p-1 rounded-md border border-slate-200`}
    >
      <div
        className={
          styles === "grid"
            ? "w-full relative group h-[210px] md:h-[270px] xs:h-[170px] overflow-hidden"
            : "md-lg:w-full relative group h-[210px] md:h-[270px] overflow-hidden"
        }
      >
        <Link to={`detail/${p._id}`}>
          <img
            className="h-[240px] rounded-md md:h-[270px] xs:h-[170px] w-full object-contain"
            src={p.thumb.fileName}
            alt={p.name}
          />
        </Link>

        <ul className="flex transition-all duration-700 -bottom-10 justify-center items-center gap-2 absolute w-full group-hover:bottom-3">
          <li className="select-none w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#059473] hover:text-white hover:rotate-[720deg] transition-all">
            <FaRegHeart />
          </li>
          <li className="select-none w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#059473] hover:text-white hover:rotate-[720deg] transition-all">
            <FaEye />
          </li>
          <li
            onClick={handleAddToCart}
            className="select-none w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#059473] hover:text-white hover:rotate-[720deg] transition-all"
          >
            <RiShoppingCartLine />
          </li>
        </ul>
      </div>

      <div className="flex justify-start items-start flex-col gap-1 p-2">
        <Link to={`shops/detail/${p._id}`}>
          <h2 className="font-bold">{p.name}</h2>
        </Link>
        <div className="flex justify-start items-center gap-3">
          <span className="text-md font-semibold">
            {formatSalePrice(p.price, p.discount)}
          </span>
          <div className="flex">
            <Rating ratings={4.5} />
          </div>
        </div>
      </div>
    </div>
  );
};

ProductShop.propTypes = {
  p: PropTypes.object.isRequired,
  styles: PropTypes.string.isRequired,
};

export default ProductShop;
