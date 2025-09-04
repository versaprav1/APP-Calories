# 🔧 Fix 404 and 500 Errors

## ✅ **Issues Fixed**

### **1. Vercel 404 Error (Signup Page)**
- **Problem**: React Router client-side routing not working
- **Solution**: Added `rewrites` to `vercel.json` to serve `index.html` for all routes

### **2. Render 500 Error (Backend)**
- **Problem**: Backend trying to use SQLite instead of PostgreSQL
- **Solution**: Updated database configuration to support both SQLite (dev) and PostgreSQL (production)

## 🚀 **Deployment Steps**

### **Step 1: Update Dependencies**
```bash
npm install
```

### **Step 2: Deploy Backend to Render**
1. Go to [Render Dashboard](https://dashboard.render.com)
2. Update your web service with the new code
3. Make sure PostgreSQL database is connected
4. Environment variables should include:
   ```
   DATABASE_URL=postgresql://user:password@host:port/database
   NODE_ENV=production
   ```

### **Step 3: Deploy Frontend to Vercel**
1. Go to [Vercel Dashboard](https://vercel.com)
2. Redeploy your project (or push new commit)
3. The new `vercel.json` will handle client-side routing

## 🔧 **What Was Fixed**

### **Vercel Configuration (`vercel.json`)**
```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```
This ensures all routes (like `/signup`, `/login`, etc.) serve the React app.

### **Database Configuration (`server/db.ts`)**
- **Development**: Uses SQLite with local file
- **Production**: Uses PostgreSQL with connection string
- **Auto-detection**: Based on `DATABASE_URL` format

### **Dependencies Added**
- `postgres`: PostgreSQL client for production
- `@types/postgres`: TypeScript types

## 🎯 **Expected Results**

### **After Fixing Vercel (404 → ✅)**
- ✅ Home page loads correctly
- ✅ Signup page loads correctly (`/signup`)
- ✅ Login page loads correctly (`/login`)
- ✅ All React Router routes work

### **After Fixing Render (500 → ✅)**
- ✅ Health check returns 200 OK
- ✅ API endpoints respond correctly
- ✅ Database operations work
- ✅ User registration/login works

## 🧪 **Testing**

### **Test Vercel Frontend**
```bash
# Visit your Vercel URL
https://your-app.vercel.app
https://your-app.vercel.app/signup
https://your-app.vercel.app/login
```

### **Test Render Backend**
```bash
# Health check
curl https://your-render-backend.onrender.com/api/health

# Test registration
curl -X POST https://your-render-backend.onrender.com/api/register \
  -H "Content-Type: application/json" \
  -d '{"username":"test","password":"test123"}'
```

## 🔍 **Troubleshooting**

### **If Vercel Still Shows 404**
1. Check Vercel deployment logs
2. Verify `vercel.json` is in root directory
3. Clear Vercel cache and redeploy

### **If Render Still Shows 500**
1. Check Render logs for database connection errors
2. Verify `DATABASE_URL` is set correctly
3. Ensure PostgreSQL database is running
4. Check if database tables exist

### **Database Migration**
If you need to create tables in PostgreSQL:
```bash
# This will be handled automatically by the app
# Tables are created on first API call
```

## 🎉 **Success!**

After these fixes:
- ✅ **Vercel**: All React routes work (no more 404)
- ✅ **Render**: Backend API works (no more 500)
- ✅ **Full Stack**: Frontend connects to backend successfully
- ✅ **Database**: PostgreSQL in production, SQLite in development

Your Triathlon Health Tracker should now work end-to-end! 🏊‍♂️🚴‍♂️🏃‍♂️
