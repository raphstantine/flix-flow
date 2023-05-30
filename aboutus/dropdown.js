document.addEventListener('DOMContentLoaded', function () {
  // Ambil elemen dropdown
  const dropdown = document.getElementById('genreDropdown');
  
  // Tambahkan event listener untuk klik pada dropdown
  dropdown.addEventListener('click', function () {
    // Toggle class 'open' pada elemen dropdown
    dropdown.classList.toggle('open');
  });

  // Ambil semua item dropdown
  const dropdownItems = document.querySelectorAll('#genreDropdown .dropdown-item');

  // Tambahkan event listener untuk klik pada setiap item dropdown
  dropdownItems.forEach(function (item) {
    item.addEventListener('click', function () {
      // Ambil teks dari item yang diklik
      const genre = item.textContent.trim();

      // Set nilai genre ke elemen dengan id 'selectedGenre'
      document.getElementById('selectedGenre').textContent = genre;
    });
  });
});
