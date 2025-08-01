// src/components/Statistics.js
import React, { useEffect, useState } from "react";
import { Box, Typography, Paper } from "@mui/material";
import logger from "../utils/logger";

const Statistics = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("shortenedLinks")) || [];
    setData(stored);
    logger("Viewed statistics", stored);
  }, []);

  return (
    <Box p={4}>
      <Typography variant="h4">Shortened URLs Statistics</Typography>
      {data.map((entry, idx) => (
        <Paper key={idx} style={{ marginTop: "1rem", padding: "1rem" }}>
          <Typography><strong>Short URL:</strong> http://localhost:3000/{entry.shortcode}</Typography>
          <Typography><strong>Original URL:</strong> {entry.longUrl}</Typography>
          <Typography><strong>Created At:</strong> {entry.createdAt}</Typography>
          <Typography><strong>Expires At:</strong> {entry.expiresAt}</Typography>
          <Typography><strong>Clicks:</strong> {entry.clicks.length}</Typography>
        </Paper>
      ))}
    </Box>
  );
};

export default Statistics;
