import { Fade, LinearProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import LayoutCustomer from "../../../components/layouts/LayoutCustomer";
import WrapperTable from "../../../shared/components/WrapperTable";
import { string } from "prop-types";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actionOrder from "../../modules/Admin/Order/_redux/orderAction";
import ConfirmDialog from "../../../shared/Dialog/ConfirmDialog";
import Loading from "../Root/Loading";
const OrderHistory = () => {
  const { currentState, authState } = useSelector(
    (state) => ({ currentState: state.orders, authState: state.auth }),
    shallowEqual
  );
  const { userDataOrder, orderId, listLoading } = currentState;
  const [dataOrderHistory, setDataOrderHistory] = useState([]);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [selectOrderDelete, setSelectOrderDelete] = React.useState(undefined);
  function openCreateDialog() {
    setOpenDelete(true);
  }
  const handleSelectDelete = (id) => {
    setOpenDelete(true);
    setSelectOrderDelete(id);
  };

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
    { id: "orderStatus", label: "Hình thức thanh toán" },
    { id: "createdAt", label: "Thời gian đặt hàng" },
    { id: "isPayment", label: "Thanh toán" },
    { id: "allow_status", label: "Tình trạng đơn hàng" },
    { id: "action", label: "Hủy đơn hàng" },
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
    { label: "orderStatus", type: string },
    { label: "createdAt", type: string },
    { label: "isPayment", type: string },
    { label: "allow_status", type: string },
  ];
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actionOrder.fetchHistory());
  }, [dispatch, orderId, authState?.authToken?.user?.token]);
  useEffect(() => {
    setDataOrderHistory(
      userDataOrder?.filter(
        (item) =>
          item.user?._id === authState?.user?._id && item.allow_status !== 2
      )
    );
  }, [authState?.user?._id, userDataOrder]);
  function closeDeleteOrderDialog(status) {
    if (status) {
      dispatch(actionOrder.deleteOrderHistory(selectOrderDelete));
    }
    setOpenDelete(false);
  }
  return (
    <LayoutCustomer>
      {listLoading ? (
        <Loading />
      ) : (
        <div className="py-10 pt-[88px]">
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
            component={"UserOrder"}
            displayTableTitle={headRows}
            displayRowData={mapKey}
            data={dataOrderHistory}
            //   onDeleteRow={handleDelete}
            //   onEditRow={handleEdit}
            // page={page}
            // rowsPerPage={rowsPerPage}
            onDeleteOrder={handleSelectDelete}
            //   onChangePage={handleChangePage}
            //   onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </div>
      )}

      <ConfirmDialog
        openDialog={openDelete}
        closeDialog={closeDeleteOrderDialog}
        description={"Bạn có chắc hủy đơn hàng này?"}
      />
    </LayoutCustomer>
  );
};

export default OrderHistory;
