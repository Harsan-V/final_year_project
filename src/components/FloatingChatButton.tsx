import { useState } from 'react';
import { Button } from './ui/button';
import { MessageSquare, X } from 'lucide-react';

interface FloatingChatButtonProps {
  onNavigate: (page: string) => void;
}

export function FloatingChatButton({ onNavigate }: FloatingChatButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button
        onClick={() => onNavigate('chat')}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="w-14 h-14 rounded-full bg-[#1E88E5] hover:bg-[#1565C0] text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 group"
      >
        <MessageSquare className="h-6 w-6 group-hover:animate-pulse" />
      </Button>
      
      {isHovered && (
        <div className="absolute bottom-16 right-0 bg-white rounded-lg shadow-lg p-3 w-48 animate-in slide-in-from-bottom duration-200">
          <p className="text-sm text-gray-700 font-medium">
            Chat with AI Assistant
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Get instant legal guidance
          </p>
        </div>
      )}
    </div>
  );
}