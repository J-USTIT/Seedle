# Docker Setup for Backend

## Quick Start

### Prerequisites
- Docker Desktop installed and running
- Docker Compose installed

### Run the Backend with Docker

```bash
# From the root project directory
docker-compose up --build
```

This will:
1. Build the backend Docker image
2. Start MongoDB container
3. Start the backend server
4. Backend will be accessible at `http://localhost:5000`
5. MongoDB will be accessible at `localhost:27017`

### Common Commands

```bash
# Build without starting
docker-compose build

# Start in background
docker-compose up -d

# View logs
docker-compose logs -f backend
docker-compose logs -f mongodb

# Stop all services
docker-compose down

# Stop and remove volumes (clears database)
docker-compose down -v

# Rebuild after code changes
docker-compose up --build

# Execute command in running backend container
docker-compose exec backend npm test
```

## File Structure

- **Dockerfile**: Defines how to build the backend image
- **.dockerignore**: Excludes files from Docker build context
- **docker-compose.yml**: Orchestrates backend + MongoDB containers

## Environment Variables

The docker-compose.yml sets these automatically:
- `MONGO_URL`: Connection string to MongoDB container
- `PORT`: Server port (5000)
- `NODE_ENV`: Set to development

To override, edit `docker-compose.yml` or create a `.env` file.

## Development with Live Reload

Uncomment the volumes section in `docker-compose.yml` to enable live code reloading:

```yaml
volumes:
  - ./backend:/app
  - /app/node_modules
```

Then restart: `docker-compose down && docker-compose up`

## Database Persistence

MongoDB data is stored in a Docker volume (`mongodb_data`), so it persists between container restarts.

To reset the database:
```bash
docker-compose down -v
```

## Connecting from Frontend

When frontend is also containerized, it can reach the backend at:
- `http://backend:5000` (using service name)

For local frontend development pointing to containerized backend:
- `http://localhost:5000` (using localhost)

Make sure to update CORS_ORIGIN if needed.

## Troubleshooting

**Backend can't connect to MongoDB:**
- Check MongoDB is healthy: `docker-compose logs mongodb`
- Verify MONGO_URL in docker-compose.yml

**Port already in use:**
```bash
# Change ports in docker-compose.yml
# Or kill the process using the port
```

**Database issues:**
```bash
# Clear everything and start fresh
docker-compose down -v
docker-compose up --build
```

---

## For Database Team

### Current Setup
- MongoDB is running in a container with credentials:
  - **Username:** `admin`
  - **Password:** `password`
  - **Database:** `bseedle_db`
  - **Port:** `27017` (internal to Docker network)

### Connection String
```
mongodb://admin:password@mongodb:27017/bseedle_db?authSource=admin
```

### Tasks to Complete
1. **Seed initial data** - Create scripts to populate the database
2. **Define schemas/collections** - Set up collections and validation rules
3. **Add indexes** - Optimize query performance
4. **Create initialization script** - Add a script that runs on container startup (optional)

### To Modify MongoDB Configuration
Edit `docker-compose.yml` in the `mongodb` service section:
```yaml
mongodb:
  image: mongo:7
  environment:
    MONGO_INITDB_ROOT_USERNAME: admin
    MONGO_INITDB_ROOT_PASSWORD: password  # Change password here
  # Add your initialization script if needed
  volumes:
    - mongodb_data:/data/db
    - ./mongo-init.js:/docker-entrypoint-initdb.d/mongo-init.js  # Optional
```

### Useful Commands
```bash
# Connect to MongoDB container
docker-compose exec mongodb mongosh -u admin -p password

# View MongoDB logs
docker-compose logs mongodb

# Reset database (clears all data)
docker-compose down -v
```

---

## For Frontend Team

### Current Backend Connection
Backend is running at:
- **Inside Docker:** `http://backend:5000`
- **Local development:** `http://localhost:5000`

### Setup Steps

#### 1. Create Dockerfile for Frontend
Create `frontend/Dockerfile`:
```dockerfile
FROM node:18-alpine AS build

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .

RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

#### 2. Create nginx.conf
Create `frontend/nginx.conf`:
```nginx
server {
    listen 80;

    location / {
        root /usr/share/nginx/html;
        try_files $uri $uri/ /index.html;
    }

    location /api {
        proxy_pass http://backend:5000;
    }
}
```

#### 3. Update docker-compose.yml
Add frontend service to the existing `docker-compose.yml`:
```yaml
frontend:
  build: ./frontend
  container_name: bseedle_frontend
  ports:
    - "80:80"
  depends_on:
    - backend
  networks:
    - bseedle-network
```

#### 4. Configure API Endpoint
In your React code, use environment variables:
```javascript
// Create .env files
// .env.local (local development)
VITE_API_URL=http://localhost:5000

// .env.production (Docker)
VITE_API_URL=http://backend:5000
```

Update API calls:
```javascript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const response = await fetch(`${API_URL}/api/users`);
```

### CORS Configuration
Backend CORS is already configured to accept:
```
http://localhost:5173  (Vite dev server)
```

When running in Docker:
- Frontend will be at `http://localhost:80` or `http://localhost`
- Update backend's `CORS_ORIGIN` if needed:
```bash
# In docker-compose.yml backend service
environment:
  CORS_ORIGIN: http://localhost,http://frontend:80
```

### Testing Frontend with Backend
```bash
# Start all services
docker-compose up --build

# Frontend should be at http://localhost
# Backend at http://localhost:5000
# MongoDB at localhost:27017
```

### Useful Commands for Frontend Team
```bash
# View frontend logs
docker-compose logs frontend

# Rebuild frontend only
docker-compose up --build frontend

# Test API endpoint from container
docker-compose exec frontend wget -O- http://backend:5000/api/users
```

### Development with Live Reload
To enable live code reloading during development, modify `docker-compose.yml`:
```yaml
frontend:
  build: ./frontend
  ports:
    - "5173:5173"  # Use Vite dev server instead
  volumes:
    - ./frontend:/app
    - /app/node_modules
  command: npm run dev  # Run dev server instead of nginx
```

---

## Full 3-Tier System

Once both teams complete their setup, the complete `docker-compose.yml` will look like:

```yaml
version: '3.8'

services:
  mongodb:
    image: mongo:7
    container_name: bseedle_mongodb
    # ... (database configuration)

  backend:
    build: ./backend
    container_name: bseedle_backend
    ports:
      - "5000:5000"
    # ... (backend configuration)

  frontend:
    build: ./frontend
    container_name: bseedle_frontend
    ports:
      - "80:80"
    depends_on:
      - backend
    networks:
      - bseedle-network

volumes:
  mongodb_data:

networks:
  bseedle-network:
    driver: bridge
```

Running `docker-compose up --build` will start the complete 3-tier application!
