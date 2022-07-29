import {
  ARTICLES_UPDATE_REQUEST,
  ARTICLES_UPDATE_SUCCESS,
  ARTICLES_UPDATE_FAIL,
  ARTICLES_CREATE_FAIL,
  ARTICLES_CREATE_REQUEST,
  ARTICLES_CREATE_SUCCESS,
  ARTICLES_DELETE_FAIL,
  ARTICLES_DELETE_REQUEST,
  ARTICLES_DELETE_SUCCESS,
  ARTICLES_LIST_FAIL,
  ARTICLES_LIST_REQUEST,
  ARTICLES_LIST_SUCCESS,
} from "../constants/articlesConstants";

export const articleListReducer = (state = { articles: [] }, action) => {
  switch (action.type) {
    case ARTICLES_LIST_REQUEST:
      return { loading: true };
    case ARTICLES_LIST_SUCCESS:
      return { loading: false, articles: action.payload };
    case ARTICLES_LIST_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const articleCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ARTICLES_CREATE_REQUEST:
      return { loading: true };
    case ARTICLES_CREATE_SUCCESS:
      return { loading: false, success: true };
    case ARTICLES_CREATE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const articleDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case ARTICLES_DELETE_REQUEST:
      return { loading: true };
    case ARTICLES_DELETE_SUCCESS:
      return { loading: false, success: true };
    case ARTICLES_DELETE_FAIL:
      return { loading: false, error: action.payload, success: false };

    default:
      return state;
  }
};

export const articleUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case ARTICLES_UPDATE_REQUEST:
      return { loading: true };
    case ARTICLES_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case ARTICLES_UPDATE_FAIL:
      return { loading: false, error: action.payload, success: false };

    default:
      return state;
  }
};
