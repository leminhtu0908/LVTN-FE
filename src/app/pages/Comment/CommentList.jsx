import {
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "../../../components/button";
import HeadingLayout from "../../../components/header/HeadingLayout";
import LoadingSubmit from "../../../components/loading/LoadingSubmit";
import { TextArea } from "../../../components/textarea";
import { AvatarDefault } from "../../../utils/avatarDefault";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Delete, Edit } from "@mui/icons-material";
const CommentList = (props) => {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { isValid, errors },
  } = useForm({
    mode: "onChange",
  });
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selected, setSelected] = React.useState("");
  const [userSelected, setUserSelected] = React.useState("");
  const [openEdit, setOpenEdit] = React.useState(false);
  const [openReply, setOpenReply] = React.useState(false);
  const open = Boolean(anchorEl);
  const handleClick = (event, values) => {
    setAnchorEl(event.currentTarget);
    setSelected(values);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleComment = (values) => {
    props.handleValuesComment(values);
    setValue("content", "");
  };
  const handleEdit = (selected) => {
    setUserSelected(selected);
    setOpenEdit(true);
  };
  const handleEditComment = (values) => {
    const newValueUpdate = {
      content: values.contentUpdate,
      id: userSelected,
    };
    props?.handleEditComment(newValueUpdate);
    setValue("contentUpdate", "");
    setOpenEdit(false);
  };
  const handleDelete = (selected) => {
    props?.handleDeleteComment(selected);
  };
  const handleOpenReply = (selected) => {
    setOpenReply(!openReply);
    setSelected(selected);
  };
  const handleReplyComment = (values) => {
    const newValues = {
      id: selected,
      replyComment: values.replyComment,
    };
    props.handleRelyComment(newValues);
    setOpenReply(false);
  };
  return (
    <div className="p-4 mx-auto w-full max-w-[1200px] pt-[88px]">
      <HeadingLayout>Bình luận sản phẩm</HeadingLayout>
      <div className="my-10">
        {props?.loading === true ? (
          <div className="w-10 h-10 rounded-full border-4 mx-0 border-green-500 border-t-4 border-t-transparent animate-spin mt-5"></div>
        ) : props?.data?.length > 0 ? (
          <>
            {props?.data?.map((item, index) => (
              <div key={index} className="mb-5">
                <div className="flex gap-x-3">
                  <img
                    src={
                      item?.user?.image
                        ? item?.user?.image
                        : AvatarDefault.avatarMale
                    }
                    alt=""
                    className="w-[30px] h-[30px] rounded-full"
                  />
                  <div className="">
                    <div className="p-2 bg-slate-100 rounded-lg">
                      <p className="font-semibold">{item?.user?.fullName}</p>
                      <span>{item?.content}</span>
                    </div>
                    {item?.user?._id !== props?.userId && (
                      <span
                        onClick={() => handleOpenReply(item._id)}
                        className="hover:underline cursor-pointer font-semibold text-[12px]"
                      >
                        Phản hồi
                      </span>
                    )}
                  </div>
                  {item?.user?._id === props?.userId && (
                    <div className="">
                      <Tooltip title="Chỉnh sửa hoặc xóa bình luận">
                        <IconButton
                          onClick={(event) => handleClick(event, item?._id)}
                          size="small"
                          aria-controls={open ? "account-menu" : undefined}
                          aria-haspopup="true"
                          aria-expanded={open ? "true" : undefined}
                        >
                          <MoreHorizIcon sx={{ width: 32, height: 32 }}>
                            M
                          </MoreHorizIcon>
                        </IconButton>
                      </Tooltip>
                    </div>
                  )}
                </div>
                {item?.reply?.map((rep) => (
                  <>
                    <div className="flex gap-x-3 mb-5 mt-3 ml-[44px]">
                      <img
                        src={
                          rep?.image !== ""
                            ? rep?.image
                            : AvatarDefault.avatarMale
                        }
                        alt=""
                        className="w-[30px] h-[30px] rounded-full"
                      />
                      <div className="">
                        <div className="p-2 bg-slate-100 rounded-lg">
                          <p className="font-semibold">{rep?.username}</p>
                          <span>{rep?.replyComment}</span>
                        </div>
                      </div>
                    </div>
                  </>
                ))}
                {openReply && selected === item?._id && (
                  <form onSubmit={handleSubmit(handleReplyComment)}>
                    <TextArea
                      placeholder="Viết bình luận..."
                      name="replyComment"
                      control={control}
                      value={item?.content}
                    ></TextArea>
                    <div className="pt-1 mb-3">
                      <Button type="submit" className="mx-0 w-[150px]">
                        Phản hồi
                      </Button>
                    </div>
                  </form>
                )}
                {openEdit &&
                  userSelected === item?._id &&
                  item?.user?._id === props?.userId && (
                    <form onSubmit={handleSubmit(handleEditComment)}>
                      <TextArea
                        placeholder="Viết bình luận..."
                        name="contentUpdate"
                        control={control}
                        value={item?.content}
                      ></TextArea>
                      <div className="pt-1 mb-3">
                        <Button type="submit" className="mx-0 w-[150px]">
                          Cập nhật
                        </Button>
                      </div>
                    </form>
                  )}
              </div>
            ))}
          </>
        ) : (
          "Chưa có bình luận nào!!!! "
        )}
      </div>
      <form onSubmit={handleSubmit(handleComment)}>
        <TextArea
          placeholder="Viết bình luận..."
          name="content"
          control={control}
        ></TextArea>
        <div className="pt-2">
          <Button
            type="submit"
            className="mx-0 w-[150px]"
            disabled={props?.loading}
          >
            Gửi
          </Button>
        </div>
      </form>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={() => handleEdit(selected)}>
          <ListItemIcon>
            <Edit fontSize="small" />
          </ListItemIcon>
          Chỉnh sửa
        </MenuItem>
        <MenuItem onClick={() => handleDelete(selected)}>
          <ListItemIcon>
            <Delete fontSize="small" />
          </ListItemIcon>
          Xóa
        </MenuItem>
      </Menu>
    </div>
  );
};

export default CommentList;
