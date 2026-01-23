# build_and_push.ps1
# Usage: .\scripts\build_and_push.ps1 [dockerhub_username]



# 1. Build API
Write-Host "Building API..."
docker build -t "kot3qq/kurai-api:latest" ./kurai-arc-api
Write-Host "Pushing API..."
docker push "kot3qq/kurai-api:latest"

# 2. Build Web
Write-Host "Building Web..."
docker build -t "kot3qq/kurai-web:latest" ./kurai-arc-web
Write-Host "Pushing Web..."
docker push "kot3qq/kurai-web:latest"

Write-Host "Done! Images pushed to Docker Hub."
