#!/bin/bash
set -e

# Script cấu hình tên miền trên VPS

VPS_IP="${VPS_IP:?Đặt VPS_IP, ví dụ: export VPS_IP=1.2.3.4}"
VPS_USER="${VPS_USER:-root}"
DOMAIN="${DOMAIN:?Đặt DOMAIN, ví dụ: export DOMAIN=example.com}"
CONFIG_FILE="airwaves.conf"

echo "📝 Tạo file cấu hình Nginx cho $DOMAIN..."
cat << EOF > $CONFIG_FILE
server {
    listen 80;
    server_name $DOMAIN www.$DOMAIN;

    location / {
        proxy_pass http://localhost:3005;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
    }
}
EOF

echo "🚀 Đẩy cấu hình lên VPS (yêu cầu mật khẩu)..."
scp $CONFIG_FILE $VPS_USER@$VPS_IP:/etc/nginx/conf.d/$DOMAIN.conf

echo "🔄 Kích hoạt và khởi động lại Nginx..."
ssh $VPS_USER@$VPS_IP "rm -f /etc/nginx/sites-enabled/default && nginx -t && systemctl restart nginx"

echo "🧹 Dọn dẹp file rác..."
rm $CONFIG_FILE

echo "✅ Cấu hình tên miền hoàn tất!"
echo "🌐 Bây giờ bạn có thể truy cập http://$DOMAIN"
