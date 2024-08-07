import SearchHeader from "@components/SearchHeader/SearchHeader";
import useCategory from "@hooks/useCategory";
import { useState } from "react";
import {
  FaFacebookF,
  FaGithub,
  FaLinkedin,
  FaList,
  FaLock,
  FaPhoneAlt,
  FaUser,
} from "react-icons/fa";
import { FaCartShopping, FaHeart, FaTwitter } from "react-icons/fa6";
import {
  IoIosArrowDown,
  IoIosArrowUp,
  IoMdArrowDropdown,
  IoMdPhonePortrait,
} from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { useSelector } from "react-redux";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import logo from "../../../assets/react.svg";

const HeaderClient = () => {
  const userInfo = useSelector((state) => state.auth.user);
  const [categoryShow, setCategoryShow] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  const { data } = useCategory();
  const cartSlice = useSelector((state) => state.cart.data);
  const wishListSlice = useSelector((state) => state.wishlist.data);

  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <div className="w-full bg-white">
      <div className="header-top bg-[#caddff] md-lg:hidden">
        <div className="w-[85%] lg:w-[90%] mx-auto">
          <div className="flex w-full justify-between items-center h-[50px] text-slate-500">
            <ul className="flex justify-start items-center gap-8 font-semibold text-black">
              <li className="flex relative justify-center items-center gap-2 text-sm after:absolute after:h-[18px] after:w-[1px] after:bg-[#afafaf] after:-right-[16px]">
                <span>
                  <MdEmail />
                </span>
                <span>thaibaok4.1@gmail.com</span>
              </li>

              <li className="flex relative justify-center items-center gap-2 text-sm ">
                <span>
                  <IoMdPhonePortrait />
                </span>
                <span>+(84) 852 xxx 0xx</span>
              </li>
            </ul>

            <div>
              <div className="flex justify-center items-center gap-10">
                <div className="flex justify-center items-center gap-4 text-black">
                  <a href="#">
                    <FaFacebookF />
                  </a>
                  <a href="#">
                    <FaTwitter />
                  </a>
                  <a href="#">
                    <FaLinkedin />
                  </a>
                  <a href="#">
                    <FaGithub />
                  </a>
                </div>
                <div className="flex group cursor-pointer text-slate-800 text-sm justify-center items-center gap-1 relative after:h-[18px] after:w-[1px] after:bg-[#afafaf] after:-right-[16px] after:absolute before:absolute before:h-[18px] before:bg-[#afafaf] before:w-[1px] before:-left-[20px]">
                  <img src={logo} alt="BSMART" loading="lazy" />
                  <span>
                    <IoMdArrowDropdown />
                  </span>
                  <ul className="absolute invisible transition-all top-12 rounded-sm duration-200 text-white p-2 w-[100px] flex flex-col gap-3 group-hover:visible group-hover:top-6 group-hover:bg-black z-10">
                    <li>Vietnam</li>
                    <li>English</li>
                  </ul>
                </div>

                {userInfo?._id ? (
                  <Link
                    className="flex cursor-pointer justify-center items-center gap-2 text-sm text-black"
                    to="/dashboard"
                  >
                    <span>
                      <FaUser />
                    </span>
                    <span>{userInfo?.username}</span>
                  </Link>
                ) : (
                  <Link
                    to="/login"
                    className="flex cursor-pointer justify-center items-center gap-2 text-sm text-black"
                  >
                    <span>
                      <FaLock />
                    </span>
                    <span>Login</span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-white">
        <div className="w-[85%] lg:w-[90%] mx-auto">
          <div className="h-[80px] md-lg:h-[100px] flex justify-between items-center flex-wrap">
            <div className="md-lg:w-full w-3/12 md-lg:pt-4">
              <div className="flex justify-between items-center">
                <Link to="/">
                  <img src={logo} alt="BSMART" loading="lazy" />
                </Link>
                <div
                  className="justify-center items-center w-[30px] h-[30px] bg-white text-slate-600 border border-slate-600 rounded-sm cursor-pointer lg:hidden md-lg:flex xl:hidden hidden"
                  onClick={() => setShowSidebar(true)}
                >
                  <span>
                    <FaList />
                  </span>
                </div>
              </div>
            </div>

            <div className="md:lg:w-full w-9/12">
              <div className="flex justify-between md-lg:justify-center items-center flex-wrap pl-8">
                <ul className="flex justify-start items-start gap-8 text-sm font-bold uppercase md-lg:hidden">
                  <li>
                    <NavLink
                      to={"/"}
                      className={`p-2 block ${
                        pathname === "/" ? "text-[#059473]" : "text-slate-600"
                      }`}
                    >
                      Home
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      to="/shops"
                      className={`p-2 block ${
                        pathname === "/shops"
                          ? "text-[#059473]"
                          : "text-slate-600"
                      }`}
                    >
                      Shop
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className={`p-2 block ${
                        pathname === "/policy"
                          ? "text-[#059473]"
                          : "text-slate-600"
                      }`}
                    >
                      Policy
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className={`p-2 block ${
                        pathname === "/about"
                          ? "text-[#059473]"
                          : "text-slate-600"
                      }`}
                    >
                      About Us
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className={`p-2 block ${
                        pathname === "/contact"
                          ? "text-[#059473]"
                          : "text-slate-600"
                      }`}
                    >
                      Contact
                    </NavLink>
                  </li>
                </ul>

                <div className="flex md-lg:hidden justify-center items-center gap-5">
                  <div className="flex justify-center gap-5">
                    <div
                      onClick={() => navigate("/dashboard/wishlist")}
                      className="relative flex justify-center items-center cursor-pointer w-[35px] h-[35px] rounded-full bg-[#e2e2e2]"
                    >
                      <span className="text-xl text-green-500">
                        <FaHeart />
                      </span>
                      <div className="w-[15px] h-[15px] text-xs font-medium absolute bg-red-500 rounded-full text-white flex justify-center items-center -top-[3px] -right-[5px] ">
                        {wishListSlice.length > 0 ? wishListSlice.length : 0}
                      </div>
                    </div>

                    <div
                      onClick={() => navigate("/cart")}
                      className="relative flex justify-center items-center cursor-pointer w-[35px] h-[35px] rounded-full bg-[#e2e2e2]"
                    >
                      <span className="text-xl text-green-500">
                        <FaCartShopping />
                      </span>

                      <div className="w-[15px] h-[15px] text-xs font-medium absolute bg-red-500 rounded-full text-white flex justify-center items-center -top-[3px] -right-[5px] ">
                        {cartSlice.length > 0 ? cartSlice.length : 0}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={`${showSidebar ? "block" : "hidden"}`}>
        <div
          onClick={() => setShowSidebar(true)}
          className={`fixed duration-200 transition-all hidden md-lg:block w-screen h-screen bg-[rgba(0,0,0,0.5)] top-0 left-0 z-20 ${
            showSidebar ? "visible" : "invisible"
          }`}
        ></div>
        <div
          className={`w-[300px] z-[9999] transition-all duration-200 fixed overflow-y-auto bg-white h-screen py-6 px-8 ${
            showSidebar ? "left-0 top-0" : "-left-[300px]"
          }`}
        >
          <div className="flex justify-start flex-col gap-6">
            <div className="flex justify-start items-center gap-10">
              <div className="flex group cursor-pointer text-slate-800 text-sm justify-center items-center gap-1 relative after:h-[18px] after:w-[1px] after:bg-[#afafaf] after:-right-[16px] after:absolute ">
                <img src={logo} alt="" loading="lazy" />
                <span>
                  <IoMdArrowDropdown />
                </span>
                <ul className="absolute invisible transition-all top-12 rounded-sm duration-200 text-white p-2 w-[100px] flex flex-col gap-3 group-hover:visible group-hover:top-6 group-hover:bg-black z-10">
                  <li>Vietnam</li>
                  <li>English</li>
                </ul>
              </div>
              {userInfo?._id ? (
                <Link
                  className="flex cursor-pointer justify-center items-center gap-2 text-sm text-black"
                  to="/dashboard"
                >
                  <span>
                    <FaUser />
                  </span>
                  <span>{userInfo?.username}</span>
                </Link>
              ) : (
                <Link
                  className="flex cursor-pointer justify-center items-center gap-2 text-sm text-black"
                  to="/login"
                >
                  <span>
                    <FaLock />
                  </span>
                  <span>Login</span>
                </Link>
              )}
            </div>

            <ul className="flex flex-col justify-start items-start text-sm font-bold uppercase">
              <li>
                <NavLink
                  to={"/"}
                  className={`p-2 block ${
                    pathname === "/" ? "text-[#059473]" : "text-slate-600"
                  }`}
                >
                  Home
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/shops"
                  className={`p-2 block ${
                    pathname === "/shops" ? "text-[#059473]" : "text-slate-600"
                  }`}
                >
                  Shop
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={`p-2 block ${
                    pathname === "/policy" ? "text-[#059473]" : "text-slate-600"
                  }`}
                >
                  Policy
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={`p-2 block ${
                    pathname === "/about" ? "text-[#059473]" : "text-slate-600"
                  }`}
                >
                  About Us
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={`p-2 block ${
                    pathname === "/contact"
                      ? "text-[#059473]"
                      : "text-slate-600"
                  }`}
                >
                  Contact
                </NavLink>
              </li>
            </ul>
            <div className="flex justify-start items-center gap-4 text-black">
              <a href="#">
                <FaFacebookF />
              </a>
              <a href="#">
                <FaTwitter />
              </a>
              <a href="#">
                <FaLinkedin />
              </a>
              <a href="#">
                <FaGithub />
              </a>
            </div>

            <div className="w-full flex justify-end md-lg:justify-start gap-3 items-center">
              <div className="w-[48px] h-[48px] rounded-full flex bg-[#f5f5f5] justify-center items-center ">
                <span>
                  <FaPhoneAlt />
                </span>
              </div>
              <div className="flex justify-end flex-col gap-1">
                <h2 className="text-sm font-medium text-slate-700">
                  +134343455
                </h2>
                <span className="text-xs">Support 24/7</span>
              </div>
            </div>

            <ul className="flex flex-col justify-start items-start gap-3 text-[#1c1c1c]">
              <li className="flex justify-start items-center gap-2 text-sm">
                <span>
                  <MdEmail />
                </span>
                <span>thaibaok4.1@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="w-[85%] lg:w-[90%] mx-auto">
        <div className="flex w-full flex-wrap md-lg:gap-8">
          <div className="w-3/12 md-lg:w-full">
            <div className="bg-white relative">
              <div
                onClick={() => setCategoryShow(!categoryShow)}
                className="h-[50px] bg-[#059473] text-white flex justify-center md-lg:justify-between md-lg:px-6 items-center gap-3 font-bold text-md cursor-pointer select-none"
              >
                <div className="flex justify-center items-center gap-3">
                  <span>
                    <FaList />
                  </span>
                  <span>All Category</span>
                </div>
                <span className="pt-1">
                  {categoryShow ? <IoIosArrowUp /> : <IoIosArrowDown />}
                </span>
              </div>

              <div
                className={`${
                  categoryShow ? "m-h-[400px]" : "h-0"
                } overflow-hidden transition-all md-lg:relative duration-500 absolute z-[99999] bg-[#dbf3ed] w-full border-x`}
              >
                <ul className="py-2 text-slate-600 font-medium">
                  {data.categories.map((c, i) => {
                    return (
                      <li
                        key={i}
                        className="flex justify-start items-center gap-2 px-[24px] py-[6px]"
                      >
                        <img
                          src={c.imageUrl}
                          className="w-[30px] h-[30px] rounded-full overflow-hidden"
                          alt={c.slug}
                          loading="lazy"
                        />
                        <Link
                          to={`shops?category=${c.slug}`}
                          className="text-sm block"
                        >
                          {c.title}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>

          <div className="w-9/12 pl-8 md-lg:pl-0 md-lg:w-full">
            <div className="flex flex-wrap w-full justify-between items-center md-lg:gap-6">
              <div className="w-8/12 md-lg:w-full relative">
                <SearchHeader />
              </div>

              <div className="w-4/12 block md-lg:hidden pl-2 md-lg:w-full md-lg:pl-0">
                <div className="w-full flex justify-end md-lg:justify-start gap-3 items-center">
                  <div className="w-[48px] h-[48px] rounded-full flex bg-[#f5f5f5] justify-center items-center ">
                    <span>
                      <FaPhoneAlt />
                    </span>
                  </div>
                  <div className="flex justify-end flex-col gap-1">
                    <h2 className="text-md font-medium text-slate-700">
                      +(84) 852 xxx 0xx
                    </h2>
                    <span className="text-sm">Support 24/7</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderClient;
