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
const steps = ["Thông tin đặt hàng", "Thanh toán", "Hoàn tất"];
const PaymentListPage = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [information, setInformation] = React.useState(null);
  const dispatch = useDispatch();
  const { currentState, cartState, tinhState } = useSelector(
    (state) => ({
      currentState: state.auth,
      cartState: state.cart,
      tinhState: state.tinh,
    }),
    shallowEqual
  );
  const { user } = currentState;
  const { cartTotalAmount, cart, cartQuantity } = cartState;
  const { data: tinhData } = tinhState;
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

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const PaymentDisplay = () => {
    if (activeStep === 0) {
      return <PaymentInfo control={control} tinh={tinhData}></PaymentInfo>;
    }
    if (activeStep === 1) {
      return <Payment info={information} />;
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
      sonha: "",
    },
  });

  useEffect(() => {
    reset({
      name: user.fullName,
      email: user.email,
      phone: user.phone,
      tinh: "",
      huyen: "",
      sonha: "",
    });
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      await fetch("https://provinces.open-api.vn/api/?depth=2")
        .then((response) => response.json())
        .then((data) => dispatch(tinhAction.getAllTinh(data)));
    };
    fetchData();
  }, []);

  useEffect(() => {
    dispatch(cartAction.getTotal());
  }, [dispatch, cart, cartQuantity]);
  const handleSubmitPaymentInfo = (values) => {
    setInformation(values);
  };
  return (
    <LayoutCustomer>
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
              <Typography sx={{ mt: 2, mb: 1 }}>
                All steps completed - you&apos;re finished
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Box sx={{ flex: "1 1 auto" }} />
              </Box>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Typography sx={{ mt: 2, mb: 1 }}>{PaymentDisplay()}</Typography>
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
                  sx={{ fontSize: "25px", fontWeight: "bold", color: "green" }}
                >
                  {cartTotalAmount.toLocaleString("vi", {
                    style: "currency",
                    currency: "VND",
                  })}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Button
                  color="inherit"
                  sx={{ textTransform: "none", mr: 1 }}
                  disabled={activeStep === 0}
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
                  onClick={handleNext}
                >
                  {activeStep === steps.length - 1 ? "Kêt thúc" : "Tiếp theo"}
                </Button>
              </Box>
            </React.Fragment>
          )}
        </Box>
      </form>
    </LayoutCustomer>
  );
};

export default PaymentListPage;
