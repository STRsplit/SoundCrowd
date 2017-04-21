const initialState = {
  songs: [],
  search: '',
  filter: 'track',
  dataSource: []
};

const searchReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'SET_ENTER_SEARCH_FULFILLED':
      state = {
        ...state,
        search: action.payload
      };
      break;
    case 'SET_FILTER':
      state = {
        ...state,
        filter: action.payload
    };
      break;
    case 'SET_SEARCH_DEFAULTS':
      state = {
        ...state,
        filter: 'track',
        search: '',
        songs: []
    };
      break;
    case 'SET_DATA_SOURCE':
      state = {
        ...state,
        dataSource: action.payload
    };
      break;
    case 'SET_SEARCH_RESULTS':
      state = {
        ...state,
        ...action.payload
    };
      break;
  }
  return state;
};

export default searchReducer;