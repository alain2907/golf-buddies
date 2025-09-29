import { useEffect } from "react";

export function useHydrationDebug() {
  useEffect(() => {
    const serverHTML = document.documentElement.outerHTML;
    requestAnimationFrame(() => {
      const clientHTML = document.documentElement.outerHTML;

      if (serverHTML !== clientHTML) {
        console.warn("⚠️ Mismatch détecté entre serveur et client !");
        // Compare les deux chaînes et log les premières différences
        const maxLen = Math.min(serverHTML.length, clientHTML.length);
        for (let i = 0; i < maxLen; i++) {
          if (serverHTML[i] !== clientHTML[i]) {
            console.log("🔎 Différence trouvée à l'index", i);
            console.log("Serveur :", serverHTML.slice(i, i + 50));
            console.log("Client  :", clientHTML.slice(i, i + 50));
            break;
          }
        }
      } else {
        console.log("✅ Pas de mismatch détecté, hydratation OK !");
      }
    });
  }, []);
}