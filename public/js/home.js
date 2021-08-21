/* eslint-disable */
const beforeButton = $('#be-btn')[0];
const afterButton = $('#af-btn')[0];

$(beforeButton).on('click', () => {
  const searchParams = new URLSearchParams(window.location.search);
  if (searchParams.get('page') > 1) {
    searchParams.set('page', searchParams.get('page') - 1);
    window.location.search = searchParams.toString();
  }
});

$(afterButton).on('click', () => {
  const searchParams = new URLSearchParams(window.location.search);
  if (searchParams.get('page') === null) {
    searchParams.set('page', 2);
  } else {
    searchParams.set('page', searchParams.get('page') * 1 + 1);
  }
  window.location.search = searchParams.toString();
});
