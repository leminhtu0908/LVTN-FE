import React, { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import Layout from "../../../../components/layouts/Layout";
import WrapperTable from "../../../../shared/components/WrapperTable";
import * as actions from "./_redux/colorAction";
import { string } from "prop-types";
import ConfirmDialog from "../../../../shared/Dialog/ConfirmDialog";
import { Fade, LinearProgress } from "@mui/material";
import ColorFilterPage from "./shared/ColorFilterPage";
import ColorCreateDialog from "./ColorCreateDialog";
const ColorListPage = () => {
  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [selectColorId, setSelectColorId] = React.useState(undefined);
  const [selectColor, setSelectColor] = React.useState(undefined);
  const { currentState } = useSelector(
    (state) => ({ currentState: state.colors }),
    shallowEqual
  );
  const { data, color, colorId, colorForEdit, listLoading, totalPages } =
    currentState;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      actions.fetchColors({
        params: { current_page: page, per_page: rowsPerPage },
      })
    );
  }, [dispatch, color, colorId, colorForEdit, page, rowsPerPage]);
  const headRows = [
    { id: "stt", label: "STT" },
    { id: "name", label: "Tên bộ nhớ" },
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
  function handleDelete(colorId) {
    setOpenDelete(true);
    setSelectColorId(colorId);
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
    setSelectColor(item);
    setIsEdit(true);
    setOpen(true);
  }

  function closeDeleteDialog(status) {
    if (status) {
      dispatch(actions.deleteColor(selectColorId));
    }
    setOpenDelete(false);
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
        <ColorFilterPage openCreate={openCreateDialog}></ColorFilterPage>
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
          component={"Color"}
          displayTableTitle={headRows}
          displayRowData={mapKey}
          data={data}
          onDeleteRow={handleDelete}
          onEditRow={handleEdit}
          rowsPerPage={rowsPerPage}
          page={page}
          total={totalPages}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </div>
      <ColorCreateDialog
        open={open}
        closeCreateDialog={closeCreateDialog}
        data={selectColor}
        isEdit={isEdit}
      />
      <ConfirmDialog
        openDialog={openDelete}
        closeDialog={closeDeleteDialog}
        description={"Bạn có chắc chắn xóa màu này"}
      ></ConfirmDialog>
    </Layout>
  );
};

export default ColorListPage;
