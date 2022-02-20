import View from "./View";
import previewView from "./previewView";
import icons from "url:../../img/icons.svg"; //----Parcel 2

class BookmarksView extends View {
  _parentElement = document.querySelector(".bookmarks__list");
  _errorMessage = "No bookmarks yet.Find a nice recipe and bookmark it";
  _message = `Success message`;

  _generateMarkup() {
    console.log(this);

    return this._data
      .map((bookmark) => previewView.render(bookmark, false))
      .join("");
  }
}

export default new BookmarksView();
