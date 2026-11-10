// js/contact.js
// Gestion du formulaire de contact + sauvegarde dans localStorage

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  const okMsg = document.getElementById('ok');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Récupération des champs
    const nom     = document.getElementById('cNom').value.trim();
    const email   = document.getElementById('cEmail').value.trim();
    const message = document.getElementById('cMsg').value.trim();

    // Validation JS
    if (nom.length < 3) {
      alert("Le nom doit contenir au moins 3 caractères.");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Email invalide.");
      return;
    }
    if (message.length < 10) {
      alert("Le message doit contenir au moins 10 caractères.");
      return;
    }

    // Création de l'objet
    const nouveauMessage = {
      id: Date.now(),
      nom: nom,
      email: email,
      message: message,
      date: new Date().toLocaleString('fr-FR')
    };

    // Sauvegarde localStorage
    const liste = JSON.parse(localStorage.getItem('messages') || '[]');
    liste.push(nouveauMessage);
    localStorage.setItem('messages', JSON.stringify(liste));

    // Feedback utilisateur
    okMsg.classList.remove('d-none');
    setTimeout(() => okMsg.classList.add('d-none'), 4000);

    form.reset();
  });
});