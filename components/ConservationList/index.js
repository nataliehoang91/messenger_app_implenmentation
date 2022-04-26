import React, { useCallback, useEffect, useState } from "react";
import { Box, Paper, Typography, Link, TextField, Button } from "@mui/material";
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
            <Button>
              <Paper
                variant="outlined"
                square
                sx={{ width: "90%", mx: "auto", p: "5px" }}
                onClick={() => {
                  fetchMessages(item.id);
                  setConversationId(item.id);
                }}
              >
                <Grid
                  container
                  key={item.id}
                  justifyContent="center"
                  alignItems="center"
                >
                  <Grid item xs={3}>
                    <Avatar senderName={item.lastMessage.sender.name} />
                  </Grid>
                  <Grid item xs={6}>
                    <Typography fontWeight="bold">
                      {item.lastMessage.sender.name}
                    </Typography>
                    <Box>{item.lastMessage.text}</Box>
                  </Grid>
                  <Grid item xs={3}>
                    <Box>
                      {new Date(item.lastMessage.createdAt).toLocaleDateString(
                        "en-us",
                        { weekday: "long" }
                      )}
                    </Box>
                  </Grid>
                </Grid>
              </Paper>
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
