/* eslint-disable */
$('form.box').on('submit', e => e.preventDefault());

const loginBtn = $('#login-btn')[0];
const username = $('#username')[0];
const password = $('#password')[0];

$(loginBtn).on('click', function() {
  console.log(username.value);
  console.log(password.value);

  $.ajax({
    method: 'POST',
    data: JSON.stringify({ email: username.value, password: password.value }),
    contentType: 'application/json; charset=utf-8',
    dataType: 'json',
    url: '/api/v1/users/login'
  })
    .done(function(response) {
      console.log(response);
      window.setTimeout(() => {
        location.assign('/');
      }, 1000);
    })
    .fail(function(jqXHR, textStatus, errorTh) {
      console.log(jqXHR);
    });
});
