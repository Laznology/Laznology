"use client";

import { useEffect, useState, useRef } from "react";
import { MessageSquareIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import GuestbookHeader from "@/components/guestbook-header";
import GuestbookList from "@/components/guestbook-list";
import { AuthModal } from "@/components/auth-modal";
import TegamiModal from "@/components/tegami-modal";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";
import { Guestbook } from "@/types/guestbook";

export default function GuestbookPage() {
  const [guestbooks, setGuestbooks] = useState<Guestbook[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [userLoading, setUserLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  const loadGuestbooks = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/guestbooks");
      if (!response.ok) {
        throw new Error("Failed to fetch guestbooks");
      }

      const data: Guestbook[] = await response.json();
      setGuestbooks(data);
    } catch (error) {
      console.error("Error loading guestbooks:", error);
    } finally {
      setLoading(false);
    }
  };

  const checkUser = async () => {
    try {
      setUserLoading(true);
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    } catch (error) {
      console.error("Error checking user:", error);
    } finally {
      setUserLoading(false);
    }
  };

  useEffect(() => {
    loadGuestbooks();
    checkUser();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative h-full min-h-0 overflow-hidden bg-background"
    >
      {!userLoading && user && <TegamiModal onMessageSent={loadGuestbooks} />}

      <div className="relative z-20 flex h-full min-h-0 flex-col items-center px-4 py-6 sm:px-6 sm:py-10">
        <div className="flex w-full max-w-2xl flex-1 min-h-0 flex-col gap-6 sm:gap-8">
          <GuestbookHeader loading={loading} />

          {!userLoading && !user && (
            <div className="flex justify-center">
              <AuthModal>
                <Button
                  size="lg"
                  className="flex items-center gap-2 rounded-full bg-foreground text-background transition-colors duration-200 hover:bg-foreground/90"
                >
                  <MessageSquareIcon className="h-4 w-4" />
                  Sign in to leave a message
                </Button>
              </AuthModal>
            </div>
          )}

          <GuestbookList guestbooks={guestbooks} loading={loading} />
        </div>
      </div>
    </div>
  );
}
