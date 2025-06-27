import { useSession } from "next-auth/react";

interface AvatarProps {
  className?: string;
}

export default function Avatar({ className = "" }: AvatarProps) {
  const { data: session } = useSession();

  return (
    <img src={session?.user?.image ?? ""} alt="Avatar" className={className} />
  );
}
