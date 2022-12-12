import React from "react";
import { string } from "prop-types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

const DashboardTable = (props) => {
  const tableHead = [
    { id: "soluong_sanpham", label: "##############" },
    { id: "apple_count", label: "Apple" },
    { id: "samsung_count", label: "Samsung" },
    { id: "oppo_count", label: "Oppo" },
    { id: "xiaomi_count", label: "Xiaomi" },
    { id: "vivo_count", label: "Vivo" },
    { id: "realme_count", label: "Realme" },
    { id: "nokia_count", label: "Nokia" },
  ];
  const mapKey = [
    { label: "soluong_sanpham", type: string },
    { label: "apple_count", type: string },
    { label: "samsung_count", type: string },
    { label: "oppo_count", type: string },
    { label: "xiaomi_count", type: string },
    { label: "vivo_count", type: string },
    { label: "realme_count", type: string },
    { label: "nokia_count", type: string },
  ];
  return (
    <div style={{ overflowX: "auto", width: "100%" }}>
      <Table
        className="dashboard-table-custom"
        aria-labelledby="tableTitle"
        size="medium"
      >
        <TableHead>
          <TableRow style={{ backgroundColor: "#E4E6EF" }}>
            {tableHead?.map((row, index) => {
              return (
                <TableCell align="center" key={index}>
                  <span style={{ fontWeight: "700" }}>{row.label}</span>
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {props.data?.map((row, index) => {
            return (
              <TableRow hover key={index}>
                {mapKey.map((item, index) => {
                  return (
                    <TableCell align="center" key={index}>
                      <span style={{ fontWeight: "500" }}>
                        {row[item.label]}
                      </span>
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default DashboardTable;
