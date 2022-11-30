import React from "react";
import { Link, NavLink, useMatch, useResolvedPath } from "react-router-dom";
import { dataSidebar } from "../../utils/dataSidebar";
import { useDispatch } from "react-redux";
import { actions } from "../../app/modules/Auth/_redux/authRedux";
import {
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { ExpandLess, ExpandMore, StarBorder } from "@mui/icons-material";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CategoryIcon from "@mui/icons-material/Category";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import FeedIcon from "@mui/icons-material/Feed";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import PermDataSettingIcon from "@mui/icons-material/PermDataSetting";
import MapsHomeWorkIcon from "@mui/icons-material/MapsHomeWork";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import MemoryIcon from "@mui/icons-material/Memory";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import ViewCarouselIcon from "@mui/icons-material/ViewCarousel";
import ImageIcon from "@mui/icons-material/Image";
const Sidebar = () => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(actions.logout());
  };
  const CustomLink = ({ children, to, ...props }) => {
    const resolved = useResolvedPath(to);
    const match = useMatch({ path: resolved.pathname, end: true });
    return (
      <li className={match ? "nav-item active" : "nav-item"}>
        <Link className="nav-link" to={to} {...props}>
          {children}
        </Link>
      </li>
    );
  };
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <div className="w-full bg-white p-4">
      {/* {dataSidebar.map((link, index) => {
        if (link.onClick)
          return (
            <NavLink
              to={link.url}
              className="flex items-center gap-5 px-5 py-[14px] rounded-lg font-medium text-[#808191] cursor-pointer  "
              key={index}
              onClick={handleLogout}
            >
              <span className="menu-icon text-slate-400">{link.icon}</span>
              <span className="menu-text">{link.title}</span>
            </NavLink>
          );
        return (
          <CustomLink
            to={link.url}
            className="flex items-center gap-5 px-5 py-[14px] rounded-lg font-medium text-[#808191] cursor-pointer"
            key={index}
          >
            <span className="menu-icon text-slate-400">{link.icon}</span>
            <span className="menu-text text-sm">{link.title}</span>
          </CustomLink>
        );
      })} */}
      <List
        sx={{ width: "100%", borderRadius: "16px" }}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        <CustomLink to="/admin">
          <ListItemButton>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Trang chủ" />
          </ListItemButton>
        </CustomLink>
        <CustomLink to="/admin/category">
          <ListItemButton>
            <ListItemIcon>
              <CategoryIcon />
            </ListItemIcon>
            <ListItemText primary="Quản lý danh mục" />
          </ListItemButton>
        </CustomLink>
        <CustomLink to="/admin/user">
          <ListItemButton>
            <ListItemIcon>
              <PeopleAltIcon />
            </ListItemIcon>
            <ListItemText primary="Quản lý người dùng" />
          </ListItemButton>
        </CustomLink>
        <CustomLink to="/admin/news">
          <ListItemButton>
            <ListItemIcon>
              <FeedIcon />
            </ListItemIcon>
            <ListItemText primary="Quản lý bài viết" />
          </ListItemButton>
        </CustomLink>
        <CustomLink to="/admin/products">
          <ListItemButton>
            <ListItemIcon>
              <ProductionQuantityLimitsIcon />
            </ListItemIcon>
            <ListItemText primary="Quản lý sản phẩm" />
          </ListItemButton>
        </CustomLink>
        <CustomLink to="/admin/order">
          <ListItemButton>
            <ListItemIcon>
              <PlaylistAddCheckIcon />
            </ListItemIcon>
            <ListItemText primary="Quản lý đơn đặt hàng" />
          </ListItemButton>
        </CustomLink>

        <ListItemButton onClick={handleClick}>
          <ListItemIcon>
            <PermDataSettingIcon />
          </ListItemIcon>
          <ListItemText primary="Cấu hình" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={!open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <CustomLink to="/admin/brand">
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                  <MapsHomeWorkIcon />
                </ListItemIcon>
                <ListItemText primary="Nhà sản xuất" />
              </ListItemButton>
            </CustomLink>
            <CustomLink to="/admin/type-product">
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                  <AccountTreeIcon />
                </ListItemIcon>
                <ListItemText primary="Loại sản phẩm" />
              </ListItemButton>
            </CustomLink>
            <CustomLink to="/admin/memory">
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                  <MemoryIcon />
                </ListItemIcon>
                <ListItemText primary="Bộ nhớ" />
              </ListItemButton>
            </CustomLink>
            <CustomLink to="/admin/color">
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                  <ColorLensIcon />
                </ListItemIcon>
                <ListItemText primary="Màu sắc" />
              </ListItemButton>
            </CustomLink>
            <CustomLink to="/admin/banner">
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                  <ViewCarouselIcon />
                </ListItemIcon>
                <ListItemText primary="Ảnh quảng cáo" />
              </ListItemButton>
            </CustomLink>
            <CustomLink to="/admin/images">
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                  <ImageIcon />
                </ListItemIcon>
                <ListItemText primary="Ảnh sản phẩm" />
              </ListItemButton>
            </CustomLink>
          </List>
        </Collapse>
      </List>
    </div>
  );
};

export default Sidebar;
