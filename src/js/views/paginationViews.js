import View from "./View";

import icons from "url:../../img/icons.svg"; //----Parcel 2

class PaginationView extends View {
  _parentElement = document.querySelector(".pagination");

  addHandlerClick(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn--inline");
      if (!btn) return;
      const goToPage = +btn.dataset.goto;

      handler(goToPage);
    });
  }

  _generateMarkup() {
    const numPages = Math.ceil(
      this._data.result.length / this._data.resultPerPage
    );
    const currentPage = this._data.page;

    // page 1 and there is other
    if (currentPage === 1 && numPages > 1) {
      return `<button data-goto="${
        currentPage + 1
      }" class="btn--inline pagination__btn--next">
                <span>Page ${currentPage + 1}</span>
                <svg class="search__icon">
                  <use href="src/img/icons.svg#icon-arrow-right"></use>
                </svg>
              </button>`;
    }
    //Last page
    if (currentPage === numPages && numPages > 1) {
      return `<button data-goto="${
        currentPage - 1
      }"  class="btn--inline pagination__btn--prev">
                <svg class="search__icon">
                  <use href="${icons}#icon-arrow-left"></use>
                </svg>
                <span>${currentPage - 1}</span>
              </button>`;
    }
    // inbetween pages
    if (currentPage < numPages) {
      return `<button data-goto="${
        currentPage - 1
      }"  class="btn--inline pagination__btn--prev">
                <svg class="search__icon">
                  <use href="${icons}#icon-arrow-left"></use>
                </svg>
                <span>${currentPage - 1}</span>
              </button>
              <button data-goto="${
                currentPage + 1
              }"  class="btn--inline pagination__btn--next">
                <span>Page ${currentPage + 1}</span>
                <svg class="search__icon">
                  <use href="${icons}#icon-arrow-right"></use>
                </svg>
              </button>`;
    }
    //only one page
    return;
  }
}

export default new PaginationView();
