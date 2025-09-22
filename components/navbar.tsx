"use client";
import Link from "next/link";
import { AuthModal } from "./auth-modal";
import ProfileNavbar from "./auth/profile-navbar";
import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import Sidebar from "@/components/sidebar";

const navItems = [
  {
    title: "Home",
    href: "/",
  },
  // {
  //   title: "About",
  //   href: "/about"
  // },
  // {
  //   title: "Project",
  //   href: "/projects"
  // },
  {
    title: "Guestbook",
    href: "/guestbook",
  },
];

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      setLoading(false);
    };

    getSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [supabase]);

  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center justify-between w-full md:w-auto gap-2">
        <div className="p-1 rounded-lg items-center transition-transform duration-300">
          <Sidebar />
        </div>
        <Link href="/" className="md:flex items-center hidden">
          <h1 className="text-xl font-bold">LAZNOLOGY</h1>
        </Link>
      </div>
      <Link href="/" className="md:hidden flex items-center">
        <h1 className="text-xl font-bold">LAZNOLOGY</h1>
      </Link>

      <div className="hidden md:flex items-center gap-4">
        {navItems.map((item) => (
          <Link
            key={item.title}
            href={item.href}
            className="relative px-3 font-antonio uppercase text-sm tracking-wider hover:text-black transition-all duration-300 rounded-md group"
          >
            <span className="relative z-10 font-bold">{item.title}</span>
            <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></div>
          </Link>
        ))}
      </div>

      {/* <div className="flex items-center">
				{!loading && (user ? <ProfileNavbar user={user} /> : <AuthModal />)}
			</div> */}
    </div>
  );
}
