import CartKeys from "@constants/CartKeys";
import { formatOriginalPrice } from "@utils/Format";
import PropTypes from "prop-types";
import { useMemo } from "react";
import { Link } from "react-router-dom";

const CartSummary = ({ cart = [] }) => {
  const totalPrice = useMemo(() => {
    return cart.reduce(
      (total, item) =>
        total + item.quantity * ((100 - item.discount) / 100) * item.price,
      0
    );
  }, [cart]);
  const shippingPrice = useMemo(() => {
    return cart.length * CartKeys.SHIPPING;
  }, [cart]);
  return (
    <div className="w-[33%] md-lg:w-full">
      <div className="pl-3 md-lg:pl-0 md-lg:mt-5">
        {cart.length > 0 && (
          <div className="bg-white p-3 text-slate-600 flex flex-col gap-3">
            <h2 className="text-xl font-bold">Order Summary</h2>
            <div className="flex justify-between items-center">
              <span>Items</span>
              <span>{cart.length}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Shipping Fee</span>
              <span>{formatOriginalPrice(shippingPrice)}</span>
            </div>
            <div className="flex gap-2">
              <input
                className="w-full px-3 py-2 border border-slate-200 outline-0 focus:border-green-500 rounded-sm"
                type="text"
                placeholder="Input Voucher Coupon"
              />
              <button className="px-5 py-[1px] bg-[#059473] text-white rounded-sm uppercase text-sm">
                Apply
              </button>
            </div>

            <div className="flex justify-between items-center">
              <span>Total</span>
              <span className="text-lg text-[#059473]">
                {formatOriginalPrice(totalPrice + shippingPrice)}
              </span>
            </div>
            <Link
              to="/checkout"
              state={{ cart, totalPrice, shippingPrice }}
              disabled={cart.length === 0}
              className="px-5 py-[6px] rounded-sm hover:shadow-red-500/50 hover:shadow-lg bg-red-500 text-sm font-medium text-white uppercase text-center"
            >
              Process to Checkout
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

CartSummary.propTypes = {
  cart: PropTypes.array.isRequired,
};

export default CartSummary;