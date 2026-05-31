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
