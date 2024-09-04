import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

type CustomJwtPayload = {
  userId?: number;
  email?: string;
  name?: string;
};

export function useAuth() {
  const [user, setUser] = useState<CustomJwtPayload | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTokenData = () => {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("auth_token="))
        ?.split("=")[1];

      if (token) {
        try {
          const decoded = jwtDecode<CustomJwtPayload>(token);
          setUser(decoded);
        } catch (error) {
          console.error("Failed to decode token:", error);
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    };

    fetchTokenData();
  }, []);

  return { user, loading };
}
