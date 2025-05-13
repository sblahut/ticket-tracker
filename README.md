# Ticket Tracker

A modern, intuitive ticket tracking system built with React and Python, featuring drag-and-drop functionality and real-time updates.

## Setup Instructions

1. Frontend Setup:
```bash
cd client
npm install
npm start
```

2. Backend Setup:
```bash
cd server
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

## Technical Stack

- Frontend:
  - React
  - @hello-pangea/dnd for drag-and-drop
  - LocalStorage for data persistence
  - CSS Modules for styling

- Backend:
  - FastAPI
  - Python 3.x
  - SQLite/PostgreSQL for database

## Technical Decisions

1. **@hello-pangea/dnd over react-beautiful-dnd**
   - Actively maintained fork
   - Better TypeScript support
   - Improved React 18 compatibility

2. **Component Structure**
   - Modular components (Board, Column, Ticket)
   - State management via React hooks
   - Event delegation for performance

3. **Data Persistence**
   - LocalStorage for immediate data access
   - Backend sync for data durability
   - Optimistic updates for better UX

## Assumptions

1. Single user environment initially
2. Modern browser support required
3. English language interface
4. Persistent internet connection not required for basic functionality
5. Board state needs to persist between sessions

## Future Improvements

1. Authentication & Authorization
   - User accounts
   - Role-based access control
   - Team collaboration features

2. Enhanced Features
   - Ticket attachments
   - Due dates and reminders
   - Activity logging
   - Search functionality
   - Filtering options

3. Performance Optimizations
   - Virtual scrolling for large boards
   - Image optimization
   - Caching strategies

4. UI/UX Enhancements
   - Dark mode support
   - Customizable themes
   - Keyboard shortcuts
   - Mobile responsiveness

5. Integration Capabilities
   - API documentation
   - Webhook support
   - Third-party integrations
   - Export/Import functionality

## Testing

### Running Tests
```bash
cd client
npm test
```

### Test Coverage Report
```bash
cd client
npm test -- --coverage
```

### Test Suites
- Component Tests: Verify UI elements and interactions
- Integration Tests: Validate component relationships
- Utility Tests: Ensure helper functions work correctly

### Continuous Integration
Tests run automatically on:
- Pull requests
- Main branch commits
- Release deployments

### Test Structure
```
client/src/
├── __tests__/             # Global test utilities
├── components/
│   └── __tests__/         # Component-specific tests
└── utils/
    └── __tests__/         # Utility function tests
```
