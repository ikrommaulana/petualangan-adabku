# Firebase Setup Guide untuk Petualangan Adabku

## 1. Buat Firebase Project

1. Buka https://console.firebase.google.com
2. Klik "Add project"
3. Masukkan nama project: "petualangan-adabku"
4. Enable Google Analytics (opsional)
5. Klik "Create project"

## 2. Setup Authentication

1. Di Firebase Console, buka **Authentication** > **Sign-in method**
2. Aktifkan **Email/Password**
3. Klik "Save"

## 3. Setup Firestore Database

1. Buka **Firestore Database**
2. Klik "Create database"
3. Pilih "Start in test mode" (untuk development)
4. Pilih lokasi server terdekat (asia-southeast1 untuk Indonesia)
5. Klik "Enable"

### Firestore Indexes

Buat index berikut di Firestore:

**Collection: children**
- Fields: `parentId` (Ascending), `createdAt` (Descending)

**Collection: storyProgress**
- Fields: `childId` (Ascending), `storyId` (Ascending)

**Collection: missionProgress**
- Fields: `childId` (Ascending), `date` (Ascending)

### Firestore Security Rules

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /parents/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    match /children/{childId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null && request.resource.data.parentId == request.auth.uid;
      allow update: if request.auth != null;
      allow delete: if request.auth != null && resource.data.parentId == request.auth.uid;
    }
    
    match /storyProgress/{progressId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null;
      allow update: if request.auth != null;
    }
    
    match /missionProgress/{missionId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null;
      allow update: if request.auth != null;
    }
  }
}
```

## 4. Setup Storage

1. Buka **Storage**
2. Klik "Get started"
3. Pilih "Start in test mode"
4. Pilih lokasi sama dengan Firestore
5. Klik "Done"

### Storage Security Rules

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /children/{userId}/{allPaths=**} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## 5. Get Configuration

1. Buka **Project Settings** (gear icon)
2. Scroll ke "Your apps"
3. Klik web icon (</>)
4. Masukkan app nickname: "petualangan-adabku"
5. Copy config object

## 6. Setup Environment Variables

Copy `.env.local.example` ke `.env.local` dan isi:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy...dari_step_5
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=petualangan-adabku.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=petualangan-adabku
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=petualangan-adabku.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc123
```

## 7. Jalankan Aplikasi

```bash
npm install
npm run dev
```

Buka http://localhost:3000

## Troubleshooting

### Error: "Firebase: No Firebase App '[DEFAULT]'"
- Pastikan `.env.local` sudah dibuat dan diisi dengan benar
- Restart development server

### Error: "Missing or insufficient permissions"
- Pastikan Firestore rules sudah di-apply
- Pastikan user sudah login

### Error: "Storage: User does not have permission"
- Pastikan Storage rules sudah di-apply
- Pastikan path sesuai dengan userId
