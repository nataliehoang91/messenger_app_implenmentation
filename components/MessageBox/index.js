import React from "react";
import { TextField, Button, Stack, Box } from "@mui/material";

import Send from "@mui/icons-material/Send";
import useInfinityScroll from "../../hooks/useInfinityScroll";

import MessageItem from "../MessageTextItem";

const MessageList = ({ loadMore, messages, accountId }) => {
  const { loadMoreRef, containerRef } = useInfinityScroll(loadMore);
  return (
    <Box
      component="div"
      ref={containerRef}
      sx={{
        overflow: "auto",
        display: "flex",
        flexDirection: "column-reverse",
        height: "90vh",
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column-reverse" }}>
        {messages.length > 0
          ? messages?.map((item) => (
              <MessageItem
                key={`${item.id}_${item.createdAt}`}
                message={item}
                accountId={accountId}
                senderId={item.sender.id.toString()}
              />
            ))
          : null}
      </Box>
      <Box ref={loadMoreRef}>Loading...</Box>
    </Box>
  );
};

const BaseMessageBox = ({
  setTextMessage,
  postMessages,
  messages,
  accountId,
  textMessage,
  conversationId,
  loadMore,
}) => (
  <Box padding="16px">
    <MessageList
      loadMore={loadMore}
      messages={messages}
      accountId={accountId}
    />

    <Stack direction="row" spacing={2}>
      <TextField
        id="outlined-basic"
        label="Type your messages..."
        variant="outlined"
        style={{ width: "100%" }}
        onChange={(e) => {
          setTextMessage(e.target.value);
        }}
        value={textMessage}
        onKeyDown={(e) => {
          if (e.keyCode === 13 && e.shiftKey === false) {
            postMessages(e.target.value, conversationId);
            setTextMessage("");
          }
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
