import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { FiEdit } from "react-icons/fi";
import { Button, Chip, IconButton } from "@mui/material";
import { BsTrash } from "react-icons/bs";
const WrapperTable = (props) => {
  const handeDelete = (id) => {
    props.onDeleteRow(id);
  };
  function handleEdit(row) {
    props.onEditRow(row);
  }
  return (
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
                  if (item.label === "status") {
                    if (row.status === true) {
                      return (
                        <TableCell key={idx}>
                          <Chip label="Hoạt động" color="success" />
                        </TableCell>
                      );
                    }
                    if (row.status === false) {
                      return (
                        <TableCell key={idx}>
                          <Chip label="Không hoạt động" color="error" />
                        </TableCell>
                      );
                    }
                  } else {
                    return <TableCell key={idx}>{row[item.label]}</TableCell>;
                  }
                })}
                {(props.component === "Category" ||
                  props.component === "Brand") && (
                  <TableCell align="left">
                    <IconButton onClick={(e) => handleEdit(row)}>
                      <FiEdit className="text-blue-500"></FiEdit>
                    </IconButton>
                    <IconButton onClick={(e) => handeDelete(row._id)}>
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
  );
};

export default WrapperTable;
