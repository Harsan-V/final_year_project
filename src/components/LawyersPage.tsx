import { useState } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Star, MapPin, Phone, Mail, Search, Filter } from 'lucide-react';

interface LawyersPageProps {
  onNavigate: (page: string) => void;
  user: any;
}

interface Lawyer {
  id: string;
  name: string;
  specialization: string;
  rating: number;
  reviews: number;
  location: string;
  experience: string;
  image: string;
  verified: boolean;
  available: boolean;
  hourlyRate: string;
  bio: string;
}

export function LawyersPage({ onNavigate, user }: LawyersPageProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialization, setSelectedSpecialization] = useState('');
  const [sortBy, setSortBy] = useState('rating');

  const lawyers: Lawyer[] = [
    {
      id: '1',
      name: 'Avanthika',
      specialization: 'Family Law',
      rating: 4.9,
      reviews: 127,
      location: 'San Francisco, CA',
      experience: '12 years',
      image:
        'https://www.lawyersclubindia.com/editor_upload/92028_20190419105336_33328038ys_karunanundy_0214ed_thumbail_1485325560.jpg',
      verified: true,
      available: true,
      hourlyRate: '₹3800',
      bio: 'Specializing in family law with over 12 years of experience in divorce, custody, and adoption cases.'
    },
    {
      id: '2',
      name: 'Saul',
      specialization: 'Criminal Law',
      rating: 5.0,
      reviews: 889,
      location: 'New York, NY',
      experience: '15 years',
      image:
        'https://static.tvtropes.org/pmwiki/pub/images/saul_goodman.jpg',
      verified: true,
      available: true,
      hourlyRate: '₹9900',
      bio: 'Criminal defense attorney with a strong track record in white-collar crime and DUI cases.'
    },
    {
      id: '3',
      name: 'Skyler',
      specialization: 'Corporate Law',
      rating: 4.7,
      reviews: 156,
      location: 'Los Angeles, CA',
      experience: '10 years',
      image:
        'https://s3.us-east-2.amazonaws.com/itt-images/_1200x630_crop_center-center_82_none/Beyerstein_Doyle_Breaking_Bad_Skyler_White.jpg?mtime=1597012442',
      verified: true,
      available: false,
      hourlyRate: '₹1779',
      bio: 'Expert in corporate law, mergers & acquisitions, and business compliance with Fortune 500 experience.'
    },
    {
      id: '4',
      name: 'Aravind',
      specialization: 'Real Estate Law',
      rating: 4.6,
      reviews: 98,
      location: 'Chicago, IL',
      experience: '8 years',
      image:
        'https://img.freepik.com/premium-photo/confident-indian-male-lawyer-courthouse-with-professional-background_1235831-67743.jpg',
      verified: true,
      available: true,
      hourlyRate: '₹1800',
      bio: 'Real estate attorney specializing in residential and commercial property transactions.'
    },
    {
      id: '5',
      name: 'Swetha',
      specialization: 'Immigration Law',
      rating: 4.9,
      reviews: 203,
      location: 'Miami, FL',
      experience: '14 years',
      image:
        'https://www.lawpreptutorial.com/blog/wp-content/uploads/2024/05/anitha-shenoy.jpg',
      verified: true,
      available: true,
      hourlyRate: '₹1400',
      bio: 'Immigration attorney helping individuals and families navigate complex immigration processes.'
    },
    {
      id: '6',
      name: 'Rishi Saran',
      specialization: 'Personal Injury',
      rating: 4.5,
      reviews: 74,
      location: 'Houston, TX',
      experience: '11 years',
      image:
        'https://img.freepik.com/premium-photo/indian-male-lawyer-lawyer-man-courtroom-police-station_1183915-1262.jpg',
      verified: true,
      available: true,
      hourlyRate: '₹700',
      bio: 'Personal injury lawyer with extensive experience in auto accidents and workplace injuries.'
    }
  ];

  const specializations = [
    'All Specializations',
    'Family Law',
    'Corporate Law',
    'Criminal Law',
    'Real Estate Law',
    'Immigration Law',
    'Personal Injury',
    'Intellectual Property',
    'Employment Law'
  ];

  const filteredLawyers = lawyers.filter((lawyer) => {
    const matchesSearch =
      lawyer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lawyer.specialization.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialization =
      !selectedSpecialization ||
      selectedSpecialization === 'All Specializations' ||
      lawyer.specialization === selectedSpecialization;
    return matchesSearch && matchesSpecialization;
  });

  const sortedLawyers = [...filteredLawyers].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating - a.rating;
      case 'experience':
        return parseInt(b.experience) - parseInt(a.experience);
      case 'reviews':
        return b.reviews - a.reviews;
      default:
        return 0;
    }
  });

  const handleConnect = (lawyer: Lawyer) => {
    if (!user) {
      onNavigate('login');
      return;
    }

    // Simulate connection
    alert(`Connecting you with ${lawyer.name}. You will receive a notification once they respond.`);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(rating)
            ? 'text-yellow-400 fill-current'
            : i < rating
            ? 'text-yellow-400 fill-current opacity-50'
            : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      <Header onNavigate={onNavigate} user={user} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl text-[#263238] mb-4">Find Expert Lawyers</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Connect with verified legal professionals who specialize in your area of need. All lawyers on our
            platform are thoroughly vetted and licensed.
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="p-6 mb-8">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Search lawyers or specializations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12 border-gray-300 focus:border-[#1E88E5] focus:ring-[#1E88E5]"
              />
            </div>

            <Select onValueChange={setSelectedSpecialization}>
              <SelectTrigger className="h-12 border-gray-300 focus:border-[#1E88E5] focus:ring-[#1E88E5]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Select specialization" />
              </SelectTrigger>
              <SelectContent>
                {specializations.map((spec) => (
                  <SelectItem key={spec} value={spec}>
                    {spec}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select onValueChange={setSortBy} defaultValue="rating">
              <SelectTrigger className="h-12 border-gray-300 focus:border-[#1E88E5] focus:ring-[#1E88E5]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rating">Sort by Rating</SelectItem>
                <SelectItem value="experience">Sort by Experience</SelectItem>
                <SelectItem value="reviews">Sort by Reviews</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </Card>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {sortedLawyers.length} lawyer{sortedLawyers.length !== 1 ? 's' : ''}
            {selectedSpecialization && selectedSpecialization !== 'All Specializations' && (
              <span> in {selectedSpecialization}</span>
            )}
          </p>
        </div>

        {/* Lawyers Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedLawyers.map((lawyer, index) => (
            <Card
              key={lawyer.id}
              className="overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group animate-in fade-in duration-500"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative">
                <ImageWithFallback
                  src={lawyer.image}
                  alt={lawyer.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 right-4 flex gap-2">
                  {lawyer.verified && <Badge className="bg-green-500 text-white">Verified</Badge>}
                  <Badge
                    className={
                      lawyer.available
                        ? 'bg-[#1E88E5] text-white'
                        : 'bg-gray-500 text-white'
                    }
                  >
                    {lawyer.available ? 'Available' : 'Busy'}
                  </Badge>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-xl font-medium text-[#263238] mb-1">
                      {lawyer.name}
                    </h3>
                    <p className="text-[#1E88E5] font-medium">
                      {lawyer.specialization}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-medium text-[#263238]">
                      {lawyer.hourlyRate}
                    </p>
                    <p className="text-sm text-gray-500">per hour</p>
                  </div>
                </div>

                <div className="flex items-center space-x-1 mb-3">
                  {renderStars(lawyer.rating)}
                  <span className="ml-2 text-sm text-gray-600">
                    {lawyer.rating} ({lawyer.reviews} reviews)
                  </span>
                </div>

                <div className="space-y-2 mb-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4" />
                    <span>{lawyer.location}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="h-4 w-4 flex items-center justify-center">📅</span>
                    <span>{lawyer.experience} experience</span>
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  {lawyer.bio}
                </p>

                <div className="flex gap-2">
                  <Button
                    onClick={() => handleConnect(lawyer)}
                    disabled={!lawyer.available}
                    className={`flex-1 transition-all duration-200 ${
                      lawyer.available
                        ? 'bg-[#1E88E5] hover:bg-[#1565C0] text-white transform hover:scale-105'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {lawyer.available ? 'Connect' : 'Unavailable'}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-[#1E88E5] text-[#1E88E5] hover:bg-[#1E88E5] hover:text-white p-2"
                  >
                    <Mail className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-[#1E88E5] text-[#1E88E5] hover:bg-[#1E88E5] hover:text-white p-2"
                  >
                    <Phone className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {sortedLawyers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600 mb-4">
              No lawyers found matching your criteria
            </p>
            <Button
              onClick={() => {
                setSearchTerm('');
                setSelectedSpecialization('');
              }}
              variant="outline"
              className="border-[#1E88E5] text-[#1E88E5] hover:bg-[#1E88E5] hover:text-white"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
