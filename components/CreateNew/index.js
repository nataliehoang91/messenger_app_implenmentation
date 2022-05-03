import React, { useCallback } from "react";
import { IconButton } from "@mui/material";

import AddCommentOutlinedIcon from "@mui/icons-material/AddCommentOutlined";

const CreateBtn = ({ accountId, fetchCoversationList }) => {
  const createNewConversation = useCallback(
    (text) => {
      return fetch(`/api/account/${accountId}/conversations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ accountId, with: "2" }),
      }).then(() => {
        fetchCoversationList();
      });
    },
    [accountId, fetchCoversationList]
  );

  return (
    <IconButton
      color="primary"
      component="span"
      onClick={createNewConversation}
    >
      <AddCommentOutlinedIcon fontSize="medium" />
    </IconButton>
  );
};

export default CreateBtn;
