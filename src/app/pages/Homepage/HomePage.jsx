import { Logout, PersonAdd, Settings } from "@mui/icons-material";
import {
  Avatar,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { Button } from "../../../components/button";
import { AvatarDefault } from "../../../utils/avatarDefault";
import { actions } from "../../modules/Auth/_redux/authRedux";
import * as danhMucAction from "../../modules/Admin/DanhMuc/_redux/danhMucAction";
import { AiOutlineLogin, AiOutlineShoppingCart } from "react-icons/ai";
import slugify from "slugify";

const HomePage = ({ children }) => {
  const { currentState, categoryState } = useSelector(
    (state) => ({ currentState: state.auth, categoryState: state.categorys }),
    shallowEqual
  );
  //   const { fullName } = currentState?.authToken?.user;
  const filter = {
    name: "",
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data } = categoryState;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    dispatch(actions.logout());
    navigate("/");
  };
  useEffect(() => {
    dispatch(danhMucAction.fetchCategories({ params: { ...filter } }));
  }, []);

  return (
    <>
      <div>
        <div className="shadow-lg px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-x-10 w-[150px] h-[40px]">
              <Link to="/">
                <img
                  srcSet="/img/logo1.png"
                  alt=""
                  className="w-full h-full object-contain"
                />
              </Link>
              {/* <Search /> */}
            </div>
            <div className="flex items-center gap-x-2">
              <div className="flex cursor-pointer">
                <ul className="flex items-center gap-x-5">
                  {data?.length > 0 &&
                    data?.map((item, index) => (
                      <NavLink
                        to={`/${slugify(item?.name, { lower: true })}`}
                        key={index}
                        className="p-4"
                      >
                        {item?.name}
                      </NavLink>
                    ))}
                </ul>
              </div>
              <Tooltip title="Giỏ hàng">
                <IconButton onClick={() => alert("Thêm vào giỏ hàng")}>
                  <AiOutlineShoppingCart className="text-green-500" />
                </IconButton>
              </Tooltip>
              {currentState?.authToken?.token ? (
                <div className="flex items-center gap-x-2">
                  <span>{currentState?.authToken?.user?.fullName}</span>
                  <img
                    src={AvatarDefault.avatarMale}
                    alt=""
                    className="w-[42px] h-[42px] object-cover rounded-full cursor-pointer"
                    onClick={handleClick}
                  />
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
                    <MenuItem>
                      <Avatar /> Profile
                    </MenuItem>
                    <MenuItem>
                      <Avatar /> My account
                    </MenuItem>
                    <Divider />
                    <MenuItem>
                      <ListItemIcon>
                        <PersonAdd fontSize="small" />
                      </ListItemIcon>
                      Add another account
                    </MenuItem>
                    <MenuItem>
                      <ListItemIcon>
                        <Settings fontSize="small" />
                      </ListItemIcon>
                      Settings
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>
                      <ListItemIcon>
                        <Logout fontSize="small" />
                      </ListItemIcon>
                      Logout
                    </MenuItem>
                  </Menu>
                </div>
              ) : (
                <Tooltip title="Đăng nhập">
                  <IconButton onClick={() => navigate("/sign-in")}>
                    <AiOutlineLogin className="text-green-500" />
                  </IconButton>
                </Tooltip>
              )}
            </div>
          </div>
        </div>
        {children}
      </div>
      <Outlet />
    </>
  );
};

export default HomePage;
