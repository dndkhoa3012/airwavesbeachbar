#!/bin/bash
set -e

# Script sử dụng Docker Hub để Deploy (Tránh đứt kết nối SSH do file lớn)

VPS_IP="${VPS_IP:?Đặt VPS_IP, ví dụ: export VPS_IP=1.2.3.4}"
VPS_USER="${VPS_USER:-root}"
VPS_PATH="${VPS_PATH:-/var/www/airwavesbeachbar}"
# Đảm bảo bạn đã đăng nhập: docker login
IMAGE_NAME="${DOCKER_IMAGE:?Đặt DOCKER_IMAGE, ví dụ: export DOCKER_IMAGE=<user>/airwavesbeachbar:latest}"

echo "🚀 Bắt đầu quy trình Deploy qua Docker Hub..."

# 1. Build Image trên Mac
echo "📦 Đang build image trên máy Mac..."
docker build -t $IMAGE_NAME . --platform linux/amd64

# 2. Push Image lên Docker Hub
echo "☁️ Đang đẩy Image lên Docker Hub..."
docker push $IMAGE_NAME

# 3. Tạo thư mục trên VPS và copy file cấu hình nhỏ
echo "📂 Đang copy cấu hình (docker-compose & .env) qua VPS..."
ssh $VPS_USER@$VPS_IP "mkdir -p $VPS_PATH"
scp docker-compose.yml $VPS_USER@$VPS_IP:$VPS_PATH/docker-compose.yml
scp .env $VPS_USER@$VPS_IP:$VPS_PATH/.env

# 4. VPS tự pull Image mới từ Docker Hub và chạy
echo "🖥️  VPS đang tự động tải và khởi động ứng dụng..."
ssh $VPS_USER@$VPS_IP "cd $VPS_PATH && docker compose pull && docker compose up -d --force-recreate && docker image prune -f"

echo ""
echo "✅ DEPLOY QUA DOCKER HUB HOÀN TẤT!"
echo "🌐 Website đã được cập nhật và đổi sang port 3005."
