# Build Stage
FROM golang:1.23-alpine AS builder

WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download

COPY . .
RUN go build -o main ./cmd/api

# Run Stage
FROM alpine:3.19

WORKDIR /app

# Install certificates for SSL connection to database
RUN apk --no-cache add ca-certificates

COPY --from=builder /app/main .
COPY .env . 
# Note: In K8s, .env usually replaced by ConfigMap/Secret, but keeping for simple docker run if needed

EXPOSE 8080

CMD ["./main"]
