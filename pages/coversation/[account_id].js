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
  const [messages, setMessages] = useState([]);
  const [conversationId, setConversationId] = useState();
  const [prevCursor, setPrevCursor] = useState("");
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

  const loadMore = useCallback(
    (conId, cursor) => {
      if (!prevCursor) return;
      return fetch(
        `/api/account/${id}/conversation/${conId}/messages?cursor=${cursor}`
      )
        .then((res) => {
          if (res.ok) return res.json();
          return null;
        })
        .then((data) => {
          if (data?.rows) {
            if (data?.rows.length === 0) return;
            if (data.sort === "NEWEST_FIRST") {
              setPrevCursor(data.cursor_prev);
              setMessages([...data.rows, ...messages]);
            } else {
              setPrevCursor(data.cursor_next);
              setMessages([...messages, ...data.rows.reverse()]);
            }
          }
        });
    },
    [id, messages, prevCursor]
  );

  const fetchMessages = useCallback(
    (conId) => {
      return fetch(`/api/account/${id}/conversation/${conId}/messages`)
        .then((res) => {
          if (res.ok) return res.json();
          return null;
        })
        .then((data) => {
          if (data?.rows) {
            setPrevCursor(data.cursor_prev);
            return setMessages([...data.rows, ...messages]);
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
      )
        .then((res) => {
          if (res.ok) return res.json();
          return null;
        })
        .then((data) => {
          setMessages([data, ...messages]);
          setTextMessage("");
        });
    },
    [conversationId, id, messages]
  );

  useEffect(() => {
    setMessages([]);
    setPrevCursor(null);
    console.log(conversationId);
  }, [conversationId]);

  useEffect(() => {
    if (id) {
      fetchAccounts();
    }
  }, [fetchAccounts, id]);

  useEffect(() => {
    if (!isUndefined(id)) {
      fetchCoversationList();
    }
  }, [fetchCoversationList, id, messages[0]?.id]);

  return (
    <Grid
      container
      style={{
        height: "100vh",
        justifyContent: "space-evenly",
      }}
    >
      <Grid item xs={12} md={3}>
        <Box>
          <ActionBarBtn
            href="/"
            fetchCoversationList={fetchCoversationList}
            accountId={id}
          />
          <CoversationList
            list={list}
            fetchMessages={fetchMessages}
            setConversationId={setConversationId}
          />
        </Box>
      </Grid>
      <Divider orientation="vertical" flexItem />
      <Grid item xs={12} md={8}>
        <>
          {isUndefined(conversationId) ? (
            <Container
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
              }}
            >
              <Typography color="#777777">
                Select a chat to start messaging
              </Typography>
            </Container>
          ) : (
            <MessageBox
              messages={messages}
              setTextMessage={setTextMessage}
              postMessages={postMessages}
              accountId={id}
              textMessage={textMessage}
              conversationId={conversationId}
              loadMore={() => loadMore(conversationId, prevCursor)}
            />
          )}
        </>
      </Grid>
    </Grid>
  );
}
