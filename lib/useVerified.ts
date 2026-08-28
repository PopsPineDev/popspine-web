"use client";

import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { isVerified, VERIFIED_EVENT } from "@/lib/verified";

/**
 * Shared hook: is the connected wallet inside its 24h "signature verified"
 * window? Evaluated in an effect so SSR and the first client paint agree,
 * and re-checked whenever the proof card broadcasts a fresh verification.
 */
export function useVerified(): boolean {
  const { isConnected, address } = useAccount();
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    const check = () =>
      setVerified(Boolean(isConnected && address && isVerified(address)));
    check();
    window.addEventListener(VERIFIED_EVENT, check);
    return () => window.removeEventListener(VERIFIED_EVENT, check);
  }, [isConnected, address]);

  return verified;
}
