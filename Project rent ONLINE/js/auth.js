function register() {
  const u = { nom: rNom.value, email: rEmail.value, pwd: rPwd.value };
  if (!u.nom || !u.email || !u.pwd) return alert("Champs requis");
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  if (users.find(x => x.email === u.email)) return alert("Email déjà utilisé");
  users.push(u);
  localStorage.setItem('users', JSON.stringify(users));
  alert("✅ Inscription réussie");
  location.reload();
}

function login() {
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  const u = users.find(x => x.email === lEmail.value && x.pwd === lPwd.value);
  if (!u) return alert("Identifiants incorrects");
  sessionStorage.setItem('currentUser', JSON.stringify(u));
  alert("Bienvenue " + u.nom);
  window.location.href = 'index.html';
}

// Affichage navbar : bouton "Déconnexion" si connecté
window.addEventListener('DOMContentLoaded', () => {
  const user = JSON.parse(sessionStorage.getItem('currentUser') || 'null');
  const authLink = document.getElementById('authLink');
  if (user && authLink) {
    authLink.innerHTML = `<a class="nav-link text-warning" href="#" onclick="logout()">Déconnexion (${user.nom})</a>`;
  }
});

function logout() {
  sessionStorage.removeItem('currentUser');
  location.reload();
}