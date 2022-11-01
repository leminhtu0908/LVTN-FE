import React from "react";
import { Link, NavLink, useMatch, useResolvedPath } from "react-router-dom";
import { dataSidebar } from "../../utils/dataSidebar";
import { useDispatch } from "react-redux";
import { actions } from "../../app/modules/Auth/_redux/authRedux";
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
  return (
    <div className="w-full bg-white p-4">
      {dataSidebar.map((link, index) => {
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
      })}
    </div>
  );
};

export default Sidebar;
