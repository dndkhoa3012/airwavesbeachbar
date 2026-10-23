# Airwaves Beach Club

Website của Airwaves Beach Club (airwavesbeachclub.com): trang công khai (menu, sự kiện, gallery, đặt bàn) và trang quản trị.

**Stack:** Next.js 16 (App Router), React 19, Prisma + MySQL, Ant Design, CKEditor, Docker.

## Chạy local

```bash
npm install
cp .env.example .env        # điền DATABASE_URL (MySQL)
npx prisma migrate dev      # hoặc: npx prisma db push
npx prisma db seed          # dữ liệu mẫu (tuỳ chọn)
npm run dev                 # http://localhost:3000
```

## Cấu trúc

- `src/app/(public)` – trang công khai
- `src/app/(auth)` – đăng nhập
- `src/app/admin` – trang quản trị
- `src/app/api/v1` – REST API (banners, bookings, events, gallery, menus, ...)
- `prisma/` – schema, migrations, seed
- `scripts/` – script bảo trì dữ liệu một lần (`cleanup-data.ts`, `migrate-prices.ts`)

## Deploy

Production chạy bằng Docker trên VPS (cổng `3005`), Nginx proxy vào, HTTPS bằng certbot. Các script không chứa thông tin server nào, mọi giá trị truyền qua biến môi trường:

```bash
export VPS_IP=<ip-vps>
export VPS_USER=<user-ssh>              # mặc định: root
export DOCKER_IMAGE=<dockerhub-user>/airwavesbeachbar:latest
./deploy-hub.sh
```

- `deploy-hub.sh` – **khuyến nghị**: build image (linux/amd64) trên máy dev, push lên Docker Hub, VPS tự pull và khởi động lại. Cần `docker login` trước.
- `deploy.sh` – phương án dự phòng: nén image thành `.tar.gz` rồi copy qua VPS bằng scp.
- `setup-domain.sh`, `setup-ssl.sh` – chỉ chạy **một lần** khi cấu hình tên miền / SSL mới (cần thêm `DOMAIN`, `EMAIL`).

Các script copy `docker-compose.yml` và `.env` lên `$VPS_PATH` (mặc định `/var/www/airwavesbeachbar`). `.env` trên VPS cần có `DATABASE_URL` và `DOCKER_IMAGE`.

## Biến môi trường

Xem `.env.example`. File `.env` không được commit; lấy giá trị thật từ người bàn giao.
