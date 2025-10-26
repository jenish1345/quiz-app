# Deployment Guide

## Prerequisites
- GitHub account
- MongoDB Atlas account (for cloud database)
- Vercel/Netlify account (for frontend)
- Railway/Render account (for backend)

## Option 1: Deploy to Vercel + Railway

### Backend (Railway)

1. **Create Railway Account**
   - Visit [railway.app](https://railway.app)
   - Sign up with GitHub

2. **Deploy Backend**
   ```bash
   # Install Railway CLI
   npm install -g @railway/cli
   
   # Login
   railway login
   
   # Initialize project
   cd backend
   railway init
   
   # Add environment variables
   railway variables set MONGODB_URI=your_mongodb_uri
   railway variables set GROQ_API_KEY=your_groq_key
   railway variables set PORT=5001
   
   # Deploy
   railway up
   ```

3. **Get Backend URL**
   - Copy the generated URL (e.g., `https://your-app.railway.app`)

### Frontend (Vercel)

1. **Update API URL**
   - Edit `frontend/src/services/api.js`
   - Change `API_URL` to your Railway backend URL

2. **Deploy to Vercel**
   ```bash
   # Install Vercel CLI
   npm install -g vercel
   
   # Login
   vercel login
   
   # Deploy
   cd frontend
   vercel
   ```

## Option 2: Deploy to Render

### Backend

1. **Create Render Account**
   - Visit [render.com](https://render.com)
   - Sign up with GitHub

2. **Create Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select `backend` directory
   - Build Command: `npm install`
   - Start Command: `npm start`

3. **Add Environment Variables**
   - MONGODB_URI
   - GROQ_API_KEY
   - PORT=5001

### Frontend

1. **Create Static Site**
   - Click "New +" → "Static Site"
   - Connect your GitHub repository
   - Select `frontend` directory
   - Build Command: `npm run build`
   - Publish Directory: `dist`

## MongoDB Atlas Setup

1. **Create Account**
   - Visit [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
   - Sign up for free

2. **Create Cluster**
   - Choose free tier (M0)
   - Select region closest to your users
   - Create cluster

3. **Get Connection String**
   - Click "Connect"
   - Choose "Connect your application"
   - Copy connection string
   - Replace `<password>` with your database password

4. **Whitelist IP**
   - Go to Network Access
   - Add IP Address
   - Allow access from anywhere (0.0.0.0/0) for development

## Environment Variables

### Backend
```env
PORT=5001
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/quiz-generator
GROQ_API_KEY=your_groq_api_key
NODE_ENV=production
```

### Frontend
Update `frontend/src/services/api.js`:
```javascript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';
```

Add `.env` in frontend:
```env
VITE_API_URL=https://your-backend-url.com/api
```

## Post-Deployment Checklist

- [ ] Backend is accessible
- [ ] Frontend is accessible
- [ ] MongoDB connection works
- [ ] Quiz generation works
- [ ] PDF upload works
- [ ] Quiz library loads
- [ ] CORS is configured correctly
- [ ] Environment variables are set
- [ ] API key is valid

## Troubleshooting

### CORS Errors
Add your frontend URL to CORS whitelist in `backend/server.js`:
```javascript
app.use(cors({
  origin: ['https://your-frontend-url.com']
}));
```

### MongoDB Connection Timeout
- Check IP whitelist in MongoDB Atlas
- Verify connection string
- Ensure network access is configured

### API Key Issues
- Verify Groq API key is correct
- Check rate limits
- Ensure key has proper permissions

## Custom Domain (Optional)

### Vercel
1. Go to project settings
2. Add custom domain
3. Update DNS records

### Render
1. Go to service settings
2. Add custom domain
3. Update DNS records

## Monitoring

### Backend Logs
- Railway: `railway logs`
- Render: View logs in dashboard

### Frontend Logs
- Vercel: View logs in dashboard
- Check browser console for errors

## Backup Strategy

1. **Database Backups**
   - MongoDB Atlas provides automatic backups
   - Export data regularly

2. **Code Backups**
   - Push to GitHub regularly
   - Tag releases

## Security Checklist

- [ ] Environment variables are not committed
- [ ] API keys are secure
- [ ] CORS is properly configured
- [ ] Rate limiting is enabled
- [ ] Input validation is in place
- [ ] File upload limits are set
- [ ] HTTPS is enabled

## Cost Estimation

### Free Tier
- MongoDB Atlas: 512MB storage (free)
- Groq API: 30 req/min (free)
- Vercel: Unlimited deployments (free)
- Railway: $5 credit/month (free)

### Paid Tier (if needed)
- MongoDB Atlas: $9/month (M10)
- Railway: $5/month per service
- Vercel: $20/month (Pro)

## Support

For deployment issues:
1. Check logs
2. Verify environment variables
3. Test API endpoints
4. Check GitHub Issues
5. Contact support

## Updates

To update deployed application:
```bash
# Push to GitHub
git push origin main

# Auto-deploys on Vercel/Railway
# Or manually redeploy from dashboard
```
