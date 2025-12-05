import { useState, useRef, useEffect } from 'react';
import { Header } from './Header';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { ScrollArea } from './ui/scroll-area';
import { Send, Bot, User, Clock, MessageSquare, Plus } from 'lucide-react';

interface ChatPageProps {
  onNavigate: (page: string) => void;
  user: any;
}

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

interface Conversation {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: Date;
}

export function ChatPage({ onNavigate, user }: ChatPageProps) {
  const [currentMessage, setCurrentMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content:
        "Hello! I'm your Virtual Legal Assistant. I can help you understand legal topics and connect you with qualified lawyers. What legal matter can I assist you with today?",
      timestamp: new Date()
    }
  ]);
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: '1',
      title: 'General Legal Inquiry',
      lastMessage: "Hello! I'm your Virtual Legal Assistant...",
      timestamp: new Date()
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [currentConversation, setCurrentConversation] = useState('1');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Format AI answer: numbered steps on separate lines, disclaimer as plain text at end
  const formatAiAnswer = (text: string) => {
    const parts = text
      .split(/(?=\d+\.\s)/g) // split before "1. ", "2. " etc.
      .map((p) => p.trim())
      .filter((p) => p.length > 0);

    if (parts.length === 0) return text;

    const last = parts[parts.length - 1];
    let steps = parts;
    let disclaimer = '';

    // If last part does NOT start with "number.", treat it as disclaimer text
    if (!/^\d+\.\s/.test(last)) {
      steps = parts.slice(0, -1);
      disclaimer = last;
    }

    const stepsBlock = steps.join('\n');
    return disclaimer ? `${stepsBlock}\n${disclaimer}` : stepsBlock;
  };

  // CALL YOUR ML / LLM LEGAL ASSISTANT API HERE
  const callLegalAssistant = async (question: string): Promise<string> => {
    try {
      const response = await fetch('/api/legal-assistant', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ question })
      });

      if (!response.ok) {
        throw new Error('Failed to get response from legal assistant');
      }

      const data = await response.json();
      // Expecting backend to return: { answer: string }
      return (
        data.answer ||
        'Sorry, I could not generate an answer right now. Please try again in a moment.'
      );
    } catch (error) {
      console.error('Legal assistant error:', error);
      return 'There was an error contacting the legal assistant service. Please try again or contact a lawyer directly.';
    }
  };

  const sendMessage = async () => {
    if (!currentMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: currentMessage,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMessage]);
    setCurrentMessage('');
    setIsTyping(true);

    // Call your ML / LLM legal assistant instead of random responses
    const assistantReply = await callLegalAssistant(userMessage.content);

    const aiMessage: Message = {
      id: (Date.now() + 1).toString(),
      type: 'ai',
      content: assistantReply,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, aiMessage]);
    setIsTyping(false);

    // Update conversation list
    setConversations((prev) =>
      prev.map((conv) =>
        conv.id === currentConversation
          ? { ...conv, lastMessage: aiMessage.content, timestamp: new Date() }
          : conv
      )
    );
  };

  const startNewConversation = () => {
    const newConv: Conversation = {
      id: Date.now().toString(),
      title: 'New Legal Inquiry',
      lastMessage: 'New conversation started',
      timestamp: new Date()
    };

    setConversations((prev) => [newConv, ...prev]);
    setCurrentConversation(newConv.id);
    setMessages([
      {
        id: '1',
        type: 'ai',
        content:
          "Hello! I'm ready to help with your new legal question. Please describe your situation or ask your question.",
        timestamp: new Date()
      }
    ]);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-[#F5F7FA]">
        <Header onNavigate={onNavigate} user={user} />
        <div className="flex items-center justify-center h-96">
          <Card className="p-8 text-center">
            <h2 className="text-2xl text-[#263238] mb-4">Login Required</h2>
            <p className="text-gray-600 mb-6">
              Please login to access the chat feature.
            </p>
            <Button
              onClick={() => onNavigate('login')}
              className="bg-[#1E88E5] hover:bg-[#1565C0] text-white"
            >
              Login
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      <Header onNavigate={onNavigate} user={user} />

      <div className="max-w-7xl mx-auto p-4 h-[calc(100vh-4rem)]">
        <div className="grid lg:grid-cols-4 gap-4 h-full">
          {/* Sidebar - Conversations */}
          <div className="lg:col-span-1">
            <Card className="h-full p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-[#263238]">
                  Conversations
                </h3>
                <Button
                  onClick={startNewConversation}
                  size="sm"
                  className="bg-[#1E88E5] hover:bg-[#1565C0] text-white p-2"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              <ScrollArea className="h-[calc(100%-4rem)]">
                <div className="space-y-2">
                  {conversations.map((conv) => (
                    <div
                      key={conv.id}
                      onClick={() => setCurrentConversation(conv.id)}
                      className={`p-3 rounded-lg cursor-pointer transition-colors duration-200 ${
                        currentConversation === conv.id
                          ? 'bg-[#1E88E5] text-white'
                          : 'bg-gray-50 hover:bg-gray-100'
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <MessageSquare className="h-5 w-5 mt-0.5 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p
                            className={`font-medium truncate ${
                              currentConversation === conv.id
                                ? 'text-white'
                                : 'text-[#263238]'
                            }`}
                          >
                            {conv.title}
                          </p>
                          <p
                            className={`text-sm truncate ${
                              currentConversation === conv.id
                                ? 'text-blue-100'
                                : 'text-gray-600'
                            }`}
                          >
                            {conv.lastMessage}
                          </p>
                          <div className="flex items-center mt-1">
                            <Clock className="h-3 w-3 mr-1" />
                            <span className="text-xs">
                              {conv.timestamp.toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </Card>
          </div>

          {/* Main Chat Area */}
          <div className="lg:col-span-3">
            <Card className="h-full flex flex-col">
              {/* Chat Header */}
              <div className="border-b border-gray-200 p-4">
                <h2 className="text-xl font-medium text-[#263238]">
                  Virtual Legal Assistant
                </h2>
                <p className="text-sm text-gray-600">
                  Get instant legal information and connect with qualified
                  lawyers. Responses are for general guidance only, not a
                  substitute for a licensed advocate.
                </p>
              </div>

              {/* Messages */}
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.type === 'user'
                          ? 'justify-end'
                          : 'justify-start'
                      } animate-in fade-in duration-300`}
                    >
                      <div
                        className={`flex items-start space-x-3 max-w-[80%] ${
                          message.type === 'user'
                            ? 'flex-row-reverse space-x-reverse'
                            : ''
                        }`}
                      >
                        <div
                          className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                            message.type === 'user'
                              ? 'bg-[#1E88E5] text-white'
                              : 'bg-gray-100 text-gray-600'
                          }`}
                        >
                          {message.type === 'user' ? (
                            <User className="h-4 w-4" />
                          ) : (
                            <Bot className="h-4 w-4" />
                          )}
                        </div>

                        <div
                          className={`rounded-lg p-3 ${
                            message.type === 'user'
                              ? 'bg-[#1E88E5] text-white'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          <p className="leading-relaxed whitespace-pre-line">
                            {message.type === 'ai'
                              ? formatAiAnswer(message.content)
                              : message.content}
                          </p>
                          <span
                            className={`text-xs mt-1 block ${
                              message.type === 'user'
                                ? 'text-blue-100'
                                : 'text-gray-500'
                            }`}
                          >
                            {message.timestamp.toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}

                  {isTyping && (
                    <div className="flex justify-start animate-in fade-in duration-300">
                      <div className="flex items-start space-x-3 max-w-[80%]">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center">
                          <Bot className="h-4 w-4" />
                        </div>
                        <div className="bg-gray-100 rounded-lg p-3">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                            <div
                              className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                              style={{ animationDelay: '0.1s' }}
                            ></div>
                            <div
                              className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                              style={{ animationDelay: '0.2s' }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>

              {/* Message Input */}
              <div className="border-t border-gray-200 p-4">
                <div className="flex space-x-2">
                  <Input
                    value={currentMessage}
                    onChange={(e) => setCurrentMessage(e.target.value)}
                    placeholder="Type your legal question..."
                    onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                    className="flex-1 border-gray-300 focus:border-[#1E88E5] focus:ring-[#1E88E5]"
                  />
                  <Button
                    onClick={sendMessage}
                    disabled={!currentMessage.trim() || isTyping}
                    className="bg-[#1E88E5] hover:bg-[#1565C0] text-white px-4"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Press Enter to send • This assistant provides general legal
                  information only and does not create a lawyer–client
                  relationship.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

