import React from "react";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import { HeroVideoDialog } from "@/components/ui/hero-video-dialog";
import { SignInButton, useUser } from "@clerk/clerk-react";

function Hero() {
  const { user } = useUser();
  return (
    <div className="flex flex-col items-center justify-center mt-28 space-y-4 relative">
      <div className="absolute top-28 -z-1 left-1/4 size-72 bg-purple-600 blur-[300px]"></div>
      <h2 className="font-bold text-5xl ">
        From Idea to <span className="text-primary">Presentation</span> in One
        Click ⚡
      </h2>

      <p className="text-xl text-gray-500 text-center max-w-2xl">
        Generate sleek, editable PPT decks in minutes. AI handles slide design,
        formatting, and visual content so you can focus on your message, impress
        your audience, and work smarter, not harder.
      </p>

      <div className="flex items-center gap-4 justify-center mt-12">
        <Button variant="outline" size="lg">
          Watch Video <Play />
        </Button>
        {user ? (
          <Button size="lg">Go to Workspace</Button>
        ) : (
          <SignInButton mode="modal">
            <Button size="lg">Get Started</Button>
          </SignInButton>
        )}
      </div>

      <div className="relative max-w-4xl mt-14">
        <h1 className="text-center text-2xl my-4">
          Watch how to Create AI PPT
        </h1>
        <HeroVideoDialog
          className="block dark:hidden"
          animationStyle="from-center"
          videoSrc="https://www.youtube.com/embed/qh3NGpYRG3I?si=4rb-zSdDkVK9qxxb"
          thumbnailSrc="https://startup-template-sage.vercel.app/hero-light.png"
          thumbnailAlt="Hero Video"
        />
        <HeroVideoDialog
          className="hidden dark:block"
          animationStyle="from-center"
          videoSrc="https://www.youtube.com/embed/qh3NGpYRG3I?si=4rb-zSdDkVK9qxxb"
          thumbnailSrc="https://startup-template-sage.vercel.app/hero-dark.png"
          thumbnailAlt="Hero Video"
        />
      </div>
    </div>
  );
}

export default Hero;
