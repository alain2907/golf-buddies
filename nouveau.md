# Golf Buddies - Find Your Perfect Golf Partner

A modern Progressive Web App for golfers to connect, organize rounds, and find playing partners.

## 🏌️ Features

- **Find Playing Partners**: Connect with golfers at your skill level
- **Schedule Rounds**: Create and join golf events
- **Real-time Chat**: Communicate with other players
- **Google OAuth**: Quick and secure authentication
- **Tournaments**: Organize and participate in local tournaments
- **Course Discovery**: Explore new golf courses in your area
- **Handicap Tracking**: Monitor your progress over time
- **Mobile Responsive**: Works perfectly on all devices

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- Firebase account
- Google Cloud Console account (for OAuth)
- Vercel account (for deployment)

### Installation

1. Clone or extract this project
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up Firebase:
   - Go to [Firebase Console](https://console.firebase.google.com)
   - Create a new project
   - Enable Authentication (Email/Password and Google)
   - Enable Firestore Database (select Europe region for GDPR)
   - Enable Storage
   - Get your configuration keys

4. Set up Google OAuth:
   - Go to [Google Cloud Console](https://console.cloud.google.com)
   - Create OAuth 2.0 credentials
   - Add authorized origins: http://localhost:3000 and your production URL
   - Add authorized redirect URIs

5. Configure environment variables:
   - Copy `.env.local.example` to `.env.local`
   - Fill in your Firebase and Google OAuth credentials

6. Run development server:
   ```bash
   npm run dev
   ```

7. Open [http://localhost:3000](http://localhost:3000)

## 📦 Deployment

### Deploy to Vercel (Recommended)

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Deploy:
   ```bash
   vercel
   ```

3. Add environment variables in Vercel dashboard

### Automatic Deployment

Use the included deployment script:
```bash
chmod +x deploy.sh
./deploy.sh
```

## 🏗️ Project Structure

```
golf-buddies/
├── src/
│   ├── app/              # Next.js App Router pages
│   ├── components/       # Reusable React components
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Firebase and utilities
│   ├── types/           # TypeScript definitions
│   └── utils/           # Helper functions
├── public/              # Static assets
├── .github/             # GitHub Actions workflows
└── deploy.sh           # Deployment script
```

## 🔧 Configuration

### Firebase Security Rules

Firestore rules are included in `firestore.rules`:
- Users can only edit their own profiles
- Event participants can join/leave events
- Chat messages are restricted to event participants

### PWA Configuration

The app is PWA-ready with:
- Service worker for offline functionality
- App manifest for installation
- Responsive design for all devices

## 📱 Features in Detail

### Authentication
- Email/Password registration
- Google OAuth integration
- Persistent sessions
- Profile management

### Events System
- Create golf rounds with detailed settings
- Join existing events
- Real-time participant updates
- Handicap requirements
- Multiple game formats

### Chat System
- Real-time messaging in events
- Participant notifications
- Message history
- Emoji support

### Search & Discovery
- Filter by location, date, skill level
- Course recommendations
- Player matching algorithm
- Saved searches

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS
- **Database**: Firebase Firestore
- **Authentication**: Firebase Auth + Google OAuth
- **Real-time**: Firebase Realtime Database
- **Hosting**: Vercel
- **Language**: TypeScript
- **State Management**: React Context
- **UI Icons**: Lucide React

## 📝 Environment Variables

Required environment variables:

```env
NEXT_PUBLIC_FIREBASE_API_KEY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
NEXT_PUBLIC_FIREBASE_PROJECT_ID
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
NEXT_PUBLIC_FIREBASE_APP_ID
NEXT_PUBLIC_GOOGLE_CLIENT_ID
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License - feel free to use this project for your own purposes.

## 🆘 Support

For issues or questions, please open an issue on GitHub.

## 🎯 Roadmap

- [ ] Native mobile apps (iOS/Android)
- [ ] Advanced statistics dashboard
- [ ] Tournament bracket system
- [ ] Live scoring
- [ ] Weather integration
- [ ] Payment processing for green fees
- [ ] Social features (friends, follows)
- [ ] AI-powered player matching

---

Built with ❤️ by Golf Buddies Team 🏌️