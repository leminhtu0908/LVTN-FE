import React, { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import Layout from "../../../../components/layouts/Layout";
import WrapperTable from "../../../../shared/components/WrapperTable";
import DanhMucCreateDialog from "./DanhMucCreateDialog";
import DanhMucFilterPage from "./shared/DanhMucFilterPage";
import * as actions from "./_redux/danhMucAction";
import { string } from "prop-types";
import ConfirmDialog from "../../../../shared/Dialog/ConfirmDialog";
import { Fade, LinearProgress } from "@mui/material";
const DanhMucListPage = () => {
  const defaultFilter = {
    name: "",
  };
  const [filter, setFilter] = React.useState(defaultFilter);
  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [selectCateId, setSelectCateId] = React.useState(undefined);
  const [selectCate, setSelectCate] = React.useState(undefined);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const { currentState } = useSelector(
    (state) => ({ currentState: state.categorys }),
    shallowEqual
  );
  const { data, danhmuc, danhmucId, danhmucForEdit, listLoading } =
    currentState;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      actions.fetchCategories({
        params: { ...filter, current_page: page, per_page: rowsPerPage },
      })
    );
  }, [dispatch, danhmuc, danhmucForEdit, danhmucId, filter, page, rowsPerPage]);
  const headRows = [
    { id: "stt", label: "STT" },
    { id: "name", label: "Tên danh mục" },
    { id: "status", label: "Trạng thái" },
    { id: "action", label: "Hành động" },
  ];
  const mapKey = [
    { label: "name", type: string },
    { label: "status", type: string },
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
    setSelectCateId(cateId);
    // const cloneId = {
    //   id: cateId,
    // };
    // Swal.fire({
    //   title: "Are you sure?",
    //   text: "You won't be able to revert this!",
    //   icon: "warning",
    //   showCancelButton: true,
    //   confirmButtonText: "Yes, delete it!",
    //   confirmButtonColor: "#54B435",
    //   cancelButtonText: "No, cancel!",
    //   cancelButtonColor: "#CF0A0A",
    //   reverseButtons: true,
    // }).then((result) => {
    //   if (result.isConfirmed) {
    //     dispatch(actions.deleteCategory(cloneId));
    //     Swal.fire("Deleted!", "Your file has been deleted.", "success");
    //   }
    // });
  }

  function handleEdit(item) {
    setSelectCate(item);
    setIsEdit(true);
    setOpen(true);
  }

  function closeDeleteDialog(status) {
    if (status) {
      dispatch(actions.deleteCategory(selectCateId));
    }
    setOpenDelete(false);
  }
  function handleSearch(filter) {
    setFilter(filter);
  }
  function handleChangePage(value) {
    setPage(value);
  }
  function handleChangeRowsPerPage(value) {
    setRowsPerPage(value);
  }
  return (
    <Layout>
      <div className="bg-white p-4 mb-5 rounded-lg">
        <DanhMucFilterPage
          openCreate={openCreateDialog}
          onSearch={handleSearch}
        ></DanhMucFilterPage>
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
          component={"Category"}
          displayTableTitle={headRows}
          displayRowData={mapKey}
          data={data}
          onDeleteRow={handleDelete}
          onEditRow={handleEdit}
          page={page}
          rowsPerPage={rowsPerPage}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </div>
      <DanhMucCreateDialog
        open={open}
        closeCreateDialog={closeCreateDialog}
        data={selectCate}
        isEdit={isEdit}
      />
      <ConfirmDialog
        openDialog={openDelete}
        closeDialog={closeDeleteDialog}
        description={"Bạn có chắc chắn xóa danh mục này"}
      ></ConfirmDialog>
    </Layout>
  );
};

export default DanhMucListPage;
