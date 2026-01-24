/* eslint-disable @next/next/no-img-element */
import { AspectRatio } from "@/registry/new-york/ui/aspect-ratio"

export default function AspectRatioDemo() {
  return (
    <div className="w-112.5">
      <AspectRatio ratio={16 / 9} className="bg-muted rounded-md">
        <img
          src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
          alt="Photo by Drew Beamer"
          className="h-full w-full rounded-md object-cover"
        />
      </AspectRatio>
    </div>
  )
}
