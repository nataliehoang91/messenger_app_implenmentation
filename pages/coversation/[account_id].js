import React, { useCallback, useEffect, useState } from "react";
import { Box, Avatar, Paper, Typography } from "@mui/material";
import { useRouter } from "next/router";
import Grid from "@mui/material/Grid";
import { stringAvatar } from "../../utils";

const CoversationList = ({ accountId }) => {
  const [list, setList] = useState([]);
  const fetchCoversationList = useCallback(() => {
    return fetch(`/api/account/${accountId}/conversations?pageSize=10`)
      .then((res) => {
        if (res.ok) return res.json();
        return null;
      })
      .then((data) => {
        if (data?.rows) {
          return setList(data.rows);
        }
      });
  }, [accountId]);

  useEffect(() => {
    if (accountId !== undefined) {
      fetchCoversationList();
    }
  }, [fetchCoversationList, accountId]);

  return (
    <Box>
      {list?.length > 0 ? (
        list.map((item) => (
          <Box key={item.id}>
            <Paper
              variant="outlined"
              square
              sx={{ width: "90%", mx: "auto", p: "5px" }}
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

  useEffect(() => {
    if (id) {
      fetchAccounts();
    }
  }, [fetchAccounts, id]);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container>
        <Grid item xs={2}>
          <Paper variant="outlined" square sx={{ height: "100vh" }}>
            <CoversationList accountId={id} />
          </Paper>
        </Grid>
        <Grid item xs={10}>
          <Box>Testing chat</Box>
        </Grid>
      </Grid>
    </Box>
  );
}
