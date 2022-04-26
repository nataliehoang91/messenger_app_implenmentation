import React, { useCallback, useEffect, useState } from "react";
import {
  Box,
  Avatar,
  Paper,
  Typography,
  Link,
  TextField,
  Button,
  Stack,
} from "@mui/material";
import { useRouter } from "next/router";
import Grid from "@mui/material/Grid";

import MessageItem from "../MessageTextItem";

const BaseMessageBox = ({
  setTextMessage,
  postMessages,
  messages,
  accountId,
}) => (
  <>
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
        variant="text"
        onClick={() => postMessages(textMessage, conversationId)}
      >
        SEND
      </Button>
    </Stack>
  </>
);

export default BaseMessageBox;
