document.addEventListener('DOMContentLoaded', function() {
    let element = document.querySelector('.fade-in');
    setTimeout(function() {
      element.classList.add('fade-in-active');
    }, 500); // 500ms задержка для запуска анимации
  });
