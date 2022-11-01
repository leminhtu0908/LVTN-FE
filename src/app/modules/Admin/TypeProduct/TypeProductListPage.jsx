import React, { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import Layout from "../../../../components/layouts/Layout";
import WrapperTable from "../../../../shared/components/WrapperTable";
import * as actions from "./_redux/typeproductAction";
import { string } from "prop-types";
import ConfirmDialog from "../../../../shared/Dialog/ConfirmDialog";
import { Fade, LinearProgress } from "@mui/material";
import TypeProductFilterPage from "./shared/TypeProductFilterPage";
import TypeProductCreateDialog from "./TypeProductCreateDialog";
const TypeProductListPage = () => {
  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [selectTypeProductId, setSelectTypeProductId] =
    React.useState(undefined);
  const [selectTypeProduct, setSelectTypeProduct] = React.useState(undefined);
  const { currentState } = useSelector(
    (state) => ({ currentState: state.typeProducts }),
    shallowEqual
  );
  const { data, typeproduct, typeproductId, typeproductForEdit, listLoading } =
    currentState;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.fetchTypeProducts({ param: {} }));
  }, [dispatch, typeproduct, typeproductId, typeproductForEdit]);
  const headRows = [
    { id: "stt", label: "STT" },
    { id: "name", label: "Tên loại sản phẩm" },
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
    setSelectTypeProductId(cateId);
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
    setSelectTypeProduct(item);
    setIsEdit(true);
    setOpen(true);
  }

  function closeDeleteDialog(status) {
    if (status) {
      dispatch(actions.deleteTypeProduct(selectTypeProductId));
    }
    setOpenDelete(false);
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
          component={"TypeProduct"}
          displayTableTitle={headRows}
          displayRowData={mapKey}
          data={data}
          onDeleteRow={handleDelete}
          onEditRow={handleEdit}
        />
      </div>
      <TypeProductCreateDialog
        open={open}
        closeCreateDialog={closeCreateDialog}
        data={selectTypeProduct}
        isEdit={isEdit}
      />
      <ConfirmDialog
        openDialog={openDelete}
        closeDialog={closeDeleteDialog}
        description={"Bạn có chắc chắn xóa loại sản phẩm này"}
      ></ConfirmDialog>
    </Layout>
  );
};

export default TypeProductListPage;
