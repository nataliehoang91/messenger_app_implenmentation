import React from "react";
import { TextField, Button, Stack, Box } from "@mui/material";

import Send from "@mui/icons-material/Send";

import MessageItem from "../MessageTextItem";

const BaseMessageBox = ({
  setTextMessage,
  postMessages,
  messages,
  accountId,
  textMessage,
  conversationId,
}) => (
  <Box padding="16px">
    {messages?.map((item) => (
      <MessageItem
        key={item.id}
        message={item}
        accountId={accountId}
        senderId={item.sender.id.toString()}
      />
    ))}

    <Stack direction="row" spacing={2}>
      <TextField
        id="outlined-basic"
        label="Type your messages..."
        variant="outlined"
        style={{ width: "100%" }}
        onChange={(e) => {
          setTextMessage(e.target.value);
        }}
      />

      <Button
        variant="contained"
        onClick={() => postMessages(textMessage, conversationId)}
        endIcon={<Send />}
      >
        SEND
      </Button>
    </Stack>
  </Box>
);

export default BaseMessageBox;
