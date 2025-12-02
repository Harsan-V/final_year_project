import { Header } from './Header';
import { Footer } from './Footer';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { MessageSquare, Users, Clock, Shield, ArrowRight, CheckCircle } from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: string) => void;
  user: any;
}

export function HomePage({ onNavigate, user }: HomePageProps) {
  const features = [
    {
      icon: MessageSquare,
      title: 'AI Legal Chat',
      description: 'Get instant answers to your legal questions with our advanced AI assistant'
    },
    {
      icon: Users,
      title: 'Verified Lawyers',
      description: 'Connect with licensed professionals specializing in your legal needs'
    },
    {
      icon: Clock,
      title: '24/7 Support',
      description: 'Access legal guidance anytime, anywhere with round-the-clock availability'
    },
    {
      icon: Shield,
      title: 'Secure Platform',
      description: 'Your data and conversations are protected with enterprise-grade security'
    }
  ];

  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      <Header onNavigate={onNavigate} user={user} />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#1E88E5] to-[#1565C0] text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-in slide-in-from-left duration-700">
              <h1 className="text-4xl lg:text-6xl font-medium leading-tight">
                Get Instant Legal Help with 
                <span className="text-blue-200"> AI Assistance</span>
              </h1>
              <p className="text-xl text-blue-100 max-w-lg">
                Connect with verified lawyers, get AI-powered legal guidance, and resolve your legal matters efficiently and securely.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={() => onNavigate('chat')}
                  size="lg"
                  className="bg-white text-[#1E88E5] hover:bg-gray-100 px-8 py-4 h-auto transition-all duration-200 transform hover:scale-105 group"
                >
                  Start Chat
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button
                  onClick={() => onNavigate('lawyers')}
                  variant="outline"
                  size="lg"
                  className="border-2 border-white text-white hover:bg-white hover:text-[#1E88E5] px-8 py-4 h-auto transition-all duration-200"
                >
                  Find Lawyers
                </Button>
              </div>
            </div>
            
            <div className="relative animate-in slide-in-from-right duration-700 delay-300">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1758876202983-c36dd5019142?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBvZmZpY2UlMjB0ZWNobm9sb2d5JTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc1OTc3MjE3Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Professional legal technology"
                className="w-full h-96 object-cover rounded-lg shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl text-[#263238] mb-4">
              Why Choose Virtual Legal Assistant?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform combines cutting-edge AI technology with verified legal professionals to provide you with the best legal assistance.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={feature.title}
                className="p-6 border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group animate-in fade-in duration-500"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="text-center space-y-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-[#E3F2FD] rounded-full group-hover:bg-[#1E88E5] transition-colors duration-300">
                    <feature.icon className="h-8 w-8 text-[#1E88E5] group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="text-xl text-[#263238]">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#F5F7FA] to-[#E3F2FD]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl text-[#263238] mb-6">
            Ready to Get Legal Help?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of users who trust our platform for their legal needs. Start your journey today.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <div className="flex items-center space-x-2 text-green-600">
              <CheckCircle className="h-5 w-5" />
              <span>Free consultation</span>
            </div>
            <div className="flex items-center space-x-2 text-green-600">
              <CheckCircle className="h-5 w-5" />
              <span>Verified lawyers</span>
            </div>
            <div className="flex items-center space-x-2 text-green-600">
              <CheckCircle className="h-5 w-5" />
              <span>Secure & confidential</span>
            </div>
          </div>
          
          <div className="mt-8">
            <Button
              onClick={() => onNavigate('chat')}
              size="lg"
              className="bg-[#1E88E5] hover:bg-[#1565C0] text-white px-12 py-4 h-auto transition-all duration-200 transform hover:scale-105"
            >
              Start Your Free Consultation
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}