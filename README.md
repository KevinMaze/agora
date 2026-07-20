# Agora — Le Café Littéraire

Agora est une application web communautaire dédiée à un café littéraire. Elle permet aux membres de découvrir la bibliothèque du café, de laisser des avis sur les livres, de consulter les événements et concerts à venir, d'explorer la carte du coffee shop, et de commander des box de livres en click & collect.

---

## Concept

Agora est la vitrine numérique d'un café-librairie : un lieu où la culture du livre rencontre l'art du café. L'application s'articule autour de plusieurs espaces :

- **Bibliothèque** : catalogue de tous les livres disponibles au café, avec fiches détaillées, notes des lecteurs et sélection "coups de cœur"
- **Coffee Shop** : carte des boissons, recettes et moments du café (ingrédients, allergènes, prix)
- **Librairie / Collect** : achat de box de livres thématiques en click & collect
- **Gazette** : agenda des concerts, expositions et événements culturels, galerie photo
- **À propos** : présentation du lieu, carte interactive et formulaire de contact

Les membres inscrits peuvent laisser des avis sur les livres. Les avis passent par une modération admin avant d'être publiés. Un espace personnel (`/mon_espace`) permet aux utilisateurs de gérer leur profil, et aux administrateurs de gérer tout le contenu de la plateforme.

---

## Stack technique

| Technologie | Rôle |
|-------------|------|
| [Next.js 15](https://nextjs.org/) (Pages Router, export statique) | Framework React, routing, SSG |
| [React 19](https://react.dev/) | UI |
| [TypeScript 5](https://www.typescriptlang.org/) | Typage strict |
| [Tailwind CSS v4](https://tailwindcss.com/) | Styles utilitaires |
| [Firebase Auth](https://firebase.google.com/docs/auth) | Authentification email/mot de passe |
| [Cloud Firestore](https://firebase.google.com/docs/firestore) | Base de données NoSQL temps réel |
| [Firebase Storage](https://firebase.google.com/docs/storage) | Stockage des images |
| [React Hook Form](https://react-hook-form.com/) | Gestion des formulaires |
| [Framer Motion](https://www.framer.com/motion/) | Animations |
| [React Toastify](https://fkhadra.github.io/react-toastify/) | Notifications |
| [react-icons](https://react-icons.github.io/react-icons/) | Icônes |

---

## Architecture du projet

```
src/
├── api/             # Couche d'accès aux données (Firebase)
├── config/          # Configuration Firebase + messages d'erreur localisés
├── context/         # Contexte global d'authentification (AuthUserContext)
├── hooks/           # Hooks personnalisés (useFirebaseAuth, useToggle)
├── lib/             # Constantes et utilitaires (rôles, types de liens, session)
├── pages/           # Routes Next.js (Pages Router)
├── styles/          # CSS global + variables de thème
├── types/           # Interfaces TypeScript
├── ui/
│   ├── components/  # Composants applicatifs (layout, navbar, session, footer…)
│   ├── design-system/ # Composants UI réutilisables (Button, Card, Modal, Avatar…)
│   └── modules/     # Modules page (pattern Container/View)
└── utils/           # Fonctions utilitaires (traduction des erreurs Firebase)
```

### Pattern Container/View

Chaque page complexe est découpée en deux couches :
- **Container** : récupère les données, gère l'état local et la logique métier
- **View** : composant purement présentationnel, reçoit tout via les props

---

## Base de données Firestore

| Collection | Description |
|------------|-------------|
| `users` | Profils utilisateurs (rôle, avatar, onboarding, réseaux sociaux) |
| `books` | Catalogue de livres (titre, auteur, catégorie, couverture, coups de cœur) |
| `bookReviews` | Avis lecteurs avec modération (pending / approved / rejected) |
| `boxes` | Box de livres disponibles à la commande |
| `recipes` | Recettes de boissons du coffee shop |
| `moments` | Moments/plats du café (ingrédients, allergènes, prix) |
| `concerts` | Concerts à venir |
| `evenements` | Événements culturels |
| `gallery` | Photos de la galerie de la gazette |

---

## Rôles et accès

| Rôle | Accès |
|------|-------|
| `guest` | Pages publiques uniquement (bibliothèque, coffee shop, gazette…) |
| `registered` | + Espace personnel, ajout d'avis sur les livres |
| `admin` | + Gestion complète du contenu (livres, box, concerts, événements, recettes, utilisateurs, modération des avis) |

Le rôle est stocké dans le document Firestore de l'utilisateur. La session est gérée côté client via Firebase Auth et un contexte React global.

---

## Routes

### Pages publiques
| Route | Description |
|-------|-------------|
| `/` | Page d'accueil |
| `/bibliotheque` | Catalogue de livres |
| `/coffeeShop` | Carte du café |
| `/librairie` | Box de livres |
| `/collect` | Click & Collect |
| `/gazette` | Agenda et galerie |
| `/apropos` | À propos et contact |

### Authentification (visiteurs uniquement)
| Route | Description |
|-------|-------------|
| `/connexion` | Connexion |
| `/connexion/inscription` | Inscription |
| `/connexion/mot-de-passe-perdu` | Réinitialisation du mot de passe |

### Espace membres
| Route | Description |
|-------|-------------|
| `/onboarding` | Configuration du profil à la première connexion |
| `/mon_espace` | Dashboard personnel |
| `/mon_espace/add-avis` | Ajouter un avis sur un livre |

### Espace admin
| Route | Description |
|-------|-------------|
| `/mon_espace/add-book` | Ajouter / gérer les livres |
| `/mon_espace/add-box` | Ajouter / gérer les box |
| `/mon_espace/add-concert` | Ajouter / gérer les concerts |
| `/mon_espace/add-evenements` | Ajouter / gérer les événements |
| `/mon_espace/add-moment` | Ajouter / gérer les moments du café |
| `/mon_espace/add-recipe` | Ajouter / gérer les recettes |
| `/mon_espace/add-users` | Gérer les utilisateurs |
| `/mon_espace/users` | Liste des utilisateurs |

---

## Installation

### Prérequis
- Node.js 18+
- Un projet Firebase (Auth, Firestore, Storage activés)

### Variables d'environnement

Copier `.env.example` en `.env.local` et renseigner les variables :

```env
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=
```

### Démarrage

```bash
npm install
npm run dev       # Développement (Turbopack)
npm run build     # Build statique
npm run start     # Serveur de prévisualisation
```

---

## Design system

Le design system est accessible à la route `/design-system` en développement. Il regroupe tous les composants réutilisables de l'application :

- **Button** — bouton avec animations de texte lettre par lettre, états loading/disabled, support des icônes et des liens
- **Card** — carte livre avec révélation du panneau au survol / touch
- **Modal** — fenêtre modale animée avec gestion ESC et overlay
- **ModalAvis** — formulaire d'avis livre (création ou modification)
- **Avatar** — photo de profil ronde avec état de chargement
- **Spinner** — indicateur de chargement SVG
- **StarRating** — notation en étoiles (lecture seule ou interactive)
- **Typo** — composant typographique centralisé (titres serif, texte courant)
- **Input / Textarea** — champs de formulaire intégrés React Hook Form

### Couleurs du thème

| Variable | Couleur | Usage |
|----------|---------|-------|
| `primary` | `#E35336` (orange) | Couleur principale, accents |
| `secondary` | `#CC7722` (doré) | Couleur secondaire, survols |
| `tier` | `#008000` (vert) | Troisième niveau |
| `background` | `#353839` (gris foncé) | Fond de page |
| `foreground` | `#4a4a4a` (gris) | Éléments de surface |

### Polices

- **Cinzel Decorative** (serif) — titres, variante `title` du composant Typo
- **Montserrat** (sans-serif) — texte courant, variante `para`

- Idées de développement :
- qr code
- vote de lecteurs
- notification de nouvelles entrées
