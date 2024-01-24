'use client';
import React from 'react';
import {
  Container,
  Box,
  CssBaseline,
  Typography,
  Grid,
  Button,
} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import { SPessoas } from '@/schemas/Cadastro';
import { Input } from '@/components/Input';
import { AutoCompleteInput, PessoasType } from '@/components/AutoCompleteInput';
import { InputWithMask } from '@/components/InputWithMask';
import { PhoneMask } from '@/masks/PhoneMask';

export default function Home() {
  const [data, setData] = React.useState<PessoasType>([]);
  const [isLoading, setLoading] = React.useState(true);
  const defaultTheme = createTheme();
  const methods = useForm<PessoasType>();
  const { handleSubmit } = methods;

  React.useEffect(() => {
    fetch('http://localhost:3333/nomes')
      .then((res) => res.json())
      .then((nomes) => {
        const validatedNomes = SPessoas.safeParse(nomes);
        if (!validatedNomes.success) {
          console.error(validatedNomes.error);
          return;
        }
        setLoading(false);
        setData(validatedNomes.data);
      });
  }, []);

  const onSubmit: SubmitHandler<PessoasType> = (data) => console.log(data);

  return (
    <FormProvider {...methods}>
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography component="h1" variant="h5">
              Cadastrar pessoas
            </Typography>
            <Box component="form" noValidate sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <AutoCompleteInput
                    id="pessoa"
                    label="Nome"
                    data={data}
                    isLoading={isLoading}
                  />
                </Grid>
                <Grid item xs={12}>
                  <InputWithMask
                    mask={PhoneMask}
                    id="telefone"
                    label="Telefone"
                    min={14}
                    max={15}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Input id="email" label="E-mail" type="email" />
                </Grid>
              </Grid>
              <Button
                onClick={handleSubmit(onSubmit)}
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Cadastrar
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </FormProvider>
  );
}
