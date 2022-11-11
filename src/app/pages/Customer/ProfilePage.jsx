import React, { useState } from "react";
import { BsTrash } from "react-icons/bs";
import LayoutCustomer from "../../../components/layouts/LayoutCustomer";

const ProfilePage = () => {
  const [thumb, setThumb] = useState("");
  return (
    <LayoutCustomer>
      <div className="h-[87vh] p-10 flex">
        <div className="p-4 max-w-[1200px] w-full mx-auto h-full shadow-lg">
          <h1 className="text-2xl font-semibold">Thông tin tài khoản</h1>
          <hr />
          <div className="mt-4 flex gap-x-4">
            <div className="basis-[20%]">
              <label
                className={`cursor-pointer w-[230px] flex items-center gap-x-2 justify-center bg-gray-100 rounded-lg relative group overflow-hidden`}
              >
                <input
                  type="file"
                  name="image"
                  id="bannerImage"
                  className="hidden-input"
                  // onChange={handleChangeImage}
                />
                {!thumb ? (
                  <div className="flex flex-col items-center text-center pointer-events-none">
                    <img
                      srcSet="/img/user-upload-1.png"
                      alt="upload-img"
                      className="w-full mb-2"
                    />
                    <p className="font-semibold mb-2">Choose photo</p>
                  </div>
                ) : (
                  <React.Fragment>
                    <img
                      // src={thumb}
                      className="w-full h-full object-cover"
                      alt=""
                    />
                    <button
                      className="absolute w-16 h-16 bg-white rounded-full flex items-center justify-center cursor-pointer z-10  opacity-0 invisible transition-all group-hover:opacity-100 group-hover:visible"
                      // onClick={handleResetFileChoosen}
                      type="button"
                    >
                      <BsTrash className="text-red-500 text-4xl"></BsTrash>
                    </button>
                  </React.Fragment>
                )}
              </label>
            </div>
            <div className="basis-[40%]">
                
            </div>
            <div className="basis-[40%]">c</div>
          </div>
        </div>
      </div>
    </LayoutCustomer>
  );
};

export default ProfilePage;
