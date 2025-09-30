'use client'
import { useState, useEffect } from 'react'
import { X, Download, Smartphone, ChevronRight, Globe, Info } from 'lucide-react'
import styles from './PWAInstaller.module.css'

interface BrowserInfo {
  name: string
  version: string
  os: string
  isCompatible: boolean
  canAutoPrompt: boolean
}

export default function PWAInstaller() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [showInstallPrompt, setShowInstallPrompt] = useState(false)
  const [showManualGuide, setShowManualGuide] = useState(false)
  const [isInstalled, setIsInstalled] = useState(false)
  const [browserInfo, setBrowserInfo] = useState<BrowserInfo>({
    name: 'unknown',
    version: '',
    os: 'unknown',
    isCompatible: false,
    canAutoPrompt: false
  })

  // Détecter le navigateur et l'OS
  const detectBrowser = (): BrowserInfo => {
    const ua = navigator.userAgent
    const platform = navigator.platform || ''

    let name = 'unknown'
    let version = ''
    let os = 'unknown'
    let isCompatible = false
    let canAutoPrompt = false

    // Détection OS
    if (/iPhone|iPad|iPod/.test(ua)) {
      os = 'ios'
    } else if (/Android/.test(ua)) {
      os = 'android'
    } else if (/Mac/.test(platform)) {
      os = 'macos'
    } else if (/Win/.test(platform)) {
      os = 'windows'
    } else if (/Linux/.test(platform)) {
      os = 'linux'
    }

    // Détection navigateur
    let match
    if ((match = ua.match(/Firefox\/([0-9.]+)/))) {
      name = 'firefox'
      version = match[1]
      isCompatible = os === 'android'
      canAutoPrompt = false
    } else if ((match = ua.match(/FxiOS\/([0-9.]+)/))) {
      name = 'firefox-ios'
      version = match[1]
      isCompatible = false
    } else if ((match = ua.match(/Focus\/([0-9.]+)/))) {
      name = 'firefox-focus'
      version = match[1]
      isCompatible = false
    } else if ((match = ua.match(/OPR\/([0-9.]+)|Opera\/([0-9.]+)/))) {
      name = 'opera'
      version = match[1] || match[2]
      isCompatible = true
      canAutoPrompt = os !== 'ios'
    } else if ((match = ua.match(/CriOS\/([0-9.]+)/))) {
      name = 'chrome-ios'
      version = match[1]
      isCompatible = false
    } else if ((match = ua.match(/EdgiOS\/([0-9.]+)/))) {
      name = 'edge-ios'
      version = match[1]
      isCompatible = false
    } else if ((match = ua.match(/Edg\/([0-9.]+)/))) {
      name = 'edge'
      version = match[1]
      isCompatible = true
      canAutoPrompt = true
    } else if ((match = ua.match(/Chrome\/([0-9.]+)/))) {
      name = 'chrome'
      version = match[1]
      isCompatible = true
      canAutoPrompt = os !== 'ios'
    } else if ((match = ua.match(/Version\/([0-9.]+).*Safari/))) {
      name = 'safari'
      version = match[1]
      isCompatible = os === 'ios' || os === 'macos'
      canAutoPrompt = false
    } else if (/Samsung/.test(ua)) {
      name = 'samsung'
      isCompatible = true
      canAutoPrompt = true
    } else if (/DuckDuckGo/.test(ua)) {
      name = 'duckduckgo'
      isCompatible = false
    } else if (/Brave/.test(ua)) {
      name = 'brave'
      isCompatible = true
      canAutoPrompt = os !== 'ios'
    }

    return { name, version, os, isCompatible, canAutoPrompt }
  }

  useEffect(() => {
    const browser = detectBrowser()
    setBrowserInfo(browser)

    // Vérifier si déjà installé
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true)
      return
    }

    // Écouter l'événement beforeinstallprompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e)

      const visits = parseInt(localStorage.getItem('golfBuddiesVisits') || '0')
      localStorage.setItem('golfBuddiesVisits', (visits + 1).toString())

      if (visits >= 2 && !localStorage.getItem('golfBuddiesPWADismissed')) {
        setTimeout(() => setShowInstallPrompt(true), 3000)
      }
    }

    // Écouter l'événement appinstalled
    const handleAppInstalled = () => {
      setIsInstalled(true)
      setShowInstallPrompt(false)
      setShowManualGuide(false)
      setDeferredPrompt(null)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    window.addEventListener('appinstalled', handleAppInstalled)

    // Pour Safari et Firefox, afficher le guide après quelques visites
    if (browser.isCompatible && !browser.canAutoPrompt) {
      const visits = parseInt(localStorage.getItem('golfBuddiesVisits') || '0')
      localStorage.setItem('golfBuddiesVisits', (visits + 1).toString())

      if (visits >= 2 && !localStorage.getItem('golfBuddiesPWADismissed')) {
        setTimeout(() => setShowManualGuide(true), 5000)
      }
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
      window.removeEventListener('appinstalled', handleAppInstalled)
    }
  }, [])

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      setShowInstallPrompt(false)
      setShowManualGuide(true)
      return
    }

    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice

    if (outcome === 'accepted') {
      console.log('PWA installé')
    }

    setDeferredPrompt(null)
    setShowInstallPrompt(false)
  }

  const handleDismiss = () => {
    setShowInstallPrompt(false)
    setShowManualGuide(false)
    localStorage.setItem('golfBuddiesPWADismissed', Date.now().toString())
  }

  const getInstallInstructions = () => {
    const { name, os } = browserInfo

    const instructions: Record<string, { title: string; steps: string[] }> = {
      'safari-ios': {
        title: 'Safari sur iPhone/iPad',
        steps: [
          'Appuyez sur le bouton Partager en bas de l\'écran',
          'Faites défiler et appuyez sur "Sur l\'écran d\'accueil"',
          'Appuyez sur "Ajouter" en haut à droite',
          'L\'app apparaîtra sur votre écran d\'accueil'
        ]
      },
      'safari-macos': {
        title: 'Safari sur Mac',
        steps: [
          'Cliquez sur Fichier dans la barre de menu',
          'Sélectionnez "Ajouter au Dock"',
          'L\'app apparaîtra dans votre Dock'
        ]
      },
      'chrome-android': {
        title: 'Chrome sur Android',
        steps: [
          'Appuyez sur les 3 points en haut à droite',
          'Sélectionnez "Installer l\'application"',
          'Confirmez en appuyant sur "Installer"',
          'L\'app apparaîtra sur votre écran d\'accueil'
        ]
      },
      'chrome-desktop': {
        title: 'Chrome sur ordinateur',
        steps: [
          'Cliquez sur l\'icône d\'installation dans la barre d\'adresse',
          'Ou cliquez sur les 3 points > "Installer Golf Buddies"',
          'Confirmez l\'installation',
          'L\'app s\'ouvrira dans sa propre fenêtre'
        ]
      },
      'firefox-android': {
        title: 'Firefox sur Android',
        steps: [
          'Appuyez sur les 3 points en bas',
          'Sélectionnez "Installer"',
          'L\'app sera ajoutée à votre écran d\'accueil'
        ]
      },
      'edge': {
        title: 'Microsoft Edge',
        steps: [
          'Cliquez sur les 3 points en haut à droite',
          'Sélectionnez "Applications" > "Installer ce site"',
          'Confirmez l\'installation',
          'L\'app s\'ouvrira dans sa propre fenêtre'
        ]
      },
      'opera': {
        title: 'Opera',
        steps: [
          'Cliquez sur l\'icône Opera en haut à gauche',
          'Allez dans "Page" > "Installer comme application"',
          'Confirmez l\'installation',
          'L\'app sera disponible sur votre bureau'
        ]
      },
      'samsung': {
        title: 'Samsung Internet',
        steps: [
          'Appuyez sur le menu en bas',
          'Sélectionnez "Ajouter la page à"',
          'Choisissez "Écran d\'accueil"',
          'Confirmez l\'ajout'
        ]
      },
      'brave': {
        title: 'Brave',
        steps: [
          'Cliquez sur les 3 barres en haut à droite',
          'Sélectionnez "Installer Golf Buddies"',
          'Confirmez l\'installation',
          'L\'app s\'ouvrira dans sa propre fenêtre'
        ]
      }
    }

    if (name === 'safari' && os === 'ios') return instructions['safari-ios']
    if (name === 'safari' && os === 'macos') return instructions['safari-macos']
    if (name === 'chrome' && os === 'android') return instructions['chrome-android']
    if (name === 'chrome' && (os === 'windows' || os === 'macos' || os === 'linux')) return instructions['chrome-desktop']
    if (name === 'firefox' && os === 'android') return instructions['firefox-android']
    if (name === 'edge') return instructions['edge']
    if (name === 'opera') return instructions['opera']
    if (name === 'samsung') return instructions['samsung']
    if (name === 'brave') return instructions['brave']

    return null
  }

  const getBrowserWarning = () => {
    const { name, os } = browserInfo

    if (name === 'firefox' && os !== 'android') {
      return 'Firefox ne supporte pas encore les PWA sur ordinateur. Utilisez Chrome, Edge ou Safari.'
    }
    if (name === 'chrome-ios' || name === 'edge-ios' || name === 'firefox-ios') {
      return 'Sur iOS, utilisez Safari pour installer cette application.'
    }
    if (name === 'firefox-focus') {
      return 'Firefox Focus ne supporte pas les PWA. Utilisez un autre navigateur.'
    }
    if (name === 'duckduckgo') {
      return 'DuckDuckGo ne supporte pas encore les PWA. Utilisez Chrome, Edge ou Safari.'
    }

    return null
  }

  // Ne rien afficher si déjà installé
  if (isInstalled) return null

  // Afficher le prompt d'installation automatique
  if (showInstallPrompt && deferredPrompt) {
    return (
      <div className={styles.container}>
        <button onClick={handleDismiss} className={styles.closeButton}>
          <X size={20} />
        </button>

        <div className={styles.header}>
          <Smartphone size={32} className={styles.icon} />
          <div className={styles.content}>
            <h3 className={styles.title}>Installez Golf Buddies</h3>
            <p className={styles.subtitle}>
              Accès rapide depuis votre écran d'accueil
            </p>
          </div>
        </div>

        <button onClick={handleInstallClick} className={styles.installButton}>
          <Download size={18} />
          Installer maintenant
        </button>
      </div>
    )
  }

  // Afficher le guide manuel
  if (showManualGuide || (showInstallPrompt && !deferredPrompt)) {
    const instructions = getInstallInstructions()
    const warning = getBrowserWarning()

    return (
      <div className={styles.manualGuideContainer}>
        <button onClick={handleDismiss} className={styles.closeButton}>
          <X size={20} />
        </button>

        <div className={styles.guideHeader}>
          <div className={styles.guideIcon}>
            <Globe size={24} color="white" />
          </div>
          <div>
            <h3 className={styles.guideTitle}>Installer Golf Buddies</h3>
            <p className={styles.guideSubtitle}>Comme une vraie application</p>
          </div>
        </div>

        {warning ? (
          <div className={styles.warning}>
            <Info size={20} color="#F59E0B" className={styles.warningIcon} />
            <p className={styles.warningText}>{warning}</p>
          </div>
        ) : instructions ? (
          <div>
            <h4 className={styles.instructionTitle}>{instructions.title}</h4>
            <div className={styles.steps}>
              {instructions.steps.map((step, index) => (
                <div key={index} className={styles.step}>
                  <div className={styles.stepNumber}>{index + 1}</div>
                  <p className={styles.stepText}>{step}</p>
                </div>
              ))}
            </div>

            <div className={styles.successNote}>
              <p className={styles.successText}>
                <ChevronRight size={16} />
                L'app s'ouvrira sans barre d'adresse, comme une vraie application !
              </p>
            </div>
          </div>
        ) : (
          <div className={styles.warning}>
            <Info size={20} color="#F59E0B" className={styles.warningIcon} />
            <p className={styles.warningText}>
              Installation non disponible sur ce navigateur.
              Essayez avec Chrome, Edge, Safari ou Opera.
            </p>
          </div>
        )}

        <button onClick={handleDismiss} className={styles.dismissButton}>
          Plus tard
        </button>
      </div>
    )
  }

  return null
}