import { h1 } from "framer-motion/client";
import { useSession } from "next-auth/react";

interface UserProps {
  className?: string;
}

export default function User({ className = "" }: UserProps) {
  const { data: session } = useSession();

  return (
    <>
      <p className=" text-sm font-semibold theme-text-primary">
        {session?.user?.name}
      </p>
      <p className="text-xs theme-text-muted">{session?.user?.email}</p>
    </>
  );
}
