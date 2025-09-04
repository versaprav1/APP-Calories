@echo off
echo 🚀 Deploying Triathlon Health Tracker with Vercel + Render...

echo.
echo 🔧 Step 1: Deploying Backend to Render...
echo.
echo 📋 Please follow these steps to deploy your backend:
echo    1. Go to https://dashboard.render.com
echo    2. Click "New +" → "Web Service"
echo    3. Connect your GitHub repository
echo    4. Use these settings:
echo       - Build Command: npm install ^&^& npm run build
echo       - Start Command: npm start
echo       - Environment: Node
echo       - Health Check Path: /api/health
echo    5. Create a PostgreSQL database
echo    6. Copy the database URL to DATABASE_URL environment variable
echo.

set /p BACKEND_URL="Enter your Render backend URL (e.g., https://your-app.onrender.com): "

echo.
echo 🌐 Step 2: Configuring Frontend for Vercel...
echo.

echo 📋 Please follow these steps to deploy your frontend:
echo    1. Go to https://vercel.com
echo    2. Import your GitHub repository
echo    3. Set Framework Preset to 'Vite'
echo    4. Set Root Directory to 'client'
echo    5. Add Environment Variable: VITE_API_URL = %BACKEND_URL%
echo.

echo 🎉 Deployment configuration completed!
echo.
echo 📱 Your Triathlon Health Tracker will be available at:
echo    Frontend (Vercel): Check your Vercel dashboard
echo    Backend (Render): %BACKEND_URL%
echo.
echo 🔧 Next steps:
echo    1. Complete the manual deployment steps above
echo    2. Test your deployed application
echo    3. Configure custom domains (optional)
echo    4. Deploy mobile apps using Capacitor
echo.
pause

