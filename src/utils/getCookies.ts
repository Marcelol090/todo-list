export function getCookie(name: string): string | null {
    const cookieName = name + "=";
    const cookies = document.cookie.split(";");
  
    for (let cookie of cookies) {
      cookie = cookie.trim();
      if (cookie.startsWith(cookieName)) {
        return cookie.substring(cookieName.length);
      }
    }
  
    return null;
  }