const countBy = <TValue extends string>(
  values: TValue[],
  categories: TValue[],
) => categories.map(category => {
  const value = values.filter(value => value === category).length;

  return {
    label: category,
    value,
  };
});

export default countBy;
