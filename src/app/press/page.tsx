'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Download, Mail, Newspaper } from 'lucide-react'
import { PageShell } from '@/components/shared/page-shell'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useToast } from '@/components/ui/use-toast'
import { mockPressAssets, mockPressCoverage } from '@/data/mock-data'
import { SITE_CONFIG } from '@/lib/site-config'

export default function PressPage() {
  const { toast } = useToast()
  const [activeAssetId, setActiveAssetId] = useState<string | null>(null)
  const activeAsset = mockPressAssets.find((asset) => asset.id === activeAssetId)

  return (
    <PageShell
      title="Press & media"
      description="Official storylines, downloadable brand assets, and recent coverage. We respond quickly to fact-checked requests."
      actions={
        <Button variant="outline" asChild>
          <Link href="/contact">Request an interview</Link>
        </Button>
      }
    >
      <section className="grid gap-6 lg:grid-cols-3">
        <Card className="border-border bg-gradient-to-br from-card to-secondary/40 lg:col-span-2">
          <CardContent className="grid gap-6 p-8 sm:grid-cols-3">
            <div>
              <p className="text-3xl font-semibold text-foreground">40+</p>
              <p className="mt-1 text-sm text-muted-foreground">outlets covered our launch beats</p>
            </div>
            <div>
              <p className="text-3xl font-semibold text-foreground">12</p>
              <p className="mt-1 text-sm text-muted-foreground">languages supported in press materials</p>
            </div>
            <div>
              <p className="text-3xl font-semibold text-foreground">&lt; 24h</p>
              <p className="mt-1 text-sm text-muted-foreground">median turnaround for media requests</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-[#dbc6b6] bg-[#2f1d16] text-[#fff4e4]">
          <CardContent className="flex h-full flex-col justify-between gap-4 p-8">
            <div className="flex items-start gap-3">
              <Mail className="mt-0.5 h-5 w-5 shrink-0 text-[#e8c4a8]" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#e8c4a8]">Desk</p>
                <p className="mt-1 text-sm leading-relaxed text-[#f5e5d6]">
                  For embargoed news, executive commentary, or data pulls:{' '}
                  <span className="font-semibold text-white">press@{SITE_CONFIG.domain}</span>
                </p>
              </div>
            </div>
            <p className="text-xs text-[#d8b8a0]">Please include your outlet, deadline, and intended angle.</p>
          </CardContent>
        </Card>
      </section>

      <div className="mt-12 grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <Card className="border-border bg-card">
          <CardContent className="space-y-6 p-8">
            <div className="flex items-start gap-3">
              <Download className="mt-1 h-5 w-5 text-foreground" />
              <div>
                <h2 className="text-xl font-semibold text-foreground">Media kit downloads</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Logos, UI captures, and brand guidelines—everything you need for print and digital layouts.
                </p>
              </div>
            </div>
            <div className="space-y-3">
              {mockPressAssets.map((asset) => (
                <div
                  key={asset.id}
                  className="rounded-xl border border-border bg-secondary/30 px-4 py-4 transition hover:border-foreground/20"
                >
                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                      <p className="font-medium text-foreground">{asset.title}</p>
                      <p className="mt-1 text-sm text-muted-foreground">{asset.description}</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant="secondary">{asset.fileType}</Badge>
                      <Button size="sm" variant="outline" onClick={() => setActiveAssetId(asset.id)}>
                        Preview
                      </Button>
                      <Button
                        size="sm"
                        onClick={() =>
                          toast({
                            title: 'Download started',
                            description: `${asset.title} is downloading.`,
                          })
                        }
                      >
                        Download
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-5">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
            <Newspaper className="h-4 w-4" />
            Recent coverage
          </div>
          {mockPressCoverage.map((item) => (
            <Card key={item.id} className="border-border bg-card transition-shadow hover:shadow-md">
              <CardContent className="p-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{item.outlet}</p>
                <p className="mt-2 text-base font-medium leading-snug text-foreground">{item.headline}</p>
                <p className="mt-3 text-xs text-muted-foreground">{item.date}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <section className="mt-14 rounded-[1.75rem] border border-dashed border-border bg-muted/30 p-8 text-center sm:p-10">
        <h2 className="text-xl font-semibold text-foreground">Need a bespoke asset or executive bio?</h2>
        <p className="mx-auto mt-2 max-w-2xl text-sm text-muted-foreground">
          We prepare tailored quote sheets, fact packs, and broadcast-ready soundbites when you are on deadline.
        </p>
        <Button asChild className="mt-6">
          <Link href="/contact">Contact communications</Link>
        </Button>
      </section>

      <Dialog open={Boolean(activeAsset)} onOpenChange={() => setActiveAssetId(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{activeAsset?.title}</DialogTitle>
          </DialogHeader>
          {activeAsset?.previewUrl && (
            <div className="relative aspect-video overflow-hidden rounded-xl border border-border bg-muted">
              <Image src={activeAsset.previewUrl} alt={activeAsset.title} fill className="object-cover" />
            </div>
          )}
          <p className="text-sm text-muted-foreground">{activeAsset?.description}</p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setActiveAssetId(null)}>
              Close
            </Button>
            <Button
              onClick={() =>
                toast({
                  title: 'Download started',
                  description: `${activeAsset?.title} is downloading.`,
                })
              }
            >
              Download {activeAsset?.fileType}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </PageShell>
  )
}
