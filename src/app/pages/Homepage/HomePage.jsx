import React, { useEffect, useRef } from "react";
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
  const { data: productData, rate } = currentState;
  const defaultFilter = {
    name: "",
  };
  const [filter, setFilter] = React.useState(defaultFilter);
  const scrollRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(productAction.fetchProductByName({ params: { ...filter } }));
  }, [dispatch, filter, rate]);
  function handleSearch(filter) {
    setFilter(filter);
  }
  const handleScroll = () => {
    scrollRef.current.scrollIntoView({ behavior: "smooth" });
  };
  const handleRating = (product_id, rating) => {
    const cloneValue = {
      product_id: product_id,
      rating: rating,
    };
    dispatch(productAction.rateProduct(cloneValue));
  };

  return (
    <LayoutCustomer>
      <HomeSearch onSearch={handleSearch} onScroll={handleScroll} />
      <HomeBanner></HomeBanner>
      <ProductPage
        scrollRef={scrollRef}
        data={productData ? productData : null}
        onRating={handleRating}
      ></ProductPage>
      <NewsPage></NewsPage>
    </LayoutCustomer>
  );
};

export default HomePage;
