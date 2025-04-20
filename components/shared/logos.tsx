import React from 'react';

const PlaceholderLogo = ({ name }: { name: string }) => (
  <div className="flex items-center justify-center size-8 bg-gray-200 rounded text-gray-500 text-xs">
    {name}
  </div>
);

export const Gemini = () => <PlaceholderLogo name="Gmn" />;
export const Replit = () => <PlaceholderLogo name="Rpl" />;
export const MagicUI = () => <PlaceholderLogo name="Mgc" />;
export const VSCodium = () => <PlaceholderLogo name="VSC" />;
export const MediaWiki = () => <PlaceholderLogo name="MW" />;
export const GooglePaLM = () => <PlaceholderLogo name="PaLM" />; 