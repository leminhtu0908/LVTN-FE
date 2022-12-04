import React, { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import Layout from "../../../../components/layouts/Layout";
import * as actions from "./_redux/orderAction";
import { string } from "prop-types";
import WrapperTable from "../../../../shared/components/WrapperTable";
import { Fade, LinearProgress } from "@mui/material";
import OrderFilterPage from "./shared/OrderFilterPage";
import ConfirmDialog from "../../../../shared/Dialog/ConfirmDialog";
import OrderCreateDialog from "./OrderCreateDialog";
const OrderListPage = () => {
  const defaultFilter = {
    allow_status: "",
  };
  const [filter, setFilter] = React.useState(defaultFilter);
  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [selectOrderId, setSelectOrderId] = React.useState(undefined);
  const [selectOrder, setSelectOrder] = React.useState(undefined);
  const [openDuyet, setOpenDuyet] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const { currentState } = useSelector(
    (state) => ({ currentState: state.orders }),
    shallowEqual
  );
  const { data, order, orderId, orderForEdit, listLoading } = currentState;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      actions.fetchOrders({
        params: { ...filter, current_page: page, per_page: rowsPerPage },
      })
    );
  }, [dispatch, order, orderForEdit, orderId, filter, page, rowsPerPage]);
  const headRows = [
    { id: "stt", label: "STT" },
    { id: "order_id", label: "Mã đơn hàng" },
    { id: "productNameOrder", label: "Tên đơn hàng" },
    { id: "fullName", label: "Tên người nhận" },
    { id: "phone", label: "Số điện thoại" },
    { id: "email", label: "Email" },
    { id: "address", label: "Địa chỉ" },
    { id: "total_product", label: "Số lượng sản phẩm" },
    { id: "total_price", label: "Tổng tiền" },
    { id: "price_pay", label: "Số tiền đã trả" },
    { id: "price_pay_remaining", label: "Số tiền còn lại" },
    { id: "createdAt", label: "Thời gian đặt hàng" },
    { id: "allow_status", label: "Tình trạng đơn hàng" },

    // { id: "visited", label: "Loại khách hàng" },
    { id: "action", label: "Hành động" },
  ];
  const mapKey = [
    { label: "order_id", type: string },
    { label: "productNameOrder", type: string },
    { label: "fullName", type: string },
    { label: "phone", type: string },
    { label: "email", type: string },
    { label: "address", type: string },
    { label: "total_product", type: string },
    { label: "total_price", type: string },
    { label: "price_pay", type: string },
    { label: "price_pay_remaining", type: string },
    { label: "createdAt", type: string },
    { label: "allow_status", type: string },

    // { label: "visited", type: string },
  ];
  function openCreateDialog() {
    setIsEdit(false);
    setOpen(true);
  }
  function closeCreateDialog(status) {
    if (status === false) {
      setOpen(status);
    }
  }
  const handleAllowStatus = (id, allowStatus, product_id) => {
    const cloneValue = {
      id: id,
      allow_status: true,
      product_id: product_id,
    };
    setOpenDuyet(true);
    setSelectOrder(cloneValue);
  };
  function handleEdit(item) {
    setSelectOrder(item);
    setIsEdit(true);
    setOpen(true);
  }
  function handleSearch(filter) {
    setFilter(filter);
  }
  function closeUpdateStatusDialog(status) {
    if (status) {
      dispatch(actions.updateStatusOrder(selectOrder));
    }
    setOpenDuyet(false);
  }
  return (
    <Layout>
      <div className="bg-white p-4 mb-5 rounded-lg">
        <OrderFilterPage
          openCreate={openCreateDialog}
          onSearch={handleSearch}
          filter={filter}
        ></OrderFilterPage>
      </div>
      <div className="">
        <Fade
          in={listLoading}
          style={{
            transitionDelay: listLoading ? "800ms" : "0ms",
          }}
          unmountOnExit
        >
          <LinearProgress color="secondary" />
        </Fade>
        <WrapperTable
          component={"Order"}
          displayTableTitle={headRows}
          displayRowData={mapKey}
          data={data}
          // onDeleteRow={handleDelete}
          onEditRow={handleEdit}
          page={page}
          rowsPerPage={rowsPerPage}
          onAllowStatus={handleAllowStatus}
          //   onChangePage={handleChangePage}
          //   onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </div>
      <OrderCreateDialog
        open={open}
        closeCreateDialog={closeCreateDialog}
        data={selectOrder}
        isEdit={isEdit}
      />
      <ConfirmDialog
        openDialog={openDuyet}
        closeDialog={closeUpdateStatusDialog}
        description={"Bạn có chắc duyệt đơn hàng này?"}
      />
    </Layout>
  );
};

export default OrderListPage;
