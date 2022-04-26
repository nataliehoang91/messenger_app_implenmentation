import React, { useCallback, useEffect, useState } from "react";
import {
  Box,
  Avatar,
  Paper,
  Typography,
  Link,
  Container,
  Divider,
} from "@mui/material";
import { useRouter } from "next/router";
import Grid from "@mui/material/Grid";

import CoversationList from "../../components/ConservationList";
import MessageBox from "../../components/MessageBox";
import ActionBarBtn from "../../components/ActionBar";
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
    <Grid
      container
      style={{
        height: "100vh",
        justifyContent: "space-evenly",
      }}
    >
      <Grid item xs={3}>
        <Box>
          <ActionBarBtn href="/" />
          <CoversationList
            list={list}
            fetchMessages={fetchMessages}
            setConversationId={setConversationId}
          />
        </Box>
      </Grid>
      <Divider orientation="vertical" flexItem />
      <Grid item xs={8}>
        <>
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
        </>
      </Grid>
    </Grid>
  );
}
