# 🚀 Vercel + Render Deployment Guide

## 📋 Architecture Overview

Your Triathlon Health Tracker will be deployed using:
- **Frontend**: Vercel (React app)
- **Backend**: Render (Node.js API)
- **Database**: PostgreSQL (Render managed)

## 🛠 **Step-by-Step Deployment**

### **Step 1: Deploy Backend to Render**

#### **Option A: Using Render CLI**
```bash
# Install Render CLI
curl -fsSL https://cli.render.com/install | sh

# Deploy backend
render services create --file render.yaml
```

#### **Option B: Manual Deployment**
1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure the service:
   - **Name**: `triathlon-health-tracker-backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Health Check Path**: `/api/health`

5. **Add Environment Variables**:
   - `NODE_ENV`: `production`
   - `DATABASE_URL`: (Will be provided by Render PostgreSQL)

6. **Create Database**:
   - Click "New +" → "PostgreSQL"
   - Name: `triathlon-db`
   - Plan: Free
   - Copy the connection string to `DATABASE_URL`

### **Step 2: Deploy Frontend to Vercel**

#### **Option A: Using Vercel CLI**
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy frontend
cd client
vercel --prod
```

#### **Option B: Manual Deployment**
1. Go to [Vercel Dashboard](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Configure the project:
   - **Framework Preset**: `Vite`
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist/public`

5. **Add Environment Variables**:
   - `VITE_API_URL`: `https://your-render-backend-url.onrender.com`

### **Step 3: Update API Configuration**

After both deployments are complete:

1. **Get your Render backend URL** (e.g., `https://triathlon-health-tracker-backend.onrender.com`)
2. **Update Vercel environment variable**:
   - Go to Vercel Dashboard → Your Project → Settings → Environment Variables
   - Update `VITE_API_URL` with your Render backend URL
3. **Redeploy Vercel** to pick up the new environment variable

## 🔧 **Configuration Files**

### **render.yaml** (Backend Configuration)
```yaml
services:
  - type: web
    name: triathlon-health-tracker-backend
    env: node
    plan: free
    buildCommand: npm install && npm run build
    startCommand: npm start
    envVars:
      - key: NODE_ENV
        value: production
      - key: DATABASE_URL
        fromDatabase:
          name: triathlon-db
          property: connectionString
    healthCheckPath: /api/health

databases:
  - name: triathlon-db
    plan: free
    databaseName: triathlon_health_tracker
    user: triathlon_user
```

### **vercel.json** (Frontend Configuration)
```json
{
  "version": 2,
  "builds": [
    {
      "src": "client/package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist/public"
      }
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/$1"
    }
  ],
  "env": {
    "VITE_API_URL": "https://your-render-backend-url.onrender.com"
  }
}
```

## 🚀 **Quick Deployment Commands**

```bash
# 1. Deploy backend to Render
render services create --file render.yaml

# 2. Deploy frontend to Vercel
cd client
vercel --prod

# 3. Update environment variables in Vercel dashboard
# 4. Redeploy frontend
vercel --prod
```

## 🔍 **Testing Your Deployment**

### **Backend Health Check**
```bash
curl https://your-render-backend-url.onrender.com/api/health
```
Expected response:
```json
{
  "status": "ok",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

### **Frontend Access**
Visit your Vercel URL to access the application.

## 🛠 **Troubleshooting**

### **Common Issues**

#### **Backend Not Starting**
- Check Render logs for errors
- Verify `DATABASE_URL` is set correctly
- Ensure all dependencies are in `package.json`

#### **Frontend Can't Connect to Backend**
- Verify `VITE_API_URL` is set correctly in Vercel
- Check CORS settings in backend
- Ensure backend is running and accessible

#### **Database Connection Issues**
- Verify PostgreSQL database is created in Render
- Check `DATABASE_URL` format
- Run database migrations: `npx drizzle-kit push`

### **Debug Commands**
```bash
# Check backend logs
render logs --service your-service-name

# Test backend locally
npm run dev

# Test frontend locally
cd client
npm run dev
```

## 📊 **Environment Variables**

### **Backend (Render)**
- `NODE_ENV`: `production`
- `DATABASE_URL`: PostgreSQL connection string (auto-provided)

### **Frontend (Vercel)**
- `VITE_API_URL`: Your Render backend URL

## 🎯 **Post-Deployment Checklist**

- [ ] Backend health check returns 200 OK
- [ ] Frontend loads without errors
- [ ] API calls work from frontend
- [ ] Database operations function correctly
- [ ] User registration/login works
- [ ] All workout tracking features work
- [ ] Analytics dashboard displays data

## 🚀 **Next Steps**

1. **Custom Domains**: Configure custom domains for both services
2. **SSL Certificates**: Automatically provided by both platforms
3. **Monitoring**: Set up error tracking and performance monitoring
4. **Mobile Apps**: Deploy mobile apps using Capacitor
5. **CI/CD**: Set up automatic deployments on code changes

## 💰 **Costs**

### **Free Tier Limits**
- **Render**: 750 hours/month, 512MB RAM
- **Vercel**: 100GB bandwidth, unlimited static sites
- **PostgreSQL**: 1GB storage, 1 connection

### **Scaling Options**
- **Render**: Upgrade to paid plans for more resources
- **Vercel**: Pro plan for more bandwidth and features
- **Database**: Upgrade PostgreSQL for more storage/connections

## 🎉 **Success!**

Your Triathlon Health Tracker is now live with:
- ⚡ **Fast Frontend**: Served by Vercel's global CDN
- 🔧 **Reliable Backend**: Running on Render's infrastructure
- 🗄️ **Managed Database**: PostgreSQL with automatic backups
- 📱 **Mobile Ready**: Capacitor apps can be deployed next

Your comprehensive fitness tracking platform is ready to help triathlon athletes achieve their goals! 🏊‍♂️🚴‍♂️🏃‍♂️

