import { register } from "@app/slice/AuthSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import toastObj from "@utils/Toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import RegisterForm from "../RegisterForm/RegisterForm";

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      values.imageUrl = "https://placehold.co/400";
      const action = register(values);
      const resultAction = await dispatch(action);
      const data = unwrapResult(resultAction);
      if (data._id && data) {
        navigate("/login");
      }
    } catch (error) {
      toastObj.error(error.message);
    }
  };
  return (
    <div>
      <RegisterForm onSubmit={handleSubmit}></RegisterForm>
    </div>
  );
}

export default Register;
