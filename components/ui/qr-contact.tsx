"use client";
import React, { useState, useMemo } from 'react';
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { QrCode, Copy, Check } from 'lucide-react';
import { siteConfig } from '@/lib/site-config';
// dynamic import inside hook to avoid SSR canvas issues

export function QrContact() {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const url = siteConfig.url + '/links';

  const dataUrl = useMemo(() => {
    return import('qrcode')
      .then(m => m.toDataURL(url, { margin: 1, scale: 6, color: { dark: '#000000', light: '#ffffff' } }))
      .catch(() => '');
  }, [url]);

  const handleCopy = () => {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" aria-label="Open QR contact card">
          <QrCode className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Quick Connect</DialogTitle>
          <DialogDescription>Scan to open my contact & social links instantly.</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center gap-4 py-4">
          <div className="rounded-xl border bg-white p-3 shadow-sm dark:bg-neutral-900">
            {/* Using async promise resolution for QR */}
            <AsyncQr promise={dataUrl} altText={url} />
          </div>
          <p className="text-xs text-muted-foreground break-all text-center max-w-[90%]">{url}</p>
          <div className="flex gap-2">
            <Button size="sm" onClick={handleCopy} variant="secondary" className="gap-2">
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copied' : 'Copy link'}
            </Button>
            <Button size="sm" asChild>
              <a href={url} target="_blank" rel="noopener noreferrer">Open</a>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

import Image from 'next/image';

function AsyncQr({ promise, altText }: { promise: Promise<string>; altText: string }) {
  const [src, setSrc] = useState<string | null>(null);
  const [error, setError] = useState(false);
  // resolve after mount only
  React.useEffect(() => {
    let active = true;
    promise.then(data => { if(active) setSrc(data); }).catch(() => { if(active) setError(true); });
    return () => { active = false; };
  }, [promise]);
  if (error) return <span className="text-xs text-destructive">Failed to load QR</span>;
  if (!src) return <div className="size-40 animate-pulse rounded-md bg-muted" />;
  return (
    <Image
      src={src}
      alt={altText}
      width={160}
      height={160}
      className="size-40 select-none"
      draggable={false}
      unoptimized
    />
  );
}
