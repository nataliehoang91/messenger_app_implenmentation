import React from "react";
import { IconButton } from "@mui/material";

import AddCommentOutlinedIcon from "@mui/icons-material/AddCommentOutlined";

const CreateBtn = () => (
  <IconButton color="primary" component="span">
    <AddCommentOutlinedIcon fontSize="medium" />
  </IconButton>
);

export default CreateBtn;
