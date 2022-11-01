import React, { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import Layout from "../../../../components/layouts/Layout";
import WrapperTable from "../../../../shared/components/WrapperTable";
import * as actions from "./_redux/newsAction";
import { string } from "prop-types";
import ConfirmDialog from "../../../../shared/Dialog/ConfirmDialog";
import { Fade, LinearProgress } from "@mui/material";
import TypeProductFilterPage from "./shared/NewsFilterPage";
import TypeProductCreateDialog from "./NewsCreateDialog";
import NewsCreateDialog from "./NewsCreateDialog";
import NewsFilterPage from "./shared/NewsFilterPage";
const NewsListPage = () => {
  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [selectNewsId, setSelectNewsId] = React.useState(undefined);
  const [selectNews, setSelectNews] = React.useState(undefined);
  const { currentState } = useSelector(
    (state) => ({ currentState: state.news }),
    shallowEqual
  );
  const { data, news, newsId, newsForEdit, listLoading } = currentState;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.fetchNews({ param: {} }));
  }, [dispatch, news, newsId, newsForEdit]);
  const headRows = [
    { id: "stt", label: "STT" },
    { id: "title", label: "Tiêu đề" },
    { id: "imageNew", label: "Ảnh" },
    // { id: "content", label: "Nội dung" },
    { id: "typeNew", label: "Loại bài viết" },
    { id: "slug", label: "Đường dẫn" },
    { id: "status", label: "Trạng thái" },
    { id: "action", label: "Hành động" },
  ];
  const mapKey = [
    { label: "title", type: string },
    { label: "imageNew", type: string },
    // { label: "content", type: string },
    { label: "typeNew", type: string },
    { label: "slug", type: string },
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
  function handleDelete(newsId, imagePublicId) {
    const cloneValue = {
      id: newsId,
      imagePublicId: imagePublicId,
    };
    setOpenDelete(true);
    setSelectNewsId(cloneValue);
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
    setSelectNews(item);
    setIsEdit(true);
    setOpen(true);
  }

  function closeDeleteDialog(status) {
    if (status) {
      dispatch(actions.deleteNews(selectNewsId));
    }
    setOpenDelete(false);
  }
  return (
    <Layout>
      <div className="bg-white p-4 mb-5 rounded-lg">
        <NewsFilterPage openCreate={openCreateDialog}></NewsFilterPage>
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
          component={"News"}
          displayTableTitle={headRows}
          displayRowData={mapKey}
          data={data}
          onDeleteRow={handleDelete}
          onEditRow={handleEdit}
        />
      </div>
      <NewsCreateDialog
        open={open}
        closeCreateDialog={closeCreateDialog}
        data={selectNews}
        isEdit={isEdit}
      />
      <ConfirmDialog
        openDialog={openDelete}
        closeDialog={closeDeleteDialog}
        description={"Bạn có chắc chắn xóa bài viết này"}
      ></ConfirmDialog>
    </Layout>
  );
};

export default NewsListPage;
