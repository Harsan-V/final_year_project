import { useState } from 'react';
import { LoginPage } from './components/LoginPage';
import { SignupPage } from './components/SignupPage';
import { HomePage } from './components/HomePage';
import { ChatPage } from './components/ChatPage';
import { LawyersPage } from './components/LawyersPage';
import { FloatingChatButton } from './components/FloatingChatButton';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [user, setUser] = useState(null);

  const renderPage = () => {
    switch (currentPage) {
      case 'login':
        return <LoginPage onNavigate={setCurrentPage} onLogin={setUser} />;
      case 'signup':
        return <SignupPage onNavigate={setCurrentPage} onSignup={setUser} />;
      case 'chat':
        return <ChatPage onNavigate={setCurrentPage} user={user} />;
      case 'lawyers':
        return <LawyersPage onNavigate={setCurrentPage} user={user} />;
      default:
        return <HomePage onNavigate={setCurrentPage} user={user} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA] font-['Inter',sans-serif]">
      {renderPage()}
      {currentPage !== 'login' && currentPage !== 'signup' && (
        <FloatingChatButton onNavigate={setCurrentPage} />
      )}
    </div>
  );
}