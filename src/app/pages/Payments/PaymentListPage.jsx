import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import LayoutCustomer from "../../../components/layouts/LayoutCustomer";
import PaymentInfo from "./PaymentInfo";
import Payment from "./Payment";
import { useForm } from "react-hook-form";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as tinhAction from "../Tinh/_redux/tinhAction";
import * as cartAction from "../Cart/_redux/cartAction";
import axios from "axios";
import PaymentSuccess from "./PaymentSuccess";
import PaymentsCompleted from "./PaymentsCompleted";
import { useLocation, useNavigate } from "react-router-dom";
const steps = ["Thông tin đặt hàng", "Thanh toán", "Hoàn tất"];
const PaymentListPage = () => {
  const location = useLocation();
  const defaultValues = {
    tinh: "",
    huyen: "",
    xa: "",
  };
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [information, setInformation] = React.useState(null);
  const [formValues, setFormValues] = React.useState(defaultValues);
  const [valuesPayment, setValuesPayment] = React.useState({
    bankcode: "cash",
    bankCode: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentState, cartState } = useSelector(
    (state) => ({
      currentState: state.auth,
      cartState: state.cart,
    }),
    shallowEqual
  );
  const { user, authToken } = currentState;
  const { cartTotalAmount, cart, cartTotalQuantity } = cartState;
  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };
  const handleNextStep3 = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const handleFormValues = (values) => {
    setFormValues(values);
  };
  const handleValueRadio = (value) => {
    setValuesPayment(value);
  };
  const PaymentDisplay = () => {
    if (activeStep === 0) {
      return (
        <PaymentInfo
          control={control}
          valuesSubmit={formValues}
          onChangeFormValue={handleFormValues}
        ></PaymentInfo>
      );
    }
    if (activeStep === 1) {
      return (
        <Payment
          info={information}
          valuesRadio={valuesPayment}
          onChangeRadio={handleValueRadio}
        />
      );
    }
    if (activeStep === steps.length - 1) {
      return <PaymentSuccess />;
    }
  };
  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid, errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      tinh: "",
      huyen: "",
      xa: "",
      sonha: "",
    },
  });

  useEffect(() => {
    reset({
      name: user?.fullName || "",
      email: user?.email || "",
      phone: user?.phone || "",
      sonha: "",
    });
  }, []);
  useEffect(() => {
    dispatch(tinhAction.getAllTinh());
  }, [dispatch]);

  useEffect(() => {
    dispatch(cartAction.getTotal());
  }, [dispatch, cart, cartTotalQuantity]);
  const handleSubmitPaymentInfo = (values) => {
    const cloneValue = {
      ...formValues,
      ...values,
    };
    setInformation(cloneValue);
  };
  const handleSubmitCheckout = async () => {
    const transID = Math.floor(Math.random() * 1000000);
    if (valuesPayment.bankcode === "cash") {
      const cloneValues = authToken?.token
        ? {
            ...information,
            order_id: transID,
            product_total: cartTotalQuantity,
            price_total: cartTotalAmount,
            cart: cart,
            user_id: user._id,
            status: false,
          }
        : {
            ...information,
            order_id: transID,
            product_total: location?.state?.cartTotalQuantity,
            price_total: location?.state?.cartTotalAmount,
            cart: location?.state,
            status: false,
          };
      if (authToken?.token) {
        await axios
          .post(
            `${process.env.REACT_APP_API_URL}/api/payment/cash`,
            cloneValues
          )
          .then((res) => {
            if (res.data.status === "success") {
              localStorage.removeItem("cartItems");
              handleNextStep3();
            }
          });
      } else {
        fetch(`${process.env.REACT_APP_API_URL}/api/payment/visited/cash`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(cloneValues),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.status === "success") {
              handleNextStep3();
            }
          });
      }
    }
    if (valuesPayment.bankcode === "zalopayapp") {
      const items = {
        cart: cart,
        amount: cartTotalAmount,
        bankCode: valuesPayment?.bankCode,
        transID: transID,
        orderDescription: "Thanh toan hoa don",
        orderType: "fashion",
        language: "vn",
        ...information,
      };
      await axios
        .post(`${process.env.REACT_APP_API_URL}/api/payment/vnpay`, items)
        .then((res) => {
          window.open(res.data.url);
        });
    }
  };
  return (
    <LayoutCustomer>
      <div className="pt-[88px]">
        {activeStep === 0 && (
          <div className="w-full max-w-[700px] mx-auto flex items-center mt-5 shadow-md py-4 rounded-lg">
            <div className="basis-[35%] ml-2">
              <Button
                variant="contained"
                color="error"
                type="button"
                onClick={() => navigate(-1)}
              >
                Trở về
              </Button>
            </div>
            <h1 className="basis-[65%] text-2xl font-medium">
              Các bước thanh toán
            </h1>
          </div>
        )}
        <form onSubmit={handleSubmit(handleSubmitPaymentInfo)} className="p-4">
          <Box sx={{ width: "100%", maxWidth: "700px", margin: "0 auto" }}>
            <Stepper activeStep={activeStep}>
              {steps.map((label, index) => {
                const stepProps = {};
                const labelProps = {};
                if (isStepOptional(index)) {
                  labelProps.optional = (
                    <Typography variant="caption"></Typography>
                  );
                }
                if (isStepSkipped(index)) {
                  stepProps.completed = false;
                }
                return (
                  <Step key={label} {...stepProps}>
                    <StepLabel {...labelProps}>{label}</StepLabel>
                  </Step>
                );
              })}
            </Stepper>
            {activeStep === steps.length ? (
              <React.Fragment>
                <PaymentsCompleted></PaymentsCompleted>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Typography sx={{ mt: 2, mb: 1 }}>
                  {PaymentDisplay()}
                </Typography>
                {activeStep === 2 ? null : (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      pt: 2,
                    }}
                  >
                    <Typography sx={{ fontSize: "20px", fontWeight: "bold" }}>
                      Tổng tiền tạm tính:
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "25px",
                        fontWeight: "bold",
                        color: "green",
                      }}
                    >
                      {authToken?.token
                        ? cartTotalAmount?.toLocaleString("vi", {
                            style: "currency",
                            currency: "VND",
                          })
                        : location?.state?.cartTotalAmount?.toLocaleString(
                            "vi",
                            {
                              style: "currency",
                              currency: "VND",
                            }
                          )}
                    </Typography>
                  </Box>
                )}
                <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                  <Button
                    color="inherit"
                    sx={{ textTransform: "none", mr: 1 }}
                    disabled={activeStep === 0 || activeStep === 2}
                    variant="contained"
                    onClick={handleBack}
                  >
                    Trở về
                  </Button>
                  <Box sx={{ flex: "1 1 auto" }} />
                  <Button
                    sx={{ textTransform: "none" }}
                    variant="contained"
                    type="submit"
                    onClick={
                      activeStep === 0
                        ? handleNext
                        : activeStep === 1
                        ? handleSubmitCheckout
                        : handleNextStep3
                    }
                  >
                    {activeStep === steps.length - 1
                      ? "Kết thúc"
                      : `${activeStep === 1 ? "Thanh toán" : "Tiếp theo"}`}
                  </Button>
                </Box>
              </React.Fragment>
            )}
          </Box>
        </form>
      </div>
    </LayoutCustomer>
  );
};

export default PaymentListPage;
