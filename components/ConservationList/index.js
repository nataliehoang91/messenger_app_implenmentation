import React, { useCallback, useEffect, useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Link,
  TextField,
  Button,
  Stack,
} from "@mui/material";
import { useRouter } from "next/router";
import Grid from "@mui/material/Grid";

import { stringAvatar } from "../../utils";
import Avatar from "../Avatar";

const BaseCoversationList = ({ list, fetchMessages, setConversationId }) => {
  return (
    <Box>
      {list?.length > 0 ? (
        list.map((item) => (
          <Box key={item.id}>
            <Button variant="outlined" style={{ width: "100%" }}>
              <Box
                padding="16px 4px"
                style={{ width: "100%" }}
                onClick={() => {
                  fetchMessages(item.id);
                  setConversationId(item.id);
                }}
              >
                <Grid container key={item.id}>
                  <Grid item xs={10}>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Avatar
                        sizeProps={{ sx: { width: 56, height: 56 } }}
                        senderName={item.lastMessage.sender.name}
                      />
                      <Stack
                        direction="column"
                        spacing={1}
                        alignItems="flex-start"
                      >
                        <Typography fontWeight="bold">
                          {item.lastMessage.sender.name}
                        </Typography>
                        <Box>{item.lastMessage.text}</Box>
                      </Stack>
                    </Stack>
                  </Grid>
                  <Grid item xs={2}>
                    <Box>
                      {new Date(item.lastMessage.createdAt).toLocaleDateString(
                        "en-us",
                        { weekday: "long" }
                      )}
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Button>
          </Box>
        ))
      ) : (
        <Box>walao</Box>
      )}
    </Box>
  );
};

export default BaseCoversationList;
