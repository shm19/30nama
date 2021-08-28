/* eslint-disable */

// const searchBtn = document.querySelector('#search-form button');
const searchInput = $('#search-form input');

const searchBtn = $('#search-form button');

$(searchBtn).on('click', () => {
  console.log($(searchInput).val());
  const searchParams = new URLSearchParams(window.location.search);
  searchParams.set('movieSlug', searchInput.val());
  window.location.assign(`/home?${searchParams.toString()}`);
});
