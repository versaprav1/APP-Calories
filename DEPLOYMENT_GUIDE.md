# 🚀 Triathlon Health Tracker - Deployment Guide

## 📋 Quick Start

Your application is now **ready for deployment**! Here are your options:

### 🌐 **Web Application Deployment**

#### **Option 1: Railway (Recommended)**
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and deploy
railway login
railway up
```

#### **Option 2: Vercel**
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

#### **Option 3: Heroku**
```bash
# Install Heroku CLI
# Login and create app
heroku login
heroku create triathlon-health-tracker
git push heroku main
```

### 📱 **Mobile App Deployment**

#### **iOS App Store**
1. **Prerequisites:**
   - macOS with Xcode installed
   - Apple Developer Account ($99/year)

2. **Deploy:**
   ```bash
   # Open iOS project
   npx cap open ios
   ```

3. **In Xcode:**
   - Configure signing with your Apple Developer certificate
   - Set Bundle Identifier: `com.triathlon.healthtracker`
   - Build → Archive → Distribute to App Store

#### **Android Google Play Store**
1. **Prerequisites:**
   - Android Studio installed
   - Google Play Console account ($25 one-time)

2. **Deploy:**
   ```bash
   # Open Android project
   npx cap open android
   ```

3. **In Android Studio:**
   - Configure signing keys
   - Set Application ID: `com.triathlon.healthtracker`
   - Build → Generate Signed Bundle/APK
   - Upload to Play Console

## 🛠 **Build Commands**

```bash
# Development
npm run dev

# Production build
npm run build

# Start production server
npm start

# Mobile sync
npx cap sync

# Open mobile projects
npx cap open ios
npx cap open android
```

## 📊 **Application Features**

Your Triathlon Health Tracker includes:

### **Core Features**
- ✅ **Multi-Sport Tracking**: Swimming, Cycling, Running, Badminton
- ✅ **Health Management**: Weight tracking, nutrition logging
- ✅ **Analytics Dashboard**: Performance metrics and progress visualization
- ✅ **User Authentication**: Secure login and profile management
- ✅ **Mobile Ready**: Native iOS/Android apps with Capacitor

### **Technical Stack**
- **Frontend**: React 18 + TypeScript + TailwindCSS
- **Backend**: Express.js + Node.js
- **Database**: SQLite with Drizzle ORM
- **Mobile**: Capacitor for cross-platform deployment
- **Build**: Vite for fast development and optimized builds

## 🔧 **Environment Configuration**

### **Required Environment Variables**
```env
DATABASE_URL=sqlite://./.sqlite/db.sqlite
NODE_ENV=production
```

### **Database Setup**
The application uses SQLite with automatic database creation. For production, consider:
- **Railway**: Built-in PostgreSQL support
- **Heroku**: PostgreSQL addon
- **Vercel**: Serverless with external database

## 📱 **App Store Requirements**

### **iOS App Store**
- **App Name**: Triathlon Health Tracker
- **Bundle ID**: com.triathlon.healthtracker
- **Category**: Health & Fitness
- **Minimum iOS**: 13.0+
- **Privacy Policy**: Required for data collection

### **Google Play Store**
- **App Name**: Triathlon Health Tracker
- **Package Name**: com.triathlon.healthtracker
- **Category**: Health & Fitness
- **Minimum Android**: API 24 (7.0)
- **Privacy Policy**: Required for data collection

## 🎯 **Deployment Checklist**

### **Pre-Deployment**
- [ ] Application builds successfully (`npm run build`)
- [ ] Database schema is up to date
- [ ] Environment variables configured
- [ ] App icons and splash screens ready
- [ ] Privacy policy and terms of service prepared

### **Web Deployment**
- [ ] Choose hosting platform (Railway/Vercel/Heroku)
- [ ] Configure environment variables
- [ ] Set up custom domain (optional)
- [ ] Test production build
- [ ] Monitor application performance

### **Mobile Deployment**
- [ ] Developer accounts created (Apple/Google)
- [ ] App signing certificates configured
- [ ] Store listings prepared with screenshots
- [ ] Privacy policy uploaded
- [ ] App submitted for review

## 🚨 **Troubleshooting**

### **Build Issues**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### **Database Issues**
```bash
# Reset database
rm -rf .sqlite
npx drizzle-kit push
```

### **Mobile Sync Issues**
```bash
# Clean and resync
npx cap clean
npx cap sync
```

## 📞 **Support**

For deployment issues:
1. Check the application logs
2. Verify environment variables
3. Ensure all dependencies are installed
4. Test locally before deploying

## 🎉 **Success!**

Once deployed, your Triathlon Health Tracker will be available as:
- **Web App**: Accessible via browser
- **iOS App**: Downloadable from App Store
- **Android App**: Downloadable from Google Play Store

Your comprehensive fitness tracking platform is ready to help triathlon athletes achieve their goals! 🏊‍♂️🚴‍♂️🏃‍♂️

