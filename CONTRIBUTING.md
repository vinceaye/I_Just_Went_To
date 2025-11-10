# Contributing to I Just Went To

Thank you for your interest in contributing! This document provides guidelines and instructions for contributing to the project.

## Development Workflow

### 1. Before You Start

- Make sure you've read the `README.md` and `SETUP_GUIDE.md`
- Ensure all dependencies are installed
- Verify the project runs locally

### 2. Making Changes

1. **Create a branch** (for larger features):
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes:**
   - Follow the existing code style
   - Write clean, readable code
   - Add comments for complex logic
   - Update documentation if needed

3. **Test your changes:**
   - Test locally with both frontend and backend
   - Verify API endpoints work correctly
   - Check for console errors

4. **Commit your changes:**
   ```bash
   git add .
   git commit -m "Descriptive commit message"
   ```

5. **Push to GitHub:**
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request:**
   - Go to GitHub
   - Click "New Pull Request"
   - Select your branch
   - Describe your changes
   - Request review if needed

## Code Style Guidelines

### Python (Backend)

- Follow PEP 8 style guide
- Use meaningful variable names
- Add docstrings for functions and classes
- Keep functions focused and small

### JavaScript/React (Frontend)

- Use functional components with hooks
- Use descriptive component and variable names
- Follow React best practices
- Keep components modular and reusable

### Git Commit Messages

- Use present tense ("Add feature" not "Added feature")
- Be specific and descriptive
- Reference issues if applicable: "Fix #123: Photo upload bug"

Examples:
- ✅ "Add user authentication with Azure AD B2C"
- ✅ "Fix trip date validation in form"
- ✅ "Update API documentation"
- ❌ "fixes"
- ❌ "update"
- ❌ "changes"

## Project Structure

### Backend

```
backend/
├── app.py              # Main Flask application
├── models/             # Database models
│   ├── __init__.py
│   └── database.py
├── services/           # Business logic
│   ├── __init__.py
│   └── blob_storage.py
└── requirements.txt    # Python dependencies
```

### Frontend

```
frontend/
├── src/
│   ├── components/     # React components
│   │   ├── TripForm.jsx
│   │   ├── TripList.jsx
│   │   └── TripCard.jsx
│   ├── services/       # API services
│   │   └── api.js
│   ├── App.jsx         # Main app component
│   └── main.jsx        # Entry point
└── package.json        # Node dependencies
```

## Adding New Features

### Backend API Endpoint

1. Add route in `backend/app.py`:
   ```python
   @app.route('/api/your-endpoint', methods=['GET'])
   def your_function():
       # Implementation
       return jsonify(result), 200
   ```

2. Add error handling
3. Update API documentation in README.md

### Frontend Component

1. Create component file in `frontend/src/components/`
2. Add corresponding CSS file
3. Import and use in `App.jsx` or parent component
4. Add API call in `frontend/src/services/api.js` if needed

## Testing

Before submitting:

- [ ] Code runs without errors
- [ ] API endpoints respond correctly
- [ ] Frontend displays correctly
- [ ] No console errors
- [ ] Database operations work
- [ ] Photo uploads work (if applicable)

## Reporting Issues

When reporting bugs or requesting features:

1. Check if the issue already exists
2. Use clear, descriptive titles
3. Provide steps to reproduce
4. Include error messages and logs
5. Mention your environment (OS, Node version, etc.)

## Questions?

- Check the documentation
- Review existing code for examples
- Open an issue for discussion

Thank you for contributing!

