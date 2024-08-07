import { TextField } from "@mui/material";
import PropTypes from "prop-types";
import { Controller } from "react-hook-form";

InputField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  autoComplete: PropTypes.string,
};

function InputField({ form, name, label, autoComplete }) {
  const {
    control,
    formState: { errors },
    trigger,
  } = form;
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <TextField
          {...field}
          fullWidth
          label={label}
          variant="outlined"
          margin="normal"
          onBlur={async () => {
            field.onBlur();
            await trigger(name);
          }}
          error={!!errors[name]}
          helperText={errors[name]?.message}
          autoComplete={autoComplete}
        />
      )}
    />
  );
}

export default InputField;
