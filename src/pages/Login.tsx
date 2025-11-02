import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GoogleLogin, CredentialResponse } from '@react-oauth/google';
import { mockAuth } from "@/lib/mockAuth";
import { GoogleAuthService } from "@/lib/googleAuth";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Handle Google OAuth success
  const handleGoogleSuccess = async (credentialResponse: CredentialResponse) => {
    if (!credentialResponse.credential) {
      toast({ title: "Google Sign-In Failed", description: "No credential received from Google" });
      return;
    }

    setLoading(true);
    try {
      // Decode the Google token to get user info
      const userInfo = GoogleAuthService.decodeGoogleToken(credentialResponse.credential);
      
      console.log('Google user info decoded:', userInfo);
      
      // Store the token and user data
      GoogleAuthService.storeSessionToken(credentialResponse.credential);
      GoogleAuthService.storeUserData({
        id: userInfo.sub,
        email: userInfo.email,
        name: userInfo.name,
        picture: userInfo.picture,
        user_metadata: {
          full_name: userInfo.name,
          avatar_url: userInfo.picture
        }
      });

      toast({ 
        title: "Google Sign-In Successful", 
        description: `Welcome, ${userInfo.name}!` 
      });
      
      console.log('Stored user data, triggering navigation...');
      
      // Trigger a custom event to notify auth context
      window.dispatchEvent(new Event('storage'));
      
      // Small delay to allow auth context to update
      setTimeout(() => {
        navigate('/');
      }, 500);
      
    } catch (error: any) {
      console.error('Google sign-in error:', error);
      toast({ 
        title: "Google Sign-In Failed", 
        description: error.message || "An error occurred during Google sign-in" 
      });
    } finally {
      setLoading(false);
    }
  };

  // Handle Google OAuth error
  const handleGoogleError = () => {
    toast({ 
      title: "Google Sign-In Cancelled", 
      description: "You cancelled the Google sign-in process" 
    });
  };

  const handleEmailSignUp = async () => {
    if (!email || !password) {
      toast({ title: "Missing fields", description: "Please provide email and password." });
      return;
    }
    setLoading(true);
    try {
      const { data, error } = await mockAuth.signUp({ email, password });
      // eslint-disable-next-line no-console
      console.debug("signUp response:", { data, error });
      if (error) throw error;
      toast({ title: "Welcome!", description: "You have been signed up and logged in." });
      // After signUp, session may be created depending on email confirmation settings
      if (data?.user) navigate('/');
    } catch (err: any) {
      // eslint-disable-next-line no-console
      console.error("Sign up failed:", err);
      const message = err?.message || err?.error_description || String(err);
      toast({ title: "Sign up failed", description: message });
    } finally {
      setLoading(false);
    }
  };

  const handleEmailSignIn = async () => {
    if (!email || !password) {
      toast({ title: "Missing fields", description: "Please provide email and password." });
      return;
    }
    setLoading(true);
    try {
      const { data, error } = await mockAuth.signInWithPassword({ email, password });
      // eslint-disable-next-line no-console
      console.debug("signInWithPassword response:", { data, error });
      if (error) throw error;
      toast({ title: "Signed in", description: `Welcome back${data?.user?.email ? ` — ${data.user.email}` : ""}` });
      navigate('/');
    } catch (err: any) {
      // eslint-disable-next-line no-console
      console.error("Sign in failed:", err);
      const message = err?.message || err?.error_description || String(err);
      toast({ title: "Sign in failed", description: message });
    } finally {
      setLoading(false);
    }
  };

  // Only email/password sign-up/sign-in are supported in this build.

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="max-w-md w-full rounded-lg p-8 bg-card shadow">
        <h1 className="text-2xl font-semibold mb-6">Sign in</h1>

        <div className="space-y-4">
          {/* Google Sign-In Button */}
          <div className="space-y-2">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
              useOneTap={false}
              theme="outline"
              size="large"
              text="continue_with"
              shape="rectangular"
              width="100%"
            />
            <p className="text-xs text-muted-foreground text-center">
              We'll never post anything without your consent.
            </p>
          </div>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">Or continue with email</span>
            </div>
          </div>

          {/* Email/Password Form */}
          <div className="grid grid-cols-1 gap-2">
            <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <div className="flex gap-2">
              <Button onClick={handleEmailSignIn} disabled={loading}>Sign in</Button>
              <Button variant="outline" onClick={handleEmailSignUp} disabled={loading}>Sign up</Button>
            </div>
          </div>

          <p className="text-sm text-muted-foreground mt-2">We'll never share your information. Sign up or sign in using your email and password.</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
