import { yupResolver } from "@hookform/resolvers/yup";
import { unwrapResult } from "@reduxjs/toolkit";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { MdAlternateEmail } from "react-icons/md";
import { RiUserSmileLine } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { Button } from "../../../../components/button";
import { Field } from "../../../../components/field";
import { Input, InputPasswordToggle } from "../../../../components/input";
import LoadingSubmit from "../../../../components/loading/LoadingSubmit";
import { login } from "../_redux/authCrud";
import { FormattedMessage, injectIntl } from "react-intl";
import { connect } from "react-redux";
import * as auth from "../_redux/authRedux";

import AuthenticatePage from "./AuthenticatePage";
const SignInPage = (props) => {
  const [loading, setLoading] = useState(false);
  const schemaValidation = Yup.object().shape({
    email: Yup.string()
      .required("Vui lòng nhập email")
      .email("Vui lòng nhập địa chỉ email hợp lệ"),
    password: Yup.string()
      .required("Vui lòng nhập mật khẩu")
      .min(8, "Mật khẩu của bạn phải có ít nhất 8 ký tự trở lên"),
  });
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    resolver: yupResolver(schemaValidation),
    mode: "onChange",
  });
  const enableLoading = () => {
    setLoading(true);
  };

  const disableLoading = () => {
    setLoading(false);
  };
  const handleSumitLogin = async (values) => {
    if (!isValid) return;
    enableLoading();
    setTimeout(() => {
      login(values)
        .then((res) => {
          const token = res.data;
          disableLoading();
          props.login(token);
        })
        .catch((error) => {})
        .finally(() => {
          disableLoading();
        });
    }, 500);
  };
  return (
    <AuthenticatePage>
      <form onSubmit={handleSubmit(handleSumitLogin)}>
        <Field>
          <Input
            placeholder="Email của bạn"
            control={control}
            name="email"
            type="email"
          >
            <MdAlternateEmail />
          </Input>
          {errors && <p className="text-red-600">{errors.email?.message}</p>}
        </Field>
        <Field>
          <InputPasswordToggle
            placeholder="Mật khẩu"
            control={control}
            name="password"
            type="password"
          >
            <RiUserSmileLine />
          </InputPasswordToggle>
          {errors && <p className="text-red-600">{errors.password?.message}</p>}
        </Field>
        <NavLink to="/forgot-password" className="text-sm px-4">
          Quên mật khẩu?
        </NavLink>
        <Button type="submit" className="w-full my-8" disabled={isSubmitting}>
          {loading ? <LoadingSubmit /> : "Đăng nhập"}
        </Button>
        <div className="font-semibold mb-5 text-center">
          Bạn chưa có tài khoản?{" "}
          <NavLink className="text-blue-500 ml-5" to="/sign-up">
            Đăng ký
          </NavLink>
        </div>
      </form>
    </AuthenticatePage>
  );
};

export default injectIntl(connect(null, auth.actions)(SignInPage));
