#!/bin/bash

# Triathlon Health Tracker - Web Deployment Script
echo "🚀 Deploying Triathlon Health Tracker Web App..."

# Build the application
echo "📦 Building application..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    
    # Deploy to Railway (if railway CLI is installed)
    if command -v railway &> /dev/null; then
        echo "🚂 Deploying to Railway..."
        railway up
    else
        echo "📋 Railway CLI not found. Please install it or deploy manually."
        echo "   Install: npm install -g @railway/cli"
        echo "   Deploy: railway login && railway up"
    fi
    
    # Alternative: Deploy to Vercel
    if command -v vercel &> /dev/null; then
        echo "▲ Deploying to Vercel..."
        vercel --prod
    else
        echo "📋 Vercel CLI not found. Please install it or deploy manually."
        echo "   Install: npm install -g vercel"
        echo "   Deploy: vercel --prod"
    fi
    
else
    echo "❌ Build failed! Please check the errors above."
    exit 1
fi

echo "🎉 Deployment process completed!"

