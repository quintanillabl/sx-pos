import * as socios from '../actions/socios.actions';

export interface State {
  ids: string[];
  loading: boolean;
  query: string;
}

const initialState: State = {
  ids: [],
  loading: false,
  query: '',
};

export function reducer(state = initialState, action: socios.Actions): State {
  switch (action.type) {
    // Start of search of socios
    case socios.SEARCH: {
      const query = action.payload;
      return Object.assign({}, state, {
        query,
        loading: true,
      });
    }
    // Search of socios completed
    case socios.SEARCH_COMPLETE: {
      const socios = action.payload;

      return {
        ids: socios.map(socio => socio.id),
        loading: false,
        query: state.query,
      };
    }

    default: {
      return state;
    }
  }
}

export const getIds = (state: State) => state.ids;

export const getQuery = (state: State) => state.query;

export const getLoading = (state: State) => state.loading;

