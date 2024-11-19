import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  TextField, IconButton, InputAdornment, Menu, MenuItem, Select, 
  FormControl, InputLabel, Button, Box
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterAltOutlined from '@mui/icons-material/FilterAltOutlined';
import FilterAlt from '@mui/icons-material/FilterAlt';
import { ObterContratosQuery } from '../../models/contrato/queries/ObterContratosQueryHandler';
import './style.css';

interface SearchBarProps {
  onSearch: (filters: ObterContratosQuery) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [filters, setFilters] = useState<ObterContratosQuery>({});
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  // Handle para abertura e fechamento do menu de filtros
  const handleFilterClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // Atualiza a query e agenda o debounce de busca
  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const newFilters = ({...filters, pesquisa: value});
    setFilters(newFilters)

    // Debounce: dispara a busca após 3 segundos
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => onSearch(newFilters), 3000);
  };

 

  // Executa a busca ao pressionar Enter
  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      onSearch(filters);
    }
  };

  // Atualiza os filtros e dispara a busca
  const handleFilterChange = (key: keyof ObterContratosQuery) => (event: any) => {
    const newFilters = { ...filters, [key]: event.target.value };
    setFilters(newFilters);
    onSearch(newFilters);
  };

  const hasFilters = useMemo(() => {
    return Object.values(filters).some((value) => value !== undefined && value !== '');
  }, [filters]);

  return (
    <Box display="flex" alignItems="center" gap={1}>
      <TextField
        placeholder="Buscar..."
        variant="outlined"
        fullWidth
        size="small"
        value={filters.pesquisa ?? ""}
        onChange={handleQueryChange}
        onKeyDown={handleKeyPress}
        InputProps={{
          className:"search-input-div",
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleFilterClick} className="filter-icon-buttom">
                {hasFilters ? <FilterAlt /> : <FilterAltOutlined />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Box p={2} display="flex" flexDirection="column" gap={2} width="250px">
          <FormControl fullWidth size="small">
            <InputLabel>Escola</InputLabel>
            <Select
              value={filters.escola || ''}
              onChange={handleFilterChange('escola')}
            >
              <MenuItem value="">Nenhuma</MenuItem>
              <MenuItem value="Anglo">Anglo</MenuItem>
              <MenuItem value="Objetivo">Objetivo</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth size="small">
            <InputLabel>Estado</InputLabel>
            <Select
              value={filters.uf || ''}
              onChange={handleFilterChange('uf')}
            >
              <MenuItem value="">Nenhum</MenuItem>
              <MenuItem value="SP">São Paulo</MenuItem>
              <MenuItem value="RJ">Rio de Janeiro</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth size="small">
            <InputLabel>Cidade</InputLabel>
            <Select
              value={filters.cidade || ''}
              onChange={handleFilterChange('cidade')}
            >
              <MenuItem value="">Nenhuma</MenuItem>
              <MenuItem value="SP">São Paulo</MenuItem>
              <MenuItem value="RJ">Rio de Janeiro</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Menu>
    </Box>
  );
};

export default SearchBar;
