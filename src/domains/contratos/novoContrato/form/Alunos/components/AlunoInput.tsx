import Box from "@components/@extended/Box"
import { Button, Divider, FormControl, FormLabel, Grid, IconButton, Menu, MenuItem, TextField, Typography } from "@mui/material"
import CamisaInput from "./CamisaInput"
import MoletomInput from "./MoletomInput"
import CanecaInput from "./CanecaInput"
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useShallow } from "zustand/react/shallow"
import useFormStore from "../../formStore"
import { useState } from "react"
import { Aluno } from "domains/contratos/novoContrato/types"

interface IProps {
    index: number
}

const AlunoInput = ({ index } : IProps) => {

    const aluno = useFormStore(useShallow((state) => state.alunos.at(index)));
    const updateAluno = useFormStore(useShallow((state) => state.updateAluno));
    const detalhesPedido = useFormStore(useShallow((state) => state.detalhesPedido));
    const handleRemoveAluno = useFormStore(useShallow((state) => state.handleRemoveAluno));

    
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleAddItemClick = (event: React.MouseEvent<HTMLElement>, index: number) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleAddItem = (item: keyof Aluno) => {
        updateAluno(index, item, {});
        
        handleMenuClose();
    };


    if (!aluno) return null;

    return (
        <Box
          sx={{
            mb: 2,
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 1,
            position: 'relative'
          }}
        >
          <Grid container spacing={1.5} sx={{
              "> :first-child": {
                  pt: '0 !important'
                },
              mt: 0
              }}>
            <Grid item xs={12}>
              <Typography variant="subtitle1" fontFamily="inter">
              {index + 1}º Aluno
              </Typography>
            </Grid>
            
            <Grid item xs={12}>
              <FormControl fullWidth>
                <FormLabel sx={{ mb: 0.5 }}><Typography variant="subtitle2">Nome do aluno</Typography></FormLabel>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Digite o nome do aluno"
                  value={aluno.nome}
                  onChange={(e) => updateAluno(index, 'nome', e.target.value)}
                />
              </FormControl>
            </Grid>
            
            {detalhesPedido.possuiCamiseta && aluno.camisa && (
              <>
                <Grid item xs={12}>
                  <Divider orientation="horizontal" />
                </Grid> 
                <CamisaInput aluno={aluno} index={index}/>
              </>
            )}

            {detalhesPedido.possuiMoletom && aluno.moletom && (
              <>
                <Grid item xs={12}>
                  <Divider orientation="horizontal" />
                </Grid> 
                <MoletomInput aluno={aluno} index={index}/>
              </>
            )}

            {detalhesPedido.possuiCaneca && aluno.caneca && (
              <>
                <Grid item xs={12}>
                  <Divider orientation="horizontal" />
                </Grid> 
                <CanecaInput aluno={aluno} index={index}/>
              </>
            )}

            <Grid item xs={12}>
              <Divider orientation="horizontal" />
            </Grid> 
            
            <Grid item xs={12}>
              <Button
                startIcon={<AddIcon />}
                onClick={(e) => handleAddItemClick(e, index)}
                variant="contained"
                color="secondary"
                size="small"
                disabled={!!aluno.camisa && !!aluno.moletom && !!aluno.caneca}
              >
                Adicionar Item
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                {!aluno.camisa && (
                  <MenuItem onClick={() => handleAddItem('camisa')}>
                    Adicionar Camisa
                  </MenuItem>
                )}
                {!aluno.moletom && (
                  <MenuItem onClick={() => handleAddItem('moletom')}>
                    Adicionar Moletom
                  </MenuItem>
                )}
                {!aluno.caneca && (
                  <MenuItem onClick={() => handleAddItem('caneca')}>
                    Adicionar Caneca
                  </MenuItem>
                )}
              </Menu>
            </Grid>
          </Grid>
          
          {index > 1 && (
            <IconButton
              onClick={() => handleRemoveAluno(index)}
              size="small"
              sx={{ position: 'absolute', top: 8, right: 8 }}
            >
              <RemoveIcon />
            </IconButton>
          )}
        </Box>
    )
}

export default AlunoInput;