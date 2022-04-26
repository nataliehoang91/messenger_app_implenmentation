import React, { useCallback, useEffect, useState } from "react";
import { Box, Avatar, Paper, Typography, Link, Container } from "@mui/material";
import { useRouter } from "next/router";
import Grid from "@mui/material/Grid";

import MessageItem from "../../components/MessageTextItem";
import CoversationList from "../../components/ConservationList";
import MessageBox from "../../components/MessageBox";
import NavigateButton from "../../components/NavigateButton";
import { isUndefined } from "lodash";

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
          setList(data.rows);
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
    (text) => {
      return fetch(
        `/api/account/${id}/conversation/${conversationId}/messages`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text }),
        }
      ).then(() => {
        fetchMessages(conversationId);
        setTextMessage("");
      });
    },
    [conversationId, fetchMessages, id]
  );

  useEffect(() => {
    if (id) {
      fetchAccounts();
    }
  }, [fetchAccounts, id]);

  useEffect(() => {
    if (!isUndefined(id)) {
      fetchCoversationList();
    }
  }, [fetchCoversationList, id]);

  return (
    <Container>
      <Grid container>
        <Grid item xs={3}>
          <Paper variant="outlined" square sx={{ height: "100vh" }}>
            <NavigateButton href="/" />
            <CoversationList
              list={list}
              fetchMessages={fetchMessages}
              setConversationId={setConversationId}
            />
          </Paper>
        </Grid>
        <Grid item xs={9} padding="16px">
          {isUndefined(conversationId) ? (
            <Container style={{ textAlign: "center" }}>
              <Typography color="#777777">Nothing to show</Typography>
            </Container>
          ) : (
            <MessageBox
              messages={messages}
              setTextMessage={setTextMessage}
              postMessages={postMessages}
              accountId={id}
              textMessage={textMessage}
              conversationId={conversationId}
            />
          )}
        </Grid>
      </Grid>
    </Container>
  );
}
