import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import CheckoutInputField from "./CheckoutFormControl/CheckoutInputField";
import PropTypes from "prop-types";
import CheckoutSelectField from "./CheckoutFormControl/CheckoutSelectField";
import { useEffect, useState } from "react";
import axios from "axios";
import CheckoutSelectFieldDistrict from "./CheckoutFormControl/CheckoutSelectFieldDistrict";
import CheckoutSelectFieldWard from "./CheckoutFormControl/CheckoutSelectFieldWard";
import CheckoutSelectFieldPayment from "./CheckoutFormControl/CheckoutSelectFieldPayment";

const schema = yup.object({
  fullname: yup.string().required("Please enter fullname"),
  email: yup
    .string()
    .required("Please enter email")
    .email("Please enter a valid email"),
  phone: yup
    .string()
    .required("Please enter phone")
    .test("match-regex", "Phone not match with pattern", (value) =>
      /(84|0[3|5|7|8|9])+([0-9]{8})\b/g.test(value)
    ),
  note: yup.string(),
  address: yup.string().required("Please enter address"),
  province: yup.string().required("Please enter province"),
  district: yup.string().required("Please enter district"),
  ward: yup.string().required("Please enter ward"),
  payment: yup.string().required("Please choose one payment"),
});
const CheckoutFormShip = ({ provinceList, onSubmit }) => {
  const form = useForm({
    defaultValues: {
      fullname: "",
      email: "",
      phone: "",
      note: "",
      address: "",
      province: "",
      district: "",
      payment: "",
    },
    resolver: yupResolver(schema),
  });
  const [selectedProvince, setSelectedProvince] = useState("");
  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [wards, setWards] = useState([]);
  const [isSubmit, setIsSubmit] = useState({
    submitted: false,
    data: [],
  });

  useEffect(() => {
    if (selectedProvince) {
      axios
        .get(
          `https://vapi.vnappmob.com/api/province/district/${selectedProvince}`
        )
        .then((response) => {
          setDistricts(response.data.results);
        })
        .catch((error) => {
          console.error("Error fetching districts:", error);
          setDistricts([]);
        });
    } else {
      setDistricts([]);
    }
  }, [selectedProvince]);
  useEffect(() => {
    if (selectedDistrict) {
      axios
        .get(`https://vapi.vnappmob.com/api/province/ward/${selectedDistrict}`)
        .then((response) => {
          setWards(response.data.results);
        })
        .catch((error) => {
          console.error("Error fetching districts:", error);
          setWards([]);
        });
    } else {
      setWards([]);
    }
  }, [selectedDistrict]);
  const onSubmitData = async (data) => {
    setIsSubmit({
      submitted: true,
      data,
    });
    onSubmit && (await onSubmit(data));
  };
  return (
    <>
      {!isSubmit.submitted && (
        <form onSubmit={form.handleSubmit(onSubmitData)}>
          <div className="flex md:flex-col md:gap-2 w-full gap-5 text-slate-600">
            <CheckoutInputField
              form={form}
              name="fullname"
              placeholder="Fullname"
            />
            <CheckoutInputField form={form} name="email" placeholder="Email" />
          </div>
          <div className="flex md:flex-col md:gap-2 w-full gap-5 text-slate-600">
            <CheckoutSelectField
              form={form}
              name="province"
              data={provinceList}
              selectedProvince={setSelectedProvince}
            />
            <CheckoutSelectFieldDistrict
              form={form}
              name="district"
              data={districts}
              selectedDistrict={setSelectedDistrict}
            />
            <CheckoutSelectFieldWard
              form={form}
              name="ward"
              data={wards}
              selectedProvince={setSelectedProvince}
            />
          </div>
          <div className="flex md:flex-col md:gap-2 w-full gap-5 text-slate-600">
            <CheckoutInputField
              form={form}
              name="address"
              placeholder="Address"
            />
            <CheckoutInputField form={form} name="phone" placeholder="Phone" />
          </div>
          <CheckoutInputField form={form} name="note" placeholder="Note" />
          <div className="flex md:flex-col md:gap-2 w-full gap-5 text-slate-600">
            <CheckoutSelectFieldPayment form={form} name="payment" />
            <div className="flex flex-col gap-1 mt-7 mb-2 w-full">
              <button className="px-3 py-[6px] rounded-sm hover:shadow-green-500/50 hover:shadow-lg bg-green-500 text-white">
                Save Change
              </button>
            </div>
          </div>
        </form>
      )}
      {isSubmit.submitted && (
        <div className="flex flex-col gap-1">
          <h2 className="text-slate-600 font-semibold pb-2">
            Deliver To {isSubmit.data.fullname}
          </h2>
          <p>
            <span className="bg-blue-200 text-blue-800 text-sm font-medium mr-2 px-2 py-1 rounded">
              Home
            </span>
            <span>
              {isSubmit.data.phone} - {isSubmit.data.province},{" "}
              {isSubmit.data.district}, {isSubmit.data.ward},{" "}
              {isSubmit.data.address}
            </span>
            <button
              onClick={() =>
                setIsSubmit((prev) => ({ ...prev, submitted: false }))
              }
              className="text-indigo-500 cursor-pointer ml-2"
            >
              Change
            </button>
          </p>

          <p className="text-slate-600 text-sm mt-1">
            Email To {isSubmit.data.email}
          </p>
        </div>
      )}
    </>
  );
};

CheckoutFormShip.propTypes = {
  provinceList: PropTypes.array,
  onSubmit: PropTypes.func,
};

export default CheckoutFormShip;
