import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { FiEdit } from "react-icons/fi";
import moment from "moment";
import vi from "moment/locale/vi";
import {
  Button,
  Chip,
  IconButton,
  Pagination,
  TablePagination,
  Tooltip,
} from "@mui/material";
import { BsTrash } from "react-icons/bs";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ContentDialog from "../Dialog/ContentDialog";
import DetailProductDialog from "../Dialog/DetailProductDialog";
import { AiOutlineCheckCircle } from "react-icons/ai";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
const WrapperTable = (props) => {
  const [openContent, setOpenContent] = useState(false);
  const [contentNews, setContentNews] = useState("");
  const [data, setData] = useState(undefined);
  const handeDelete = (id) => {
    props.onDeleteRow(id);
  };
  function handleEdit(row) {
    props.onEditRow(row);
  }
  const handleOpenContent = (value) => {
    setOpenContent(true);
    if (props.component === "News") {
      setContentNews(value);
    }
    if (props.component === "Product") {
      setData(value);
    }
  };
  const handleCloseContent = () => {
    setOpenContent(false);
  };
  const handeDeleteImageBanner = (id, imagePublicId) => {
    props.onDeleteRow(id, imagePublicId);
  };
  const handleAllowStatus = (id, allow_status) => {
    props.onAllowStatus(id, allow_status);
  };
  const handeDeleteOrder = (id) => {
    props.onDeleteOrder(id);
  };
  function handleChangePage(event, newPage) {
    props.onChangePage(newPage);
  }
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {props.displayTableTitle.map((row) => (
                <TableCell key={"h" + row.id}>
                  <span className="font-weight-bolder text-white-75 font-size-lg">
                    {row.label}
                  </span>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {props?.data?.map((row, index) => {
              return (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  hover
                >
                  <TableCell align="left">{index + 1}</TableCell>
                  {props.displayRowData.map((item, idx) => {
                    if (item.label === "status" || item.label === "banned") {
                      if (row.status === true || row.banned === false) {
                        return (
                          <TableCell key={idx}>
                            <Chip label="Hoạt động" color="success" />
                          </TableCell>
                        );
                      }
                      if (row.status === false || row.banned === true) {
                        return (
                          <TableCell key={idx}>
                            <Chip label="Không hoạt động" color="error" />
                          </TableCell>
                        );
                      }
                    } else if (item.label === "imageBanner") {
                      return (
                        <TableCell key={idx}>
                          <img
                            src={row[item.label]}
                            alt=""
                            className="w-60 h-30 object-fill"
                          />
                        </TableCell>
                      );
                    } else if (
                      item.label === "imageNew" ||
                      item.label === "image"
                    ) {
                      return (
                        <TableCell key={idx}>
                          <img
                            src={row[item.label]}
                            alt=""
                            className="w-30 h-10 object-cover"
                          />
                        </TableCell>
                      );
                    } else if (item.label === "typeNew") {
                      if (row.typeNew === "cong-nghe-moi") {
                        return (
                          <TableCell key={idx}>
                            <Chip label="Công nghệ mới" color="primary" />
                          </TableCell>
                        );
                      }
                      if (row.typeNew === "san-pham-moi") {
                        return (
                          <TableCell key={idx}>
                            <Chip label="Sản phẩm mới" color="warning" />
                          </TableCell>
                        );
                      }
                      if (row.typeNew === "meo-hay") {
                        return (
                          <TableCell key={idx}>
                            <Chip label="Mẹo hay" color="error" />
                          </TableCell>
                        );
                      }
                      if (row.typeNew === "danh-gia") {
                        return (
                          <TableCell key={idx}>
                            <Chip label="Đánh giá" color="secondary" />
                          </TableCell>
                        );
                      }
                    } else if (item.label === "allow_status") {
                      if (row.allow_status === 1) {
                        return (
                          <TableCell key={idx}>
                            <Chip label="Đã duyệt" color="success" />
                          </TableCell>
                        );
                      }
                      if (row.allow_status === 0) {
                        return (
                          <TableCell key={idx}>
                            {props.component === "UserOrder" ? (
                              <Chip label="Đang chờ duyệt" color="warning" />
                            ) : (
                              <Chip
                                label="Đang chờ duyệt"
                                color="warning"
                                style={{ cursor: "pointer" }}
                                onClick={(e) =>
                                  handleAllowStatus(row._id, row.allow_status)
                                }
                              />
                            )}
                          </TableCell>
                        );
                      }
                      if (row.allow_status === 2) {
                        return (
                          <TableCell key={idx}>
                            <Chip label="Đã hủy" color="error" />
                          </TableCell>
                        );
                      }
                    } else if (item.label === "visited") {
                      if (row.visited === true) {
                        return (
                          <TableCell key={idx}>
                            <Chip label="Vãng lai" color="secondary" />
                          </TableCell>
                        );
                      }
                      if (row.visited === false) {
                        return (
                          <TableCell key={idx}>
                            <Chip label="Thành viên" color="info" />
                          </TableCell>
                        );
                      }
                    } else if (item.label === "createdAt") {
                      return (
                        <TableCell key={idx}>
                          {moment(row[item.label])
                            .locale("vi", vi)
                            .format("LLLL")}
                        </TableCell>
                      );
                    } else if (item.label === "address") {
                      return (
                        <Tooltip title={row[item.label]} key={idx}>
                          <TableCell>
                            {row[item.label]?.length > 40
                              ? row[item.label]?.slice(0, 20) + "..."
                              : row[item.label]}
                          </TableCell>
                        </Tooltip>
                      );
                    } else if (
                      item.label === "total_price" ||
                      item.label === "price_pay_remaining" ||
                      item.label === "price_pay" ||
                      item.label === "price"
                    ) {
                      return (
                        <TableCell key={idx}>
                          {row[item.label]?.toLocaleString("vi", {
                            style: "currency",
                            currency: "VND",
                          })}
                        </TableCell>
                      );
                    } else if (item.label === "email") {
                      return (
                        <Tooltip title={row[item.label]} key={idx}>
                          <TableCell>
                            {row[item.label]?.length > 20
                              ? row[item.label]?.slice(0, 15) + "..."
                              : row[item.label]}
                          </TableCell>
                        </Tooltip>
                      );
                    } else if (item.label === "productNameOrder") {
                      return (
                        <Tooltip key={idx} title={row[item.label]}>
                          <TableCell>
                            {row[item.label]?.length > 20
                              ? row[item.label]?.slice(0, 15) + "..."
                              : row[item.label]}
                          </TableCell>
                        </Tooltip>
                      );
                    } else {
                      return <TableCell key={idx}>{row[item.label]}</TableCell>;
                    }
                  })}
                  {(props.component === "Category" ||
                    props.component === "Brand" ||
                    props.component === "TypeProduct" ||
                    props.component === "Memory" ||
                    props.component === "Color") && (
                    <TableCell align="left">
                      <IconButton onClick={(e) => handleEdit(row)}>
                        <FiEdit className="text-blue-500"></FiEdit>
                      </IconButton>
                      <IconButton onClick={(e) => handeDelete(row._id)}>
                        <BsTrash className="text-red-500"></BsTrash>
                      </IconButton>
                    </TableCell>
                  )}
                  {(props.component === "Banner" ||
                    props.component === "Images" ||
                    props.component === "News") && (
                    <TableCell align="left">
                      {props.component === "News" && (
                        <>
                          <Tooltip title="Xem nội dung bài viết">
                            <IconButton
                              onClick={(e) => handleOpenContent(row.content)}
                            >
                              <VisibilityIcon className="text-green-300"></VisibilityIcon>
                            </IconButton>
                          </Tooltip>
                          <IconButton onClick={(e) => handleEdit(row)}>
                            <FiEdit className="text-blue-500"></FiEdit>
                          </IconButton>
                        </>
                      )}
                      <IconButton
                        onClick={(e) =>
                          handeDeleteImageBanner(row._id, row.imagePublicId)
                        }
                      >
                        <BsTrash className="text-red-500"></BsTrash>
                      </IconButton>
                    </TableCell>
                  )}
                  {props.component === "Product" && (
                    <TableCell align="left">
                      <>
                        <Tooltip title="Xem chi tiết sản phẩm">
                          <IconButton onClick={(e) => handleOpenContent(row)}>
                            <VisibilityIcon className="text-green-300"></VisibilityIcon>
                          </IconButton>
                        </Tooltip>
                        <IconButton onClick={(e) => handleEdit(row)}>
                          <FiEdit className="text-blue-500"></FiEdit>
                        </IconButton>
                        <IconButton
                          onClick={(e) =>
                            handeDeleteImageBanner(row._id, row.imagePublicId)
                          }
                        >
                          <BsTrash className="text-red-500"></BsTrash>
                        </IconButton>
                      </>
                    </TableCell>
                  )}
                  {props.component === "Order" && (
                    <TableCell align="left">
                      {row.allow_status === 1 ? (
                        <>
                          <IconButton onClick={(e) => handeDelete(row._id)}>
                            <AiOutlineCheckCircle className="text-green-500"></AiOutlineCheckCircle>
                          </IconButton>
                          <Tooltip title="Cập nhật thanh toán">
                            <IconButton
                              onClick={(e) => handleEdit(row.order_id)}
                            >
                              <AccountBalanceIcon className="text-blue-500"></AccountBalanceIcon>
                            </IconButton>
                          </Tooltip>
                        </>
                      ) : (
                        <Tooltip title="Hủy đơn hàng">
                          <IconButton
                            onClick={(e) => alert("Comming soon ...")}
                          >
                            <BsTrash className="text-red-500"></BsTrash>
                          </IconButton>
                        </Tooltip>
                      )}
                    </TableCell>
                  )}
                  {props.component === "UserOrder" && (
                    <TableCell align="left">
                      {row.allow_status === 1 ? (
                        <IconButton onClick={(e) => handeDelete(row._id)}>
                          <AiOutlineCheckCircle className="text-green-500"></AiOutlineCheckCircle>
                        </IconButton>
                      ) : (
                        <Tooltip title="Hủy đơn hàng">
                          <IconButton
                            onClick={(e) => handeDeleteOrder(row._id)}
                          >
                            <BsTrash className="text-red-500"></BsTrash>
                          </IconButton>
                        </Tooltip>
                      )}
                    </TableCell>
                  )}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        {/* <TablePagination
          component="div"
          count={props.total}
          page={props.page}
          onPageChange={handleChangePage}
          rowsPerPage={props.rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        /> */}
      </TableContainer>
      <div className="p-4 flex items-center justify-center">
        <Pagination
          count={Number(props.total)}
          page={props.page}
          variant="outlined"
          color="primary"
          onChange={handleChangePage}
        />
      </div>
      {props.component === "News" && (
        <ContentDialog
          open={openContent}
          content={contentNews}
          handleCloseContent={handleCloseContent}
        />
      )}
      {props.component === "Product" && (
        <DetailProductDialog
          open={openContent}
          data={data}
          handleCloseContent={handleCloseContent}
        />
      )}
    </>
  );
};

export default WrapperTable;
