import { useState } from "react";
import Navigation from "@/components/Navigation";
import Dashboard from "@/components/sections/Dashboard";
import ChatCompanion from "@/components/sections/ChatCompanion";
import MoodLifter from "@/components/sections/MoodLifter";
import Community from "@/components/sections/Community";
import HelpSupport from "@/components/sections/HelpSupport";

const Index = () => {
  const [activeSection, setActiveSection] = useState('dashboard');

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard onSectionChange={setActiveSection} />;
      case 'chat':
        return <ChatCompanion />;
      case 'mood':
        return <MoodLifter />;
      case 'community':
        return <Community />;
      case 'help':
        return <HelpSupport />;
      default:
        return <Dashboard onSectionChange={setActiveSection} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation 
        activeSection={activeSection} 
        onSectionChange={setActiveSection} 
      />
      <main>
        {renderActiveSection()}
      </main>
    </div>
  );
};

export default Index;
