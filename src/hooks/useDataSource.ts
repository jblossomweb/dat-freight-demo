import type { DataSource } from '@/types/DataSource';

import { useState, useEffect } from 'react';
import * as dataSourceService from '@/services/dataSource';

const useDataSource = () => {
  const [dataSource, setDataSource] = useState<DataSource>(
    dataSourceService.getDataSource,
  );

  useEffect(() => {
    dataSourceService.setDataSource(dataSource);
  }, [dataSource]);

  return [dataSource, setDataSource] as const;
};

export default useDataSource;
