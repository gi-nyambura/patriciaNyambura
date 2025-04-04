const form = document.getElementById('contact-form');
form.addEventListener('submit', e => {
  e.preventDefault();
  const formData = new FormData(form);

  fetch('https://script.google.com/macros/s/AKfycbxsauo1EDR-8H6TGNPn6bGj-vJpQzTUZ6wTN1Ikr2KvWCZH_GsjOOXaIP4PmXOIh-fxgg/exec', {
    method: 'POST',
    body: formData
  })
  .then(res => res.json())
  .then(data => {
    if (data.result === 'success') {
      alert('Message sent!');
      form.reset();
    } else {
      alert('Error: ' + data.error);
    }
  })
  .catch(err => alert('Fetch failed: ' + err));
});
