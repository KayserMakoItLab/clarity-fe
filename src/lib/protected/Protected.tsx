"use client";
import { Loading } from "@/screens";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

type Props = {
  children: React.ReactElement;
};

const ProtectedLayout = ({ children }: Props): JSX.Element => {
  const router = useRouter();
  const { status: sessionStatus } = useSession();

  const authorized = sessionStatus === "authenticated";
  const unAuthorized = sessionStatus === "unauthenticated";
  const loading = sessionStatus === "loading";

  useEffect(() => {
    if (loading) return;

    if (unAuthorized) {
      router.push("/login");
    }
  }, [loading, unAuthorized, sessionStatus, router]);

  if (loading) {
    return <Loading />;
  }

  return <div>{children}</div>;
};

export default ProtectedLayout;
