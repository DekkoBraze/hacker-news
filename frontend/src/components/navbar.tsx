import React, {useState} from "react";
import { Link } from "react-router-dom";
import Box from '@mui/material/Box';

export default function Navbar() {

  const barStyle = {
    width: '100%',
    height: '7vh',
    backgroundColor: 'darkslategray',
    display: 'flex',
  }

  const titleStyle = {
    color: 'white',
    fontSize: '4vh',
    marginTop: '1vh',
    marginLeft: '43vw',
  }

  return (
    <Box sx={barStyle}>
        <Link to="/" style={titleStyle}>HACKER-NEWS</Link>
    </Box>
  );
}

