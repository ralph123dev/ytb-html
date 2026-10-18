/* ==========================================================
   FORMULAIRE : SCRIPT (front-end uniquement)
   Vérifie les champs, puis affiche la pop-up de succès.
   Aucune donnée n'est encore envoyée à un serveur :
   le back-office sera ajouté plus tard.
   ========================================================== */

document.addEventListener('DOMContentLoaded', () => {

    const form = document.getElementById('monFormulaire');
    const modalElement = document.getElementById('modalSucces');

    // Les champs à vérifier
    const champs = ['nom', 'prenom', 'age', 'ville'];

    // Vérifie un champ et affiche le bon style (valide ou invalide)
    function verifierChamp(id) {
        const champ = document.getElementById(id);
        const valeur = champ.value.trim();
        let valide = valeur !== '';

        // Règle particulière pour l'âge : un nombre entre 1 et 120
        if (id === 'age') {
            const nombre = Number(valeur);
            valide = valeur !== '' && Number.isInteger(nombre) && nombre >= 1 && nombre <= 120;
        }

        champ.classList.toggle('is-valid', valide);
        champ.classList.toggle('is-invalid', !valide);
        return valide;
    }

    // Vérification en direct : dès qu'on quitte un champ
    champs.forEach(id => {
        const champ = document.getElementById(id);
        champ.addEventListener('blur', () => verifierChamp(id));

        // Pour que le message disparaisse dès que l'utilisateur corrige
        champ.addEventListener('input', () => {
            if (champ.classList.contains('is-invalid')) verifierChamp(id);
        });
    });

    // Envoi du formulaire (bouton Suivant)
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        // On vérifie tous les champs, sans s'arrêter au premier
        const tousValides = champs.map(verifierChamp).every(Boolean);

        if (!tousValides) {
            // On place le curseur sur le premier champ incorrect
            const premierErreur = champs.find(id => document.getElementById(id).classList.contains('is-invalid'));
            document.getElementById(premierErreur).focus();
            return;
        }

        // Tout est correct : on affiche la pop-up de succès
        const modal = new bootstrap.Modal(modalElement);
        modal.show();

        // On vide le formulaire une fois la pop-up fermée
        modalElement.addEventListener('hidden.bs.modal', () => {
            form.reset();
            champs.forEach(id => {
                document.getElementById(id).classList.remove('is-valid', 'is-invalid');
            });
        }, { once: true });
    });
});