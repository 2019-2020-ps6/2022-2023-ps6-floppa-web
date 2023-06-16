Statut lors de la livraison:

Étape 1 : Fait
Étape 2 : Presque fait
Étape 3 : Pas fait
Étape 4 : Pas fait

Healthchecks:

Les healthchecks utilisés sont situés dans les services back-end et front-end dans le docker-compose.yml.
Ils servent à vérifier si le back-end et le front-end répondent toujours en appelant la requète : api/status qui renvoie "ok" si tout va bien.
Pour le healthcheck du back-end, on appelle la commande :
    "curl -f http://localhost:9428/api/status | grep 'ok' || exit 1"
    on utilise ici l'url http://localhost:9428/api/status car on appelle le healthcheck depuis l'interieur du service.
De même pour le healthcheck du front-end :
    "curl -f http://localhost:4200/api/status | grep 'ok' || exit 1"
    on utilise l'url http://localhost:4200/api/status pour la même raison.

Les utilisateurs:

Pour le service du back-end, l'utilisateur est node, comme indiqué dans le Dockerfile.
Pour le service du frot-end, 