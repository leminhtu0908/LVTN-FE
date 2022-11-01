import React, { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import Layout from "../../../../components/layouts/Layout";
import WrapperTable from "../../../../shared/components/WrapperTable";
import * as actions from "./_redux/userAction";
import { string } from "prop-types";
import ConfirmDialog from "../../../../shared/Dialog/ConfirmDialog";
import { Fade, LinearProgress } from "@mui/material";
import TypeProductFilterPage from "./shared/UserFilterPage";
import TypeProductCreateDialog from "./UserCreateDialog";
const UserListPage = () => {
  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [newData, setNewData] = useState([]);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [selectTypeProductId, setSelectTypeProductId] =
    React.useState(undefined);
  const [selectTypeProduct, setSelectTypeProduct] = React.useState(undefined);
  const { currentState } = useSelector(
    (state) => ({ currentState: state.users }),
    shallowEqual
  );
  const { data, user, userId, listLoading } = currentState;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.fetchUser({ param: {} }));
  }, [dispatch, user, userId]);
  useEffect(() => {
    setNewData(data?.filter((user) => user.role !== "Admin"));
  }, [data]);
  const headRows = [
    { id: "stt", label: "STT" },
    { id: "fullName", label: "Tên người dùng" },
    { id: "nickName", label: "NickName" },
    { id: "email", label: "Email" },
    { id: "phone", label: "Số điện thoại" },
    { id: "address", label: "Địa chỉ" },
    { id: "gender", label: "Giới tính" },
    { id: "banned", label: "Trạng thái" },
  ];
  const mapKey = [
    { label: "fullName", type: string },
    { label: "nickName", type: string },
    { label: "email", type: string },
    { label: "phone", type: string },
    { label: "address", type: string },
    { label: "gender", type: string },
    { label: "banned", type: string },
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
  function handleDelete(cateId) {
    setOpenDelete(true);
    setSelectTypeProductId(cateId);
  }

  function handleEdit(item) {
    setSelectTypeProduct(item);
    setIsEdit(true);
    setOpen(true);
  }
  return (
    <Layout>
      <div className="bg-white p-4 mb-5 rounded-lg">
        <TypeProductFilterPage
          openCreate={openCreateDialog}
        ></TypeProductFilterPage>
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
          component={"User"}
          displayTableTitle={headRows}
          displayRowData={mapKey}
          data={newData}
          onDeleteRow={handleDelete}
          onEditRow={handleEdit}
        />
      </div>
    </Layout>
  );
};

export default UserListPage;
