"use client"

import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"

export function SiteHeader() {
  const pathname = usePathname()

  const getTitle = (path) => {
    // Exact matches
    if (path === "/admin/booking") return "Đặt bàn"
    if (path === "/admin/booking/create") return "Tạo đặt bàn"

    if (path === "/admin/menu") return "Thực đơn"
    if (path === "/admin/menu/create") return "Thêm thực đơn"
    if (path === "/admin/menu-categories") return "Danh mục thực đơn"

    if (path === "/admin/events") return "Sự kiện"
    if (path === "/admin/events/create") return "Thêm sự kiện"
    if (path === "/admin/event-categories") return "Danh mục sự kiện"

    if (path === "/admin") return "Tổng quan"

    // Prefix matches (for Edit pages with IDs)
    if (path.startsWith("/admin/menu/")) return "Chỉnh sửa thực đơn"
    if (path.startsWith("/admin/events/")) return "Chỉnh sửa sự kiện"

    return "Tổng quan"
  }

  return (
    <header
      className="flex h-(--header-height) shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mx-2 data-[orientation=vertical]:h-4" />
        <h1 className="text-base font-medium">{getTitle(pathname)}</h1>
      </div>
    </header>
  );
}
