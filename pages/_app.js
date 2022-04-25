import { CssBaseline } from "@mui/material";

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <CssBaseline />
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
