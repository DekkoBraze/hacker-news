import './Navbar.css'
import { Link } from "react-router-dom";
import Box from '@mui/material/Box';

export default function Navbar() {

  return (
    <Box className='bar'>
        <Link className="title" to="/">NEWS-SITE</Link>
    </Box>
  );
}
