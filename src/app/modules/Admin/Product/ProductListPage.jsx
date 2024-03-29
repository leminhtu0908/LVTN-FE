import React, { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import Layout from "../../../../components/layouts/Layout";
import WrapperTable from "../../../../shared/components/WrapperTable";
import * as actions from "./_redux/productAction";
import { string, object } from "prop-types";
import ConfirmDialog from "../../../../shared/Dialog/ConfirmDialog";
import { Fade, LinearProgress } from "@mui/material";
import ProductCreateDialog from "./ProductCreateDialog";
import ProductFilterPage from "./shared/ProductFilterPage";
const ProductListPage = () => {
  const defaultFilter = {
    name: "",
  };
  const [filter, setFilter] = React.useState(defaultFilter);
  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [selectProductId, setSelectProductId] = React.useState(undefined);
  const [selectProduct, setSelectProduct] = React.useState(undefined);
  const { currentState } = useSelector(
    (state) => ({ currentState: state.products }),
    shallowEqual
  );
  const { data, product, productId, productForEdit, listLoading, totalPages } =
    currentState;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      actions.fetchProductByNameAndPanigate({
        params: { ...filter, current_page: page, per_page: rowsPerPage },
      })
    );
  }, [dispatch, product, productId, productForEdit, filter, page, rowsPerPage]);
  const headRows = [
    { id: "stt", label: "STT" },
    { id: "product_id", label: "Mã sản phẩm" },
    { id: "name", label: "Tên sản phẩm" },
    { id: "price", label: "Giá sản phẩm" },
    { id: "display", label: "Màn hình" },
    { id: "soluong_sanpham", label: "Số lượng sản phẩm" },
    { id: "image", label: "Ảnh" },
    { id: "status", label: "Trạng thái" },
    { id: "action", label: "Hành động" },
  ];
  const mapKey = [
    { label: "product_id", type: string },
    { label: "name", type: string },
    { label: "price", type: string },
    { label: "display", type: string },
    { label: "soluong_sanpham", type: string },
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
  function handleDelete(productId, imagePublicId) {
    const cloneId = {
      id: productId,
      imagePublicId: imagePublicId,
    };
    setOpenDelete(true);
    setSelectProductId(cloneId);
  }

  function handleEdit(item) {
    setSelectProduct(item);
    setIsEdit(true);
    setOpen(true);
  }

  function closeDeleteDialog(status) {
    if (status) {
      dispatch(actions.deleteProduct(selectProductId));
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
        <ProductFilterPage
          openCreate={openCreateDialog}
          onSearch={handleSearch}
        ></ProductFilterPage>
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
          component={"Product"}
          displayTableTitle={headRows}
          displayRowData={mapKey}
          data={data}
          onDeleteRow={handleDelete}
          onEditRow={handleEdit}
          page={page}
          total={totalPages}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </div>
      <ProductCreateDialog
        open={open}
        closeCreateDialog={closeCreateDialog}
        data={selectProduct}
        isEdit={isEdit}
      />
      <ConfirmDialog
        openDialog={openDelete}
        closeDialog={closeDeleteDialog}
        description={"Bạn có chắc chắn xóa sản phẩm này"}
      ></ConfirmDialog>
    </Layout>
  );
};

export default ProductListPage;
