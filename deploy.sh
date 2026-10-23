#!/bin/bash
set -e

# Script Copy qua server (Docker Deploy)
# Build & nén image trên máy Mac để VPS làm việc nhẹ nhất

VPS_IP="${VPS_IP:?Đặt VPS_IP, ví dụ: export VPS_IP=1.2.3.4}"
VPS_USER="${VPS_USER:-root}"
VPS_PATH="${VPS_PATH:-/var/www/airwavesbeachbar}"
IMAGE_NAME="${DOCKER_IMAGE:?Đặt DOCKER_IMAGE, ví dụ: export DOCKER_IMAGE=<user>/airwavesbeachbar:latest}"
TAR_FILE="airwavesbeachbar.tar.gz"

echo "🚀 Bắt đầu quy trình Deploy Tối Ưu cho VPS..."

# 1. Build Image trên Mac (có cache - nhanh hơn)
echo "📦 Đang build image trên máy Mac..."
docker build -t $IMAGE_NAME . --platform linux/amd64

# 2. Lưu và nén Image ra file .tar.gz (Làm việc nặng trên Mac)
echo "🗜️ Đang nén Image..."
docker save $IMAGE_NAME | gzip > $TAR_FILE

# 3. Tạo thư mục trên VPS nếu chưa có và copy file sang VPS
echo "📂 Đang thiết lập thư mục và chuyển file qua VPS (Sẽ mất ít phút)..."
ssh $VPS_USER@$VPS_IP "mkdir -p $VPS_PATH"
scp docker-compose.yml $VPS_USER@$VPS_IP:$VPS_PATH/docker-compose.yml
scp .env $VPS_USER@$VPS_IP:$VPS_PATH/.env
scp $TAR_FILE $VPS_USER@$VPS_IP:$VPS_PATH/$TAR_FILE

# 4. Giải nén và load image trực tiếp vào Docker trên VPS
echo "🖥️  Đang giải nén và cập nhật VPS..."
ssh $VPS_USER@$VPS_IP "cd $VPS_PATH && docker load < $TAR_FILE && docker compose up -d --force-recreate --no-deps"

# 5. Dọn dẹp file tạm trên Mac và VPS
echo "🧹 Đang dọn file rác tạm thời..."
rm $TAR_FILE
ssh $VPS_USER@$VPS_IP "cd $VPS_PATH && rm $TAR_FILE && docker image prune -f"

echo ""
echo "✅ DEPLOY TỐI ƯU HOÀN TẤT!"
echo "🌐 Website sẽ được cập nhật và chạy tại http://$VPS_IP:3000"
