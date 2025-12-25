import React, { useEffect } from 'react';

interface InstagramEmbedProps {
  url: string;
}

const InstagramEmbed: React.FC<InstagramEmbedProps> = ({ url }) => {
  useEffect(() => {
    const scriptSrc = '//www.instagram.com/embed.js';

    if (!document.querySelector(`script[src="${scriptSrc}"]`)) {
      const script = document.createElement('script');
      script.src = scriptSrc;
      script.async = true;
      document.body.appendChild(script);
    } else {
      // @ts-ignore
      window.instgrm?.Embeds.process();
    }
  }, [url]);

  return (
    <div className="w-full flex justify-center">
      <div
        className="w-full max-w-[420px] overflow-hidden bg-transparent border-none shadow-none rounded-none"
        dangerouslySetInnerHTML={{
          __html: `
            <blockquote
              class="instagram-media"
              data-instgrm-permalink="${url}"
              data-instgrm-version="14"
              style="
                background: transparent;
                border: none;
                margin: 0;
                padding: 0;
                width: 100%;
                max-width: 100%;
              ">
            </blockquote>
          `,
        }}
      />
    </div>
  );
};

export default InstagramEmbed;
