# Site de Gilles Jr. Dulude (avec catalogue de propriétés automatique)

Site complet (Accueil, À propos, Vendre, Acheter, Propriétés, Contact). La page Propriétés se remplit à partir de l'API de diffusion de données.
Elle se met à jour toute seule aux 3 heures.

## Pourquoi la clé reste secrète

La clé API n'est jamais dans la page. Elle est gardée dans les « secrets » GitHub.
Aux 3 heures, GitHub roule le script `scripts/build.mjs` sur ses serveurs : le script
interroge Centris avec la clé, puis produit une page HTML qui contient seulement les infos publiques
(prix, adresse, photos, description). Le visiteur reçoit cette page finale, sans aucune trace de la clé.

Aucun renseignement sur les propriétaires, acheteurs ou la rémunération n'est demandé à l'API ni publié.

## Mise en ligne (une seule fois, environ 15 minutes)

1. Créer un compte GitHub (gratuit) puis un nouveau dépôt **public** nommé par exemple `proprietes`.
   Le code est public, mais pas la clé ni aucune donnée privée.
2. Téléverser tout le contenu de ce dossier dans le dépôt (bouton « Add file » > « Upload files »).
   Le dossier caché `.github` doit être inclus.
3. Dans le dépôt : **Settings > Secrets and variables > Actions > New repository secret**
   - Nom : `CENTRIS_API_KEY`
   - Valeur : la clé Centris (celle qui commence par `cddk.`)
4. **Settings > Pages** : sous « Source », choisir **GitHub Actions**.
5. Onglet **Actions** > « Mise à jour des propriétés Centris » > **Run workflow**.
   Après 1 ou 2 minutes, la page est en ligne.
6. Domaine : chez le fournisseur du domaine gillesdulude.com, ajouter un enregistrement
   **CNAME** `proprietes` qui pointe vers `NOM-DU-COMPTE.github.io`.
   Puis dans **Settings > Pages**, entrer `nouveau.gillesdulude.com` et cocher « Enforce HTTPS ».

Pour l'intégrer au site principal (Ava/GoHighLevel ou autre) : soit un lien « Mes propriétés »
dans le menu, soit un bloc de code personnalisé :

```html
<iframe src="https://nouveau.gillesdulude.com" style="width:100%;height:1600px;border:0" title="Propriétés à vendre"></iframe>
```

## Réglages (fichier config.json)

- `courtier.telephone` : numéro affiché sur le bouton d'appel (vide = bouton caché)
- `filtres.statutsAffiches` : statuts publiés (par défaut : en vigueur et promesse d'achat acceptée)
- `filtres.memberKey` : à remplir seulement si la clé donne accès à d'autres inscriptions que celles de Gilles.
  Pour trouver ce numéro : `CENTRIS_API_KEY=... node scripts/build.mjs --trouver-courtier Dulude`

## Première exécution : à vérifier

Le script a été écrit à partir de la documentation de Centris, sans test direct contre le compte.
Au premier lancement, ouvrir le journal de l'étape « Générer la page » dans l'onglet Actions :
il affiche le nombre de fiches reçues, les statuts et les types. Si une erreur apparaît,
copier le message pour ajuster le script.

## Aperçu local avec données fictives

```
node sample/make-sample.cjs
node scripts/build.mjs --sample
```
puis ouvrir `dist/index.html`.

## Important : WordPress existant

Le domaine gillesdulude.com pointe vers un WordPress géré par une autre compagnie.
Ne PAS changer les enregistrements DNS du domaine principal (ni les MX du courriel Google Workspace).
Décision (30 oct. 2026) : on ne garde rien de l'ancien site, le nouveau site va directement sur gillesdulude.com.
Option de test : mettre d'abord "nouveau.gillesdulude.com" dans config.json.
  Chez le gestionnaire du domaine, ajouter : CNAME  nouveau  ->  NOM-DU-COMPTE.github.io
Étape 2 (final, quand le site est approuvé) : gillesdulude.com pointe vers ce site.
  1. Dans config.json, mettre "domainePersonnalise": "gillesdulude.com" puis relancer la mise à jour.
  2. Chez le gestionnaire du domaine, remplacer SEULEMENT les enregistrements A de gillesdulude.com par :
     185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153
     et mettre www en CNAME vers NOM-DU-COMPTE.github.io
  3. Ne jamais toucher aux enregistrements MX, TXT (SPF/DKIM) et autres liés au courriel Google Workspace.
  4. Avant de basculer : demander à la compagnie WordPress une sauvegarde complète du site actuel.

## Règles de l'Annexe II (entente Centris signée le 22-23 octobre 2026)

- Seulement les inscriptions en vigueur : aucune fiche vendue, expirée ou retirée (art. 2.3, pénalité 10 000 $/jour).
- Ne pas utiliser le nom ou le logo de la marque du fournisseur de données sur le site (art. 2.1 f).
- Les données sont affichées telles quelles (unités d'origine).
