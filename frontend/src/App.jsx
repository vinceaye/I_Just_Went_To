import { useState } from 'react';
import TripForm from './components/TripForm';
import TripList from './components/TripList';
import './App.css';

function App() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleTripAdded = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>I Just Went To...</h1>
        <p className="tagline">Share your adventures with the world</p>
      </header>
      <main className="app-main">
        <TripForm onTripAdded={handleTripAdded} />
        <TripList refreshTrigger={refreshTrigger} />
      </main>
      <footer className="app-footer">
        <p>&copy; 2024 I Just Went To. Share your journey.</p>
      </footer>
    </div>
  );
}

export default App;
