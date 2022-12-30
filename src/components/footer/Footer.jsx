import React from "react";
import { FaTiktok } from "react-icons/fa";
import { BsFacebook, BsFillCreditCard2BackFill } from "react-icons/bs";
import { AiFillInstagram } from "react-icons/ai";
import { Link } from "react-router-dom";
const listOne = [
  {
    id: 1,
    name: "Chính sách bảo hành",
  },
  { id: 2, name: "Chính sách đổi trả" },
  { id: 3, name: "Chính sách khui hộp" },
];

const listTwo = [
  {
    id: 1,
    name: "Quy chế hoạt động website",
  },
  { id: 2, name: "Giới thiệu về của hàng" },
  { id: 3, name: "Gửi góp ý, khiếu nại" },
  { id: 4, name: "Tuyển dụng" },
];
const listThree = [
  { id: 1, name: "Gọi mua : 0349235770" },
  { id: 2, name: "Tư vấn bán hàng : 0900 9898" },
  { id: 3, name: "CSKH & Bảo hành : 0901 2113" },
];
const Footer = () => {
  return (
    <div className="bg-slate-100">
      <div className="max-w-[1200px] w-full mx-auto py-5 pb-0">
        <div className="flex gap-x-5 justify-between">
          <div className="">
            <ul>
              {listOne?.map((item) => (
                <li className="p-2" key={item.id}>
                  {item.name}
                </li>
              ))}
              <li className="p-2">
                <Link to={"/order-guide"}>Hướng dẫn đặt hàng</Link>
              </li>
            </ul>
          </div>
          <div className="">
            <ul>
              {listTwo?.map((item) => (
                <li className="p-2" key={item.id}>
                  {item.name}
                </li>
              ))}
            </ul>
          </div>
          <div className="">
            <ul>
              <li className="p-2 font-semibold">Tổng đài hỗ trợ</li>
              {listThree?.map((item) => (
                <li className="p-2" key={item.id}>
                  {item.name}
                </li>
              ))}
            </ul>
          </div>
          <div className="">
            <div className="flex gap-x-5 justify-between">
              <span className="p-2 cursor-pointer">
                <FaTiktok className="w-[30px] h-[30px]"></FaTiktok>
              </span>
              <span className="p-2 cursor-pointer">
                <BsFacebook className="w-[30px] h-[30px]"></BsFacebook>
              </span>
              <span className="p-2 cursor-pointer">
                <AiFillInstagram className="w-[30px] h-[30px]"></AiFillInstagram>
              </span>
            </div>
            <hr />
            <div className="pt-2">
              <BsFillCreditCard2BackFill className="w-full h-[50px]"></BsFillCreditCard2BackFill>
              <div className="">
                <p className="py-2">
                  Tên ngân hàng : <b>Agribank</b>{" "}
                </p>
                <p className="py-2">
                  Tên tài khoản : <b>Lê Minh Tú</b>{" "}
                </p>
                <p className="py-2">
                  Số tài khoản : <b>7105205179612</b>
                </p>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className="py-2 text-center font-semibold">© 2022 LMTShop</div>
      </div>
    </div>
  );
};

export default Footer;
