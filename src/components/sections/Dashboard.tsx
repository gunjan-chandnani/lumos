import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle, Heart, TrendingUp, Calendar, Smile } from "lucide-react";
import heroImage from "@/assets/hero-wellness.jpg";

interface DashboardProps {
  onSectionChange: (section: string) => void;
}

const Dashboard = ({ onSectionChange }: DashboardProps) => {
  const quickActions = [
    { 
      id: 'chat', 
      label: 'Talk to AI Companion', 
      description: 'Start a confidential conversation',
      icon: MessageCircle,
      gradient: 'wellness-gradient-bg'
    },
    { 
      id: 'mood', 
      label: 'Mood Check-in', 
      description: 'Track and improve your mood',
      icon: Heart,
      gradient: 'uplifting-gradient-bg'
    },
  ];

  const stats = [
    { label: 'Days Active', value: '7', icon: Calendar, color: 'text-wellness-primary' },
    { label: 'Mood Score', value: '8.2', icon: TrendingUp, color: 'text-wellness-success' },
    { label: 'Conversations', value: '12', icon: MessageCircle, color: 'text-wellness-secondary' },
    { label: 'Mindful Moments', value: '25', icon: Smile, color: 'text-wellness-accent' },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-3xl gentle-shadow mb-8">
        <div className="absolute inset-0 hero-gradient-bg opacity-90" />
        <img 
          src={heroImage} 
          alt="Peaceful meditation space promoting mental wellness" 
          className="w-full h-80 object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center text-white text-center p-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Welcome to Your Safe Space
            </h1>
            <p className="text-xl md:text-2xl opacity-90 mb-6">
              Your confidential companion for mental wellness and growth
            </p>
            <Button 
              onClick={() => onSectionChange('chat')}
              size="lg"
              className="bg-white/20 text-white border-white/30 hover:bg-white/30 backdrop-blur-sm"
            >
              Start Your Journey
            </Button>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-6 text-foreground">Quick Actions</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Card 
                key={action.id}
                className="p-6 cursor-pointer hover:scale-105 transition-all duration-200 gentle-shadow hover:warm-shadow border-0"
                onClick={() => onSectionChange(action.id)}
              >
                <div className="flex items-start space-x-4">
                  <div className={`w-12 h-12 ${action.gradient} rounded-xl flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-2">{action.label}</h3>
                    <p className="text-muted-foreground">{action.description}</p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-6 text-foreground">Your Progress</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="p-6 text-center gentle-shadow border-0">
                <Icon className={`w-8 h-8 ${stat.color} mx-auto mb-3`} />
                <div className="text-2xl font-bold text-foreground mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Inspirational Quote */}
      <Card className="p-8 text-center mindful-gradient-bg border-0 gentle-shadow">
        <div className="max-w-2xl mx-auto">
          <blockquote className="text-xl md:text-2xl font-medium text-foreground mb-4">
            "You are braver than you believe, stronger than you seem, and smarter than you think."
          </blockquote>
          <cite className="text-muted-foreground">— A.A. Milne</cite>
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;