import formatNumber from './formatNumber';

const getTableDataStatus = (
  displayedRowCount: number,
  totalRowCount: number,
  rowUnits: string,
) =>
  (
    `Showing ${
      formatNumber(displayedRowCount)
    } of ${
      formatNumber(totalRowCount)
    } total ${rowUnits}`
  );

export default getTableDataStatus;
