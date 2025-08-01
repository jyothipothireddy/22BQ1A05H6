// src/components/Shortener.js
import React, { useState } from "react";
import { TextField, Button, Box, Typography, Grid, Paper } from "@mui/material";
import logger from "../utils/logger";
import { useNavigate, useParams } from "react-router-dom";

const Shortener = () => {
  const [urls, setUrls] = useState([{ longUrl: "", validity: "", shortcode: "" }]);
  const [shortened, setShortened] = useState([]);
  const navigate = useNavigate();
  const { shortcode } = useParams();

  // Redirection Simulation
  if (shortcode) {
    const stored = JSON.parse(localStorage.getItem("shortenedLinks")) || [];
    const entry = stored.find(e => e.shortcode === shortcode);
    if (entry) {
      logger("Redirecting to long URL", entry);
      window.location.href = entry.longUrl;
    } else {
      return <Typography variant="h6">Invalid Short URL</Typography>;
    }
  }

  const handleInput = (index, field, value) => {
    const updated = [...urls];
    updated[index][field] = value;
    setUrls(updated);
  };

  const handleSubmit = () => {
    let links = [];
    for (let entry of urls) {
      const { longUrl, validity, shortcode } = entry;

      try {
        new URL(longUrl);
      } catch {
        alert("Invalid URL: " + longUrl);
        logger("Invalid URL entered", longUrl);
        return;
      }

      let sc = shortcode || Math.random().toString(36).substring(2, 7);
      const expiry = Date.now() + ((parseInt(validity) || 30) * 60 * 1000);

      links.push({
        longUrl,
        shortcode: sc,
        createdAt: new Date().toISOString(),
        expiresAt: new Date(expiry).toISOString(),
        clicks: []
      });
    }

    localStorage.setItem("shortenedLinks", JSON.stringify([...links, ...(JSON.parse(localStorage.getItem("shortenedLinks")) || [])]));
    setShortened(links);
    logger("Short URLs generated", links);
  };

  const addUrl = () => {
    if (urls.length < 5) setUrls([...urls, { longUrl: "", validity: "", shortcode: "" }]);
  };

  return (
    <Box p={4}>
      <Typography variant="h4">URL Shortener</Typography>
      <Grid container spacing={2}>
        {urls.map((entry, i) => (
          <Grid item xs={12} key={i}>
            <Paper elevation={3} style={{ padding: "1rem" }}>
              <TextField fullWidth label="Long URL" value={entry.longUrl} onChange={e => handleInput(i, "longUrl", e.target.value)} margin="normal" />
              <TextField fullWidth label="Validity (minutes)" value={entry.validity} onChange={e => handleInput(i, "validity", e.target.value)} margin="normal" />
              <TextField fullWidth label="Custom Shortcode (optional)" value={entry.shortcode} onChange={e => handleInput(i, "shortcode", e.target.value)} margin="normal" />
            </Paper>
          </Grid>
        ))}
      </Grid>
      <Box mt={2}>
        <Button variant="outlined" onClick={addUrl} disabled={urls.length >= 5}>Add Another</Button>{" "}
        <Button variant="contained" onClick={handleSubmit}>Shorten</Button>{" "}
        <Button onClick={() => navigate("/stats")}>Go to Statistics</Button>
      </Box>

      <Box mt={4}>
        {shortened.map((item, index) => (
          <Paper key={index} style={{ marginTop: "1rem", padding: "1rem" }}>
            <Typography><strong>Short URL:</strong> http://localhost:3000/{item.shortcode}</Typography>
            <Typography><strong>Expires At:</strong> {item.expiresAt}</Typography>
          </Paper>
        ))}
      </Box>
    </Box>
  );
};

export default Shortener;
