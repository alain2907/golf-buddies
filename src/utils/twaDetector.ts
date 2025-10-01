/**
 * Détecte si l'application s'exécute dans une Trusted Web Activity (TWA)
 * Utilisé pour masquer l'invitation PWA dans l'APK Android
 */
export function detectTWA(): boolean {
  // Vérification 1: Referrer contient android-app://
  if (typeof document !== 'undefined' && document.referrer.includes('android-app://')) {
    return true
  }

  // Vérification 2: User Agent contient des indices de WebView
  if (typeof navigator !== 'undefined') {
    const ua = navigator.userAgent
    // 'wv' indique Android WebView
    // Version/ sans Safari/ indique souvent une WebView
    if (ua.includes('wv') || (ua.includes('Version/') && !ua.includes('Safari/'))) {
      return true
    }
  }

  // Vérification 3: API TWA spécifique (si disponible)
  if (typeof window !== 'undefined' && (window as any).TrustedWebActivity) {
    return true
  }

  // Vérification 4: Mode standalone mais pas PWA classique
  if (typeof window !== 'undefined') {
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches
    const hasBeforeInstallPrompt = 'onbeforeinstallprompt' in window

    // Si standalone mais pas d'API PWA, c'est probablement une TWA
    if (isStandalone && !hasBeforeInstallPrompt) {
      return true
    }
  }

  // Vérification 5: Marker explicite en localStorage
  if (typeof localStorage !== 'undefined' && localStorage.getItem('isTWA') === 'true') {
    return true
  }

  return false
}

/**
 * Marque l'application comme TWA dans localStorage
 * À appeler depuis l'activité Android si nécessaire
 */
export function markAsTWA(): void {
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem('isTWA', 'true')
  }
}

/**
 * Hook React pour détecter si on est dans une TWA
 */
export function useTWADetection(): boolean {
  if (typeof window === 'undefined') return false

  return detectTWA()
}