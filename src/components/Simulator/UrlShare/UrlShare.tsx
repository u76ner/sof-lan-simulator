import React, { useState, useEffect } from "react";
import { Box, Button, OutlinedInput } from "@material-ui/core";
import * as XLSX from "xlsx";

import { useSelector, SimulatorState } from "stores";
import { songs } from "utils/data";

type UrlShareProps = {};

const exportXlsx = (state: SimulatorState) => {
  const song = songs[state.songIdx];

  const workbook = XLSX.utils.book_new();

  workbook.Props = {
    Title: song.title,
  };

  workbook.SheetNames.push("シート1");

  const worksheet = XLSX.utils.aoa_to_sheet([
    [
      "BPM",
      "操作",
      "操作の値",
      "緑数字",
      "白数字, LIFT",
      "ハイスピード",
      "コメント",
    ],
  ]);

  workbook.Sheets["シート1"] = worksheet;

  XLSX.writeFile(workbook, song.title);
};

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
