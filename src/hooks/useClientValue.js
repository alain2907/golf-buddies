import { useEffect, useState } from "react";

/**
 * @param {Function} getClientValue - Fonction pour calculer la valeur côté client.
 * @param {*} fallback - Valeur affichée côté serveur (doit être stable).
 */
export function useClientValue(getClientValue, fallback) {
  const [value, setValue] = useState(fallback);

  useEffect(() => {
    setValue(getClientValue());
  }, [getClientValue]);

  return value;
}