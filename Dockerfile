FROM node:18.17.1

# Install dependencies
RUN apt-get update && apt-get install -y \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg \
    lsb-release \
    make \
    && rm -rf /var/lib/apt/lists/*

# Install Docker CLI
RUN curl -fsSL https://download.docker.com/linux/debian/gpg | gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
RUN echo "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/debian $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null
RUN apt-get update && apt-get install -y docker-ce-cli

# Install Yarn
# RUN npm install -g yarn

# Create work directory
WORKDIR /app

COPY ./twenty/ /app/

# Create entrypoint script that runs the make commands
RUN mkdir -p /usr/local/bin
RUN echo '#!/bin/bash\n\
echo "Checking Docker connection..."\n\
if docker info > /dev/null 2>&1; then\n\
  echo "Docker connection successful!"\n\
else\n\
  echo "Error: Cannot connect to the Docker daemon."\n\
  echo "Make sure you mounted the Docker socket when running this container"\n\
  exit 1\n\
fi\n\
\n\
cd /app\n\
\n\
echo "Running postgres-on-docker..."\n\
make postgres-on-docker\n\
\n\
echo "Running redis-on-docker..."\n\
make redis-on-docker\n\
\n\
echo "Setting up environment files..."\n\
cp ./packages/twenty-front/.env.example ./packages/twenty-front/.env\n\
cp ./packages/twenty-server/.env.example ./packages/twenty-server/.env\n\
\n\
# Update database connection settings\n\
echo "Updating database connection settings..."\n\
sed -i "s|PG_DATABASE_URL=.*|PG_DATABASE_URL=postgres://postgres:postgres@host.docker.internal:5432/default|g" ./packages/twenty-server/.env\n\
sed -i "s|REDIS_URL=.*|REDIS_URL=redis://host.docker.internal:6379|g" ./packages/twenty-server/.env\n\
\n\
echo "Installing dependencies..."\n\
yarn\n\
\n\
npx nx reset\n\
echo "Resetting database..."\n\
npx nx database:reset twenty-server\n\
\n\
echo "Starting the application..."\n\
npx nx start\n\
\n\
echo "Environment is ready!"\n\
\n\
# Keep container running or execute command if provided\n\
if [ $# -eq 0 ]; then\n\
  echo "Container is now running. Press Ctrl+C to stop."\n\
  tail -f /dev/null\n\
else\n\
  exec "$@"\n\
fi\n\
' > /usr/local/bin/entrypoint.sh

RUN chmod +x /usr/local/bin/entrypoint.sh

ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]