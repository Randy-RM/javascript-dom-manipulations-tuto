# Fetch JS Demo — Skeletons + Tailwind

Page statique demo qui fait un fetch vers `https://jsonplaceholder.typicode.com/posts`, affiche des skeletons pendant le chargement puis remplace par des cards.

Fichiers:
- `index.html` — page principale (utilise Tailwind via CDN)
- `script.js` — logique fetch, skeletons, rendu

Essayer:
Ouvrez `index.html` dans un navigateur. Pour un serveur local simple (recommandé), utilisez Python: 

```powershell
# depuis le dossier du projet
python -m http.server 8000
# puis ouvrez http://localhost:8000
```

Remarques:
- Design minimal avec Tailwind CDN pour prototype.
- Le demo charge les 9 premiers posts et les affiche en cards.
