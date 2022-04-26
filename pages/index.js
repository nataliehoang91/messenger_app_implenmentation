import React, { useCallback, useEffect, useState } from "react";
import { Avatar, Box, Typography, Paper, Link } from "@mui/material";
import NextLink from "next/link";
import { stringAvatar } from "../utils";

export const AccountItem = ({ email, name }) => {
  return (
    <Paper
      elevation={3}
      sx={{
        display: "flex",
        alignItems: "center",
        padding: 1,
        cursor: "pointer",
        mb: "10px",
      }}
    >
      <Avatar {...stringAvatar(name)} sx={{ mx: "10px" }} />
      <Box>
        <Typography fontWeight="bold">{name}</Typography>
        <Typography>{email}</Typography>
      </Box>
    </Paper>
  );
};

export default function Home() {
  const [accounts, setAccounts] = useState();
  const fetchAccounts = useCallback(() => {
    return fetch(`/api/accounts`)
      .then((res) => {
        if (res.ok) return res.json();
        return null;
      })
      .then((data) => {
        return setAccounts(data);
      });
  }, []);

  useEffect(() => {
    fetchAccounts();
  }, [fetchAccounts]);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      width="100vw"
    >
      <Box>
        <Typography fontSize="30px" mb={1}>
          Select An Account
        </Typography>
        {accounts?.length > 0
          ? accounts.map((item) => (
              <NextLink key={item.id} href={`/coversation/${item.id}`} passHref>
                <Link
                  underline="none"
                  sx={{ width: "100%", height: "100%", display: "block" }}
                >
                  <AccountItem
                    email={`${item.name.replace(/ /g, "")}@domain.com`}
                    name={item.name}
                  />
                </Link>
              </NextLink>
            ))
          : null}
      </Box>
    </Box>
  );
}
