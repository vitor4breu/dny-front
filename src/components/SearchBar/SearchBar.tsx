import React, { useState, useRef, useMemo } from 'react';
import {
  TextField, IconButton, InputAdornment, Menu, MenuItem, Select, 
  FormControl, InputLabel, Box
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterAltOutlined from '@mui/icons-material/FilterAltOutlined';
import FilterAlt from '@mui/icons-material/FilterAlt';
import './style.css';
import { ObterContratosQuery } from 'services/contratoService';

type Filters = {
  pesquisa?: string;
  escola?: string;
  uf?: string;
  cidade?: string;
}

interface SearchBarProps {
  onSearch: (filters: Filters) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [filters, setFilters] = useState<Filters>({});
  const debounceRef = useRef<NodeJS.Timeout | null>(null);



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

  return (
    <Box display="flex" alignItems="center" gap={1} width="500px">
      <TextField
        placeholder="Insira o parâmetro de busca"
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
          )
        }}
      />
    </Box>
  );
};

export default SearchBar;
