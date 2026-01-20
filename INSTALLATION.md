# 🚀 Healthyfy - Installation & Deployment Guide

## Prerequisites

Before you begin, ensure you have:

- **Node.js** (v14.0.0 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (v4.4 or higher) - [Download](https://www.mongodb.com/try/download/community)
- **npm** (comes with Node.js)
- **Git** (optional, for cloning)
- **A text editor** (VS Code recommended)

### Verify Prerequisites

```bash
# Check Node.js version
node --version

# Check npm version
npm --version

# Check MongoDB (if installed locally)
mongod --version
```

---

## 🏗️ Installation Steps

### Step 1: Database Setup

#### Option A: Local MongoDB

**Windows**:

1. Download MongoDB Community from: https://www.mongodb.com/try/download/community
2. Run the installer
3. Choose "Install MongoD as a Service"
4. Complete installation
5. MongoDB starts automatically

**Linux/Mac**:

```bash
# Using Homebrew (Mac)
brew install mongodb-community
brew services start mongodb-community

# Using apt (Linux)
sudo apt-get install -y mongodb
sudo systemctl start mongodb
```

**Verify MongoDB is running**:

```bash
# Should connect successfully
mongosh
# Type 'exit' to quit
```

#### Option B: MongoDB Cloud (Atlas)

1. Go to: https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create a cluster
4. Get connection string
5. Update `.env` with connection string

### Step 2: Backend Installation

```bash
# Navigate to project directory
cd Healthyfy

# Navigate to backend
cd Backend

# Install dependencies
npm install

# Verify installation
npm list
```

**Expected output**: Should list express, mongoose, cors, dotenv

### Step 3: Configure Backend

#### Create/Update .env file

Create `Backend/.env` with:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
MONGO_URI=mongodb://localhost:27017/healthyfy

# For MongoDB Atlas, use:
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/healthyfy
```

**Important**:

- Replace `username` and `password` with your Atlas credentials
- Don't use special characters in password (or URL encode them)
- Include the database name at the end of the URL

### Step 4: Start Backend Server

```bash
# From Backend directory
npm start

# Expected output:
# Server running on port 5000
# MongoDB Connected
```

**Keep this terminal open!** Backend must stay running.

### Step 5: Frontend Setup

No installation needed for frontend! Just open in browser.

#### Option A: Using Live Server (VS Code)

1. Install "Live Server" extension in VS Code
2. Right-click `Frontend/index.html`
3. Select "Open with Live Server"
4. Browser opens automatically at `http://127.0.0.1:5500`

#### Option B: Using Simple HTTP Server

```bash
# From Frontend directory
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Node.js
npx http-server

# Then open: http://localhost:8000
```

#### Option C: Direct Browser

Simply open `Frontend/index.html` directly in your browser.

---

## ✅ Verification Checklist

### Backend Running?

```bash
# In a new terminal, test API
curl http://localhost:5000/api/fitness/all-plans

# Or open in browser:
# http://localhost:5000/api/fitness/all-plans
```

Should return JSON (might be empty array `{ plans: [] }`)

### Database Connected?

- Check backend console for "MongoDB Connected"
- No errors should appear
- If error: Check MongoDB is running and connection string is correct

### Frontend Accessible?

- Open browser to frontend URL
- Page loads with purple gradient
- No console errors (F12)
- Can see all sections (Hero, Form, Features, etc.)

### Connection Working?

- Fill form and submit
- Plan should generate
- Data saved to MongoDB
- No error messages

---

## 🐛 Troubleshooting

### MongoDB Connection Refused

**Error**: `MongooseError: connect ECONNREFUSED 127.0.0.1:27017`

**Solutions**:

1. **Start MongoDB**:

   ```bash
   # Windows
   net start MongoDB

   # Mac
   brew services start mongodb-community

   # Linux
   sudo systemctl start mongodb
   ```

2. **Check connection string**:
   - Verify MONGO_URI in .env is correct
   - Default is: `mongodb://localhost:27017/healthyfy`

3. **Different port?**:
   ```bash
   # Check MongoDB port
   mongosh # Default port 27017
   # If different, update .env
   ```

### Backend Port Already in Use

**Error**: `listen EADDRINUSE :::5000`

**Solutions**:

1. **Kill process on port 5000**:

   ```bash
   # Windows
   netstat -ano | findstr :5000
   taskkill /PID <PID> /F

   # Mac/Linux
   lsof -i :5000
   kill -9 <PID>
   ```

2. **Use different port**:
   - Update `PORT=5000` in .env to `PORT=3000`
   - Update API calls in frontend: `http://localhost:3000/api`

### Frontend Can't Connect to Backend

**Error**: `Connection error. Make sure backend is running.`

**Solutions**:

1. **Verify backend is running**:

   ```bash
   curl http://localhost:5000/api/fitness/all-plans
   ```

2. **Check API URL**:
   - Open `Frontend/js/app.js`
   - Verify: `const API_BASE = "http://localhost:5000/api";`

3. **CORS issue**:
   - Backend has CORS enabled (should work)
   - If still issue: Check browser console (F12)

4. **Firewall**:
   - Port 5000 might be blocked
   - Add firewall exception or use different port

### npm Packages Won't Install

**Error**: `npm ERR! code ERESOLVE` or similar

**Solutions**:

```bash
# Clear cache
npm cache clean --force

# Try different npm version
npm install -g npm@latest

# Use legacy peer deps (Node 16+)
npm install --legacy-peer-deps
```

### MongoDB Atlas Connection Issues

**Error**: `Could not connect to the database`

**Solutions**:

1. **Check credentials**:
   - Verify username and password
   - Check if special characters are URL-encoded

2. **IP Whitelist**:
   - Go to MongoDB Atlas dashboard
   - Network Access → IP Whitelist
   - Add your IP (or 0.0.0.0/0 for testing only)

3. **Connection string format**:
   ```
   mongodb+srv://username:password@cluster.mongodb.net/healthyfy
   ```

---

## 📦 Production Deployment

### Deploy Backend (Heroku Example)

```bash
# Install Heroku CLI
npm install -g heroku

# Login to Heroku
heroku login

# Create app
heroku create healthyfy-app

# Add MongoDB (using Heroku Addons)
heroku addons:create mongolab:sandbox --app healthyfy-app

# Set environment variables
heroku config:set NODE_ENV=production

# Deploy
git push heroku main

# Check logs
heroku logs --tail
```

### Deploy Frontend (Netlify Example)

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build/prepare frontend (if using bundler)
# For vanilla app, just zip the Frontend folder

# Deploy
netlify deploy

# Update API URL to production backend
# In Frontend/js/app.js:
# const API_BASE = "https://healthyfy-api.herokuapp.com/api";
```

### Deploy Backend (AWS EC2)

1. Launch EC2 instance
2. SSH into instance
3. Install Node.js and MongoDB
4. Clone/upload project
5. Install dependencies: `npm install`
6. Start with PM2: `pm2 start server.js`

### Docker Deployment (Optional)

Create `Dockerfile` in Backend:

```dockerfile
FROM node:16-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm", "start"]
```

Build and run:

```bash
docker build -t healthyfy-backend .
docker run -p 5000:5000 healthyfy-backend
```

---

## 🔒 Security Checklist for Production

- [ ] Update MONGO_URI to production database
- [ ] Set NODE_ENV=production
- [ ] Change API_BASE to production URL in frontend
- [ ] Implement authentication (JWT)
- [ ] Add rate limiting
- [ ] Use HTTPS/SSL
- [ ] Add input sanitization
- [ ] Set up CORS properly (specific domains only)
- [ ] Add environment-specific secrets
- [ ] Enable MongoDB authentication
- [ ] Set up logging
- [ ] Add monitoring/alerts

---

## 🧪 Post-Installation Testing

### Test 1: Create User Plan

```bash
curl -X POST http://localhost:5000/api/fitness/create-plan \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "age": 25,
    "gender": "male",
    "height": 175,
    "weight": 80,
    "targetWeight": 75,
    "goal": "lose",
    "weeks": 12,
    "activityLevel": "moderate",
    "experience": "intermediate"
  }'
```

Expected: Returns user ID and plan details

### Test 2: Update Progress

```bash
curl -X PUT http://localhost:5000/api/fitness/update-progress/{userId} \
  -H "Content-Type: application/json" \
  -d '{
    "weekNumber": 1,
    "currentWeight": 78,
    "workoutsCompleted": 5,
    "notes": "Great start!"
  }'
```

Expected: Progress saved successfully

### Test 3: Get Progress

```bash
curl http://localhost:5000/api/fitness/get-progress/{userId}
```

Expected: Returns user's progress history

### Test 4: Get Analytics

```bash
curl http://localhost:5000/api/fitness/analytics
```

Expected: Returns aggregated statistics

---

## 📊 Database Backups

### Backup MongoDB Locally

```bash
# Create backup
mongodump --out ./backup

# Restore from backup
mongorestore ./backup
```

### Backup MongoDB Atlas

1. Go to MongoDB Atlas dashboard
2. Cluster → Backup
3. Create/Download backup
4. Schedule automated backups

---

## 🔄 Updating the Application

### Update Node Packages

```bash
cd Backend

# Check for updates
npm outdated

# Update packages
npm update

# Update specific package
npm install express@latest
```

### Deploy Updates

1. Make code changes
2. Test locally
3. Commit to git
4. Push to production:

   ```bash
   # Heroku
   git push heroku main

   # AWS/VPS
   git pull
   npm install
   pm2 restart app
   ```

---

## 📈 Performance Optimization

### Frontend

- [ ] Minify CSS and JavaScript
- [ ] Compress images
- [ ] Use CDN for assets
- [ ] Enable gzip compression
- [ ] Cache static files

### Backend

- [ ] Add database indexes
- [ ] Implement caching
- [ ] Use pagination for large datasets
- [ ] Add rate limiting
- [ ] Monitor database queries

### Database

- [ ] Regular maintenance
- [ ] Index optimization
- [ ] Archive old data
- [ ] Monitor performance

---

## 🆘 Getting Help

### Resources

- **Node.js Docs**: https://nodejs.org/docs/
- **Express Docs**: https://expressjs.com/
- **MongoDB Docs**: https://docs.mongodb.com/
- **Mongoose Docs**: https://mongoosejs.com/

### Common Issues

See `QUICKSTART.md` for more troubleshooting.

### Contact Support

- Email: support@healthyfy.com
- Check GitHub issues if open-source
- Review logs for error details

---

## ✅ Installation Complete!

Once you see:

```
✅ Backend: Server running on port 5000
✅ Database: MongoDB Connected
✅ Frontend: Loads without errors
✅ API: Endpoints responding
```

You're ready to use Healthyfy! 🎉

Start with: `QUICKSTART.md`

---

_Last Updated: January 19, 2026_
_Version: 1.0.0_
