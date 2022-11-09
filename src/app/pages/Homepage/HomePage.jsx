import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import Button from "../../../components/button/Button";
import InputCutomer from "../../../components/input/InputCustomer";
import LayoutCustomer from "../../../components/layouts/LayoutCustomer";
import HomeBanner from "./HomeBanner";
import { BsSearch } from "react-icons/bs";
import ProductPage from "../Products/ProductPage";
import NewsPage from "../News/NewsPage";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as productAction from "../../modules/Admin/Product/_redux/productAction";
import HomeSearch from "./HomeSearch";
const HomePage = () => {
  const { currentState } = useSelector(
    (state) => ({ currentState: state.products }),
    shallowEqual
  );
  const { data: productData } = currentState;
  const defaultFilter = {
    name: "",
  };
  const [filter, setFilter] = React.useState(defaultFilter);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(productAction.fetchProductByName({ params: { ...filter } }));
  }, [dispatch, filter]);
  function handleSearch(filter) {
    setFilter(filter);
  }
  return (
    <LayoutCustomer>
      <HomeSearch onSearch={handleSearch} />
      <HomeBanner></HomeBanner>
      <ProductPage data={productData ? productData : null}></ProductPage>
      <NewsPage></NewsPage>
    </LayoutCustomer>
  );
};

export default HomePage;
