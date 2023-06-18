# FLOPPA WEB - Projet PS6
## Statut lors de la livraison :

- Étape 1 : Done
- Étape 2 : Done
- Étape 3 : Commencé mais pas fini
- Étape 4 : Pas commencé

## Healthchecks utilisées dans chaque service :

Les healthchecks utilisés sont situés dans les services back-end et front-end dans le docker-compose.yml.
Ils servent à vérifier si le back-end et le front-end répondent toujours en appelant la commande curl.

Pour le healthcheck du back-end, on appelle la commande :  
&ensp;&ensp;&ensp;&ensp;```"curl -f http://localhost:9428/api/status | grep 'ok' || exit 1"```  
    on utilise ici l'url http://localhost:9428/api/status car on appelle le healthcheck depuis l'interieur du service.
    api/status renvoie "ok" si tout va bien dans le conteneur.

De même pour le healthcheck du front-end :  
&ensp;&ensp;&ensp;&ensp;```"curl -f http://localhost:4200 || exit 1"```  
    on utilise l'url http://localhost:4200 pour la même raison que pour le back-end.
    Cette commande vérifie que le lien du front-end fonctionne bien.

## Les utilisateurs dans les services :

Pour le back-end comme pour le front-end, l'utilisateur est celui indiqué dans le Dockerfile.  
Pour le service du back-end, l'utilisateur est donc node.   
Pour le service du front-end, il s'agit de nginx.

## Une explication sur les services accessibles et les urls/ports :

- Back-end : on accède au back-end avec le domaine localhost et le port 8000
- Front-end : on accède au front-end avec le domaine localhost également et le port 8080.

En effet les ports 8000 et 8080 sont les ports auxquels nous avons accès depuis l'extérieur des conteneurs. A l'intérieur des conteneurs, les ports sont 9428 pour le back-end et 4200 pour le front-end mais nous n'avons donc pas accès à ces ports depuis l'extérieur des conteneurs.

## Lancements des dockers :

- docker-compose : lancer le run.sh qui contient la commande pour lancer le compose.

- tests : modifier la valeur environment dans front-end/src/environments car le docker ne fonctionne pas.  
Les tests utilisent les ports 4200 pour le front-end et 9428 pour le back-end. Il faut donc que l'url de l'environment soit :  
&ensp;&ensp;&ensp;&ensp;```"http://localhost:9428/api"```  
Il faut également lancer le front-end avec la commande : ```npm run start``` et le back-end avec la commande : ```npm run dev```.  
Enfin, il faut lancer la commande : ```npm run test:e2e``` pour faire tourner les tests