const searchInput = document.getElementById("search_input");

searchInput.addEventListener("keyup", function (event) {
  if (event.key == "Enter") {
    const searchQuery = searchInput.value;
    const url = `../search/displaymov.html?search=${encodeURIComponent(
      searchQuery
    )}`;
    window.location.href = url;
  }
});
