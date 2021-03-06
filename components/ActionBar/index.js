import React from "react";
import { Stack, TextField } from "@mui/material";

import CreateNewBtn from "../CreateNew";
import BackButton from "../RoutingButton";

const ActionBarBtn = ({ href, accountId, fetchCoversationList }) => (
  <Stack
    direction="row"
    spacing={1}
    alignItems="center"
    justifyContent={"space-between"}
    marginY={2}
  >
    <BackButton href={href} />
    <TextField
      size="small"
      label="Search..."
      variant="outlined"
      style={{ width: "100%" }}
      onChange={(e) => {
        setTextMessage(e.target.value);
      }}
    />
    <CreateNewBtn
      accountId={accountId}
      fetchCoversationList={fetchCoversationList}
    />
  </Stack>
);

export default ActionBarBtn;
