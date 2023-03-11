import * as React from "react";
import Link from "next/link";

import { Box, Tab, Tabs } from "@mui/material";
import { Container } from "components/container";

import { DashboardLayout } from "layouts";
import { PageHeader } from "components/page-header";
import { SettingsScreen } from "screens/settings";
import { MembersScreen } from "screens/members";
import { useRouter } from "next/router";

function getIndexFromSlug(slug?: string[]): number {
  if (!slug) return 0;

  switch (slug[0]) {
    case "members":
      return 1;
    default:
      return 0;
  }
}

export default function Settings() {
  const router = useRouter();
  const [tabIndex, setTabIndex] = React.useState(
    getIndexFromSlug(router.query?.slug as string[] | undefined)
  );

  const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  React.useEffect(() => {
    setTabIndex(getIndexFromSlug(router.query?.slug as string[] | undefined));
  }, [router.query]);

  return (
    <Container maxWidth="md">
      <PageHeader title="Settings" />

      <Container maxWidth="sm">
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={tabIndex} onChange={handleChangeTab} centered>
            <Tab component={Link} label="General" href="/settings" />
            <Tab component={Link} label="Members" href="/settings/members" />
          </Tabs>
        </Box>

        {tabIndex === 0 && <SettingsScreen />}
        {tabIndex === 1 && <MembersScreen />}
      </Container>
    </Container>
  );
}

Settings.getLayout = function getLayout(page: React.ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
