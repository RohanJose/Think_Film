
import React from 'react';

interface InstagramEmbedProps {
  url: string;
}

const InstagramEmbed: React.FC<InstagramEmbedProps> = ({ url }) => {
  // Ensure the URL ends with /embed/
  const embedUrl = url.endsWith('/') ? `${url}embed` : `${url}/embed`;

  return (
    <div className="w-full h-full min-h-[450px] bg-white rounded-xl overflow-hidden shadow-sm flex items-center justify-center">
      <iframe
        src={embedUrl}
        className="w-full h-full border-0"
        allowTransparency={true}
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
        frameBorder="0"
        scrolling="no"
        title="Instagram Reel"
      />
    </div>
  );
};

export default InstagramEmbed;
