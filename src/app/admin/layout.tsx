import { AppSidebar } from "@/components/admin/app-sidebar"
import { SiteHeader } from "@/components/admin/site-header"
import {
    SidebarInset,
    SidebarProvider,
} from "@/components/ui/sidebar"
import React from "react"

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <SidebarProvider
            style={
                {
                    "--header-height": "calc(var(--spacing) * 12)",
                } as React.CSSProperties
            }
        >
            <AppSidebar variant="inset" />
            <SidebarInset>
                <SiteHeader />
                <div className="flex flex-1 flex-col">
                    {children}
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}