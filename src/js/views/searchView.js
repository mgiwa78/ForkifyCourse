class SearchView {
  #parentEl = document.querySelector(".search");

  getQuary() {
    const quary = this.#parentEl.querySelector(".search__field").value;
    this.#clearInput();
    return quary;
  }
  #clearInput() {
    this.#parentEl.querySelector(".search__field").value = "";
  }
  addHandlerSearch(handler) {
    this.#parentEl.addEventListener("submit", function (e) {
      e.preventDefault();
      handler();
    });
  }
}
export default new SearchView();
