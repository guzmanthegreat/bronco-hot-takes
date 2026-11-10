# bronco-hot-takes
A social campus platform where Cal Poly Pomona students anonymously share hot takes, vote, and discuss opinions about campus life.

# Contributors
- Josh Guzman
- Miranda Rendon
- Trung Tran
- Tiffany Dinh
- Danica Jacutin
- Eulalia Pedro Andres

# Running Locally
Requires Node 20.19+ (Node 22 recommended).

```sh
npm install
cp .env.example .env   # only needed once Firebase is wired up
npm run dev            # opens at http://localhost:5173
```

Every page is a placeholder for now, so you can click through the routes before the real pages are built:

| Route | Page |
|---|---|
| `/` | Feed (`Home.jsx`) |
| `/login`, `/signup` | Login, Signup |
| `/new` | Create post |
| `/post/:id` | Post detail |
| `/profile/:userId` | Profile |
| anything else | 404 |

# Task → File Map
Which files each task touches. All routes are already set up in `src/App.jsx`, so you shouldn't need to edit it.

| Task | Files to touch |
|---|---|
| Login page | `src/pages/Login.jsx` |
| Signup page | `src/pages/Signup.jsx` |
| Feed page | `src/pages/Home.jsx`, `src/utils/sampleData.js` |
| Post card | `src/components/PostCard.jsx`, `src/components/VoteButtons.jsx` |
| Create-post form | `src/pages/NewPost.jsx` |
| Post detail page | `src/pages/PostDetail.jsx` |
| Reply components | `src/components/ReplyForm.jsx`, `src/components/ReplyList.jsx`, `src/utils/sampleData.js` |
| Navbar user menu | `src/components/Navbar.jsx`, `src/context/AuthContext.jsx` |
| Profile page | `src/pages/Profile.jsx` |
| 404 and error boundary | `src/pages/NotFound.jsx`, `src/components/ErrorBoundary.jsx` |
