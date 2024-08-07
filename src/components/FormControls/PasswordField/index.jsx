import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { FormHelperText } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import PropTypes from "prop-types";
import { useState } from "react";
import { Controller } from "react-hook-form";

function PasswordField({ form, name, label }) {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const {
    control,
    formState: { errors },
    trigger,
  } = form;

  return (
    <FormControl
      error={!!errors[name]}
      fullWidth
      margin="normal"
      variant="outlined"
    >
      <InputLabel htmlFor={name}>{label}</InputLabel>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <OutlinedInput
            {...field}
            id={name}
            label={label}
            type={showPassword ? "text" : "password"}
            onBlur={async () => {
              field.onBlur();
              await trigger(name);
            }}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        )}
      />
      <FormHelperText error={!!errors[name]}>
        {errors[name]?.message}
      </FormHelperText>
    </FormControl>
  );
}
PasswordField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default PasswordField;
