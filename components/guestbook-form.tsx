"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { Textarea } from "./ui/textarea";
import type { User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";
import gsap from "gsap";
import { useRef } from "react";
import { SplitText } from "gsap/SplitText";
gsap.registerPlugin(SplitText);

interface GuestbookFormProps {
  onSuccess?: () => void;
}

export default function GuestbookForm({ onSuccess }: GuestbookFormProps) {
  const [user, setuser] = useState<User | null>(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const text = useRef<HTMLDivElement>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [kawaiiFaces] = useState([
    "(◕‿◕)",
    "(｡◕‿◕｡)",
    "(つ✧ω✧)つ",
    "ヽ(´▽`)ノ",
    "(◡ ‿ ◡)",
    "♪(´▽｀)♪",
    "(◔‿◔)",
    "(￣▽￣)",
  ]);
  const [currentFaceIndex, setCurrentFaceIndex] = useState(0);
  const handleInput = () => {
    if (!text.current) return;

    const nextIndex = (currentFaceIndex + 1) % kawaiiFaces.length;
    setCurrentFaceIndex(nextIndex);

    text.current.textContent = kawaiiFaces[nextIndex];

    const kawaii = SplitText.create(text.current, { type: "chars" });

    gsap.set(kawaii.chars, {
      scale: 0,
      autoAlpha: 0,
      y: -20,
      rotation: -15,
    });

    gsap.to(kawaii.chars, {
      scale: 1,
      autoAlpha: 1,
      y: 0,
      rotation: 0,
      duration: 0.3,
      ease: "back.out(2)",
      stagger: {
        amount: 0.8,
        from: "start",
      },
      onComplete: () => {
        gsap.to(kawaii.chars, {
          scale: 1.1,
          duration: 0.1,
          yoyo: true,
          repeat: 1,
          ease: "power2.inOut",
          stagger: 0.02,
        });
      },
    });
  };

  const supabase = createClient();
  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setuser(user);
      setAuthLoading(false);
    };
    getUser();
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setuser(session?.user || null);
      setAuthLoading(false);
    });
    return () => subscription.unsubscribe();
  }, [supabase.auth]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) {
      toast.error("Message cannot be empty");
      return;
    }
    if (!user) {
      toast.error("Please login to sign the guestbook");
      return;
    }
    const name =
      user.user_metadata.name || user.user_metadata.full_name || user.email;
    const avatarUrl = user.user_metadata.avatar_url || "";

    try {
      setLoading(true);
      const response = await fetch("/api/guestbooks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: message.trim(),
          name,
          avatarUrl,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to sign guestbook");
      }

      await response.json();
      toast.success("Guestbook signed successfully");
      setMessage("");
      onSuccess?.();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to sign guestbook",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog onOpenChange={setDialogOpen} open={dialogOpen}>
      <DialogTrigger>
        <Button
          asChild
          variant="outline"
          className="w-full"
          disabled={loading || authLoading}
        >
          <span>Add Guestbook</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 flex-wrap">
            <span>Leave Guestbook</span>
            <span
              ref={text}
              className="inline-block text-lg font-normal transition-all duration-300 w-16 text-center overflow-hidden whitespace-nowrap"
            >
              {kawaiiFaces[currentFaceIndex]}
            </span>
          </DialogTitle>
          <DialogDescription>
            Share your thoughts and leave a message in our guestbook!
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <Textarea
            onInput={handleInput}
            placeholder="Write your message here... "
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full h-32 resize-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
          />
          <Button
            type="submit"
            disabled={loading || !user}
            className="w-full text-white font-semibold py-2 px-6 rounded-lg shadow-lg transform transition-all duration-200 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin" />
                Adding...
              </div>
            ) : (
              <span className="flex items-center gap-2">Sign Guestbook</span>
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
