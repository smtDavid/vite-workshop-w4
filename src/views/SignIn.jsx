import axios from "axios";
import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
const { VITE_APP_HOST } = import.meta.env;

const SignIn = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const submit = async (data, e) => {
    console.log("送出表單", data);
    setIsLoading(true);
    try {
      const res = await axios.post(`${VITE_APP_HOST}/users/sign_in`, data);
      console.log(res);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: `帳號:${data.email}登入成功`,
        showConfirmButton: false,
        timer: 1500,
      });
      const { token } = res.data;
      document.cookie = `token=${token};`;
      navigate("/todo"); //址址到todo頁面
    } catch (err) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: `${err.response.data.message}`,
        showConfirmButton: false,
        timer: 1500,
      });
    }
    e.target.reset();
    setIsLoading(false);
  };
  const watchForm = useWatch({ control });
  useEffect(() => {
    console.log(watchForm);
  }, [watchForm]);
  return (
    <>
      <form className="formControls" action="" onSubmit={handleSubmit(submit)}>
        <h2 className="formControls_txt">最實用的線上代辦事項服務</h2>
        <label className="formControls_label" htmlFor="email">
          Email
        </label>
        <input
          className={`formControls_input form-control ${
            errors.email && "is-invalid"
          }`}
          type="text"
          id="email"
          name="email"
          placeholder="請輸入 email"
          {...register("email", {
            required: {
              value: true,
              message: "Email 是必填的",
            },
            pattern: {
              value: /^\S+@\S+$/i,
              message: "email格式不正確",
            },
          })}
        />
        <div className="invalid-feedback">{errors?.email?.message}</div>
        <label className="formControls_label" htmlFor="password">
          密碼
        </label>
        <input
          className={`formControls_input form-control ${
            errors.password && "is-invalid"
          }`}
          type="password"
          name="password"
          id="password"
          placeholder="請輸入密碼"
          {...register("password", {
            required: {
              value: true,
              message: "密碼 是必填的",
            },
            minLength: {
              value: 6,
              message: "最少6碼",
            },
            maxLength: {
              value: 12,
              message: "最多12碼",
            },
          })}
        />
        <div className="invalid-feedback">{errors?.password?.message}</div>
        <input
          className="formControls_btnSubmit"
          type="submit"
          value="登入"
          disabled={isLoading}
        />
        <NavLink className="formControls_btnLink" to="/auth/sign_up">
          註冊帳號
        </NavLink>
      </form>
    </>
  );
};
export default SignIn;
