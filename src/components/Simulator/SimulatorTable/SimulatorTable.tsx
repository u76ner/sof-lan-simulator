import React from "react";
import {
  Box,
  Typography,
  Container,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@material-ui/core";

import { songs } from "utils/data";

type SimulatorTableProps = {};

// BPM　操作　操作の値　→　緑数字、ハイスピード

export const SimulatorTable: React.FC<SimulatorTableProps> = () => {
  return (
    <Box display="flex" flexDirection="column">
      <Typography variant="h5">操作</Typography>
      <Container maxWidth={false}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">
                <Typography>BPM</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography>操作</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography>操作の値</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography>緑数字</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography>ハイスピード</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography>コメント</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* TODO: Reduxの値で書き換える */}
            {songs[1].sections.map((section, idx) => (
              <TableRow key={idx}>
                <TableCell>
                  <Typography>{section.bpm}</Typography>
                </TableCell>
                <TableCell>
                  <Typography>TODO: select box</Typography>
                </TableCell>
                <TableCell>
                  <Typography>TODO: input</Typography>
                </TableCell>
                <TableCell>
                  <Typography>TODO: 緑数字</Typography>
                </TableCell>
                <TableCell>
                  <Typography>TODO: ハイスピード値</Typography>
                </TableCell>
                <TableCell>
                  <Typography>TODO: コメント</Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Container>
    </Box>
  );
};
