#!/bin/bash

# Triathlon Health Tracker - Mobile Deployment Script
echo "📱 Deploying Triathlon Health Tracker Mobile Apps..."

# Build the web application first
echo "📦 Building web application..."
npm run build

# Sync with mobile platforms
echo "🔄 Syncing with mobile platforms..."
npx cap sync

# Check if sync was successful
if [ $? -eq 0 ]; then
    echo "✅ Mobile sync successful!"
    
    # Open iOS project in Xcode (macOS only)
    if [[ "$OSTYPE" == "darwin"* ]]; then
        echo "🍎 Opening iOS project in Xcode..."
        npx cap open ios
        
        echo "📋 iOS Deployment Steps:"
        echo "   1. Configure signing in Xcode"
        echo "   2. Set Bundle Identifier: com.triathlon.healthtracker"
        echo "   3. Build and archive for App Store"
        echo "   4. Upload to App Store Connect"
    else
        echo "⚠️  iOS deployment requires macOS with Xcode"
    fi
    
    # Open Android project in Android Studio
    echo "🤖 Opening Android project in Android Studio..."
    npx cap open android
    
    echo "📋 Android Deployment Steps:"
    echo "   1. Configure signing in Android Studio"
    echo "   2. Set Application ID: com.triathlon.healthtracker"
    echo "   3. Generate signed APK/AAB"
    echo "   4. Upload to Google Play Console"
    
else
    echo "❌ Mobile sync failed! Please check the errors above."
    exit 1
fi

echo "🎉 Mobile deployment setup completed!"
echo "📱 Next: Build and submit to app stores using native IDEs"

