const setFilters = (filters) => {
  return {
    type: 'SET_FILTERS',
    payload: filters
  };
};

export {
  setFilters
};