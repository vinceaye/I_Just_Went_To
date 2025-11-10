# GitHub Setup Instructions

This is a quick reference guide for setting up and using GitHub with this project.

## Initial GitHub Repository Setup

### Step 1: Create Repository on GitHub

1. Go to https://github.com
2. Click the **+** icon → **New repository**
3. Repository name: `I_Just_Went_To`
4. Description: "A social media app for sharing travel experiences"
5. Visibility: Choose **Public** or **Private**
6. **IMPORTANT**: Do NOT check any boxes (no README, .gitignore, or license)
7. Click **Create repository**

### Step 2: Connect Local Repository

Open your terminal in the project root directory and run:

```bash
# Add GitHub as remote (replace YOUR_USERNAME with your actual GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/I_Just_Went_To.git

# Rename branch to main (if needed)
git branch -M main

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: I Just Went To web app"

# Push to GitHub
git push -u origin main
```

### Step 3: Verify Setup

1. Go to your repository on GitHub: `https://github.com/YOUR_USERNAME/I_Just_Went_To`
2. You should see all your project files
3. Verify that `.env` files are NOT visible (they're in `.gitignore`)

## Daily Git Workflow

### Making Changes

```bash
# 1. Check what files have changed
git status

# 2. See what specifically changed
git diff

# 3. Add files to staging
git add filename.js          # Add specific file
git add .                    # Add all changed files
git add frontend/src/         # Add entire directory

# 4. Commit with descriptive message
git commit -m "Add user authentication feature"

# 5. Push to GitHub
git push
```

### Best Practices

✅ **Do:**
- Commit frequently with clear messages
- Use descriptive commit messages
- Review changes with `git status` and `git diff` before committing
- Push to GitHub regularly

❌ **Don't:**
- Commit `.env` files (already in `.gitignore`)
- Commit `node_modules/` or `venv/` (already in `.gitignore`)
- Use vague commit messages like "updates" or "fixes"

## Common Git Commands

### Viewing History

```bash
# See commit history
git log

# See commit history (compact)
git log --oneline

# See what changed in a file
git diff filename
```

### Undoing Changes

```bash
# Unstage a file (keep changes)
git reset HEAD filename

# Discard changes to a file (CAREFUL!)
git checkout -- filename

# Undo last commit (keep changes)
git reset --soft HEAD~1
```

### Branching

```bash
# Create and switch to new branch
git checkout -b feature/new-feature

# Switch branches
git checkout main
git checkout feature/new-feature

# See all branches
git branch

# Delete a branch
git branch -d feature/old-feature
```

## GitHub Features to Explore

### 1. Issues

Use Issues to track:
- Bugs
- Feature requests
- Questions
- Tasks

**Creating an Issue:**
1. Go to your repository on GitHub
2. Click **Issues** tab
3. Click **New Issue**
4. Fill in title and description
5. Assign labels (bug, enhancement, etc.)
6. Click **Submit new issue**

### 2. Pull Requests

Use Pull Requests to:
- Review code before merging
- Discuss changes
- Track changes

**Creating a Pull Request:**
1. Create a branch and make changes
2. Push the branch to GitHub
3. GitHub will show a banner to create a PR
4. Fill in description
5. Request reviews if needed
6. Merge when ready

### 3. Releases

Create releases for major versions:
1. Go to **Releases** in your repository
2. Click **Create a new release**
3. Tag version (e.g., `v1.0.0`)
4. Add release notes
5. Publish release

## GitHub Profile Enhancement

Add this project to your GitHub profile:

1. Create a repository named exactly: `YOUR_USERNAME` (must match your GitHub username)
2. Add a `README.md` with:
   ```markdown
   # Hi, I'm [Your Name]

   ## My Projects
   - [I Just Went To](https://github.com/YOUR_USERNAME/I_Just_Went_To) - A social media app for sharing travel experiences
   ```
3. Pin this repository to your profile

## Connecting to Azure

### GitHub Actions for CI/CD

The project includes GitHub Actions workflows:
- `.github/workflows/azure-static-web-apps.yml` - Deploys frontend
- `.azure/pipelines/azure-pipelines.yml` - Deploys backend

To use them:
1. Set up secrets in GitHub: **Settings** → **Secrets and variables** → **Actions**
2. Add required secrets (Azure tokens, etc.)
3. Push to main branch to trigger deployment

## Troubleshooting

### "Remote origin already exists"

```bash
# Remove existing remote
git remote remove origin

# Add correct remote
git remote add origin https://github.com/YOUR_USERNAME/I_Just_Went_To.git
```

### "Permission denied (publickey)"

**Option 1: Use HTTPS (easier)**
- Use the HTTPS URL when adding remote
- GitHub will prompt for username/password or token

**Option 2: Set up SSH keys**
- Generate SSH key: `ssh-keygen -t ed25519 -C "your_email@example.com"`
- Add to GitHub: Settings → SSH and GPG keys → New SSH key
- Use SSH URL: `git@github.com:YOUR_USERNAME/I_Just_Went_To.git`

### "Failed to push"

```bash
# Pull latest changes first
git pull origin main

# Resolve any conflicts
# Then push again
git push
```

### Accidentally committed .env file

```bash
# Remove from Git (keeps local file)
git rm --cached backend/.env
git rm --cached frontend/.env

# Commit the removal
git commit -m "Remove .env files from version control"

# Push to GitHub
git push
```

## Next Steps

1. ✅ Create GitHub repository
2. ✅ Push initial code
3. 📝 Add README badges (optional)
4. 📝 Set up branch protection (optional)
5. 📝 Configure GitHub Actions secrets
6. 📝 Set up Azure deployments

## Resources

- [Git Documentation](https://git-scm.com/doc)
- [GitHub Guides](https://guides.github.com)
- [Git Cheat Sheet](https://education.github.com/git-cheat-sheet-education.pdf)

---

**Remember**: Your GitHub profile is your professional portfolio. Keep your commits clean, your README informative, and your code professional!

