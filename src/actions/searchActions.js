
const enterSearch = search => {
  return {
    type: 'SET_ENTER_SEARCH',
    payload: Promise.resolve(search)
  };
};

const setDataSource = songs => {
  return {
    type: 'SET_DATA_SOURCE',
    payload: songs
  };
};

const setFilter = filter => {
  return {
    type: 'SET_FILTER',
    payload: filter
  };
};

const setSearchResults = (songs, search) => {
  return {
    type: 'SET_SEARCH_RESULTS',
    payload: {songs, search}
  };
};
const setSearchDefaults = () => {
  return {
    type: 'SET_SEARCH_DEFAULTS'
  };
};
export {
  enterSearch,
  setDataSource,
  setSearchResults,
  setSearchDefaults,
  setFilter
};
