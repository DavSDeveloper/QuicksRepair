document.addEventListener('DOMContentLoaded', function() {
  const navLinks = document.querySelectorAll('header nav ul li a');
  const navCheck = document.getElementById('nav_check');
  const hamburger = document.querySelector('.hamburger');
  const sections = document.querySelectorAll('section');

  function changeActiveLink() {
    let top = window.scrollY;

    sections.forEach(sec => {
      let offset = sec.offsetTop - 70;
      let height = sec.offsetHeight;
      let id = sec.getAttribute('id');

      if (top >= offset && top < offset + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          document.querySelector(`header nav ul li a[href*=${id}]`).classList.add('active');
        });
      }
    });
  }

  window.addEventListener('scroll', changeActiveLink);
  window.addEventListener('load', changeActiveLink);

  hamburger.addEventListener('click', function() {
    hamburger.classList.toggle('active');
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navCheck.checked = false;
      hamburger.classList.remove('active');
    });
  });

  const form = document.querySelector('form');
  const submitButton = document.getElementById('enviar');

  form.addEventListener('submit', function(event) {
    event.preventDefault();

    submitButton.textContent = 'Enviando';
    submitButton.style.backgroundColor = '#717171';
    submitButton.style.color = '#f2f2f2';
    submitButton.disabled = true;

    fetch(form.action, {
      method: 'POST',
      body: new FormData(form)
    }).then(response => {
      if (response.ok) {
        submitButton.textContent = 'Enviado';
        submitButton.style.backgroundColor = '#1A9244';
        submitButton.style.color = '#f2f2f2';
        submitButton.style.cursor = 'none';
        submitButton.disabled = true;
      } else {
        alert('Hubo un problema al enviar el formulario. Inténtalo de nuevo.');
        submitButton.textContent = 'Enviar';
        submitButton.style.backgroundColor = '';
        submitButton.style.color = '';
        submitButton.disabled = false;
      }
    }).catch(error => {
      console.error('Error:', error);
      alert('Hubo un problema al enviar el formulario. Inténtalo de nuevo.');
      submitButton.textContent = 'Enviar';
      submitButton.style.backgroundColor = '';
      submitButton.style.color = '';
      submitButton.disabled = false;
    });
  });
});
