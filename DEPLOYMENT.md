# Deployment

## GitHub

Repository: `er-kumardeepak/emi-finance-system`

## Vercel Frontend

Set the Vercel project root directory to:

```text
SF-Frontend-main/SF-Frontend-main
```

Use:

```text
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

Add this environment variable after the Render backend is live:

```text
VITE_API_BASE_URL=https://your-render-service.onrender.com/api/
```

## Render Backend

Use the included `render.yaml` blueprint from the repository root, or create a Web Service manually with:

```text
Root Directory: SF-Backend-main/SF-Backend-main
Build Command: npm install
Start Command: npm start
Health Check Path: /api/health
```

Required environment variables:

```text
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=replace_with_a_long_random_secret
JWT_EXPIRE=7d
NODE_ENV=production
```

