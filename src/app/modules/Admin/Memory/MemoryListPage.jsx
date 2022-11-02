import React, { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import Layout from "../../../../components/layouts/Layout";
import WrapperTable from "../../../../shared/components/WrapperTable";
import * as actions from "./_redux/memoryAction";
import { string } from "prop-types";
import ConfirmDialog from "../../../../shared/Dialog/ConfirmDialog";
import { Fade, LinearProgress } from "@mui/material";
import MemoryFilterPage from "./shared/MemoryFilterPage";
import MemoryCreateDialog from "./MemoryCreateDialog";
const MemoryListPage = () => {
  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [selectMemoryId, setSelectMemoryId] = React.useState(undefined);
  const [selectMemory, setSelectMemory] = React.useState(undefined);
  const { currentState } = useSelector(
    (state) => ({ currentState: state.memorys }),
    shallowEqual
  );
  const { data, memory, memoryId, memoryForEdit, listLoading } = currentState;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.fetchMemories({ param: {} }));
  }, [dispatch, memory, memoryId, memoryForEdit]);
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
  function handleDelete(memoryId) {
    setOpenDelete(true);
    setSelectMemoryId(memoryId);
  }

  function handleEdit(item) {
    setSelectMemory(item);
    setIsEdit(true);
    setOpen(true);
  }

  function closeDeleteDialog(status) {
    if (status) {
      dispatch(actions.deleteMemory(selectMemoryId));
    }
    setOpenDelete(false);
  }
  return (
    <Layout>
      <div className="bg-white p-4 mb-5 rounded-lg">
        <MemoryFilterPage openCreate={openCreateDialog}></MemoryFilterPage>
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
          component={"Memory"}
          displayTableTitle={headRows}
          displayRowData={mapKey}
          data={data}
          onDeleteRow={handleDelete}
          onEditRow={handleEdit}
        />
      </div>
      <MemoryCreateDialog
        open={open}
        closeCreateDialog={closeCreateDialog}
        data={selectMemory}
        isEdit={isEdit}
      />
      <ConfirmDialog
        openDialog={openDelete}
        closeDialog={closeDeleteDialog}
        description={"Bạn có chắc chắn xóa bộ nhớ này"}
      ></ConfirmDialog>
    </Layout>
  );
};

export default MemoryListPage;
