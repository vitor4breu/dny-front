import React, { useState, useEffect, useMemo } from "react";

import {
  TableContainer,
  TableHead,
  TableCell,
  TableBody,
  Typography,
  IconButton,
  TablePagination,
  Box,
  Menu,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import {
  Add,
  AttachMoney,
  Edit,
  FilterAlt,
  FilterAltOutlined,
  Info,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

import SearchBar from "@components/SearchBar/SearchBar";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import ContratosService, {
  ObterContratosQuery,
} from "services/contratoService";
import { buscarContratos } from "@redux/slices/contratoSlice";
import {
  Container,
  Header,
  NewContractButton,
  StyledTable,
  HeaderRow,
  ContentRow,
  LoadingCell,
} from "./styles";
import ContractDetailsDrawer from "./components/drawerDetalhamentoContrato";

type Paginacao = {
  pagina: number;
  linhasPorPagina: number;
};

type Filters = {
  escola?: string;
  uf?: string;
  cidade?: string;
};

const Contratos = () => {
  const [contratoInfo, setContratoInfo] = useState<any>(null);
  const [paginacao, setPaginacao] = useState<Paginacao>({
    pagina: 0,
    linhasPorPagina: 10,
  });
  const [filters, setFilters] = useState<Filters>({});
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { contratos, totalContratos, loading } = useAppSelector(
    (state) => state.contract
  );

  useEffect(() => {
    dispatch(buscarContratos({ paginacao }));
  }, [dispatch, paginacao]);

  const handleInfo = async (id: number) => {
    const info = await ContratosService.ObterInformacoesContrato(id);
    setContratoInfo(info);
  };

  const handleEdit = async (id: number) => {
    navigate(id.toString());
  };

  const handlePagamento = async (id: number) => {};

  const hasFilters = useMemo(
    () =>
      Object.values(filters).some(
        (value) => value !== undefined && value !== ""
      ),
    [filters]
  );

  const handleFilterChange =
    (key: keyof ObterContratosQuery) => (event: any) => {
      const newFilters = { ...filters, [key]: event.target.value };
      setFilters(newFilters);
      dispatch(
        buscarContratos({
          ...newFilters,
          paginacao,
        })
      );
    };

  return (
    <Container>
      <Header>
        <Box display="flex" alignItems="center" gap={1}>
          <NewContractButton
            variant="contained"
            size="small"
            onClick={() => navigate("formulario")}
          >
            <Add />
            NOVO CONTRATO
          </NewContractButton>
          <SearchBar
            onSearch={(filters) =>
              dispatch(
                buscarContratos({
                  ...filters,
                  paginacao,
                })
              )
            }
          />

          <IconButton
            onClick={(e) => setAnchorEl(e.currentTarget)}
            className="filter-icon-buttom"
          >
            {hasFilters ? <FilterAlt /> : <FilterAltOutlined />}
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <Box
              p={2}
              display="flex"
              flexDirection="column"
              gap={2}
              width="250px"
            >
              <FormControl fullWidth size="small">
                <InputLabel>Escola</InputLabel>
                <Select
                  value={filters.escola || ""}
                  onChange={handleFilterChange("escola")}
                >
                  <MenuItem value="">Nenhuma</MenuItem>
                  <MenuItem value="Anglo">Anglo</MenuItem>
                  <MenuItem value="Objetivo">Objetivo</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth size="small">
                <InputLabel>Estado</InputLabel>
                <Select
                  value={filters.uf || ""}
                  onChange={handleFilterChange("uf")}
                >
                  <MenuItem value="">Nenhum</MenuItem>
                  <MenuItem value="SP">São Paulo</MenuItem>
                  <MenuItem value="RJ">Rio de Janeiro</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth size="small">
                <InputLabel>Cidade</InputLabel>
                <Select
                  value={filters.cidade || ""}
                  onChange={handleFilterChange("cidade")}
                >
                  <MenuItem value="">Nenhuma</MenuItem>
                  <MenuItem value="SP">São Paulo</MenuItem>
                  <MenuItem value="RJ">Rio de Janeiro</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Menu>
        </Box>
      </Header>

      <div>
        <Typography variant="h6" fontWeight="bold">
          Aguardando Pagamento
        </Typography>
        <TableContainer>
          <StyledTable>
            <TableHead>
              <HeaderRow>
                <TableCell>Nº</TableCell>
                <TableCell>Nome do responsável</TableCell>
                <TableCell>Escola</TableCell>
                <TableCell>Cidade - UF</TableCell>
                <TableCell>Status</TableCell>
                <TableCell width={40}></TableCell>
                <TableCell width={40}></TableCell>
                <TableCell width={40}></TableCell>
              </HeaderRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <ContentRow>
                  <LoadingCell colSpan={7}>Carregando...</LoadingCell>
                </ContentRow>
              ) : (
                contratos.map((contrato) => (
                  <ContentRow key={contrato.id}>
                    <TableCell>{contrato.id}</TableCell>
                    <TableCell>{contrato.nomeResponsavel}</TableCell>
                    <TableCell>{contrato.escola}</TableCell>
                    <TableCell>
                      {contrato.cidade} - {contrato.uf}
                    </TableCell>
                    <TableCell>STATUS</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleInfo(contrato.id)}>
                        <Info />
                      </IconButton>
                    </TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleEdit(contrato.id)}>
                        <Edit />
                      </IconButton>
                    </TableCell>
                    <TableCell>
                      <IconButton onClick={() => handlePagamento(contrato.id)}>
                        <AttachMoney />
                      </IconButton>
                    </TableCell>
                  </ContentRow>
                ))
              )}
            </TableBody>
          </StyledTable>
          <TablePagination
            component="div"
            count={totalContratos}
            page={paginacao.pagina}
            onPageChange={(_, paginaAtual) =>
              setPaginacao({ ...paginacao, pagina: paginaAtual })
            }
            rowsPerPage={paginacao.linhasPorPagina}
            onRowsPerPageChange={(event) =>
              setPaginacao({
                ...paginacao,
                pagina: parseInt(event.target.value, 10),
              })
            }
            labelRowsPerPage="Itens por página"
            labelDisplayedRows={({ from, to, count }) =>
              `${from}-${to} de ${count}`
            }
          />
        </TableContainer>
      </div>

      <ContractDetailsDrawer
        contratoInfo={contratoInfo}
        onClose={() => setContratoInfo(null)}
      />
    </Container>
  );
};

export default Contratos;
