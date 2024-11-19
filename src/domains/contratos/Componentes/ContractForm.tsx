import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';

const ContractForm: React.FC = () => {
  const [responsavel, setResponsavel] = useState('');
  const [endereco, setEndereco] = useState('');
  const [contato, setContato] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [tipo, setTipo] = useState('');
  const [adicionais, setAdicionais] = useState('');
  const [prazo, setPrazo] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Dispatch contract creation action here
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          New Contract
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="responsavel"
            label="Responsável"
            name="responsavel"
            autoComplete="responsavel"
            autoFocus
            value={responsavel}
            onChange={(e) => setResponsavel(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="endereco"
            label="Endereço"
            name="endereco"
            autoComplete="endereco"
            value={endereco}
            onChange={(e) => setEndereco(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="contato"
            label="Contato"
            name="contato"
            autoComplete="contato"
            value={contato}
            onChange={(e) => setContato(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="quantidade"
            label="Quantidade"
            name="quantidade"
            autoComplete="quantidade"
            value={quantidade}
            onChange={(e) => setQuantidade(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="tipo"
            label="Tipo"
            name="tipo"
            autoComplete="tipo"
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="adicionais"
            label="Adicionais"
            name="adicionais"
            autoComplete="adicionais"
            value={adicionais}
            onChange={(e) => setAdicionais(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="prazo"
            label="Prazo"
            name="prazo"
            autoComplete="prazo"
            value={prazo}
            onChange={(e) => setPrazo(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default ContractForm;