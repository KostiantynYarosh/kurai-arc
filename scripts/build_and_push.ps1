# build_and_push.ps1
# Usage: .\scripts\build_and_push.ps1 [dockerhub_username]

param (
    [string]$Username = "yourusername"
)

Write-Host "Building and Pushing images for user: $Username"

# 1. Build API
Write-Host "Building API..."
docker build -t "$Username/kurai-api:latest" ./kurai-arc-api
Write-Host "Pushing API..."
docker push "$Username/kurai-api:latest"

# 2. Build Web
Write-Host "Building Web..."
docker build -t "$Username/kurai-web:latest" ./kurai-arc-web
Write-Host "Pushing Web..."
docker push "$Username/kurai-web:latest"

Write-Host "Done! Images pushed to Docker Hub."
