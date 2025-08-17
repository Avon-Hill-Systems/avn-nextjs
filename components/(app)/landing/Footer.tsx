import React from 'react';
import Image from 'next/image';
import { Separator } from '../../ui/separator';

const Footer: React.FC = () => {
  return (
    <footer className="mt-16 border-t border-border bg-muted/30">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row gap-6 items-center justify-center">
          <a
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              aria-hidden
              src="/file.svg"
              alt="File icon"
              width={16}
              height={16}
            />
            Learn
          </a>
          
          <Separator orientation="vertical" className="h-4 hidden sm:block" />
          
          <a
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              aria-hidden
              src="/window.svg"
              alt="Window icon"
              width={16}
              height={16}
            />
            Examples
          </a>
          
          <Separator orientation="vertical" className="h-4 hidden sm:block" />
          
          <a
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              aria-hidden
              src="/globe.svg"
              alt="Globe icon"
              width={16}
              height={16}
            />
            Go to nextjs.org →
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
