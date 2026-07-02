# CosmoGénèse — Version Application Mobile (Android)

Ce dossier contient une **PWA (Progressive Web App)** : ton site transformé en
véritable application installable sur Android (icône sur l'écran d'accueil,
plein écran sans barre de navigateur, fonctionne hors-ligne une fois ouverte
une première fois).

## Contenu du dossier
- `index.html` — l'application (identique à ta version, + branchement PWA)
- `manifest.webmanifest` — nom, icônes, couleurs de l'app
- `sw.js` — service worker (mise en cache pour le mode hors-ligne)
- `icon-192.png`, `icon-512.png`, `icon-512-maskable.png` — icônes de l'app

## ⚠️ Point important
Un simple fichier HTML ouvert en local (`file://...`) **ne peut pas** être
installé comme application par Android/Chrome : il faut que les fichiers
soient servis via **HTTPS** (les service workers l'exigent). Tu as deux
façons d'obtenir une vraie appli à partir de ce dossier :

---

## Option A — App installable via navigateur (le plus simple, gratuit)

1. Héberge ce dossier tel quel sur un service gratuit, par ex. :
   - **GitHub Pages** (glisser le dossier dans un repo, activer Pages)
   - **Netlify Drop** → https://app.netlify.com/drop (glisser-déposer le dossier, ça donne une URL en quelques secondes)
   - **Vercel**, **Cloudflare Pages**, etc.
2. Ouvre l'URL obtenue avec **Chrome sur Android**.
3. Un menu **"Ajouter à l'écran d'accueil" / "Installer l'application"**
   apparaît (ou via le menu ⋮ en haut à droite → "Installer l'application").
4. L'icône CosmoGénèse apparaît sur le téléphone, s'ouvre en plein écran,
   sans barre d'adresse, comme une vraie appli — et fonctionne hors-ligne
   après la première ouverture.

C'est la solution la plus rapide et elle ne nécessite aucune compétence
technique particulière.

---

## Option B — Fichier .apk installable (à générer toi-même)

Pour obtenir un vrai fichier `.apk` à partager ou sideload, la manière la
plus simple sans installer Android Studio est d'utiliser **PWABuilder**
(outil gratuit de Microsoft) :

1. Héberge d'abord le dossier en HTTPS comme dans l'Option A (PWABuilder a
   besoin d'une URL publique).
2. Va sur **https://www.pwabuilder.com**
3. Colle l'URL de ton site, clique sur "Start".
4. PWABuilder détecte le `manifest.webmanifest` et propose un score.
5. Choisis **Android** dans les packages proposés, puis **"Generate Package"**.
6. Télécharge le `.apk` (ou `.aab` pour le Play Store) généré.
7. Transfère le `.apk` sur un téléphone Android et installe-le (il faudra
   peut-être autoriser "Sources inconnues" dans les réglages de sécurité).

Cette méthode ne nécessite ni Android Studio, ni compte développeur, et
donne un vrai fichier `.apk` téléchargeable et installable.

---

## Option C — Build natif complet (Android Studio / Capacitor)

Si tu veux publier sur le **Google Play Store**, la voie recommandée est
**Capacitor** (par l'équipe Ionic) :

```bash
npm install @capacitor/core @capacitor/cli
npx cap init CosmoGenese com.tondomaine.cosmogenese
# copie index.html, manifest, sw.js, icônes dans le dossier "www/"
npx cap add android
npx cap open android
```

Cela ouvre le projet dans **Android Studio**, où tu peux compiler un `.apk`
signé, tester sur émulateur, et publier sur le Play Store. Cette option
demande d'installer Node.js et Android Studio sur ton ordinateur.

---

**Résumé rapide** : si tu veux juste une icône sur ton téléphone → **Option A**.
Si tu veux un fichier `.apk` à distribuer → **Option B**. Si tu veux publier
sur le Play Store → **Option C**.
