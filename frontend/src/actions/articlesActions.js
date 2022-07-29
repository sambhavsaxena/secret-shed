import {
  ARTICLES_CREATE_FAIL,
  ARTICLES_CREATE_REQUEST,
  ARTICLES_CREATE_SUCCESS,
  ARTICLES_DELETE_FAIL,
  ARTICLES_DELETE_REQUEST,
  ARTICLES_DELETE_SUCCESS,
  ARTICLES_LIST_FAIL,
  ARTICLES_LIST_REQUEST,
  ARTICLES_LIST_SUCCESS,
  ARTICLES_UPDATE_FAIL,
  ARTICLES_UPDATE_REQUEST,
  ARTICLES_UPDATE_SUCCESS,
} from "../constants/articlesConstants";
import axios from "axios";

export const listArticles = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: ARTICLES_LIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/articles`, config);

    dispatch({
      type: ARTICLES_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: ARTICLES_LIST_FAIL,
      payload: message,
    });
  }
};

export const createArticleAction = (title, content, category) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: ARTICLES_CREATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(
      `/api/articles/create`,
      { title, content, category },
      config
    );

    dispatch({
      type: ARTICLES_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: ARTICLES_CREATE_FAIL,
      payload: message,
    });
  }
};

export const deleteArticleAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ARTICLES_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.delete(`/api/articles/${id}`, config);

    dispatch({
      type: ARTICLES_DELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: ARTICLES_DELETE_FAIL,
      payload: message,
    });
  }
};

export const updateArticleAction = (id, title, content, category) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: ARTICLES_UPDATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `/api/articles/${id}`,
      { title, content, category },
      config
    );

    dispatch({
      type: ARTICLES_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: ARTICLES_UPDATE_FAIL,
      payload: message,
    });
  }
};
