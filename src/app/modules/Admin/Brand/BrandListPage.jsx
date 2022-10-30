import React, { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import Layout from "../../../../components/layouts/Layout";
import WrapperTable from "../../../../shared/components/WrapperTable";
import { string } from "prop-types";
import ConfirmDialog from "../../../../shared/Dialog/ConfirmDialog";
import { Fade, LinearProgress } from "@mui/material";
import BrandFilterPage from "./shared/BrandFilterPage";
import BrandCreateDialog from "./BrandCreateDialog";
import * as actions from "./_redux/brandAction";
const BrandListPage = () => {
  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [selectBrandId, setSelectBrandId] = React.useState(undefined);
  const [selectBrand, setSelectBrand] = React.useState(undefined);
  const { currentState } = useSelector(
    (state) => ({ currentState: state.brands }),
    shallowEqual
  );
  const { data, brand, brandId, listLoading } = currentState;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.fetchBrands({ param: {} }));
  }, [dispatch, brand, brandId]);
  const headRows = [
    { id: "stt", label: "STT" },
    { id: "name", label: "Tên hãng sản xuất" },
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
  function handleDelete(brandId) {
    setOpenDelete(true);
    setSelectBrandId(brandId);
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
    setSelectBrand(item);
    setIsEdit(true);
    setOpen(true);
  }

  function closeDeleteDialog(status) {
    if (status) {
      dispatch(actions.deleteBrand(selectBrandId));
    }
    setOpenDelete(false);
  }
  return (
    <Layout>
      <div className="bg-white p-4 mb-5 rounded-lg">
        <BrandFilterPage openCreate={openCreateDialog}></BrandFilterPage>
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
          component={"Brand"}
          displayTableTitle={headRows}
          displayRowData={mapKey}
          data={data}
          onDeleteRow={handleDelete}
          onEditRow={handleEdit}
        />
      </div>
      <BrandCreateDialog
        open={open}
        closeCreateDialog={closeCreateDialog}
        data={selectBrand}
        isEdit={isEdit}
      />
      <ConfirmDialog
        openDialog={openDelete}
        closeDialog={closeDeleteDialog}
        description={"Bạn có chắc chắn xóa nhà sản xuất này"}
      ></ConfirmDialog>
    </Layout>
  );
};

export default BrandListPage;
