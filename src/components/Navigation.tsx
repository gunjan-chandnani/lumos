import { Button } from "@/components/ui/button";
import { MessageCircle, Heart, Users, HelpCircle, User, Menu, X, LogOut } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/contexts/Auth";

interface NavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const Navigation = ({ activeSection, onSectionChange }: NavigationProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, signOut } = useAuth();

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: User },
    { id: 'chat', label: 'AI Companion', icon: MessageCircle },
    { id: 'mood', label: 'Mood Lifter', icon: Heart },
    { id: 'community', label: 'Community', icon: Users },
    { id: 'help', label: 'Support', icon: HelpCircle },
  ];

  return (
    <nav className="bg-card/80 backdrop-blur-sm border-b border-border gentle-shadow sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 hero-gradient-bg rounded-lg flex items-center justify-center">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              MindSpace
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {navItems.map(({ id, label, icon: Icon }) => (
              <Button
                key={id}
                variant={activeSection === id ? "default" : "ghost"}
                onClick={() => onSectionChange(id)}
                className={`flex items-center space-x-2 transition-all duration-200 ${
                  activeSection === id 
                    ? "wellness-gradient-bg text-white hover:opacity-90" 
                    : "hover:bg-accent/20"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{label}</span>
              </Button>
            ))}
            
            {/* User Menu */}
            <div className="flex items-center space-x-2 ml-4 pl-4 border-l border-border">
              <span className="text-sm text-muted-foreground">
                Welcome, {user?.user_metadata?.full_name || user?.email || 'User'}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={signOut}
                className="flex items-center space-x-1 hover:bg-destructive/10 hover:text-destructive"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </Button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 space-y-2 border-t border-border">
            {navItems.map(({ id, label, icon: Icon }) => (
              <Button
                key={id}
                variant={activeSection === id ? "default" : "ghost"}
                onClick={() => {
                  onSectionChange(id);
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full justify-start space-x-2 transition-all duration-200 ${
                  activeSection === id 
                    ? "wellness-gradient-bg text-white" 
                    : "hover:bg-accent/20"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{label}</span>
              </Button>
            ))}
            
            {/* Mobile User Menu */}
            <div className="pt-2 border-t border-border">
              <div className="text-sm text-muted-foreground mb-2 px-3">
                Welcome, {user?.user_metadata?.full_name || user?.email || 'User'}
              </div>
              <Button
                variant="ghost"
                onClick={signOut}
                className="w-full justify-start space-x-2 hover:bg-destructive/10 hover:text-destructive"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;