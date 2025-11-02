import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Heart, Smile, Frown, Meh, Sun, Music, BookOpen, Sparkles } from "lucide-react";

const MoodLifter = () => {
  const [currentMood, setCurrentMood] = useState([5]);
  const [selectedActivity, setSelectedActivity] = useState<string | null>(null);

  const moodEmojis = [
    { range: [1, 2], emoji: "😢", label: "Very Low", color: "text-red-500" },
    { range: [3, 4], emoji: "😕", label: "Low", color: "text-orange-500" },
    { range: [5, 6], emoji: "😐", label: "Neutral", color: "text-yellow-500" },
    { range: [7, 8], emoji: "🙂", label: "Good", color: "text-green-500" },
    { range: [9, 10], emoji: "😊", label: "Great", color: "text-blue-500" },
  ];

  const getCurrentMoodEmoji = () => {
    const mood = currentMood[0];
    return moodEmojis.find(m => mood >= m.range[0] && mood <= m.range[1]);
  };

  const moodActivities = [
    {
      id: 'breathing',
      title: '5-Minute Breathing Exercise',
      description: 'Calm your mind with guided deep breathing',
      icon: Sun,
      color: 'wellness-gradient-bg',
      content: {
        title: 'Deep Breathing Exercise',
        instructions: [
          'Find a comfortable seated position',
          'Place one hand on your chest, one on your belly',
          'Breathe in slowly through your nose for 4 counts',
          'Hold your breath for 4 counts',
          'Exhale slowly through your mouth for 6 counts',
          'Repeat this cycle 5-10 times'
        ]
      }
    },
    {
      id: 'gratitude',
      title: 'Gratitude Reflection',
      description: 'Focus on positive aspects of your life',
      icon: Heart,
      color: 'uplifting-gradient-bg',
      content: {
        title: 'Gratitude Practice',
        instructions: [
          'Think of 3 things you\'re grateful for today',
          'They can be big or small',
          'Reflect on why each one matters to you',
          'Write them down if it helps',
          'Feel the positive emotions they bring'
        ]
      }
    },
    {
      id: 'music',
      title: 'Uplifting Music',
      description: 'Listen to mood-boosting playlists',
      icon: Music,
      color: 'mindful-gradient-bg',
      content: {
        title: 'Musical Therapy',
        instructions: [
          'Choose music that makes you feel good',
          'Close your eyes and really listen',
          'Let yourself move or dance if you want',
          'Focus on the rhythm and melody',
          'Sing along if it feels right'
        ]
      }
    },
    {
      id: 'affirmations',
      title: 'Positive Affirmations',
      description: 'Boost confidence with self-love',
      icon: Sparkles,
      color: 'hero-gradient-bg',
      content: {
        title: 'Daily Affirmations',
        instructions: [
          'I am worthy of love and respect',
          'I can handle whatever comes my way',
          'I am growing stronger every day',
          'My feelings are valid and temporary',
          'I choose to focus on what I can control'
        ]
      }
    }
  ];

  const inspirationalQuotes = [
    "The only way out is through. - Robert Frost",
    "You are braver than you believe, stronger than you seem, and smarter than you think. - A.A. Milne",
    "Every storm runs out of rain. - Maya Angelou",
    "You have been assigned this mountain to show others it can be moved. - Mel Robbins",
    "Healing isn't about erasing your past, it's about creating a beautiful future. - Unknown"
  ];

  const currentMoodEmoji = getCurrentMoodEmoji();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">Mood Lifter</h1>
        <p className="text-muted-foreground">
          Track your mood and discover activities to lift your spirits
        </p>
      </div>

      {/* Mood Tracker */}
      <Card className="p-6 mb-8 gentle-shadow border-0">
        <h2 className="text-xl font-semibold mb-6">How are you feeling right now?</h2>
        <div className="space-y-6">
          <div className="text-center">
            <div className="text-6xl mb-4">{currentMoodEmoji?.emoji}</div>
            <div className={`text-lg font-medium ${currentMoodEmoji?.color}`}>
              {currentMoodEmoji?.label}
            </div>
          </div>
          
          <div className="px-4">
            <Slider
              value={currentMood}
              onValueChange={setCurrentMood}
              max={10}
              min={1}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-muted-foreground mt-2">
              <span>Very Low</span>
              <span>Neutral</span>
              <span>Great</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Mood Activities */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-6">Activities to Lift Your Mood</h2>
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          {moodActivities.map((activity) => {
            const Icon = activity.icon;
            return (
              <Card
                key={activity.id}
                className={`p-6 cursor-pointer transition-all duration-200 gentle-shadow hover:warm-shadow border-0 ${
                  selectedActivity === activity.id ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => setSelectedActivity(selectedActivity === activity.id ? null : activity.id)}
              >
                <div className="flex items-start space-x-4">
                  <div className={`w-12 h-12 ${activity.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-2">{activity.title}</h3>
                    <p className="text-muted-foreground text-sm">{activity.description}</p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Selected Activity Details */}
        {selectedActivity && (
          <Card className="p-6 mindful-gradient-bg border-0 gentle-shadow">
            {(() => {
              const activity = moodActivities.find(a => a.id === selectedActivity);
              return activity ? (
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-foreground">
                    {activity.content.title}
                  </h3>
                  <div className="space-y-3">
                    {activity.content.instructions.map((instruction, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="w-6 h-6 wellness-gradient-bg rounded-full flex items-center justify-center text-white text-sm font-medium flex-shrink-0">
                          {index + 1}
                        </div>
                        <p className="text-foreground">{instruction}</p>
                      </div>
                    ))}
                  </div>
                  <Button 
                    className="mt-6 wellness-gradient-bg hover:opacity-90 text-white"
                    onClick={() => setSelectedActivity(null)}
                  >
                    Complete Activity
                  </Button>
                </div>
              ) : null;
            })()}
          </Card>
        )}
      </div>

      {/* Inspirational Quote */}
      <Card className="p-6 uplifting-gradient-bg text-white gentle-shadow border-0">
        <div className="text-center">
          <Sparkles className="w-8 h-8 mx-auto mb-4 text-white" />
          <blockquote className="text-lg font-medium mb-4">
            "{inspirationalQuotes[Math.floor(Math.random() * inspirationalQuotes.length)]}"
          </blockquote>
          <p className="text-white/80 text-sm">
            Remember: Every feeling is temporary. You've got this! 💙
          </p>
        </div>
      </Card>
    </div>
  );
};

export default MoodLifter;