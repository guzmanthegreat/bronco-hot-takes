# bronco-hot-takes
A social campus platform where Cal Poly Pomona students anonymously share hot takes, vote, and discuss opinions about campus life.

## Table of Contents

- [Contributors](#contributors)
- [Running Locally](#running-locally)
- [Team Development Workflow](#team-development-workflow)
  - [Before You Start](#before-you-start)
  - [While You Work](#while-you-work)
  - [Before Opening a Pull Request](#before-opening-a-pull-request)
  - [Review and Completion](#review-and-completion)
  - [What Depends on What](#what-depends-on-what)
- [Task → File Map](#task--file-map)

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

# Team Development Workflow

We use GitHub Projects to track tasks and GitHub pull requests to review code. If you are new to GitHub, follow these steps for every coding task.

## Before you start

1. Open the task assigned to you in GitHub Projects.
2. Move it to **In Progress**.
3. Pull the latest code from the `main` branch.
4. Create a new branch for your task, such as `login-form` or `firebase-setup`.
5. Run the app locally and make sure it works before changing anything.

## While you work

- Work only on the task assigned to you.
- Keep your changes small and focused.
- Do not commit directly to `main`.
- Ask for help if you are blocked for about 30 minutes.
- Move the task to **Blocked** and explain the problem if you cannot continue.

## Before opening a pull request

- Test your feature locally.
- Make sure the app still starts and builds.
- Check that you did not include passwords, private keys, or private files.
- Commit and push your branch.
- Open a pull request and explain what you changed.
- Link the pull request to the GitHub issue when possible.

## Review and completion

1. Another teammate reviews the pull request.
2. Another teammate tests the feature.
3. Fix any problems they find.
4. Merge the pull request after it is approved and working.
5. Move the GitHub task to **Done**.

## What depends on what

- Firebase must be connected before authentication and database features can use it.
- The authentication service must be ready before the login and signup forms can fully work.
- The Firestore post service must be ready before the feed can display real posts.
- The first complete flow is: **Sign up → log in → create a post → save it → refresh → see it in the feed**.

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
