import type React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"

export function MainNav({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)} {...props}>
      <Link href="/" className="text-lg font-medium transition-colors hover:text-primary">
        Legal Case AI
      </Link>
      <Link
        href="/dashboard"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Dashboard
      </Link>
      <Link href="/search" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
        Search
      </Link>
      <Link href="/upload" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
        Upload
      </Link>
      <Link href="/groups" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
        Groups
      </Link>
    </nav>
  )
}

