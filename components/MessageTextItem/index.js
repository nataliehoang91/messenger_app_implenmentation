import React, { useCallback, useEffect, useState } from "react";
import { Box, Paper, Typography, Link, TextField, Button } from "@mui/material";
import { useRouter } from "next/router";
import Grid from "@mui/material/Grid";

import Avatar from "../Avatar";

import { stringAvatar, formatDateTime } from "../../utils";

import styles from "../../styles/styles";

const BaseMessageItem = ({ message, accountId, senderId }) => {
  const chatBubbleStyles =
    accountId === senderId
      ? {
          ...styles.chatBubble,
          ...styles.ownerChatBubble,
        }
      : {
          ...styles.chatBubble,
          ...styles.senderChatBubble,
        };

  const chatBubbleOrientationStyles =
    accountId === senderId
      ? {
          ...styles.ownerChatBubbleOrientation,
        }
      : {
          ...styles.senderChatBubbleOrientation,
        };

  const chatTextStyles =
    accountId === senderId
      ? {
          ...styles.ownerText,
        }
      : {
          ...styles.senderText,
        };

  const dateTimeStyles =
    accountId === senderId
      ? {
          ...styles.ownerChatBubbleOrientation,
          ...styles.dateTimeText,
        }
      : {
          ...styles.userChatBubbleOrientation,
          ...styles.dateTimeText,
          marginLeft: "40px",
        };

  return (
    <Grid
      container
      style={{ ...chatBubbleOrientationStyles, ...styles.chatBubbleWrapper }}
    >
      {accountId !== senderId && (
        <Grid item style={{ margin: "5px" }}>
          <Avatar senderName={message.sender.name} />
        </Grid>
      )}
      <Grid item style={chatBubbleStyles}>
        <Typography style={chatTextStyles}>{message.text}</Typography>
      </Grid>
      <Grid container item style={dateTimeStyles}>
        <Typography style={{ fontSize: "0.8rem" }}>
          {formatDateTime(message.createdAt)}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default BaseMessageItem;
