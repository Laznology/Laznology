'use client';

import { useEffect, useState, useRef } from 'react';
import { fetchGuestbooks } from '@/lib/api/guestbook';
import { Guestbook } from '@/types/guestbook';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { LogInIcon, MessageSquareIcon } from 'lucide-react';
import TegamiModal from '@/components/tegami-modal';
import FloatingShapes from '@/components/floating-shapes';
import GuestbookHeader from '@/components/guestbook-header';
import GuestbookList from '@/components/guestbook-list';
import { AuthModal } from '@/components/auth-modal';

export default function GuestbookPage() {
  const [guestbooks, setGuestbooks] = useState<Guestbook[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [userLoading, setUserLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  const loadGuestbooks = async () => {
    try {
      setLoading(true);
      const data = await fetchGuestbooks();
      setGuestbooks(data);
    } catch (error) {
      console.error('Error loading guestbooks:', error);
    } finally {
      setLoading(false);
    }
  };

  const checkUser = async () => {
    try {
      setUserLoading(true);
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    } catch (error) {
      console.error('Error checking user:', error);
    } finally {
      setUserLoading(false);
    }
  };


  useEffect(() => {
    loadGuestbooks();
    checkUser();
  }, []);

  return (
    <div ref={containerRef} className="h-full bg-background relative overflow-hidden">   
      {!userLoading && (
        user ? (
          <TegamiModal onMessageSent={loadGuestbooks} />
        ) : (
          <AuthModal />
        )
      )}
      
      <FloatingShapes />

      <div className="relative z-20 px-3 sm:px-6 py-4 sm:py-8 h-full flex flex-col">

        <GuestbookHeader loading={loading} />
        <GuestbookList guestbooks={guestbooks} loading={loading} />
      </div>
    </div>
  );
}
