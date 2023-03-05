import * as React from "react";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 0 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

type TableDrawerTabsProps = {
  tabs: {
    label: string;
  }[];
  panes: JSX.Element[];
};

export function TableDrawerTabs(props: TableDrawerTabsProps) {
  const { tabs, panes } = props;

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs">
          {tabs.map((item, index) => (
            <Tab key={index} label={item.label} {...a11yProps(index)} />
          ))}
        </Tabs>
      </Box>

      {panes.map((item, index) => (
        <TabPanel key={index} value={value} index={index}>
          {item}
        </TabPanel>
      ))}
    </Box>
  );
}
