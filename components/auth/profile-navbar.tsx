import { createClient } from "@/lib/supabase/client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ProfileNavbarProps {
  user?: {
    email?: string | undefined;
    user_metadata: {
      avatar_url?: string;
      full_name?: string;
      name?: string;
    };
  } | null;
}

export default function ProfileNavbar({ user }: ProfileNavbarProps) {
  const router = useRouter();
  const supabase = createClient();
  const avatarUrl = user?.user_metadata.avatar_url;

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error signing out:", error);
    } else {
      router.push("/");
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-full">
        <Avatar>
          <AvatarImage
            src={avatarUrl}
            alt={user?.user_metadata.full_name || "User avatar"}
            referrerPolicy="no-referrer"
            crossOrigin="anonymous"
          />
          <AvatarFallback>
            {user?.user_metadata.full_name?.charAt(0) ||
              user?.email?.charAt(0) ||
              "U"}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>
          {user?.user_metadata.full_name || user?.user_metadata.name}
        </DropdownMenuLabel>
        <DropdownMenuItem>{user?.email}</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut}>Sign Out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
