'use client';

export function FontPreloader() {
  return (
    <>
      {/* Preconnect to required origins */}
      <link 
        rel="preconnect" 
        href="https://fonts.gstatic.com" 
        crossOrigin="anonymous" 
      />
      <link 
        rel="preconnect" 
        href="https://fonts.googleapis.com" 
      />
      
      {/* Preload fonts */}
      <link
        rel="preload"
        href="/_next/static/media/e4af272ccee01ff0-s.p.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
        data-next-font="size-adjust"
      />
      <link
        rel="preload"
        href="/_next/static/media/bb3ef058b751a6ad-s.p.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
        data-next-font="size-adjust"
      />
    </>
  );
}
