import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, ExternalLink, Maximize2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

const slides = [
  {
    title: "Make the first interaction easier",
    image: "/images/groww-gr1/01-gr1-discovery-annotated.png",
    alt: "Annotated Groww screen suggesting a clearer GR-1 label and first-use introduction with relevant example questions.",
  },
  {
    title: "Help where the question arises",
    image: "/images/groww-gr1/02-gr1-context-annotated.png",
    alt: "Annotated investment detail screen suggesting an Ask GR-1 entry point that automatically carries the investment context into the conversation.",
  },
];

export default function GrowwGr1() {
  const [api, setApi] = useState<CarouselApi>();
  const [selected, setSelected] = useState(0);
  const [failedImages, setFailedImages] = useState<Set<number>>(new Set());

  useEffect(() => {
    if (!api) return;
    const onSelect = () => setSelected(api.selectedScrollSnap());
    onSelect();
    api.on("select", onSelect);
    api.on("reInit", onSelect);
    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api]);

  useEffect(() => {
    const title = document.title;
    document.title = "Groww GR-1 | A user perspective by Yash Gori";
    return () => { document.title = title; };
  }, []);

  const scrollTo = (index: number) => {
    api?.scrollTo(index, window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  };
  const iconClass = "h-10 w-10 shrink-0 rounded-md border-[#cbd6d3] bg-white text-[#18332c] hover:bg-[#e6efec] focus-visible:ring-[#0c7c5e]";

  return (
    <main className="min-h-svh bg-[#f3f7f6] text-[#18262c]">
      <header className="flex flex-wrap items-center justify-between gap-4 border-b border-[#d5dfdc] px-4 py-4 sm:px-8">
        <div>
          <h1 className="text-xl font-semibold sm:text-2xl">Groww GR-1</h1>
          <p className="mt-1 text-sm text-[#52666f]">A user perspective by Yash Gori</p>
        </div>
        <Link to="/" className="flex items-center gap-2 text-sm text-[#0c7c5e] hover:underline">
          Portfolio <ExternalLink className="h-4 w-4" />
        </Link>
      </header>

      <Carousel
        setApi={setApi}
        opts={{ align: "start", loop: false }}
        aria-label="Groww GR-1 annotated suggestions"
        tabIndex={0}
        className="mx-auto max-w-[1260px] px-2 pt-3 outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#0c7c5e] sm:px-6"
      >
        <CarouselContent>
          {slides.map((slide, index) => (
            <CarouselItem key={slide.image} aria-label={`${index + 1} of ${slides.length}: ${slide.title}`}>
              {failedImages.has(index) ? (
                <div className="flex h-[calc(100svh-210px)] min-h-64 items-center justify-center">
                  <a href={slide.image} target="_blank" rel="noopener noreferrer" className="text-[#0c7c5e] underline">Open the original image</a>
                </div>
              ) : (
                <a href={slide.image} target="_blank" rel="noopener noreferrer" aria-label={`Open full-size image: ${slide.title}`}>
                  <img
                    src={slide.image}
                    alt={slide.alt}
                    width={1260}
                    height={1560}
                    draggable={false}
                    className="h-auto w-full object-contain sm:h-[calc(100svh-185px)] sm:min-h-64"
                    onError={() => setFailedImages(current => new Set(current).add(index))}
                  />
                </a>
              )}
            </CarouselItem>
          ))}
        </CarouselContent>

        <footer className="flex flex-wrap items-center justify-between gap-3 py-4">
          <div className="min-w-0 flex-1" aria-live="polite" aria-atomic="true">
            <p className="text-sm font-medium">{slides[selected].title}</p>
            <p className="mt-1 text-xs text-[#52666f]">{selected + 1} / {slides.length}</p>
          </div>
          <div className="flex items-center gap-2">
            <Button size="icon" variant="outline" className={iconClass} disabled={!api || selected === 0} onClick={() => scrollTo(selected - 1)} aria-label="Previous suggestion" title="Previous suggestion">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <Button size="icon" variant="outline" className={iconClass} disabled={!api || selected === slides.length - 1} onClick={() => scrollTo(selected + 1)} aria-label="Next suggestion" title="Next suggestion">
              <ArrowRight className="h-5 w-5" />
            </Button>
            <a href={slides[selected].image} target="_blank" rel="noopener noreferrer" aria-label="Open full-size image" title="Open full-size image" className={`inline-flex items-center justify-center border focus-visible:outline-none focus-visible:ring-2 ${iconClass}`}>
              <Maximize2 className="h-5 w-5" />
            </a>
          </div>
        </footer>
      </Carousel>
    </main>
  );
}
