import React from "react";
import TextField from "@mui/material/TextField";

interface TextFieldProps {
  label: string | undefined;
  value: string;
  onChange: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  multiline?: boolean;
  rows?: number;
  error?: boolean;
  helperText?: string;
}

const CustomTextField: React.FC<TextFieldProps> = ({
  label,
  value,
  onChange,
  multiline,
  rows,
  error,
  helperText,
}) => {
  return (
    <TextField
      fullWidth
      multiline={multiline}
      rows={rows}
      variant="outlined"
      label={label}
      value={value}
      onChange={onChange}
      error={error} // Pass the error prop
      helperText={helperText} // Pass the helperText prop
      sx={{
        "& .MuiOutlinedInput-root": {
          "&.Mui-focused fieldset": {
            borderColor: error ? "red" : "gray", // Change the outline color to gray when focused
          },
          "& input, & textarea": {
            color: "black", // Change the text color to gray
          },
        },
        "& .MuiInputLabel-root": {
          color: error ? "red" : "gray", // Change the label color to gray
        },
        "& .MuiInputLabel-root.Mui-focused": {
          color: error ? "red" : "gray", // Change the label color to gray when focused
        },
        "& .MuiFormHelperText-root": {
          color: error ? "red" : "gray", // Change helper text color based on error
        },
      }}
    />
  );
};

export default CustomTextField;
