import { Logout, PersonAdd, Settings } from "@mui/icons-material";
import {
  Avatar,
  Badge,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { actions } from "../../app/modules/Auth/_redux/authRedux";
import * as danhMucAction from "../../app/modules/Admin/DanhMuc/_redux/danhMucAction";
import { AiOutlineLogin, AiOutlineShoppingCart } from "react-icons/ai";
import slugify from "slugify";
import { AvatarDefault } from "../../utils/avatarDefault";
import { ImNewspaper } from "react-icons/im";
import * as userAction from "../../app/modules/Admin/User/_redux/userAction";
const HeaderCustomer = () => {
  const { currentState, categoryState, cartState, userState } = useSelector(
    (state) => ({
      currentState: state.auth,
      categoryState: state.categorys,
      cartState: state.cart,
      userState: state.users,
    }),
    shallowEqual
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cart } = cartState;
  const { data, productData } = categoryState;
  const { data: dataUser, userImage, userForEdit } = userState;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    localStorage.clear();
    dispatch(actions.logout());
    window.location.href = "/";
  };
  useEffect(() => {
    dispatch(danhMucAction.fetchCategoryCustomer());
  }, [dispatch, productData]);
  useEffect(() => {
    if (currentState?.user?.email) {
      dispatch(
        userAction.fetchUserByEmail({
          params: { email: currentState?.user?.email },
        })
      );
    }
  }, [currentState?.user?.email, dispatch, userImage, userForEdit]);

  return (
    <div className="fixed z-50 w-full bg-white">
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
                      to={`/danhmuc/${slugify(item?.name, {
                        lower: true,
                        locale: "vi",
                      })}`}
                      key={index}
                      className="p-4 menu-item"
                    >
                      {item?.name}
                    </NavLink>
                  ))}
              </ul>
            </div>
            <Tooltip title="Giỏ hàng">
              <IconButton onClick={() => navigate("/cart")}>
                <Badge badgeContent={cart?.length} color="primary">
                  <AiOutlineShoppingCart className="text-green-500" />
                </Badge>
              </IconButton>
            </Tooltip>
            <Tooltip title="Tin tức">
              <IconButton onClick={() => navigate("/news-page")}>
                <ImNewspaper className="text-green-500" />
              </IconButton>
            </Tooltip>
            {currentState?.authToken?.token ? (
              <div className="flex items-center gap-x-2">
                <span>{dataUser?.fullName}</span>
                <img
                  src={
                    !dataUser?.image
                      ? AvatarDefault.avatarMale
                      : dataUser?.image
                  }
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
                  <MenuItem onClick={() => navigate("/user/profile")}>
                    <Avatar /> Cập nhật tài khoản
                  </MenuItem>
                  <MenuItem onClick={() => navigate("/order/history")}>
                    <Avatar /> Lịch sử đặt hàng
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
    </div>
  );
};

export default HeaderCustomer;
