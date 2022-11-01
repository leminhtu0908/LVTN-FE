import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { FiEdit } from "react-icons/fi";
import { Button, Chip, IconButton, Tooltip } from "@mui/material";
import { BsTrash } from "react-icons/bs";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ContentDialog from "../Dialog/ContentDialog";
const WrapperTable = (props) => {
  const [openContent, setOpenContent] = useState(false);
  const [contentNews, setContentNews] = useState("");
  const handeDelete = (id) => {
    props.onDeleteRow(id);
  };
  function handleEdit(row) {
    props.onEditRow(row);
  }
  const handleOpenContent = (value) => {
    setOpenContent(true);
    setContentNews(value);
  };
  const handleCloseContent = () => {
    setOpenContent(false);
  };
  const handeDeleteImageBanner = (id, imagePublicId) => {
    props.onDeleteRow(id, imagePublicId);
  };
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
                    } else if (item.label === "imageNew") {
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
                      if (row.typeNew === "Introduce") {
                        return (
                          <TableCell key={idx}>
                            <Chip label="Giới thiệu" color="primary" />
                          </TableCell>
                        );
                      }
                      if (row.typeNew === "New") {
                        return (
                          <TableCell key={idx}>
                            <Chip label="Mới" color="warning" />
                          </TableCell>
                        );
                      }
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
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <ContentDialog
        open={openContent}
        content={contentNews}
        handleCloseContent={handleCloseContent}
      />
    </>
  );
};

export default WrapperTable;
