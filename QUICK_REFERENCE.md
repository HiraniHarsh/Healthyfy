# Healthyfy Quick Reference Guide

## 🚀 Quick Start (60 seconds)

1. **Start MongoDB** (if not running)

   ```bash
   mongod
   ```

2. **Start Backend**

   ```bash
   cd d:\Healthyfy\Backend
   node server.js
   # Output: Server running on http://localhost:5000
   ```

3. **Open Frontend**
   - Open file: `d:\Healthyfy\Frontend\index.html` in browser
   - Or use VS Code Live Server

4. **Test Application**
   - Sign up with test email
   - Create a fitness plan
   - Update progress
   - Logout

---

## 👤 User Flow

```
Landing Page
    ↓
Login/Signup
    ↓
Dashboard (overview of plan & progress)
    ↓
Create/View Plan
    ↓
Update Progress
    ↓
Track Results
```

---

## 🔑 Test Account Credentials

After signing up, you can use any email/password combination.

**Example:**

- Email: `test@example.com`
- Password: `password123`
- Name: `Test User`

---

## 📋 Key Features Summary

| Feature           | Status | Location                        |
| ----------------- | ------ | ------------------------------- |
| User Registration | ✅     | Frontend: Sign Up Page          |
| User Login        | ✅     | Frontend: Login Page            |
| Create Plan       | ✅     | Frontend: Create Plan Section   |
| View Plan         | ✅     | Frontend: My Plan Section       |
| Track Progress    | ✅     | Frontend: Update Progress       |
| Dashboard         | ✅     | Frontend: Dashboard Section     |
| Authentication    | ✅     | Backend: /api/auth              |
| API Protection    | ✅     | Backend: verifyToken middleware |

---

## 🛠️ File Locations

**Backend Files:**

- Authentication: `Backend/routes/authRoutes.js`
- Fitness Plans: `Backend/routes/fitnessRoutes.js`
- User Model: `Backend/model/User.js`
- Plan Model: `Backend/model/UserPlan.js`
- Config: `Backend/.env`

**Frontend Files:**

- HTML: `Frontend/index.html`
- CSS: `Frontend/css/style.css`
- JavaScript: `Frontend/js/app.js`

---

## 🔌 API Quick Reference

### Login

```javascript
POST /api/auth/login
{
  email: "user@example.com",
  password: "password123"
}
Response: { token, user }
```

### Create Plan

```javascript
POST /api/auth/register
Headers: Authorization: Bearer {token}
{
  age: 25,
  gender: "male",
  height: 180,
  weight: 75,
  targetWeight: 70,
  goal: "lose",
  weeks: 12,
  activityLevel: "moderate",
  experience: "beginner"
}
```

### Update Progress

```javascript
PUT /api/fitness/update-progress
Headers: Authorization: Bearer {token}
{
  weekNumber: 1,
  currentWeight: 74,
  workoutsCompleted: 5,
  progressNotes: "Feeling good!"
}
```

---

## 🎯 Fitness Goal Codes

| Goal Code   | Meaning            | Focus                    |
| ----------- | ------------------ | ------------------------ |
| `lose`      | Weight Loss        | Cardio + Deficit         |
| `gain`      | Muscle Gain        | Heavy Strength + Surplus |
| `maintain`  | Weight Maintenance | Balanced Training        |
| `strength`  | Strength Building  | Power + Heavy Lifts      |
| `endurance` | Endurance Training | Stamina + Aerobic        |

---

## 📱 Device Sizes

| Device  | Width     | Breakpoint |
| ------- | --------- | ---------- |
| Mobile  | < 480px   | Small      |
| Tablet  | 480-768px | Medium     |
| Desktop | > 768px   | Large      |

---

## 🐛 Common Issues & Fixes

| Issue                  | Solution                                         |
| ---------------------- | ------------------------------------------------ |
| **Port 5000 in use**   | `taskkill /PID <pid> /F` or use different port   |
| **MongoDB not found**  | Start MongoDB with `mongod`                      |
| **CORS errors**        | Check API_BASE_URL in app.js                     |
| **Login fails**        | Verify email/password, check backend running     |
| **Plan not saving**    | Check browser console, verify MongoDB connection |
| **Logout not working** | Clear browser localStorage manually              |

---

## 🔐 Security Checklist

Before production deployment:

- [ ] Change JWT_SECRET in .env
- [ ] Change MongoDB URI to production database
- [ ] Enable HTTPS/SSL
- [ ] Update API_BASE_URL to production domain
- [ ] Set NODE_ENV=production
- [ ] Enable CORS restrictions
- [ ] Add rate limiting
- [ ] Add input sanitization
- [ ] Set up error logging
- [ ] Enable database backups

---

## 📊 Database Commands

### View all users

```bash
db.users.find()
```

### View all plans

```bash
db.userplans.find()
```

### Delete user plan

```bash
db.userplans.deleteOne({email: "user@example.com"})
```

### Clear all data

```bash
db.dropDatabase()
```

---

## 🎨 Customization Guide

### Change Colors

Edit `Frontend/css/style.css`:

```css
:root {
  --primary-color: #YOUR_COLOR;
  --secondary-color: #YOUR_COLOR;
}
```

### Change App Name

Edit `Frontend/index.html`:
Search for "Healthyfy" and replace

### Change API URL

Edit `Frontend/js/app.js`:

```javascript
const API_BASE_URL = "YOUR_URL/api";
```

### Change Database Name

Edit `Backend/.env`:

```
MONGO_URI=mongodb://127.0.0.1:27017/YOUR_DB_NAME
```

---

## 📈 Performance Tips

1. **Frontend**
   - Minify CSS and JavaScript
   - Compress images
   - Enable caching
   - Use CDN for static files

2. **Backend**
   - Add database indexing
   - Implement pagination
   - Cache responses
   - Use compression middleware

3. **Database**
   - Create indexes on userId
   - Archive old progress
   - Optimize queries
   - Regular backups

---

## 🔄 Development Workflow

1. **Make changes** to HTML/CSS/JS
2. **Refresh browser** (Ctrl+F5 for hard refresh)
3. **Check console** for errors (F12)
4. **Test APIs** with Postman or Thunder Client
5. **Verify database** changes
6. **Deploy when ready**

---

## 📚 File Quick Links

- [Authentication Routes](Backend/routes/authRoutes.js)
- [Fitness Routes](Backend/routes/fitnessRoutes.js)
- [Main HTML](Frontend/index.html)
- [Styles](Frontend/css/style.css)
- [JavaScript Logic](Frontend/js/app.js)
- [Environment Config](Backend/.env)

---

## 🎓 Learning Resources

**Topics Covered:**

- Authentication (JWT, bcryptjs)
- REST APIs (Express.js)
- Databases (MongoDB, Mongoose)
- Frontend (HTML, CSS, JavaScript)
- Password Security
- Token Management
- Responsive Design

---

## 📞 Emergency Contacts

**If backend crashes:**

```bash
# Check error logs
cat logs/error.log

# Restart server
cd Backend
npm install
node server.js
```

**If database is corrupted:**

```bash
# Backup current data
mongodump --db fitnessPlanner

# Drop and recreate
mongo
use fitnessPlanner
db.dropDatabase()
```

---

## ✨ Pro Tips

1. **Token expires in 30 days** - Users will need to login again
2. **Plans overwrite** - Creating new plan replaces old one (not archived)
3. **Progress is permanent** - All progress entries are saved forever
4. **Emails are unique** - Can't register same email twice
5. **Mobile friendly** - Test on actual device, not just DevTools
6. **localStorage persists** - Clear manually if needed
7. **Passwords are hashed** - Can't be recovered, only reset

---

## 🚀 Deployment Checklist

- [ ] All dependencies installed
- [ ] Environment variables configured
- [ ] Database connection verified
- [ ] CORS settings updated
- [ ] HTTPS enabled
- [ ] Error logging configured
- [ ] Rate limiting enabled
- [ ] Backup system setup
- [ ] Monitoring tools installed
- [ ] Documentation reviewed

---

**Status: ✅ Production Ready**

**Version: 1.0.0**

**Last Updated: January 2026**

---

Happy Fitness Journey! 💪
