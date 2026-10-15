# Site M-Tech — Bureautique à Foumban, Kounga

Site vitrine d'une seule page. Pas d'installation, pas de serveur :
**double-cliquez sur `index.html`** pour l'ouvrir dans votre navigateur.

## Changer le numéro, l'email, l'adresse ou les horaires

Ouvrez `js/main.js` et modifiez le bloc `CONFIG` tout en haut :

```js
whatsapp: "2376XXXXXXXX",        // 237 + numéro, sans + ni espaces
telephone: "+237 6XX XX XX XX",  // tel qu'il s'affiche
email: "contact@m-tech.cm",
adresse: "Kounga, Foumban — Région de l'Ouest, Cameroun",
horaires: "Lundi – Samedi : 7h30 – 19h00 · Dimanche : fermé",
```

Enregistrez, rechargez la page : le changement apparaît partout (boutons
WhatsApp, contact, pied de page).

## Changer les prix

Dans `index.html`, cherchez la section `TARIFS` (repérée par un commentaire
`TODO Moustafa`) et remplacez les montants.

## Remplacer le logo

1. Enregistrez le vrai logo sous le nom **`assets/img/logo.svg`**, en écrasant
   l'ancien.
   - Si le logo est en PNG ou JPG : déposez-le dans `assets/img/` (par ex.
     `logo.png`, idéalement carré, au moins 256 × 256 px), puis dans
     `index.html` remplacez les deux `logo.svg` par `logo.png`.
2. Pour harmoniser les couleurs du site avec le logo, ouvrez `css/style.css`
   et changez ces trois lignes au début du fichier :

```css
--brand: #1366d6;       /* couleur principale */
--brand-dark: #0d4ba3;  /* même couleur, plus foncée */
--accent: #f5a524;      /* couleur secondaire */
```

## Ajuster le point sur la carte

La carte est centrée sur Foumban. Pour placer le point exactement sur la
boutique, ouvrez [openstreetmap.org](https://www.openstreetmap.org), trouvez
la boutique, clic droit → « Afficher l'adresse » pour obtenir latitude et
longitude, puis remplacez `5.7265` et `10.8998` dans `index.html` (iframe de la
carte) et dans `js/main.js` (bloc `geo`).

## Mettre le site en ligne gratuitement

La voie la plus simple : [app.netlify.com/drop](https://app.netlify.com/drop).
Glissez-déposez le dossier `bureautique-vitrine` entier sur la page : le site
est en ligne en quelques secondes, avec une adresse que vous pourrez partager.

## Contenu du dossier

```
index.html          la page
css/style.css       l'apparence (couleurs, mise en page)
js/main.js          coordonnées + fonctionnement (menu, thème, WhatsApp)
assets/img/         logo et icône d'onglet
```
