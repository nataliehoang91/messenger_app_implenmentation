import React from "react";
import { Link, Typography } from "@mui/material";

import ArrowBackRounded from "@mui/icons-material/ArrowBackRounded";

const NavigateIconBtn = ({ href }) => (
  <Link href={href} color="#188f74">
    <ArrowBackRounded fontSize="large" />
  </Link>
);

export default NavigateIconBtn;
