"use client"

import * as React from "react"
import Image from "next/image"
import {
  IconCalendarEvent,
  IconCamera,
  IconChartBar,
  IconDashboard,
  IconDatabase,
  IconFileAi,
  IconFileDescription,
  IconFileWord,
  IconFolder,
  IconHelp,
  IconInnerShadowTop,
  IconListDetails,
  IconPhoto,
  IconReport,
  IconSearch,
  IconSettings,
  IconUsers,
  IconHome,
  IconBowlSpoon,
} from "@tabler/icons-react"

import { NavMain } from "@/components/admin/nav-main"
import { NavUser } from "@/components/admin/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const data = {
  user: {
    name: "admin",
    email: "admin@phuquoctrip.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Tổng quan",
      url: "/admin",
      icon: IconDashboard,
    },
    {
      title: "Trang chủ",
      url: "/admin/home",
      icon: IconHome,
    },
    {
      title: "Đặt bàn",
      url: "/admin/booking",
      icon: IconListDetails,
    },
    {
      title: "Mặt hàng",
      url: "#",
      icon: IconBowlSpoon,
      items: [
        {
          title: "Thực đơn",
          url: "/admin/menu",
        },
        {
          title: "Danh mục",
          url: "/admin/menu-categories",
        },
      ],
    },
    {
      title: "Sự kiện",
      url: "#",
      icon: IconCalendarEvent,
      items: [
        {
          title: "Sự kiện",
          url: "/admin/events",
        },
        {
          title: "Danh mục",
          url: "/admin/event-categories",
        },
      ],
    },
    {
      title: "Thư viện ảnh",
      url: "#",
      icon: IconPhoto,
    },
  ],
  navClouds: [
    {
      title: "Capture",
      icon: IconCamera,
      isActive: true,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Proposal",
      icon: IconFileDescription,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Prompts",
      icon: IconFileAi,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
  ],
  documents: [
    {
      name: "Data Library",
      url: "#",
      icon: IconDatabase,
    },
    {
      name: "Reports",
      url: "#",
      icon: IconReport,
    },
    {
      name: "Word Assistant",
      url: "#",
      icon: IconFileWord,
    },
  ],
}

export function AppSidebar({
  ...props
}) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild className="data-[slot=sidebar-menu-button]:!p-0 hover:bg-transparent">
              <a href="#" className="flex items-center justify-start pl-2">
                <img
                  src="/admin-logo.png"
                  alt="Airwaves Beach Club"
                  className="h-8 w-auto object-contain"
                />
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
