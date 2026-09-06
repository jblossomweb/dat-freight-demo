import React, { useState, useEffect } from 'react';

import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';

import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

interface SearchInputProps {
  onSearchChange: (value: string) => void;
  placeholder?: string;
  ariaLabel?: string;
  debounceMs?: number;
  width?: number | string;
}

const SearchInput: React.FC<SearchInputProps> = ({
  onSearchChange,
  placeholder = 'Search...',
  ariaLabel = 'Search',
  debounceMs = 250,
  width = '100%',
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const handler = setTimeout(() => {
      onSearchChange(searchTerm);
    }, debounceMs);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm, debounceMs, onSearchChange]);

  return (
    <TextField
      size="small"
      placeholder={placeholder}
      value={searchTerm}
      onChange={(e) => { setSearchTerm(e.target.value); }}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
            </InputAdornment>
          ),
          endAdornment: searchTerm !== '' ? (
            <InputAdornment position="end">
              <IconButton
                aria-label="clear search"
                onClick={() => {
                  setSearchTerm('');
                  onSearchChange('');
                }}
                edge="end"
              >
                <ClearIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
              </IconButton>
            </InputAdornment>
          ) : null,
          'aria-label': ariaLabel,
        },
      }}
      sx={{
        width: { xs: '100%', md: width },
      }}
    />
  );
};

export default SearchInput;
