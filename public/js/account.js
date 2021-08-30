/* eslint-disable */
const save = $('#save-btn');
const nameInput = $('#name-inp');
const emailInput = $('#email-inp');
const photo = document.getElementById('photo');

const savePass = $('#save-pass-btn');
const currentPassword = $('#curr-password');
const newPassword = $('#new-password');
const passwordConfirm = $('#conf-password');

save.on('click', () => {
  const form = new FormData();
  form.append('name', nameInput.val());
  form.append('email', emailInput.val());
  form.append('photo', photo.files[0]);
  $.ajax({
    url: '/api/v1/users/updateMe',
    method: 'PATCH',
    data: form,
    cache: false,
    contentType: false,
    processData: false,
    success: function(data) {
      alert('sucess');
    },
    error: function(jqXHR) {
      const err = JSON.parse(jqXHR.responseText);
      alert(`${err.err.statusCode} ${err.message}`);
    }
  }).done(() => {
    window.location.assign('/me');
  });
});

savePass.on('click', () => {
  $.ajax({
    url: `/api/v1/users/updateMyPassword`,
    method: 'PATCH',
    data: JSON.stringify({
      currentPassword: currentPassword.val(),
      password: newPassword.val(),
      passwordConfirm: passwordConfirm.val()
    }),
    contentType: 'application/json',
    dataType: 'json',
    success: function(data) {
      alert('sucess');
    },
    error: function(jqXHR) {
      const err = JSON.parse(jqXHR.responseText);
      alert(`${err.err.statusCode} ${err.message}`);
    }
  }).done(() => {
    window.location.assign('/me');
  });
});
