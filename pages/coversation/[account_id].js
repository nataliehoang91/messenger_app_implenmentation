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

import MessageItem from "../../components/MessageTextItem";
import CoversationList from "../../components/ConservationList";

export default function Coversation() {
  const router = useRouter();
  const { query } = router;
  const id = query?.account_id?.toString();

  const [accounts, setAccounts] = useState();
  const [textMessage, setTextMessage] = useState();
  const [list, setList] = useState([]);
  const [messages, setMessages] = useState();
  const [conversationId, setConversationId] = useState();

  const fetchCoversationList = useCallback(() => {
    return fetch(`/api/account/${id}/conversations?pageSize=10`)
      .then((res) => {
        if (res.ok) return res.json();
        return null;
      })
      .then((data) => {
        if (data?.rows) {
          return setList(data.rows);
        }
      });
  }, [id]);

  const fetchMessages = useCallback(
    (conId) => {
      return fetch(`/api/account/${id}/conversation/${conId}/messages`)
        .then((res) => {
          if (res.ok) return res.json();
          return null;
        })
        .then((data) => {
          if (data?.rows) {
            return setMessages(data.rows.reverse());
          }
        });
    },
    [id]
  );

  const fetchAccounts = useCallback(() => {
    return fetch(`/api/account/${id}`)
      .then((res) => {
        if (res.ok) return res.json();
        return null;
      })
      .then((data) => {
        return setAccounts(data);
      });
  }, [id]);

  const postMessages = useCallback(
    (text, conId) => {
      return fetch(`/api/account/${id}/conversation/${conId}/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      }).then(() => {
        fetchMessages(conId);
        setTextMessage();
      });
    },
    [fetchMessages, id]
  );

  useEffect(() => {
    if (id) {
      fetchAccounts();
    }
  }, [fetchAccounts, id]);

  useEffect(() => {
    if (id !== undefined) {
      fetchCoversationList();
    }
  }, [fetchCoversationList, id]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Link href="/">Back</Link>
      <Grid container>
        <Grid item xs={3}>
          <Paper variant="outlined" square sx={{ height: "100vh" }}>
            <CoversationList
              list={list}
              fetchMessages={fetchMessages}
              setConversationId={setConversationId}
            />
          </Paper>
        </Grid>
        <Grid item xs={9} padding="16px">
          {messages?.map((item) => (
            // eslint-disable-next-line react/jsx-key
            <MessageItem
              message={item}
              accountId={id}
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
        </Grid>
      </Grid>
    </Box>
  );
}
