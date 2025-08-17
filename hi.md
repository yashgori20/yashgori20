# GetMeAJob App Integration Specification

## 🏗️ **Architecture Overview**

### **Frontend**: 
- **User-Facing Pages**: `https://yashgori20.vercel.app`
- **Electron App**: Desktop application with React UI

### **Backend**: 
- **API Server**: `https://yashgori20-get-me-a-job-ap.hf.space`
- **Database**: Firebase Firestore
- **Authentication**: JWT tokens

---

## 🔗 **API Endpoints**

### **Backend API (HF Space)**
Base URL: `https://yashgori20-get-me-a-job-ap.hf.space`

| Endpoint | Method | Purpose | Headers Required |
|----------|--------|---------|------------------|
| `/getmeajob/api/auth/register` | POST | User registration | Content-Type: application/json |
| `/getmeajob/api/auth/login` | POST | User login | Content-Type: application/json |
| `/getmeajob/api/auth/verify` | GET | Verify JWT token | Authorization: Bearer {token} |
| `/getmeajob/api/subscription/status` | GET | Check subscription | Authorization: Bearer {token} |
| `/getmeajob/api/usage/track` | POST | Track AI usage | Authorization: Bearer {token} |
| `/getmeajob/api/check-updates` | GET | Check app updates | None |
| `/health` | GET | Health check | None |

### **Frontend Pages (Vercel)**
Base URL: `https://yashgori20.vercel.app`

| Page | Purpose | User Action |
|------|---------|-------------|
| `/getmeajob/login` | Login/Register form | Get JWT token |
| `/getmeajob/dashboard` | User dashboard | Manage subscription |
| `/getmeajob/download` | Download app | Get latest version |

---

## 🔑 **Authentication Flow**

### **User Journey:**
1. **Open App** → Settings ⚙️ → Click "Login"
2. **Browser Opens** → `https://yashgori20.vercel.app/getmeajob/login`
3. **User Registers/Logs In** → Gets JWT token
4. **Copy Token** → Paste in app → Click "Login" 
5. **App Verifies** → Shows "✅ Logged In (email)"

### **Token Behavior:**
- **Storage**: Local electron storage (persistent)
- **Expiration**: Never expires (server-side validation)
- **Device Limit**: 1 device per token
- **Verification**: Every 5 minutes after initial 15-second check

### **App States:**
- **🔄 Checking...**: During background verification
- **✅ Logged In (email)**: Valid token + user info
- **📡 Offline**: Network connectivity issues
- **Login**: No token or invalid token

---

## 📊 **Subscription System**

### **Check Schedule:**
- **Initial**: 15 seconds after app starts
- **Recurring**: Every 5 minutes (only if logged in)
- **Manual**: When user performs AI action

### **Subscription Types:**
- **🆓 Free**: Limited usage
- **👑 Pro**: Unlimited access

### **UI Indicators:**
- **Login Button**: Shows subscription status
- **Upgrade Button**: 
  - Free users: "⭐ Upgrade"
  - Pro users: "👑 Pro Dashboard"

### **API Response Format:**
```json
{
  "isPaid": boolean,
  "usageLeft": number,
  "plan": "free|pro",
  "renewalDate": "ISO date"
}
```

---

## 🔄 **Update System**

### **Check Process:**
1. **App Startup** → Auto-check `/getmeajob/api/check-updates`
2. **If Update Available** → Red dot on update icon
3. **User Clicks** → "Download Latest" button
4. **Downloads** → Redirects to `/getmeajob/download`

### **Update API Response:**
```json
{
  "latestVersion": "1.0.2",
  "downloadUrl": "https://yashgori20.vercel.app/getmeajob/download",
  "releaseNotes": "Bug fixes and improvements"
}
```

### **Triggering Updates (Developer):**
1. **Update** `package.json` version
2. **Send curl request** to update backend version info
3. **App detects** → Shows update notification

---

## 🎯 **AI Processing Flow**

### **Voice/Audio Processing:**
1. **User Records** → Audio captured
2. **Network Check** → Verify connectivity
3. **Process Audio** → Whisper + GPT analysis
4. **Show Result** → Display transcription + analysis
5. **Track Usage** → Optional usage tracking

### **Error Handling:**
- **Network Error**: "Can't connect to network. Check your internet connection."
- **Auth Error**: "Please login to use AI features"
- **API Error**: "Audio analysis failed."

### **Offline Behavior:**
- **App Always Works** → Core functionality available
- **AI Features Disabled** → Graceful degradation
- **Status Indicators** → Clear offline messaging

---

## 🛠️ **Implementation Details**

### **Key Files:**
- **API Service**: `src/lib/api.ts`
- **Main Component**: `src/components/Queue/QueueCommands.tsx`
- **Backend**: `backend/app.py`

### **Electron IPC:**
- **Token Storage**: `saveApiToken()`, `getSavedApiToken()`, `clearApiToken()`
- **External URLs**: `openExternalUrl()`
- **Audio Processing**: `analyzeAudioFromBase64()`

### **State Management:**
```typescript
const [authStatus, setAuthStatus] = useState<'checking' | 'valid' | 'invalid' | 'offline'>('checking')
const [subscriptionStatus, setSubscriptionStatus] = useState<'checking' | 'free' | 'pro' | 'unknown'>('checking')
const [isLoggedIn, setIsLoggedIn] = useState(false)
const [userEmail, setUserEmail] = useState('')
```

---

## 🧪 **Testing Scenarios**

### **Authentication:**
- [ ] Fresh install → Shows "Login"
- [ ] Invalid token → Shows "Login" 
- [ ] Valid token → Shows "✅ Logged In (email)"
- [ ] Network offline → Shows "📡 Offline"

### **Subscription:**
- [ ] Free user → Shows "🆓" + "⭐ Upgrade"
- [ ] Pro user → Shows "👑" + "👑 Pro Dashboard"
- [ ] Unknown status → Default behavior

### **Updates:**
- [ ] No updates → No indicator
- [ ] Update available → Red dot + download option
- [ ] Download click → Opens browser

### **Network Handling:**
- [ ] Offline startup → App still opens
- [ ] Network lost → Graceful error messages
- [ ] Network restored → Resume functionality

---

## 🚀 **Deployment Checklist**

### **Frontend (Vercel):**
- [ ] `/getmeajob/login` page deployed
- [ ] `/getmeajob/dashboard` page deployed  
- [ ] `/getmeajob/download` page deployed
- [ ] JWT token generation working

### **Backend (HF):**
- [ ] All API endpoints functional
- [ ] Firebase connection established
- [ ] JWT verification working
- [ ] Subscription checking active

### **Electron App:**
- [ ] API service integrated
- [ ] Background checks working
- [ ] Error handling tested
- [ ] Token persistence verified

---

## 📝 **Environment Variables**

### **Backend (HF Space):**
```env
FIREBASE_SERVICE_ACCOUNT={"type":"service_account",...}
JWT_SECRET=your-super-secret-key
```

### **Frontend (Vercel):**
```env
NEXT_PUBLIC_API_URL=https://yashgori20-get-me-a-job-ap.hf.space
```

---

## 🔧 **Troubleshooting**

### **Common Issues:**
1. **App won't open**: Check for blocking auth calls on startup
2. **Login redirects to HF**: Update URLs to Vercel domain
3. **Auth fails**: Verify JWT secret and Firebase config
4. **No updates shown**: Check version format in backend

### **Debug Logs:**
- **Auth Check**: "Starting background auth and subscription check..."
- **Success**: "Background auth check: Valid token"
- **Error**: "Background auth check failed: [error]"

---

## 📞 **Quick Reference**

### **URLs:**
- **Login**: `https://yashgori20.vercel.app/getmeajob/login`
- **Dashboard**: `https://yashgori20.vercel.app/getmeajob/dashboard`
- **API**: `https://yashgori20-get-me-a-job-ap.hf.space`

### **Key Timings:**
- **Initial Auth Check**: 15 seconds after startup
- **Recurring Checks**: Every 5 minutes
- **API Timeout**: 10 seconds
- **Background Delay**: Non-blocking

---

*Last Updated: $(date)*
*Version: 1.0.0*