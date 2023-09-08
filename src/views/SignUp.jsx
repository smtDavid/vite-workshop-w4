import axios from "axios";
import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useNavigate, NavLink } from "react-router-dom";
import Swal from "sweetalert2";
const { VITE_APP_HOST } = import.meta.env;

const SignUp = () => {
  const {
    register, //狀態
    handleSubmit, //針對表單送出的方法
    watch, //監聽register內的欄位是否有變動的方法(與useWatch擇一就好)
    control, //監聽這個表單的所提供的物件
    formState: { errors }, //錯誤狀態
  } = useForm({
    mode: "onTouched",
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate(); //2.把hook取出來做使用(不取出來無法使用)
  const submit = async (data, e) => {
    setIsLoading(true);
    try {
      const res = await axios.post(`${VITE_APP_HOST}/users/sign_up`, data);
      console.log(res);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: `使用者:${data.nickname}註冊成功`,
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/auth/sign_in");
    } catch (err) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: `${err.response.data.message}`,
        showConfirmButton: false,
        timer: 1500,
      });
    }
    e.target.reset(); //清除欄位內容
    setIsLoading(false);
  };
  const watchForm = useWatch({ control });

  useEffect(() => {
    console.log("watch", watchForm);
  }, [watchForm]);

  //   console.log("Errors", errors);
  return (
    <>
      <form className="formControls" action="" onSubmit={handleSubmit(submit)}>
        <h2 className="formControls_txt">註冊帳號</h2>
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
        <label className="formControls_label" htmlFor="nickname">
          您的暱稱
        </label>
        <input
          className={`formControls_input form-control ${
            errors.nickname && "is-invalid"
          }`}
          type="text"
          name="nickname"
          id="nickname"
          placeholder="請輸入您的暱稱"
          {...register("nickname", {
            required: {
              value: true,
              message: "您的暱稱 是必填的",
            },
          })}
        />
        <div className="invalid-feedback">{errors?.nickname?.message}</div>
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
        <label className="formControls_label" htmlFor="passwordRe">
          再次輸入密碼
        </label>
        <input
          className={`formControls_input form-control ${
            errors.passwordRe && "is-invalid"
          }`}
          type="password"
          name="passwordRe"
          id="passwordRe"
          placeholder="請再次輸入密碼"
          {...register("passwordRe", {
            required: {
              value: true,
              message: "再次輸入密碼 是必填的",
            },
            validate: (value) => value == watchForm.password || "與密碼不相符",
          })}
        />
        <div className="invalid-feedback">{errors?.passwordRe?.message}</div>
        <input
          className="formControls_btnSubmit"
          type="submit"
          value="註冊帳號"
          disabled={isLoading}
        />

        <NavLink className="formControls_btnLink" to="/auth/sign_in">
          登入
        </NavLink>
      </form>
    </>
  );
};
export default SignUp;
