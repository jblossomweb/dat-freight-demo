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
  debounceMs = 500,
  width = '100%',
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [hidePlaceholder, setHidePlaceholder] = useState(false);

  const clearSearch = () => {
    setSearchTerm('');
    onSearchChange('');
  };

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
      placeholder={hidePlaceholder ? '' : placeholder}
      value={searchTerm}
      onFocus={() => {
        setHidePlaceholder(true);
      }}
      onBlur={() => {
        setHidePlaceholder(false);
      }}
      onChange={(e) => {
        setSearchTerm(e.target.value);
      }}
      onKeyDown={({ key }) => {
        if (key === 'Escape') {
          clearSearch();
        }
      }}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ fontSize: 20 }} />
            </InputAdornment>
          ),
          endAdornment: searchTerm !== '' ? (
            <InputAdornment position="end">
              <IconButton
                aria-label="clear search"
                onClick={clearSearch}
                edge="end"
              >
                <ClearIcon sx={{ fontSize: 20 }} />
              </IconButton>
            </InputAdornment>
          ) : null,
        },
        htmlInput: {
          // 'aria-label':  ariaLabel,
          // 'aria-keyshortcuts': 'Escape',
          // 'aria-description': 'Escape to clear search',
          'aria-label': `${ariaLabel}. Press Escape to clear search.`,
          // non-standard: attempt to avoid duplicate screen read if placeholder matches
          // 'aria-placeholder': placeholder.includes(ariaLabel) ? '' : placeholder,
        },
      }}
      sx={{
        width: { xs: '100%', md: width },
      }}
    />
  );
};

export default SearchInput;
