#!/bin/bash

# Triathlon Health Tracker - Vercel + Render Deployment Script
echo "🚀 Deploying Triathlon Health Tracker with Vercel + Render..."

# Step 1: Deploy Backend to Render
echo "🔧 Step 1: Deploying Backend to Render..."

# Check if render CLI is installed
if command -v render &> /dev/null; then
    echo "📦 Deploying backend to Render..."
    render services create --file render.yaml
else
    echo "📋 Render CLI not found. Please install it or deploy manually."
    echo "   Install: curl -fsSL https://cli.render.com/install | sh"
    echo "   Deploy: render services create --file render.yaml"
    echo ""
    echo "🔗 Or deploy manually at: https://dashboard.render.com"
    echo "   1. Create new Web Service"
    echo "   2. Connect your GitHub repository"
    echo "   3. Use these settings:"
    echo "      - Build Command: npm install && npm run build"
    echo "      - Start Command: npm start"
    echo "      - Environment: Node"
    echo "      - Add DATABASE_URL from PostgreSQL database"
fi

echo ""
echo "⏳ Wait for Render deployment to complete, then note the backend URL..."

# Step 2: Update Vercel configuration with backend URL
echo ""
echo "🌐 Step 2: Configuring Frontend for Vercel..."

# Get backend URL from user
read -p "Enter your Render backend URL (e.g., https://your-app.onrender.com): " BACKEND_URL

# Update vercel.json with the backend URL
sed -i "s|https://your-render-backend-url.onrender.com|$BACKEND_URL|g" vercel.json

echo "✅ Updated vercel.json with backend URL: $BACKEND_URL"

# Step 3: Deploy Frontend to Vercel
echo ""
echo "📦 Step 3: Deploying Frontend to Vercel..."

# Check if vercel CLI is installed
if command -v vercel &> /dev/null; then
    echo "🚀 Deploying frontend to Vercel..."
    vercel --prod
else
    echo "📋 Vercel CLI not found. Please install it or deploy manually."
    echo "   Install: npm install -g vercel"
    echo "   Deploy: vercel --prod"
    echo ""
    echo "🔗 Or deploy manually at: https://vercel.com"
    echo "   1. Import your GitHub repository"
    echo "   2. Set Framework Preset to 'Vite'"
    echo "   3. Set Root Directory to 'client'"
    echo "   4. Add Environment Variable: VITE_API_URL = $BACKEND_URL"
fi

echo ""
echo "🎉 Deployment process completed!"
echo ""
echo "📱 Your Triathlon Health Tracker is now live:"
echo "   Frontend (Vercel): Check your Vercel dashboard"
echo "   Backend (Render): $BACKEND_URL"
echo ""
echo "🔧 Next steps:"
echo "   1. Test your deployed application"
echo "   2. Configure custom domains (optional)"
echo "   3. Set up monitoring and analytics"
echo "   4. Deploy mobile apps using Capacitor"

