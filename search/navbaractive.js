const currentPageUrl = window.location.href;
const navItems = document.querySelectorAll('.nav-item');

navItems.forEach((navItem) => {
  const navLink = navItem.querySelector('.nav-link');
  const href = navLink.getAttribute('href');

  if (currentPageUrl.includes(href)) {
    navItem.classList.add('active');
  } else {
    navItem.classList.remove('active');
  }
});
