import React from "react";
import { Avatar } from "@mui/material";

import { stringAvatar } from "../../utils";

const BaseAvatar = ({ senderName }) => (
  <Avatar {...stringAvatar(senderName)} sx={{ m: "auto" }} />
);

export default BaseAvatar;
