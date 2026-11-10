const selVoiture = document.getElementById('voiture');
VOITURES.filter(v => v.disponible).forEach(v => {
  selVoiture.innerHTML += `<option value="${v.id}" data-prix="${v.prix}">${v.nom} — ${v.prix} DT/j</option>`;
});

// Pré-sélection via URL ?id=
const urlId = new URLSearchParams(location.search).get('id');
if (urlId) selVoiture.value = urlId;

const dateDebut = document.getElementById('dateDebut');
const dateFin = document.getElementById('dateFin');
const totalDiv = document.getElementById('total');

function calculTotal() {
  const prix = +selVoiture.selectedOptions[0].dataset.prix;
  if (!dateDebut.value || !dateFin.value) return;
  const d1 = new Date(dateDebut.value), d2 = new Date(dateFin.value);
  const jours = Math.ceil((d2 - d1) / (1000*60*60*24));
  if (jours > 0) totalDiv.textContent = `Total estimé : ${jours * prix} DT (${jours} jour(s))`;
  else totalDiv.textContent = "Dates invalides";
}

[selVoiture, dateDebut, dateFin].forEach(el => el.addEventListener('change', calculTotal));

document.getElementById('resForm').addEventListener('submit', e => {
  e.preventDefault();
  if (dateDebut.value >= dateFin.value) {
    alert("La date de fin doit être après la date de début.");
    return;
  }
  const reservation = {
    id: Date.now(),
    voitureId: +selVoiture.value,
    voiture: selVoiture.options[selVoiture.selectedIndex].text,
    nom: document.getElementById('nom').value,
    email: document.getElementById('email').value,
    tel: document.getElementById('tel').value,
    dateDebut: dateDebut.value,
    dateFin: dateFin.value,
    lieu: document.getElementById('lieu').value,
    total: totalDiv.textContent,
    dateCreation: new Date().toISOString()
  };
  const list = JSON.parse(localStorage.getItem('reservations') || '[]');
  list.push(reservation);
  localStorage.setItem('reservations', JSON.stringify(list));
  alert("✅ Réservation enregistrée !");
  e.target.reset();
  totalDiv.textContent = "Total estimé : —";
});