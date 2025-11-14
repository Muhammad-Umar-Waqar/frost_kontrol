// import { useContext, createContext, useState } from "react";

// const Storecontext = createContext()

// export const StoreContextProvider = ({ children }) => {
//     // Static user state - Backend developer will replace with real auth
//     const [User, setUser] = useState({})
//     const token = localStorage.getItem('token') || null
//     const IsLoggedIn = !!token

//     const LogoutTrue = () => {
//         localStorage.removeItem('token')
//         setUser({})
//     }

//     // Placeholder - Backend developer will implement
//     const getUser = () => {
//         // TODO: Backend developer will implement user fetching logic
//         console.log('getUser - Backend developer should implement this')
//     }

//     return <Storecontext.Provider value={{ token, IsLoggedIn, LogoutTrue, User, getUser, setUser }}>
//         {children}
//     </Storecontext.Provider>
// }

// export const useStore=()=>{
//     const contextvalue=useContext(Storecontext)
//     if(!contextvalue){
//         throw new Error("use context must be inside the provider")
//     }

//     return contextvalue
// }












// import { useContext, createContext, useState, useEffect } from "react";

// const Storecontext = createContext();

// export const StoreContextProvider = ({ children }) => {
//   const [User, setUser] = useState({});
//   const token = localStorage.getItem("token") || null;
//   const IsLoggedIn = !!token;


//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) {
//       setUser(JSON.parse(storedUser));
//     }
//   }, []);

//   useEffect(() => {
//     if (User && Object.keys(User).length > 0) {
//       localStorage.setItem("user", JSON.stringify(User));
//     }
//   }, [User]);

//   const LogoutTrue = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     setUser({});
//   };

//   const getUser = async () => {
//     // Future backend fetch logic will go here
//     console.log("getUser - backend developer should implement this");
//   };

//   return (
//     <Storecontext.Provider
//       value={{ token, IsLoggedIn, LogoutTrue, User, getUser, setUser }}
//     >
//       {children}
//     </Storecontext.Provider>
//   );
// };

// export const useStore = () => {
//   const contextvalue = useContext(Storecontext);
//   if (!contextvalue) {
//     throw new Error("use context must be inside the provider");
//   }
//   return contextvalue;
// };






// // StoreContext.js
// import { createContext, useContext, useEffect, useMemo, useState } from "react";

// const StoreContext = createContext(undefined);

// export const StoreProvider = ({ children }) => {
//   // Initialize token safely
//   const [token, setToken] = useState(() => {
//     try {
//       return typeof window !== "undefined" ? localStorage.getItem("token") : null;
//     } catch {
//       return null;
//     }
//   });

//   // Initialize user safely
//   const [user, setUser] = useState(() => {
//     try {
//       if (typeof window === "undefined") return null;
//       const raw = localStorage.getItem("user");
//       return raw ? JSON.parse(raw) : null;
//     } catch {
//       return null;
//     }
//   });

//   const isLoggedIn = useMemo(() => !!token, [token]);

//   // Sync user → localStorage
//   useEffect(() => {
//     try {
//       if (user && Object.keys(user).length > 0) {
//         localStorage.setItem("user", JSON.stringify(user));
//       } else {
//         localStorage.removeItem("user");
//       }
//     } catch {}
//   }, [user]);

//   // Sync token → localStorage
//   useEffect(() => {
//     try {
//       if (token) {
//         localStorage.setItem("token", token);
//       } else {
//         localStorage.removeItem("token");
//       }
//     } catch {}
//   }, [token]);

//   // Centralized login action
//   const login = ({ token: newToken, user: newUser }) => {
//     setToken(newToken);
//     setUser(newUser ?? {});
//   };

//   // Logout action
//   const LogoutTrue = () => {
//     setToken(null);
//     setUser(null);
//   };

//   // Example async fetch (future backend integration)
//   const getUser = async () => {
//     try {
//       if (!token) return null;
//       const res = await fetch("/api/me", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       if (!res.ok) throw new Error("Failed to fetch user");
//       const data = await res.json();
//       setUser(data);
//       return data;
//     } catch (err) {
//       console.error("getUser error:", err);
//       return null;
//     }
//   };

  // const value = useMemo(
  //   () => ({ token, isLoggedIn, user, login, LogoutTrue, getUser }),
  //   [token, isLoggedIn, user]
  // );

//   return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
// };

// // Custom hook with safety check
// export const useStore = () => {
//   const ctx = useContext(StoreContext);
//   if (!ctx) throw new Error("useStore must be used inside a StoreProvider");
//   return ctx;
// };















// src/contexts/storecontexts.js
import { createContext, useContext, useEffect, useMemo, useState } from "react";

const StoreContext = createContext(undefined);

export const StoreProvider = ({ children }) => {
  // token from localStorage (optional; backend may rely on httpOnly cookie)
  const [token, setToken] = useState(() => {
    try {
      if (typeof window === "undefined") return null;
      return localStorage.getItem("token");
    } catch {
      return null;
    }
  });

  const [user, setUser] = useState(() => {
    try {
      if (typeof window === "undefined") return null;
      const raw = localStorage.getItem("user");
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  // loading indicates we're verifying session (used by route guards)
  const [loading, setLoading] = useState(true);

  const isLoggedIn = useMemo(() => !!token || !!user, [token, user]);

  // keep localStorage in sync (still useful for client-side state)
  useEffect(() => {
    try {
      if (user && Object.keys(user).length > 0) {
        localStorage.setItem("user", JSON.stringify(user));
      } else {
        localStorage.removeItem("user");
      }
    } catch {}
  }, [user]);

  useEffect(() => {
    try {
      if (token) {
        localStorage.setItem("token", token);
      } else {
        localStorage.removeItem("token");
      }
    } catch {}
  }, [token]);

  // Call backend to verify session / get current user.
  // This supports both cookie-based auth (httpOnly cookie) and token-in-localStorage flows.
  const verifySession = async () => {
    setLoading(true);
    try {
      const BASE = import.meta.env.VITE_BACKEND_API || "http://localhost:5050";
      // Call a safe endpoint that returns the logged user when valid
      const res = await fetch(`${BASE}/auth/verify/me`, {
        method: "GET",
        credentials: "include", // required if backend uses cookies
        headers: {
          "Content-Type": "application/json",
          // include local token if server expects Authorization header (optional)
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });

      if (!res.ok) {
        // Not authorized or no session
        setUser(null);
        // If server provides a new token or info, you can parse here.
        setToken((prev) => prev); // leave token as is if you want; but usually clear
        setLoading(false);
        return null;
      }

      const data = await res.json();
      // expected: { user: {...} } or user object — adapt if needed
      const fetchedUser = data.user ?? data;
      setUser(fetchedUser);
      // If backend returns token rotation, handle it like:
      // if (data.token) setToken(data.token)
      setLoading(false);
      return fetchedUser;
    } catch (err) {
      console.error("verifySession error:", err);
      setUser(null);
      setLoading(false);
      return null;
    }
  };

  // Run session verification once on mount
  useEffect(() => {
    verifySession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Centralized login: save token (if provided) and user
  const login = ({ token: newToken, user: newUser }) => {
    if (newToken) setToken(newToken);
    if (newUser) setUser(newUser);
  };

  // Logout: clear local state and optionally call backend logout
  const LogoutTrue = async (callBackend = true) => {
    try {
      if (callBackend) {
        const BASE = import.meta.env.VITE_BACKEND_API || "http://localhost:5050";
        await fetch(`${BASE}/auth/logout`, {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        }).catch(() => {});
      }
    } catch (e) {
      // swallow
    } finally {
      setToken(null);
      setUser(null);
    }
  };

  // fetch fresh user on demand
  const getUser = async () => {
    return verifySession();
  };

  // helper for role checking
  const hasRole = (role) => {
    if (!user) return false;
    return user.role === role || (Array.isArray(user.roles) && user.roles.includes(role));
  };

  const value = useMemo(
    () => ({ token, isLoggedIn, user, login, LogoutTrue, getUser, verifySession, loading, hasRole }),
    [token, isLoggedIn, user, loading]
  );


  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
};

export const useStore = () => {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside a StoreProvider");
  return ctx;
};
