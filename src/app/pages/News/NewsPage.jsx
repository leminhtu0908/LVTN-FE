import { Box, Tab, Tabs, Typography } from "@mui/material";
import React from "react";
import Heading from "../../../components/header/Heading";
import NewsIntroduce from "./NewsIntroduce";
import NewsMoi from "./NewsMoi";
import NewsRate from "./NewsRate";
import NewsTrick from "./NewsTrick";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
const NewsPage = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className="mt-10 max-w-[1200px] w-full mx-auto">
      <Heading>Tin tức</Heading>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Công nghệ mới" {...a11yProps(0)} />
            <Tab label="Sản phẩm mới" {...a11yProps(1)} />
            <Tab label="Mẹo hay" {...a11yProps(2)} />
            <Tab label="Đánh giá" {...a11yProps(3)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <NewsIntroduce />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <NewsMoi />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <NewsTrick />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <NewsRate />
        </TabPanel>
      </Box>
    </div>
  );
};

export default NewsPage;
