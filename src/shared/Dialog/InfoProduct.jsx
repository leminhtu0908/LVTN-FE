import { Dialog, Slide } from "@mui/material";
import React from "react";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const InfoProduct = (props) => {
  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.handleClose}
        TransitionComponent={Transition}
        maxWidth={"xl"}
      >
        <div className="max-w-[1200px] w-full mx-auto p-4 px-10">
          <div className="mt-10 text-xl font-semibold mb-5 text-center">
            Thông tin sản phẩm
          </div>
          <div
            className=""
            dangerouslySetInnerHTML={{ __html: `${props.data}` }}
          ></div>
        </div>
      </Dialog>
    </div>
  );
};

export default InfoProduct;
