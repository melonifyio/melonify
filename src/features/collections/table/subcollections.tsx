import * as React from "react";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import CollectionTable from "./table";
import { Typography } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { FieldProps } from "features/forms/form-fields/types";

type SubcollectionTabsProps = {
  subcollections: FieldProps[];
  collectionName: string;
  documentId: string;
};

type TabPanelProps = {
  children?: React.ReactNode;
  index: number;
  value: number;
};

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
      {value === index && (
        <Box>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export const SubcollectionTabs = (props: SubcollectionTabsProps) => {
  const { subcollections, collectionName, documentId } = props;

  const [activeTab, setActiveTab] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <Stack gap={2}>
      <Typography variant="h6" sx={{ mt: 4 }}>
        Subcollections
      </Typography>

      {subcollections && (
        <Tabs value={activeTab} onChange={handleChange}>
          {subcollections.map((item, index) => (
            <Tab key={index} label={item.name} id={item.fieldKey} />
          ))}
        </Tabs>
      )}

      {subcollections &&
        subcollections?.map((item, index) => (
          <TabPanel key={item.fieldKey} value={activeTab} index={index}>
            <CollectionTable
              collectionName={`${collectionName}/${documentId}/${item.fieldKey}`}
              model={item.config?.model || {}}
            />
          </TabPanel>
        ))}
    </Stack>
  );
};
