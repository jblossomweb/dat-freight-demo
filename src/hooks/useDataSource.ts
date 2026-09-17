import type { DataSource } from '@/types/DataSource';

import { useLocation, useNavigate, useSearch } from '@tanstack/react-router';
import { useCallback, useEffect } from 'react';

import {
  getDataSource as getStoredDataSource,
  setDataSource as setStoredDataSource,
} from '@/services/dataSource';

const useDataSource = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryStringParams = useSearch({ strict: false });
  const storedDataSource = getStoredDataSource();

  const setUrlDataSource = useCallback((newDataSource: DataSource) => {
    void navigate({
      to: location.pathname,
      search: (prev) => ({
        ...prev,
        dataSource: newDataSource,
      }),
      replace: true,
    });
  }, [location.pathname, navigate]);

  useEffect(() => {
    // query string parameter takes precedence over stored data source
    setStoredDataSource(queryStringParams.dataSource ?? storedDataSource);
    if (!queryStringParams.dataSource) {
      setUrlDataSource(storedDataSource);
    }
  }, [queryStringParams.dataSource, storedDataSource, setUrlDataSource]);

  const setDataSource = (newDataSource: DataSource) => {
    // update both the stored and URL data sources
    setStoredDataSource(newDataSource);
    setUrlDataSource(newDataSource);
  };

  const dataSource = queryStringParams.dataSource ?? storedDataSource;

  return [dataSource, setDataSource] as const;
};

export default useDataSource;
