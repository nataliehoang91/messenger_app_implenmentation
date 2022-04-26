import React from "react";
import { Avatar } from "@mui/material";

import { stringAvatar } from "../../utils";

const BaseAvatar = ({ senderName, sizeProps }) => (
  <Avatar {...stringAvatar(senderName)} {...sizeProps} />
);

export default BaseAvatar;
