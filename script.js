// Vérifier si des actualités existent déjà
let actualites = JSON.parse(localStorage.getItem('actualites')) || [];

// Fonction pour afficher les actualités
function afficherActualites() {
    const container = document.getElementById('newsContainer');
    container.innerHTML = ''; // Réinitialiser le contenu
    actualites.forEach(actualite => {
        const div = document.createElement('div');
        div.className = 'newsItem';
        div.innerHTML = `
            <h3>${actualite.titre}</h3>
            <p>${actualite.description}</p>
            ${actualite.image_url ? `<img src="${actualite.image_url}" alt="Image" style="width:100%;">` : ''}
            <small>Publié le : ${actualite.date}</small>
        `;
        container.appendChild(div);
    });
}

// Fonction pour ajouter une actualité
document.getElementById('publicationForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Récupérer les données du formulaire
    const titre = document.getElementById('titre').value;
    const description = document.getElementById('description').value;
    const image_url = document.getElementById('image_url').value;

    // Créer une nouvelle actualité
    const nouvelleActualite = {
        titre,
        description,
        image_url,
        date: new Date().toLocaleString()
    };

    // Ajouter dans le tableau et sauvegarder dans LocalStorage
    actualites.push(nouvelleActualite);
    localStorage.setItem('actualites', JSON.stringify(actualites));

    // Réinitialiser le formulaire et actualiser l'affichage
    this.reset();
    afficherActualites();
});

// Afficher les actualités au chargement
afficherActualites();