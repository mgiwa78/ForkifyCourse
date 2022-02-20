import * as model from "./module.js";
import { MODAL_CLOSE_SEC } from "./config.js";
import recipeView from "./views/recipeView.js";
import searchView from "./views/searchView.js";
import searchResultView from "./views/searchResultView.js";
import bookMarksView from "./views/bookMarksView.js";
import addRecipeView from "./views/addRecipeView.js";

import { async } from "regenerator-runtime";
import "core-js/stable";
import "regenerator-runtime/runtime";
import paginationViews from "./views/paginationViews.js";

// if (module.hot) {
//   module.hot.accept();
// }

const controlRecipies = async function () {
  //--1)--Loading Recipe
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;
    searchResultView.update(model.getSearchResultsPage());

    recipeView.renderSpinner();

    await model.loadRecipe(id);

    //--2)-- Rendering The Recipe
    bookMarksView.update(model.state.bookmarks);

    recipeView.render(model.state.recipe);
  } catch (err) {
    alert(err);
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    searchResultView.renderSpinner();
    //1) get quary
    const quary = searchView.getQuary();
    if (!quary) return;

    //2)laod result
    await model.loadSearchResults(quary);

    //3)render result and pagination
    searchResultView.render(model.getSearchResultsPage(2));

    //4)initial pagination
    paginationViews.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const controlPagination = function (goToPage) {
  searchResultView.render(model.getSearchResultsPage(goToPage));

  //4)initial pagination
  paginationViews.render(model.state.search);
};

const controlServings = function (newServings) {
  try {
    //Update recipe servings (in state)
    model.updateServings(newServings);
    //Update recipe view
    // recipeView.render(model.state.recipe);
    recipeView.update(model.state.recipe);
  } catch (err) {
    console.log(err);
  }
};

const controlAddBookmark = function () {
  //add or remove bookmarks
  if (model.state.recipe.bookmarked) {
    model.deleteBookmark(model.state.recipe.id);
  } else {
    model.addBookmark(model.state.recipe);
  }
  //update view
  recipeView.update(model.state.recipe);
  //render bookmarks
  bookMarksView.render(model.state.bookmarks);
};

const controlAddRecipie = async function (newRecipe) {
  try {
    addRecipeView.renderSpinner();

    await model.uploadRecipe(newRecipe);
    console.log(model.state.recipe);

    recipeView.render(model.state.recipe);

    addRecipeView.renderMessage();

    bookMarksView.render(model.state.bookmarks);

    window.history.pushState(null, "", `#${model.state.recipe.id}`);

    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (error) {
    console.error("LOL", error);
    addRecipeView.renderError(error.message);
  }
};

const init = function () {
  recipeView.addHandlerRender(controlRecipies);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationViews.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipie);
};

init();
