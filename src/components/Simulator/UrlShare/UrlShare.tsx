import React, { useState, useEffect } from "react";
import { Box, Button, OutlinedInput } from "@material-ui/core";

import { useSelector } from "stores";

type UrlShareProps = {};

export const UrlShare: React.FC<UrlShareProps> = (props) => {
  const state = useSelector((state) => state);
  const [urlBase, setUrlBase] = useState("");
  const [urlToShare, setUrlToShare] = useState("");

  useEffect(() => {
    const url = new URL(window.location.href);
    setUrlBase(`${url.protocol}//${url.host}${url.pathname}`);
  }, []);

  useEffect(() => {
    setUrlToShare(
      `${urlBase}?state=${encodeURIComponent(JSON.stringify(state))}`
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urlBase, state]);

  return (
    <Box display="flex" gridGap={16}>
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          if (navigator.clipboard) {
            navigator.clipboard.writeText(urlToShare);
          }
        }}
      >
        URLをコピー
      </Button>
      <OutlinedInput readOnly value={urlToShare} />
    </Box>
  );
};
