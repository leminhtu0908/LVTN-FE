import {
  Button,
  Dialog,
  Divider,
  List,
  ListItem,
  ListItemText,
  Slide,
} from "@mui/material";
import React from "react";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ContentDialog = (props) => {
  return (
    <div>
      <Dialog
        fullScreen
        open={props.open}
        onClose={props.handleCloseContent}
        TransitionComponent={Transition}
      >
        <div className="flex items-start justify-center p-20 pt-5 h-[100vh]">
          <div className="wrapper w-full">
            <div className="flex items-center justify-between  mb-5">
              <h1 className="font-semibold">Nội dung bài viết</h1>
              <Button
                color="error"
                variant="contained"
                onClick={props.handleCloseContent}
              >
                Đóng
              </Button>
            </div>
            <hr />
            <div className="mt-10">
              <div
                className=""
                dangerouslySetInnerHTML={{ __html: `${props.content}` }}
              ></div>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default ContentDialog;
