import { IconButton, Tooltip } from "@mui/material";
import React from "react";
import { AiOutlineDownload } from "react-icons/ai";
import { GoDiffAdded } from "react-icons/go";
import { useDispatch } from "react-redux";
import * as actionOrder from "../../app/modules/Admin/Order/_redux/orderAction";
const ActionButton = (props) => {
  const dispatch = useDispatch();
  const openCreateDialog = () => {
    props.actionCreateDialog();
  };
  const handleExportDataOrder = () => {
    dispatch(actionOrder.exportExcel());
  };
  return (
    <div>
      {props.export ? (
        <Tooltip title={props.title}>
          <IconButton onClick={handleExportDataOrder}>
            <AiOutlineDownload className="text-[#00b791]"></AiOutlineDownload>
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title={props.title}>
          <IconButton onClick={openCreateDialog}>
            <GoDiffAdded className="text-[#00b791]"></GoDiffAdded>
          </IconButton>
        </Tooltip>
      )}
    </div>
  );
};

export default ActionButton;
