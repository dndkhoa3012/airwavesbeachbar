#!/bin/bash
set -e

# Script thêm HTTPS (SSL) cho tên miền bằng Let's Encrypt Certbot
# Dành cho VPS Ubuntu/Debian đang chạy Nginx

VPS_IP="${VPS_IP:?Đặt VPS_IP, ví dụ: export VPS_IP=1.2.3.4}"
VPS_USER="${VPS_USER:-root}"
DOMAIN="${DOMAIN:?Đặt DOMAIN, ví dụ: export DOMAIN=example.com}"
EMAIL="${EMAIL:?Đặt EMAIL nhận thông báo SSL}" # Email nhận thông báo gia hạn SSL

echo "🔒 Bắt đầu quy trình cài đặt HTTPS cho $DOMAIN..."
echo "🛠️ Kết nối vào VPS cài đặt Certbot (sẽ yêu cầu mật khẩu)..."

# Lệnh cài đặt Certbot và tự động lấy chứng chỉ SSL cho Nginx
ssh $VPS_USER@$VPS_IP << EOF
    # Cập nhật repository
    apt-get update

    # Cài đặt Certbot và Nginx plugin nếu chưa có
    apt-get install -y certbot python3-certbot-nginx

    # Dừng Nginx một chút nếu cần thiết (Certbot có thể tự xử lý, nhưng đảm bảo an toàn)
    systemctl restart nginx

    # Chạy Certbot tự động cấu hình Nginx
    echo "Lấy chứng chỉ SSL cho $DOMAIN và www.$DOMAIN..."
    certbot --nginx -d $DOMAIN -d www.$DOMAIN --non-interactive --agree-tos -m $EMAIL --redirect

    # Restart Nginx để áp dụng cấu hình SSL mớiy
    systemctl restart nginx
    echo "✅ SSL ĐÃ ĐƯỢC CÀI ĐẶT THÀNH CÔNG CHO NGINX!"
EOF

echo ""
echo "🎉 HOÀN TẤT CẤU HÌNH HTTPS!"
echo "🌐 Bạn có thể truy cập website an toàn tại: https://$DOMAIN"
