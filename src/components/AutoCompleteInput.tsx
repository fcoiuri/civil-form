import { SPessoas } from '@/schemas/Cadastro';
import {
  Autocomplete,
  CircularProgress,
  InputAdornment,
  TextField,
} from '@mui/material';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { z } from 'zod';
import { debounce } from '@mui/material/utils';

interface AutoCompleteInterface {
  id: string;
  label?: string;
  data: PessoasType;
  isLoading: boolean;
}

export type PessoasType = z.infer<typeof SPessoas>;

export const AutoCompleteInput: React.FC<AutoCompleteInterface> = ({
  id,
  label,
  data,
  isLoading,
}) => {
  const {
    register,
    setValue,
    watch,
    clearErrors,
    formState: { errors },
  } = useFormContext();

  const selectedValue = watch(id, '');
  const [options, setOptions] = React.useState(data);

  const fetchDebounced = debounce((inputValue: string) => {
    const lowercaseInputValue = inputValue.toLowerCase();

    if (inputValue.length < 3) return;
    const filteredOptions = data.filter((nome) =>
      nome.nome.toLowerCase().includes(lowercaseInputValue)
    );
    setOptions(filteredOptions);
  }, 400);

  const handleInputChange = (
    _: React.SyntheticEvent,
    newInputValue: string
  ) => {
    if (newInputValue.trim() === '') {
      setOptions([]);
      return;
    }
    fetchDebounced(newInputValue);
  };

  return (
    <React.Fragment>
      <Autocomplete
        value={
          selectedValue
            ? data.find((option: any) => option.id === selectedValue) ?? null
            : null
        }
        getOptionLabel={(option) => option.nome}
        onChange={(_, newValue) => {
          clearErrors(id);
          setValue(id, newValue ? newValue.id : null);
        }}
        noOptionsText={'Nenhuma opção selecionada'}
        id={id}
        options={options}
        onInputChange={handleInputChange}
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            error={Boolean(errors[id])}
            helperText={errors[id]?.message?.toString() || ''}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <InputAdornment position="end">
                  {isLoading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                </InputAdornment>
              ),
            }}
          />
        )}
      />
      <input
        type="hidden"
        {...register(id, { required: `${label} é obrigatório` })}
        value={selectedValue ?? ''}
      />
    </React.Fragment>
  );
};
