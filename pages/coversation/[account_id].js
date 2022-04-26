import React, { useCallback, useEffect, useState } from "react";
import {
  Box,
  Avatar,
  Paper,
  Typography,
  Link,
  TextField,
  Button,
} from "@mui/material";
import { useRouter } from "next/router";
import Grid from "@mui/material/Grid";
import { stringAvatar } from "../../utils";
import styles from "../../styles/styles";

const MessageItem = ({ text }) => (
  <Typography style={styles.recipientChatBubble}>{text}</Typography>
);

const CoversationList = ({ list, fetchMessages, setConId }) => {
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
                  setConId(item.id);
                }}
              >
                <Grid
                  container
                  key={item.id}
                  justifyContent="center"
                  alignItems="center"
                >
                  <Grid item xs={3}>
                    <Avatar
                      {...stringAvatar(item.lastMessage.sender.name)}
                      sx={{ m: "auto" }}
                    />
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

export default function Coversation() {
  const router = useRouter();
  const { query } = router;
  const id = query?.account_id?.toString();

  const [accounts, setAccounts] = useState();
  const [textMessage, setTextMessage] = useState("");
  const [list, setList] = useState([]);
  const [messages, setMessages] = useState();
  const [conId, setConId] = useState();

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
    (conversationId) => {
      return fetch(`/api/account/${id}/conversation/${conversationId}/messages`)
        .then((res) => {
          if (res.ok) return res.json();
          return null;
        })
        .then((data) => {
          if (data?.rows) {
            return setMessages(data.rows);
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
    (text, conservationId) => {
      return fetch(
        `/api/account/${id}/conversation/${conservationId}/messages`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text }),
        }
      ).then(() => fetchMessages(conservationId));
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
              setConId={setConId}
            />
          </Paper>
        </Grid>
        <Grid item xs={9}>
          {messages?.map((item) => (
            // eslint-disable-next-line react/jsx-key
            <MessageItem text={item.text} />
          ))}
          <TextField
            id="outlined-basic"
            label="Outlined"
            variant="outlined"
            onChange={(e) => {
              setTextMessage(e.target.value);
            }}
          />
          <Button
            variant="text"
            onClick={() => postMessages(textMessage, conId)}
          >
            Text
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
