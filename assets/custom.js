document.addEventListener('DOMContentLoaded', function () {
  const container = document.getElementById('pay-credit-element');

  if (container) {
    container.addEventListener('mouseenter', function () {
      const cardBack = container.querySelector('.card-back');
      cardBack.textContent = ''; // Puedes colocar la información que deseas mostrar en la parte posterior de la tarjeta aquí
    });
  }
});


