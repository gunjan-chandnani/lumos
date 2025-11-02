import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Heart, MessageCircle, Share, Plus, Users, Shield } from "lucide-react";

interface Post {
  id: string;
  content: string;
  author: string;
  timestamp: Date;
  likes: number;
  comments: number;
  isAnonymous: boolean;
}

const Community = () => {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: '1',
      content: "Just wanted to share that I've been practicing meditation for a week now and I'm starting to feel more centered. Small steps, but progress is progress! 🧘‍♀️",
      author: "Anonymous",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      likes: 12,
      comments: 3,
      isAnonymous: true
    },
    {
      id: '2',
      content: "Had a tough day but reminded myself that it's okay to not be okay sometimes. Tomorrow is a new day with new possibilities. 💜",
      author: "Anonymous",
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
      likes: 8,
      comments: 5,
      isAnonymous: true
    },
    {
      id: '3',
      content: "Found an amazing breathing exercise that helped me during a panic attack. Sharing the love and hoping it helps someone else too! Deep breaths, everyone. 🌸",
      author: "Anonymous",
      timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
      likes: 15,
      comments: 7,
      isAnonymous: true
    }
  ]);

  const [newPost, setNewPost] = useState('');
  const [showCreatePost, setShowCreatePost] = useState(false);

  const handleCreatePost = () => {
    if (!newPost.trim()) return;

    const post: Post = {
      id: Date.now().toString(),
      content: newPost,
      author: "Anonymous",
      timestamp: new Date(),
      likes: 0,
      comments: 0,
      isAnonymous: true
    };

    setPosts([post, ...posts]);
    setNewPost('');
    setShowCreatePost(false);
  };

  const handleLike = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, likes: post.likes + 1 }
        : post
    ));
  };

  const formatTimeAgo = (timestamp: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - timestamp.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">Community Space</h1>
        <p className="text-muted-foreground">
          A safe, anonymous space to share experiences and support each other
        </p>
      </div>

      {/* Community Guidelines Banner */}
      <Card className="p-6 mb-8 mindful-gradient-bg border-0 gentle-shadow">
        <div className="flex items-start space-x-4">
          <Shield className="w-8 h-8 text-foreground flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-semibold text-lg mb-2">Community Guidelines</h3>
            <ul className="text-foreground/80 space-y-1 text-sm">
              <li>• Be kind, respectful, and supportive</li>
              <li>• All posts are anonymous to protect privacy</li>
              <li>• Share experiences, not personal details</li>
              <li>• No judgment, only understanding and empathy</li>
            </ul>
          </div>
        </div>
      </Card>

      {/* Create Post Section */}
      <Card className="p-6 mb-8 gentle-shadow border-0">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Share Your Experience</h2>
          <Button
            onClick={() => setShowCreatePost(!showCreatePost)}
            className="wellness-gradient-bg hover:opacity-90 text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Post
          </Button>
        </div>

        {showCreatePost && (
          <div className="space-y-4">
            <Textarea
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              placeholder="Share your thoughts, experiences, or words of encouragement... Remember, this is a safe space."
              className="min-h-[120px] border-accent/20 focus:border-primary"
            />
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Users className="w-4 h-4" />
                <span>Posted anonymously</span>
              </div>
              <div className="space-x-3">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setShowCreatePost(false);
                    setNewPost('');
                  }}
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleCreatePost}
                  disabled={!newPost.trim()}
                  className="wellness-gradient-bg hover:opacity-90 text-white"
                >
                  Share
                </Button>
              </div>
            </div>
          </div>
        )}
      </Card>

      {/* Posts Feed */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Community Posts</h2>
        
        {posts.map((post) => (
          <Card key={post.id} className="p-6 gentle-shadow border-0">
            <div className="space-y-4">
              {/* Post Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 uplifting-gradient-bg rounded-full flex items-center justify-center">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium">Anonymous</p>
                    <p className="text-sm text-muted-foreground">
                      {formatTimeAgo(post.timestamp)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Post Content */}
              <div className="pl-13">
                <p className="text-foreground leading-relaxed">{post.content}</p>
              </div>

              {/* Post Actions */}
              <div className="pl-13 flex items-center space-x-6 pt-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleLike(post.id)}
                  className="text-muted-foreground hover:text-wellness-primary transition-colors"
                >
                  <Heart className="w-4 h-4 mr-2" />
                  {post.likes}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground hover:text-wellness-primary transition-colors"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  {post.comments}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground hover:text-wellness-primary transition-colors"
                >
                  <Share className="w-4 h-4 mr-2" />
                  Share Support
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Encouragement Banner */}
      <Card className="mt-8 p-6 uplifting-gradient-bg text-white gentle-shadow border-0">
        <div className="text-center">
          <Heart className="w-12 h-12 mx-auto mb-4 text-white" />
          <h3 className="text-xl font-semibold mb-2">You're Not Alone</h3>
          <p className="text-white/90">
            Every story shared here creates a ripple of hope. Your experience might be exactly what someone else needs to hear today.
          </p>
        </div>
      </Card>
    </div>
  );
};

export default Community;