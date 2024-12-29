// Vérifier si des actualités existent déjà
let actualites = JSON.parse(localStorage.getItem('actualites')) || [];

// Fonction pour afficher les actualités
function afficherActualites() {
    const container = document.getElementById('newsContainer');
    container.innerHTML = ''; // Réinitialiser le contenu
    actualites.forEach((actualite, index) => {
        const div = document.createElement('div');
        div.className = 'newsItem';
        div.innerHTML = `
            <h3>${actualite.titre}</h3>
            <p>${actualite.description}</p>
            ${actualite.image_url ? `<img src="${actualite.image_url}" alt="Image" style="width:100%;">` : ''}
            <small>Publié le : ${actualite.date}</small>
            <button class="btn-supprimer" data-index="${index}">Supprimer</button>
        `;
        container.appendChild(div);
    });

    // Ajouter des écouteurs sur les boutons "Supprimer"
    document.querySelectorAll('.btn-supprimer').forEach(button => {
        button.addEventListener('click', function() {
            const index = this.getAttribute('data-index');
            supprimerActualite(index);
        });
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

// Fonction pour supprimer une actualité
function supprimerActualite(index) {
    // Supprimer l'élément du tableau
    actualites.splice(index, 1);

    // Mettre à jour LocalStorage
    localStorage.setItem('actualites', JSON.stringify(actualites));

    // Actualiser l'affichage
    afficherActualites();
}

// Afficher les actualités au chargement
afficherActualites();
