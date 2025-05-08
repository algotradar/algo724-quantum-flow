import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

interface AuthLoginProps {
  setUser: (user: any) => void;
  isLightMode: boolean;
}

const AuthLogin = ({ setUser, isLightMode }: AuthLoginProps) => {
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  useEffect(() => {
    window.handleSignInWithGoogle = async (response) => {
      const { data, error } = await supabase.auth.signInWithIdToken({
        provider: 'google',
        token: response.credential,
      });
      if (!error) setUser(data.user);
    };

    function initializeAndRenderGoogleButton() {
      if (window.google && window.google.accounts && window.google.accounts.id) {
        window.google.accounts.id.initialize({
          client_id: googleClientId,
          callback: window.handleSignInWithGoogle,
          ux_mode: 'popup',
        });
        window.google.accounts.id.renderButton(
          document.getElementById('google-signin-btn'),
          {
            theme: 'outline',
            size: 'large',
            shape: 'pill',
            text: 'signin_with',
            logo_alignment: 'left',
          }
        );
      }
    }

    if (window.google && window.google.accounts && window.google.accounts.id) {
      initializeAndRenderGoogleButton();
    } else {
      const interval = setInterval(() => {
        if (window.google && window.google.accounts && window.google.accounts.id) {
          initializeAndRenderGoogleButton();
          clearInterval(interval);
        }
      }, 100);
      return () => clearInterval(interval);
    }
  }, [googleClientId, setUser]);

  // Email login component logic
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [message, setMessage] = useState("");

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithOtp({ email });
    if (error) {
      setMessage("Error: " + error.message);
    } else {
      setMessage("Check your email for the login link!");
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        backdropFilter: 'blur(8px)',
        background: isLightMode ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.4)',
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        id="g_id_onload"
        data-client_id={googleClientId}
        data-context="signin"
        data-ux_mode="popup"
        data-callback="handleSignInWithGoogle"
        data-auto_select="true"
        data-itp_support="true"
        data-use_fedcm_for_prompt="true"
      ></div>
      <div id="google-signin-btn"></div>
      <h2 style={{ marginTop: 24, fontSize: 24, fontWeight: 700, color: isLightMode ? '#222' : '#fff' }}>
        {isSignUp ? 'Sign Up for an Account' : 'Sign In to Your Account'}
      </h2>
      <p style={{ marginTop: 8, color: isLightMode ? '#333' : '#eee', fontWeight: 500 }}>
        {isSignUp
          ? 'Create a new account below. Already registered? Switch to sign in.'
          : "Don't have an account? Switch to sign up below."}
      </p>
      <form onSubmit={handleEmailAuth} style={{ marginTop: 24, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <input
          type="email"
          placeholder="Your email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          className="rounded px-3 py-2 border"
          style={{ color: 'black', marginBottom: 8, minWidth: 220 }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          className="rounded px-3 py-2 border"
          style={{ color: 'black', marginBottom: 8, minWidth: 220 }}
        />
        <button
          type="submit"
          className="px-4 py-2 rounded bg-algo-lime text-black font-medium"
          style={{ width: '100%', marginBottom: 8 }}
        >
          {isSignUp ? 'Sign Up' : 'Sign In'}
        </button>
        <button
          type="button"
          onClick={() => { setIsSignUp(!isSignUp); setMessage(""); }}
          className="text-sm font-semibold"
          style={{ background: isLightMode ? '#f0f0f0' : '#222', color: isLightMode ? '#222' : '#fff', border: '1px solid #ccc', borderRadius: 6, padding: '6px 12px', cursor: 'pointer' }}
        >
          {isSignUp ? 'Already have an account? Sign in' : "Need an account? Sign up"}
        </button>
        {message && <div style={{ marginTop: 8, color: isLightMode ? '#d32f2f' : 'white', fontWeight: 'bold' }}>{message}</div>}
      </form>
    </div>
  );
};

export default AuthLogin; 