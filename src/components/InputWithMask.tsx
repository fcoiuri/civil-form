import React, { ChangeEvent } from 'react';
import { TextField } from '@mui/material';
import { useFormContext } from 'react-hook-form';

interface InputInterface {
  id: string;
  mask: any;
  min: number;
  max: number;
  label?: string;
  type?: string;
}

export const InputWithMask: React.FC<InputInterface> = ({
  id,
  type,
  label,
  mask,
  min,
  max,
}) => {
  const inputType = type ? type : 'text';
  const {
    register,
    formState: { errors },
    setValue,
    clearErrors,
  } = useFormContext();

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = event.target.value;
    value.length === min ? clearErrors(id) : null;
    setValue(id, mask(value));
  };

  return (
    <TextField
      fullWidth
      id={id}
      type={inputType}
      label={label}
      {...register(id, {
        required: {
          value: true,
          message: `${label} é obrigatório`,
        },
        minLength: {
          value: min,
          message: `O ${label} precisa ter no mínimo ${min} caracteres`,
        },
        maxLength: {
          value: max,
          message: `O ${label} precisa ter no mínimo ${max} caracteres`,
        },
      })}
      onChange={handleChange}
      inputProps={{ minLength: min, maxLength: max }}
      error={Boolean(errors[id])}
      helperText={Boolean(errors[id]) ? errors[id]?.message?.toString() : ''}
    />
  );
};
