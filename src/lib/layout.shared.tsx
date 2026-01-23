import Image from "next/image"
import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared"

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <div className="flex items-center gap-2">
          <Image
            src="/nessra-ui-logo.svg"
            alt="nessra ui"
            width={20}
            height={20}
          />
          <span>nessra ui</span>
        </div>
      ),
    },
    githubUrl: "https://github.com/codewithmehmet/nessra-ui",
  }
}
