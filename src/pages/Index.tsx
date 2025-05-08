import React, { useEffect, useState } from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import PortfolioSummary from '@/components/dashboard/PortfolioSummary';
import MarketOverview from '@/components/dashboard/MarketOverview';
import RecentActivity from '@/components/dashboard/RecentActivity';
import IndicatorTable from '@/components/dashboard/IndicatorTable';
import EconomicCalendar from '@/components/dashboard/EconomicCalendar';
import SignalHistory from '@/components/dashboard/SignalHistory';
import EntityHoldings from '@/components/dashboard/EntityHoldings';
import { useTheme } from '@/components/theme/ThemeProvider';
import { supabase } from '@/lib/supabaseClient';
import AuthLogin from '@/components/auth/AuthLogin';

declare global {
  interface Window {
    handleSignInWithGoogle: (response: any) => void;
    google: any;
  }
}

const Index = () => {
  const { theme } = useTheme();
  const isLightMode = theme === 'light';
  const [user, setUser] = useState(null);
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => listener?.subscription.unsubscribe();
  }, []);

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
  }, []);

  // Email login component
  function EmailLogin() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleEmailLogin = async (e) => {
      e.preventDefault();
      const { error } = await supabase.auth.signInWithOtp({ email });
      if (error) {
        setMessage("Error: " + error.message);
      } else {
        setMessage("Check your email for the login link!");
      }
    };

    return (
      <form onSubmit={handleEmailLogin} style={{ marginTop: 24 }}>
        <input
          type="email"
          placeholder="Your email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          className="rounded px-3 py-2 border"
          style={{ color: 'black' }}
        />
        <button
          type="submit"
          className="ml-2 px-4 py-2 rounded bg-algo-lime text-black font-medium"
        >
          Email Login
        </button>
        {message && <div style={{ marginTop: 8, color: 'white', fontWeight: 'bold' }}>{message}</div>}
      </form>
    );
  }

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className={`text-4xl font-display font-medium ${isLightMode ? 'text-gray-800' : 'text-white'} mb-2`}>Dashboard</h1>
        <p className={isLightMode ? 'text-gray-600' : 'text-gray-400'}>
          Welcome to Algotradar. Monitor your indicators, and track performance.
        </p>
      </div>
      
      <div className="mb-8">
        <PortfolioSummary />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 flex flex-col gap-y-8">
          <MarketOverview />
          <IndicatorTable isLightMode={isLightMode} />
          <EntityHoldings isLightMode={isLightMode} />
        </div>
        <div className="lg:col-span-1 flex flex-col gap-y-8">
          <SignalHistory isLightMode={isLightMode} />
          <EconomicCalendar isLightMode={isLightMode} />
        </div>
      </div>
      {!user && <AuthLogin setUser={setUser} isLightMode={isLightMode} />}
    </DashboardLayout>
  );
};

export default Index;
