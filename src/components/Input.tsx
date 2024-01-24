import { TextField } from '@mui/material';
import React from 'react';
import { useFormContext } from 'react-hook-form';

interface InputInterface {
  id: string;
  type?: string;
  label?: string;
}

export const Input: React.FC<InputInterface> = ({ id, type, label }) => {
  const inputType = type ? type : 'text';
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <TextField
      fullWidth
      id={id}
      type={inputType}
      label={label}
      {...register(id, { required: true })}
      error={Boolean(errors[id])}
      helperText={Boolean(errors[id]) ? `${label} é obrigatório` : ''}
    />
  );
};
