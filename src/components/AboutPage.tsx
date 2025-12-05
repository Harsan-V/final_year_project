// src/components/AboutPage.tsx
import { Header } from './Header';
import { Footer } from './Footer';
import { Card } from './ui/card';

interface AboutPageProps {
  onNavigate: (page: string) => void;
  user: any;
}

export function AboutPage({ onNavigate, user }: AboutPageProps) {
  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      <Header onNavigate={onNavigate} user={user} />

      <div className="max-w-4xl mx-auto px-4 py-10">
        <Card className="p-6 md:p-8">
          <h1 className="text-2xl md:text-3xl font-semibold text-[#263238] mb-4">
            About Virtual Legal Assistant
          </h1>
          <p className="text-gray-700 mb-3">
            Virtual Legal Assistant is a learning and guidance tool that helps
            you understand basic legal concepts and typical procedures in India.
          </p>
          <p className="text-gray-700 mb-3">
            It uses AI to explain topics in simple language, suggest general
            steps you can consider, and help you decide when it may be useful to
            speak with a lawyer.
          </p>
          <p className="text-gray-700">
            This app does not replace a licensed advocate and does not create a
            lawyer–client relationship. For any serious or specific matter, you
            should always consult a qualified legal professional.
          </p>
        </Card>
      </div>

      <Footer />
    </div>
  );
}
