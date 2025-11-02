import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MessageCircle, Book, Video, Users, AlertTriangle, Clock, MapPin, ExternalLink } from "lucide-react";

const HelpSupport = () => {
  const emergencyContacts = [
    {
      name: "National Suicide Prevention Helpline",
      number: "108",
      description: "24/7 crisis support and suicide prevention",
      availability: "24/7"
    },
    {
      name: "NIMHANS Helpline",
      number: "+91 80 4611 0007",
      description: "Mental health support and guidance",
      availability: "Mon-Sat, 9 AM - 5 PM"
    },
    {
      name: "Sneha Foundation",
      number: "+91 44 2464 0050",
      description: "Emotional support and crisis intervention",
      availability: "24/7"
    },
    {
      name: "iCall Helpline",
      number: "+91 22 2556 3291",
      description: "Psychosocial helpline for mental health support",
      availability: "Mon-Sat, 10 AM - 8 PM"
    }
  ];

  const resources = [
    {
      title: "Understanding Mental Health",
      description: "Learn about common mental health conditions and symptoms",
      icon: Book,
      color: "wellness-gradient-bg",
      topics: ["Depression", "Anxiety", "Stress Management", "Self-Care"]
    },
    {
      title: "Coping Strategies",
      description: "Practical techniques for managing difficult emotions",
      icon: Video,
      color: "uplifting-gradient-bg",
      topics: ["Breathing Exercises", "Mindfulness", "Grounding Techniques", "Sleep Hygiene"]
    },
    {
      title: "Finding Professional Help",
      description: "Guide to accessing mental health services in India",
      icon: Users,
      color: "mindful-gradient-bg",
      topics: ["Types of Therapy", "Finding a Therapist", "Insurance Coverage", "Online Therapy"]
    }
  ];

  const localSupport = [
    {
      city: "Mumbai",
      centers: [
        { name: "Tata Institute of Social Sciences", contact: "+91 22 2552 5000" },
        { name: "KEM Hospital Psychiatry", contact: "+91 22 2417 3333" }
      ]
    },
    {
      city: "Delhi",
      centers: [
        { name: "All India Institute of Medical Sciences", contact: "+91 11 2658 8500" },
        { name: "Institute of Human Behaviour & Allied Sciences", contact: "+91 11 2953 3170" }
      ]
    },
    {
      city: "Bangalore",
      centers: [
        { name: "NIMHANS", contact: "+91 80 2699 5000" },
        { name: "Spandana Healthcare", contact: "+91 80 2549 7777" }
      ]
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">Help & Support</h1>
        <p className="text-muted-foreground">
          Comprehensive resources and professional support for your mental wellness journey
        </p>
      </div>

      {/* Emergency Support Banner */}
      <Card className="p-6 mb-8 bg-destructive/10 border-destructive/20 border-l-4 border-l-destructive">
        <div className="flex items-start space-x-4">
          <AlertTriangle className="w-8 h-8 text-destructive flex-shrink-0 mt-1" />
          <div>
            <h3 className="text-lg font-semibold text-destructive mb-2">Crisis Support</h3>
            <p className="text-foreground mb-4">
              If you're having thoughts of self-harm or suicide, please reach out for immediate help. You are not alone.
            </p>
            <Button className="bg-destructive hover:bg-destructive/90 text-white">
              <Phone className="w-4 h-4 mr-2" />
              Call 108 Now
            </Button>
          </div>
        </div>
      </Card>

      {/* Emergency Contacts */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-6">24/7 Helplines</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {emergencyContacts.map((contact, index) => (
            <Card key={index} className="p-6 gentle-shadow border-0">
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <h3 className="font-semibold text-lg">{contact.name}</h3>
                  <div className="flex items-center space-x-1 text-sm text-wellness-success">
                    <Clock className="w-4 h-4" />
                    <span>{contact.availability}</span>
                  </div>
                </div>
                <p className="text-muted-foreground">{contact.description}</p>
                <div className="flex items-center justify-between pt-3">
                  <div className="flex items-center space-x-2 font-mono text-lg font-semibold text-wellness-primary">
                    <Phone className="w-5 h-5" />
                    <span>{contact.number}</span>
                  </div>
                  <Button 
                    size="sm" 
                    className="wellness-gradient-bg hover:opacity-90 text-white"
                    onClick={() => window.open(`tel:${contact.number}`)}
                  >
                    Call Now
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Educational Resources */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-6">Educational Resources</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {resources.map((resource, index) => {
            const Icon = resource.icon;
            return (
              <Card key={index} className="p-6 gentle-shadow border-0 hover:warm-shadow transition-all duration-200">
                <div className="space-y-4">
                  <div className={`w-12 h-12 ${resource.color} rounded-xl flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">{resource.title}</h3>
                    <p className="text-muted-foreground mb-4">{resource.description}</p>
                    <div className="space-y-2">
                      {resource.topics.map((topic, topicIndex) => (
                        <div key={topicIndex} className="flex items-center space-x-2 text-sm">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                          <span>{topic}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <Button variant="outline" className="w-full hover:bg-accent/20">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Learn More
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Local Mental Health Centers */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-6">Mental Health Centers</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {localSupport.map((location, index) => (
            <Card key={index} className="p-6 gentle-shadow border-0">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-5 h-5 text-wellness-primary" />
                  <h3 className="font-semibold text-lg">{location.city}</h3>
                </div>
                <div className="space-y-3">
                  {location.centers.map((center, centerIndex) => (
                    <div key={centerIndex} className="space-y-2">
                      <h4 className="font-medium">{center.name}</h4>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Phone className="w-4 h-4" />
                        <span className="font-mono">{center.contact}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Online Support Options */}
      <Card className="p-8 uplifting-gradient-bg text-white gentle-shadow border-0">
        <div className="text-center max-w-2xl mx-auto">
          <MessageCircle className="w-12 h-12 mx-auto mb-4 text-white" />
          <h3 className="text-2xl font-semibold mb-4">Online Support Available</h3>
          <p className="text-white/90 mb-6 leading-relaxed">
            Can't make a phone call right now? We understand. There are text-based support options available 
            for when speaking isn't possible or comfortable.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-white/20 text-white border-white/30 hover:bg-white/30 backdrop-blur-sm">
              <Mail className="w-4 h-4 mr-2" />
              Email Support
            </Button>
            <Button className="bg-white/20 text-white border-white/30 hover:bg-white/30 backdrop-blur-sm">
              <MessageCircle className="w-4 h-4 mr-2" />
              Chat Support
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default HelpSupport;