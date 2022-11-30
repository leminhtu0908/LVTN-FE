import React, { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import Layout from "../../../../components/layouts/Layout";
import WrapperTable from "../../../../shared/components/WrapperTable";
import * as actions from "./_redux/imageActions";
import { string } from "prop-types";
import ConfirmDialog from "../../../../shared/Dialog/ConfirmDialog";
import { Fade, LinearProgress } from "@mui/material";
import ImageFilterPage from "./shared/ImageFilterPage";
import ImageCreateDialog from "./ImageCreateDialog";
const ImageListPage = () => {
  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [selectBannerId, setSelectBannerId] = React.useState(undefined);
  const [selectBanner, setSelectBanner] = React.useState(undefined);
  const { currentState } = useSelector(
    (state) => ({ currentState: state.images }),
    shallowEqual
  );
  const { data, image, imageId, listLoading } = currentState;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.fetchImages({ param: {} }));
  }, [dispatch, image, imageId]);
  const headRows = [
    { id: "stt", label: "STT" },
    { id: "name", label: "Tên" },
    { id: "image", label: "Ảnh sản phẩm" },
    { id: "status", label: "Trạng thái" },
    { id: "action", label: "Hành động" },
  ];
  const mapKey = [
    { label: "name", type: string },
    { label: "image", type: string },
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
  function handleDelete(bannerId, imagePublicId) {
    const cloneValues = {
      id: bannerId,
      imagePublicId: imagePublicId,
    };
    setOpenDelete(true);
    setSelectBannerId(cloneValues);
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
    setSelectBanner(item);
    setIsEdit(true);
    setOpen(true);
  }

  function closeDeleteDialog(status) {
    if (status) {
      // dispatch(actions.deleteBanner(selectBannerId));
    }
    setOpenDelete(false);
  }
  return (
    <Layout>
      <div className="bg-white p-4 mb-5 rounded-lg">
        <ImageFilterPage openCreate={openCreateDialog}></ImageFilterPage>
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
          component={"Images"}
          displayTableTitle={headRows}
          displayRowData={mapKey}
          data={data}
          onDeleteRow={handleDelete}
          onEditRow={handleEdit}
        />
      </div>
      <ImageCreateDialog
        open={open}
        closeCreateDialog={closeCreateDialog}
        data={selectBanner}
        isEdit={isEdit}
      />
      {/* <ConfirmDialog
        openDialog={openDelete}
        closeDialog={closeDeleteDialog}
        description={"Bạn có chắc chắn xóa ảnh bìa quảng cáo này"}
      ></ConfirmDialog> */}
    </Layout>
  );
};

export default ImageListPage;
