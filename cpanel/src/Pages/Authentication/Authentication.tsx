import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar/Snackbar";
import { FC, useState } from "react";
import { Helmet } from "react-helmet";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ERouter } from "../../Constants/Enums/router";
import { InputsAuthentication } from "../../Constants/Types/type";
import { AuthenticationService } from "../../Services/authentication/authentication";
import Logo from "./../../Styles/assets/Logo.png";
import styles from "./authentication.module.scss";

interface AuthenticationProps {}
interface FormAuthenticationProps {
  onSubmit: any;
  children: React.ReactNode;
  desc: string;
}

const FormAuthentication: FC<FormAuthenticationProps> = ({
  children,
  desc,
  onSubmit,
}) => {
  return (
    <form className={styles.Authentication__Header__Form} onSubmit={onSubmit}>
      <h1 className={styles.Authentication__Header__Form__Heading}>
        Chào mừng
      </h1>
      <p className={styles.Authentication__Header__Form__Desc}>{desc}</p>

      {children}

      <button type="submit">Xác minh</button>
    </form>
  );
};

const Authentication: FC<AuthenticationProps> = () => {
  const {
    register,
    clearErrors,
    formState: { errors },
    handleSubmit,
  } = useForm<InputsAuthentication>();
  const navigate = useNavigate();
  const authentication = AuthenticationService.getInstance();
  const [tabs, setTabs] = useState<number>(0);
  const [openError, setOpenError] = useState({
    value: false,
    message: "",
  });

  const onSubmitLogin: SubmitHandler<InputsAuthentication> = async (data) => {
    const response = await authentication.signIn({
      username: data.usernameRequired,
      password: data.passwordRequired,
    });

    if (response.statusCode !== 200) {
      return setOpenError({
        ...openError,
        value: true,
        message: response.message,
      });
    }

    return setTabs(1);
  };

  const onSubmitSendVerified: SubmitHandler<InputsAuthentication> = async (
    data
  ) => {
    const response = await authentication.sendVerifiedCodeOTP(
      data.optionOtpRequired,
      data.usernameRequired
    );

    if (!response.data.status) {
      return setOpenError({
        ...openError,
        value: true,
        message:
          "Có lỗi trong quá trình gửi mã OTP! Refresh lại trang và thử lại sau",
      });
    }
    return setTabs(2);
  };

  const onSubmitVerified: SubmitHandler<InputsAuthentication> = async (
    data
  ) => {
    const isAuthentication = await authentication.verifiedCodeOTP({
      code: data.otpRequired,
      username: data.usernameRequired,
    });

    if (!isAuthentication.status) {
      return setOpenError({
        ...openError,
        value: true,
        message: isAuthentication.message,
      });
    }
    setTabs(0);
    return navigate(`/${ERouter.app}`, { replace: true });
  };

  return (
    <div className={styles.Authentication}>
      <Helmet>
        <title>Đăng nhập</title>
        <meta name="description" content="Trang đăng nhập" />
      </Helmet>

      <Snackbar
        open={openError.value}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        autoHideDuration={6000}
        onClose={() => {
          setOpenError({ ...openError, value: false, message: "" });
        }}
        onClick={() =>
          setOpenError({ ...openError, value: false, message: "" })
        }
      >
        <Alert severity="error">{openError.message}</Alert>
      </Snackbar>

      <header className={styles.Authentication__Header}>
        <div className={styles.Authentication__Header__Logo}>
          <img src={Logo} alt="Logo" />
          <h4>SOL</h4>
        </div>

        {tabs === 0 && (
          <FormAuthentication
            desc="Kính chào mừng bạn đăng nhập vào hệ thống."
            onSubmit={handleSubmit(onSubmitLogin)}
          >
            <div className={styles.Authentication__Header__Form__Field}>
              <label>Mã số thẻ:</label>
              <input
                type="text"
                {...register("usernameRequired", {
                  required: {
                    value: true,
                    message: "Vui lòng nhập mã thẻ!",
                  },
                  maxLength: {
                    value: 8,
                    message: "Mã số thẻ không thể quá 8 ký tự!!",
                  },
                  onBlur: () => {
                    clearErrors("usernameRequired");
                  },
                })}
                placeholder="Vui lòng nhập mã số thẻ của bạn"
              />
              {errors.usernameRequired && (
                <span className="error-message-form">
                  {errors.usernameRequired.message}
                </span>
              )}
            </div>

            <div className={styles.Authentication__Header__Form__Field}>
              <label>Mật khẩu:</label>
              <input
                type="password"
                {...register("passwordRequired", {
                  required: {
                    value: true,
                    message: "Vui lòng nhập mật khẩu!",
                  },
                  maxLength: {
                    value: 16,
                    message: "Mật khẩu không thể quá 16 ký tự!",
                  },
                  // minLength: {
                  //   value: 8,
                  //   message: "Mật khẩu không thể nhỏ hơn 8 ký tự!",
                  // },
                  onBlur: () => {
                    clearErrors("passwordRequired");
                  },
                })}
                placeholder="Vui lòng nhập mật khẩu của bạn"
              />
              {errors.passwordRequired && (
                <span className="error-message-form">
                  {errors.passwordRequired.message}
                </span>
              )}
            </div>
          </FormAuthentication>
        )}

        {tabs === 1 && (
          <FormAuthentication
            desc="Vui lòng loại xác thực để gửi mã OTP"
            onSubmit={handleSubmit(onSubmitSendVerified)}
          >
            <div
              className={styles.Authentication__Header__Form__Field__Verified}
            >
              <div className="radio">
                <input
                  {...register("optionOtpRequired")}
                  id="radio-1"
                  type="radio"
                  value={"Phone"}
                  checked
                />
                <label htmlFor="radio-1" className="radio-label">
                  Số điện thoại
                </label>
              </div>
              <div className="radio">
                <input
                  {...register("optionOtpRequired")}
                  id="radio-2"
                  type="radio"
                  value={"Mail"}
                />
                <label htmlFor="radio-2" className="radio-label">
                  Email
                </label>
              </div>
              {errors.passwordRequired && (
                <span className="error-message-form">
                  {errors.passwordRequired.message}
                </span>
              )}
            </div>
          </FormAuthentication>
        )}

        {tabs === 2 && (
          <FormAuthentication
            desc="Vui lòng loại xác thực để gửi mã OTP"
            onSubmit={handleSubmit(onSubmitVerified)}
          >
            <div className={styles.Authentication__Header__Form__Field}>
              <label>Mã xác thực OTP:</label>
              <input
                type="text"
                {...register("otpRequired", {
                  required: {
                    value: true,
                    message: "Vui lòng nhập mã OTP!",
                  },
                  maxLength: {
                    value: 8,
                    message: "Mã OTP không thể quá 8 ký tự!",
                  },
                  onBlur: () => {
                    clearErrors("otpRequired");
                  },
                })}
                placeholder="Vui lòng nhập mật khẩu của bạn"
              />
              {errors.otpRequired && (
                <span className="error-message-form">
                  {errors.otpRequired.message}
                </span>
              )}
            </div>
          </FormAuthentication>
        )}
      </header>

      <section className={styles.Authentication__Section}></section>
    </div>
  );
};

export default Authentication;
