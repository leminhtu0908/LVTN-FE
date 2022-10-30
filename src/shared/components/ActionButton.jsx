import { IconButton, Tooltip } from "@mui/material";
import React from "react";
import { GoDiffAdded } from "react-icons/go";
const ActionButton = (props) => {
  const openCreateDialog = () => {
    props.actionCreateDialog();
  };
  return (
    <div>
      <Tooltip title="Thêm danh mục">
        <IconButton onClick={openCreateDialog}>
          <GoDiffAdded className="text-[#00b791]"></GoDiffAdded>
        </IconButton>
      </Tooltip>
    </div>
  );
};

export default ActionButton;
