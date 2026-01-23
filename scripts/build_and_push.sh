#!/bin/bash
# build_and_push.sh
# Usage: ./scripts/build_and_push.sh

# 1. Build API
echo "Building API..."
docker build -t "kot3qq/kurai-api:latest" ./kurai-arc-api
echo "Pushing API..."
docker push "kot3qq/kurai-api:latest"

# 2. Build Web
echo "Building Web..."
docker build -t "kot3qq/kurai-web:latest" ./kurai-arc-web
echo "Pushing Web..."
docker push "kot3qq/kurai-web:latest"

echo "Done! Images pushed to Docker Hub."
