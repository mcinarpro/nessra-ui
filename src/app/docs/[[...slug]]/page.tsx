import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getMDXComponents } from "@/mdx-components"
import fm from "front-matter"
import { findNeighbour } from "fumadocs-core/page-tree"
import { createRelativeLink } from "fumadocs-ui/mdx"
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from "fumadocs-ui/page"
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react"
import * as z from "zod"

import { getPageImage, source } from "@/lib/source"
import { DocsCopyPage } from "@/components/docs-copy-page"
import { Button } from "@/registry/new-york/ui/button"

import { absoluteUrl } from "../../../lib/utils"

export default async function Page(props: PageProps<"/docs/[[...slug]]">) {
  const params = await props.params
  const page = source.getPage(params.slug)
  if (!page) notFound()

  const MDX = page.data.body
  const neighbours = findNeighbour(source.pageTree, page.url)

  const raw = await page.data.getText("raw")
  const { attributes } = fm(raw)

  const { links } = z
    .object({
      links: z
        .object({
          doc: z.string().optional(),
          api: z.string().optional(),
        })
        .optional(),
    })
    .parse(attributes)

  return (
    <DocsPage
      toc={page.data.toc}
      full={page.data.full}
      breadcrumb={{ enabled: false }}
      footer={{ enabled: false }}
    >
      <div className="flex items-center justify-between">
        <DocsTitle>{page.data.title}</DocsTitle>
        <div className="flex items-center gap-2">
          <DocsCopyPage page={raw} url={absoluteUrl(page.url)} />
          <div className="flex gap-1">
            {neighbours.previous && (
              <Button variant="secondary" size="icon-sm" asChild>
                <Link href={neighbours.previous.url}>
                  <ArrowLeft className="size-4" />
                  <span className="sr-only">
                    Previous: {neighbours.previous.name}
                  </span>
                </Link>
              </Button>
            )}
            {neighbours.next && (
              <Button variant="secondary" size="icon-sm" asChild>
                <Link href={neighbours.next.url}>
                  <ArrowRight className="size-4" />
                  <span className="sr-only">Next: {neighbours.next.name}</span>
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>

      <DocsDescription>{page.data.description}</DocsDescription>

      {links ? (
        <div className="flex items-center gap-2">
          {links?.doc && (
            <Button variant="secondary" size="sm" asChild>
              <a
                href={links.doc}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1"
              >
                Docs <ArrowUpRight className="size-3" />
              </a>
            </Button>
          )}
          {links?.api && (
            <Button variant="secondary" size="sm" asChild>
              <a
                href={links.api}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1"
              >
                API Reference <ArrowUpRight className="size-3" />
              </a>
            </Button>
          )}
        </div>
      ) : null}

      <DocsBody className="pb-10">
        <MDX
          components={getMDXComponents({
            a: createRelativeLink(source, page),
          })}
        />
      </DocsBody>

      {/* Bottom navigation */}
      <div className="flex items-center gap-2 pt-6">
        {neighbours.previous && (
          <Button variant="secondary" size="sm" asChild>
            <Link href={neighbours.previous.url}>
              <ArrowLeft className="size-4" />
              {neighbours.previous.name}
            </Link>
          </Button>
        )}
        {neighbours.next && (
          <Button variant="secondary" size="sm" className="ml-auto" asChild>
            <Link href={neighbours.next.url}>
              {neighbours.next.name}
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        )}
      </div>
    </DocsPage>
  )
}

export async function generateStaticParams() {
  return source.generateParams()
}

export async function generateMetadata(
  props: PageProps<"/docs/[[...slug]]">
): Promise<Metadata> {
  const params = await props.params
  const page = source.getPage(params.slug)
  if (!page) notFound()

  return {
    title: page.data.title,
    description: page.data.description,
    openGraph: {
      images: getPageImage(page).url,
    },
  }
}
