import React from "react";
import { Box, Typography, Container, Button, Stack } from "@mui/material";

import Avatar from "../Avatar";

const BaseCoversationList = ({ list, fetchMessages, setConversationId }) => {
  return (
    <Box>
      {list?.length > 0 ? (
        list.map((item) => (
          <Box key={item.id}>
            <Button
              variant="outlined"
              style={{ width: "100%", padding: "0 4px" }}
            >
              <Box
                padding="16px 4px"
                style={{ width: "100%" }}
                onClick={() => {
                  fetchMessages(item.id);
                  setConversationId(item.id);
                }}
              >
                <Stack
                  direction="row"
                  key={item.id}
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Avatar
                      sizeProps={{ sx: { width: 56, height: 56 } }}
                      senderName={item.lastMessage.sender.name}
                    />
                    <Stack
                      direction="column"
                      alignItems="flex-start"
                      spacing={0.5}
                    >
                      <Typography fontWeight="bold" color="#188f74">
                        {item.lastMessage.sender.name}
                      </Typography>
                      <Typography color="#777777" fontSize={12}>
                        {item.lastMessage.text}
                      </Typography>
                    </Stack>
                  </Stack>
                  <Typography color="#777777" fontSize={12}>
                    {new Date(item.lastMessage.createdAt).toLocaleDateString(
                      "en-us",
                      { weekday: "long" }
                    )}
                  </Typography>
                </Stack>
              </Box>
            </Button>
          </Box>
        ))
      ) : (
        <Container style={{ textAlign: "center" }}>
          <Typography color="#777777">Nothing to show</Typography>
        </Container>
      )}
    </Box>
  );
};

export default BaseCoversationList;
