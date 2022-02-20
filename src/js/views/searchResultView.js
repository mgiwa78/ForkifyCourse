import View from "./View";
import previewView from "./previewView";
import icons from "url:../../img/icons.svg"; //----Parcel 2

class SearchResultView extends View {
  _parentElement = document.querySelector(".results");
  _errorMessage = "No recipes found for your quary! Please try again :(";
  _message = `Success message`;

  _generateMarkup() {
    return this._data
      .map((result) => previewView.render(result, false))
      .join("");
  }
}

export default new SearchResultView();
