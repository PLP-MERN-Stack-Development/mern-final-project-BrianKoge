# Deployment Guide: TaskFlow Application

This guide will help you deploy your TaskFlow MERN application with the backend on Render and the frontend on Vercel.

## Prerequisites

1. GitHub account
2. Render account (for backend deployment)
3. Vercel account (for frontend deployment)
4. MongoDB Atlas account (for database)

## Backend Deployment on Render

### 1. Prepare Your Code

First, ensure your backend code is pushed to a GitHub repository.

### 2. Set Up MongoDB Atlas

1. Create a MongoDB Atlas account if you don't have one
2. Create a new cluster
3. Whitelist all IP addresses (0.0.0.0/0) for testing purposes
4. Create a database user with read/write permissions
5. Get your MongoDB connection string

### 3. Configure Environment Variables

Create a `.env` file in your backend root directory with the following variables:
```env
NODE_ENV=production
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=7d
FRONTEND_URL=https://your-frontend-domain.vercel.app
```

### 4. Deploy to Render

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click "New+" and select "Web Service"
3. Connect your GitHub repository
4. Configure the service:
   - Name: taskflow-backend
   - Region: Choose the closest region
   - Branch: main (or your default branch)
   - Root Directory: backend
   - Environment: Node
   - Build Command: `npm install`
   - Start Command: `npm start`
5. Add environment variables in the "Advanced" section:
   - NODE_ENV: production
   - PORT: 5000
   - MONGODB_URI: your_mongodb_connection_string
   - JWT_SECRET: your_jwt_secret_key
   - JWT_EXPIRE: 7d
   - FRONTEND_URL: https://your-frontend-domain.vercel.app
6. Click "Create Web Service"

### 5. Update MongoDB Atlas IP Whitelist

Once your Render service is deployed, get the Render IP address and add it to your MongoDB Atlas IP whitelist for better security.

## Frontend Deployment on Vercel

### 1. Prepare Your Code

Ensure your frontend code is in the same GitHub repository, in the `frontend` directory.

### 2. Configure Environment Variables

Update your frontend [.env](file:///c:/Users/brian/OneDrive/Desktop/All%20in%20one/PLP%20Academy/MERN%20specialization/Assignment/week%208/mern-final-project-BrianKoge/frontend/.env) file:
```env
REACT_APP_API_URL=https://your-backend-domain.onrender.com
REACT_APP_SOCKET_URL=https://your-backend-domain.onrender.com
```

### 3. Deploy to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your GitHub repository
4. Configure the project:
   - Project Name: taskflow-frontend
   - Framework Preset: Create React App
   - Root Directory: frontend
5. Add environment variables:
   - REACT_APP_API_URL: https://your-backend-domain.onrender.com
   - REACT_APP_SOCKET_URL: https://your-backend-domain.onrender.com
6. Click "Deploy"

### 4. Update Render Backend Configuration

After your frontend is deployed:
1. Get your Vercel frontend URL
2. Update the `FRONTEND_URL` environment variable in your Render backend service
3. Redeploy the backend service

## Post-Deployment Steps

### 1. Test the Application

1. Visit your frontend URL
2. Try registering a new user
3. Try logging in
4. Test creating projects and tasks

### 2. Configure Custom Domains (Optional)

#### For Render (Backend):
1. In your Render dashboard, go to your web service
2. Click "Settings"
3. Scroll to "Custom Domains"
4. Add your custom domain

#### For Vercel (Frontend):
1. In your Vercel dashboard, go to your project
2. Click "Settings"
3. Click "Domains"
4. Add your custom domain

### 3. Set Up Environment Variables for Production

Update your environment variables with production values:
- Use a strong JWT secret
- Use your custom domain URLs
- Restrict MongoDB Atlas IP whitelist to only necessary IPs

## Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure `FRONTEND_URL` in your backend matches your frontend domain
2. **404 Errors**: Check that your API routes are correctly configured
3. **WebSocket Connection Issues**: Ensure your socket URL is correctly configured
4. **Environment Variables Not Loading**: Double-check that all environment variables are correctly set in both platforms

### Logs and Monitoring

- **Render**: Check logs in your service dashboard
- **Vercel**: Check logs in your project dashboard
- **MongoDB Atlas**: Monitor database connections and performance

## Additional Considerations

### Security
1. Use HTTPS for all communications
2. Implement proper rate limiting
3. Regularly rotate your JWT secret
4. Restrict MongoDB Atlas IP whitelist to only necessary IPs

### Performance
1. Enable gzip compression on Render
2. Use a CDN for static assets on Vercel
3. Optimize database queries
4. Implement caching where appropriate

### Maintenance
1. Regularly update dependencies
2. Monitor error logs
3. Set up uptime monitoring
4. Create automated backups of your database

## Support

If you encounter issues with deployment:
1. Check the official documentation for [Render](https://render.com/docs) and [Vercel](https://vercel.com/docs)
2. Review your application logs
3. Ensure all environment variables are correctly configured
4. Verify that your MongoDB connection is working

This guide should help you successfully deploy your TaskFlow application with the backend on Render and the frontend on Vercel.