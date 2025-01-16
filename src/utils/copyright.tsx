import React from 'react'
import Typography from "@mui/material/Typography";

export default function copyright() {
  return (
    <div>
        <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        //{...props}
      >
        {"Copyright © "}
        Linker {new Date().getFullYear()}
        {"."}
      </Typography>
    </div>
  )
}
