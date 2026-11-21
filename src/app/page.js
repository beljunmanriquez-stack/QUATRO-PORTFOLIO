"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";

const AUTO_SLIDE_INTERVAL = 3000; // 3 seconds per slide
const NAV_ITEMS = ["HOME", "SERVICES", "ABOUT US", "WORKS", "CONTACT"];

const MEMBER_SLIDES = [
  {
    id: "beljun-manriquez",
    firstName: "BELJUN",
    lastName: "MANRIQUEZ",
    roleLine: "home | home | home",
    bioLine1: "sgfyejhhfuiadjkhgnvjkrhsbdvdgb",
    bioLine2: "dbvcng vbbncjkvnd jvbdnjjdkbn",
    imageSrc: "/images/beljun.png",
    fallbackSrcs: [
      "/images/jun.png",
      "/images/beljun.png",
      "/images/manriquez.jpg",
    ],
    imageAlt: "Beljun Manriquez Portrait",
    containerStyle: {
      right: "-1.5%",
      bottom: "0px",
      width: "50%",
      height: "93%",
    },
    detailSide: "left",
    detailImageSrc: "/images/jun.png",
    detailHeadingStyle: {
      right: "7.2%",
      top: "20%",
    },
    detailCardStyle: {
      left: "21%",
      right: "7.2%",
      top: "26.5%",
      bottom: "10.5%",
    },
    detailContainerStyle: {
      left: "-1%",
      bottom: "0px",
      width: "44%",
      height: "95%",
    },
  },
  {
    id: "member-3",
    firstName: "KEMBERLY",
    lastName: "MAGANDAM",
    roleLine: "home | home | home",
    bioLine1: "sgfyejhhfuiadjkhgnvjkrhsbdvdgb",
    bioLine2: "dbvcng vbbncjkvnd jvbdnjjdkbn",
    imageSrc: "/images/kem.png",
    fallbackSrcs: ["/images/kemberly.png", "/images/kem.png"],
    imageAlt: "Kemberly Magandam Portrait",
    containerStyle: {
      right: "0.5%",
      bottom: "0px",
      width: "44%",
      height: "93%",
    },
    detailSide: "right",
    detailImageSrc: "/images/kem.png",
    detailHeadingStyle: {
      left: "5.5%",
      top: "2%",
    },
    detailCardStyle: {
      left: "11.5%",
      right: "11.5%",
      top: "10%",
      bottom: "9%",
    },
    detailContainerStyle: {
      right: "1%",
      bottom: "9%",
      width: "44%",
      height: "130%",
    },
  },
  {
    id: "member-4",
    firstName: "LIEBERT",
    lastName: "BARAYUGA",
    roleLine: "home | home | home",
    bioLine1: "sgfyejhhfuiadjkhgnvjkrhsbdvdgb",
    bioLine2: "dbvcng vbbncjkvnd jvbdnjjdkbn",
    imageSrc: "/images/liebert.png",
    fallbackSrcs: ["/images/barayuga.png", "/images/liebert.jpg"],
    imageAlt: "Liebert Barayuga Portrait",
    containerStyle: {
      right: "0.5%",
      bottom: "0px",
      width: "43%",
      height: "94%",
    },
    detailSide: "left",
    detailImageSrc: "/images/liebert.png",
    detailHeadingStyle: {
      right: "11.5%",
      top: "2%",
    },
    detailCardStyle: {
      left: "11.5%",
      right: "6%",
      top: "10%",
      bottom: "9%",
    },
    detailContainerStyle: {
      left: "0%",
      bottom: "9%",
      width: "43%",
      height: "130%",
    },
  },
  {
    id: "member-5",
    firstName: "KURT",
    lastName: "GO",
    roleLine: "home | home | home",
    bioLine1: "sgfyejhhfuiadjkhgnvjkrhsbdvdgb",
    bioLine2: "dbvcng vbbncjkvnd jvbdnjjdkbn",
    imageSrc: "/images/kurt.png",
    fallbackSrcs: ["/images/go.png", "/images/kurt-go.png"],
    imageAlt: "Kurt Go Portrait",
    containerStyle: {
      right: "0%",
      bottom: "0px",
      width: "44%",
      height: "93.5%",
    },
    detailSide: "right",
    detailImageSrc: "/images/kurt.png",
    detailHeadingStyle: {
      left: "7.8%",
      top: "2%",
    },
    detailCardStyle: {
      left: "7.8%",
      right: "14%",
      top: "10%",
      bottom: "0px",
    },
    detailContainerStyle: {
      right: "-1%",
      bottom: "0px",
      width: "44%",
      height: "130%",
    },
  },
];

const BASE_SLIDES = [
  { type: "hero", key: "team-hero" },
  ...MEMBER_SLIDES.map((member) => ({
    type: "member",
    key: member.id,
    member,
  })),
];

const LOOP_SLIDES = [
  { ...BASE_SLIDES[BASE_SLIDES.length - 1], key: "clone-start" },
  ...BASE_SLIDES,
  { ...BASE_SLIDES[0], key: "clone-end" },
];

function ResilientImage({
  src,
  fallbacks = [],
  alt,
  style,
  className,
  showMissingHint = false,
}) {
  const candidates = [src, ...fallbacks];
  const [attemptIndex, setAttemptIndex] = useState(0);

  useEffect(() => {
    setAttemptIndex(0);
  }, [src]);

  const currentSrc = candidates[attemptIndex];

  if (!currentSrc) {
    if (!showMissingHint) return null;
    return (
      <div
        style={style}
        className="flex items-center justify-center rounded-xl border border-dashed border-white/30 bg-white/5 px-4 text-center text-xs text-white/70"
      >
        Image not found:{" "}
        <code className="ml-1 font-mono text-white">public{src}</code>
      </div>
    );
  }

  return (
    <img
      src={currentSrc}
      alt={alt}
      onError={() => setAttemptIndex((prev) => prev + 1)}
      style={style}
      className={className}
    />
  );
}

export default function Home() {
  const totalSlides = BASE_SLIDES.length;

  const [activeNav, setActiveNav] = useState("HOME");
  const [trackIndex, setTrackIndex] = useState(1);
  const [isResetting, setIsResetting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isScrolledDown, setIsScrolledDown] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const dragStartX = useRef(null);
  const sliderRef = useRef(null);
  const memberSectionRefs = useRef({});

  const activeSlide = (trackIndex - 1 + totalSlides) % totalSlides;

  const goNext = useCallback(() => {
    setIsResetting(false);
    setTrackIndex((prev) => (prev >= totalSlides + 1 ? 1 : prev + 1));
  }, [totalSlides]);

  const goPrev = useCallback(() => {
    setIsResetting(false);
    setTrackIndex((prev) => (prev <= 0 ? totalSlides : prev - 1));
  }, [totalSlides]);

  const goToSlide = (targetSlideIndex) => {
    setIsResetting(false);
    setTrackIndex(targetSlideIndex + 1);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolledDown(window.scrollY > window.innerHeight * 0.35);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isDragging || isPaused || isScrolledDown) return;
    const timer = window.setInterval(goNext, AUTO_SLIDE_INTERVAL);
    return () => window.clearInterval(timer);
  }, [goNext, isDragging, isPaused, isScrolledDown, trackIndex]);

  const snapFromCloneIfNeeded = useCallback(() => {
    if (trackIndex === totalSlides + 1) {
      setIsResetting(true);
      setTrackIndex(1);
    } else if (trackIndex === 0) {
      setIsResetting(true);
      setTrackIndex(totalSlides);
    }
  }, [trackIndex, totalSlides]);

  useEffect(() => {
    if (trackIndex !== totalSlides + 1 && trackIndex !== 0) return;
    const fallback = window.setTimeout(snapFromCloneIfNeeded, 760);
    return () => window.clearTimeout(fallback);
  }, [trackIndex, totalSlides, snapFromCloneIfNeeded]);

  useEffect(() => {
    if (!isResetting) return;
    let innerFrame = 0;
    const outerFrame = window.requestAnimationFrame(() => {
      innerFrame = window.requestAnimationFrame(() => {
        setIsResetting(false);
      });
    });
    return () => {
      window.cancelAnimationFrame(outerFrame);
      window.cancelAnimationFrame(innerFrame);
    };
  }, [isResetting]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goNext, goPrev]);

  const handleTrackTransitionEnd = (e) => {
    if (e.target !== e.currentTarget) return;
    snapFromCloneIfNeeded();
  };

  const handlePointerDown = (e) => {
    if (e.target.closest("button")) return;
    dragStartX.current = e.clientX;
    setIsDragging(true);
  };

  const handlePointerMove = (e) => {
    if (!isDragging || dragStartX.current === null) return;
    setDragOffset(e.clientX - dragStartX.current);
  };

  const handlePointerEnd = () => {
    if (!isDragging) return;
    const threshold = 70;
    if (dragOffset < -threshold) {
      goNext();
    } else if (dragOffset > threshold) {
      goPrev();
    }
    setDragOffset(0);
    setIsDragging(false);
    dragStartX.current = null;
  };

  return (
    <main
      style={{
        background:
          "radial-gradient(circle at 72% 28%, #0052d4 0%, #03256c 45%, #040d26 100%)",
        overflowX: "clip",
      }}
      className="relative w-full select-none font-sans text-white"
    >
      {/* Shared Fixed Background Grid Image */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <ResilientImage
          src="/images/background.jpg"
          fallbacks={[
            "/images/background.png",
            "/background.jpg",
            "/background.png",
          ]}
          alt="Grid Gradient Background"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Shared Fixed Top Header / Navigation */}
      <header
        style={{ top: "6.2%" }}
        className="fixed inset-x-0 z-50 flex items-center justify-center px-6"
      >
        <span
          style={{
            left: "2.7%",
            fontSize: "clamp(12px, 1.1vw, 22px)",
            opacity: activeSlide === 0 && !isScrolledDown ? 1 : 0,
          }}
          className="absolute font-bold tracking-wider text-white/55 transition-opacity duration-500"
        >
          2026
        </span>

        <nav aria-label="Primary Navigation">
          <ul style={{ gap: "3.2vw" }} className="flex items-center">
            {NAV_ITEMS.map((item) => {
              const isActive = activeNav === item;
              return (
                <li key={item}>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveNav(item);
                      if (item === "HOME") {
                        sliderRef.current?.scrollIntoView({
                          behavior: "smooth",
                        });
                      }
                    }}
                    style={{ fontSize: "clamp(12px, 1.08vw, 21px)" }}
                    className={`cursor-pointer font-semibold tracking-[0.05em] transition-opacity duration-200 ${
                      isActive
                        ? "text-white"
                        : "text-white/90 hover:text-white"
                    }`}
                  >
                    {item}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </header>

      {/* SCREEN 1: TEAM HERO & MEMBER SLIDER */}
      <section
        ref={sliderRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerEnd}
        onPointerCancel={handlePointerEnd}
        className="relative z-10 h-screen min-h-[520px] w-full overflow-hidden touch-pan-y cursor-grab active:cursor-grabbing"
      >
        {/* Infinite Loop Card Slider Track */}
        <div
          onTransitionEnd={handleTrackTransitionEnd}
          style={{
            transform: `translate3d(calc(-${trackIndex * 100}% + ${dragOffset}px), 0, 0)`,
            transition:
              isDragging || isResetting
                ? "none"
                : "transform 700ms cubic-bezier(0.22, 1, 0.36, 1)",
          }}
          className="flex h-full w-full will-change-transform"
        >
          {LOOP_SLIDES.map((slide, idx) => {
            const isCurrent = trackIndex === idx;
            const cardMotionStyle = {
              transform: isCurrent ? "scale(1)" : "scale(0.94)",
              opacity: isCurrent ? 1 : 0.4,
              transition: isResetting
                ? "none"
                : "transform 700ms cubic-bezier(0.22, 1, 0.36, 1), opacity 700ms cubic-bezier(0.22, 1, 0.36, 1)",
            };

            if (slide.type === "hero") {
              return (
                <div
                  key={slide.key}
                  aria-hidden={!isCurrent}
                  style={cardMotionStyle}
                  className="relative h-full w-full shrink-0 overflow-hidden"
                >
                  {/* Top-Left: Adobe Illustrator */}
                  <ResilientImage
                    src="/images/illustrator.png"
                    fallbacks={["/images/illustrator.webp", "/illustrator.png"]}
                    alt="Adobe Illustrator"
                    style={{
                      position: "absolute",
                      left: "7.7%",
                      top: "10.7%",
                      width: "min(11.6vw, 20.5vh)",
                      height: "auto",
                      transform: "rotate(16deg)",
                      filter: "drop-shadow(0 20px 30px rgba(0,0,0,0.45))",
                      zIndex: 10,
                    }}
                    className="pointer-events-none"
                  />

                  {/* Top-Right: Canva */}
                  <ResilientImage
                    src="/images/canva.png"
                    fallbacks={["/images/canva.webp", "/canva.png"]}
                    alt="Canva"
                    style={{
                      position: "absolute",
                      right: "3.8%",
                      top: "9.8%",
                      width: "min(14.2vw, 25vh)",
                      height: "auto",
                      transform: "rotate(-32deg)",
                      filter: "drop-shadow(0 22px 35px rgba(0,0,0,0.35))",
                      zIndex: 10,
                    }}
                    className="pointer-events-none"
                  />

                  {/* Bottom-Left: Figma */}
                  <ResilientImage
                    src="/images/figma.png"
                    fallbacks={["/images/figma.webp", "/figma.png"]}
                    alt="Figma"
                    style={{
                      position: "absolute",
                      left: "-3%",
                      bottom: "-1%",
                      width: "min(20vw, 35.5vh)",
                      height: "auto",
                      transform: "rotate(31deg)",
                      filter: "drop-shadow(0 25px 35px rgba(0,0,0,0.55))",
                      zIndex: 10,
                    }}
                    className="pointer-events-none"
                  />

                  {/* Bottom-Right: Adobe Photoshop */}
                  <ResilientImage
                    src="/images/photoshop.png"
                    fallbacks={["/images/photoshop.webp", "/photoshop.png"]}
                    alt="Adobe Photoshop"
                    style={{
                      position: "absolute",
                      right: "-3.2%",
                      bottom: "2.2%",
                      width: "min(21vw, 37vh)",
                      height: "auto",
                      transform: "rotate(-20deg)",
                      filter: "drop-shadow(0 25px 35px rgba(0,0,0,0.55))",
                      zIndex: 10,
                    }}
                    className="pointer-events-none"
                  />

                  {/* Center Hero Stacked Typography */}
                  <div
                    style={{ top: "21%" }}
                    className="absolute inset-x-0 z-20 flex flex-col items-center justify-center px-4"
                  >
                    <p
                      style={{
                        marginBottom: "0.35vh",
                        transform: "translateX(1.4vw)",
                        fontSize: "min(2.55vw, 4.5vh)",
                      }}
                      className="font-black leading-none tracking-[-0.02em] text-white"
                    >
                      TEAM
                    </p>

                    <div className="flex flex-col items-center font-black uppercase leading-[0.95] tracking-[-0.03em]">
                      <h1
                        style={{
                          zIndex: 30,
                          transform: "translateX(1.55vw) rotate(-2.4deg)",
                          fontSize: "min(9.7vw, 17.2vh)",
                          color: "#E6EEFA",
                        }}
                      >
                        PORTFOLIO
                      </h1>

                      <span
                        aria-hidden="true"
                        style={{
                          zIndex: 20,
                          transform: "translateX(-10vw) rotate(1.1deg)",
                          fontSize: "min(9.7vw, 17.2vh)",
                          color: "#899CB9",
                        }}
                      >
                        PORTFOLIO
                      </span>

                      <span
                        aria-hidden="true"
                        style={{
                          zIndex: 10,
                          transform: "translateX(10.2vw) rotate(-3.3deg)",
                          fontSize: "min(9.7vw, 17.2vh)",
                          color: "#5C708E",
                        }}
                      >
                        PORTFOLIO
                      </span>
                    </div>
                  </div>
                </div>
              );
            }

            const { member } = slide;
            return (
              <div
                key={slide.key}
                aria-hidden={!isCurrent}
                style={cardMotionStyle}
                className="relative h-full w-full shrink-0 overflow-hidden"
              >
                {/* Right Side: Full-Height Portrait Flush With Bottom */}
                <div
                  style={{
                    position: "absolute",
                    zIndex: 10,
                    ...member.containerStyle,
                  }}
                  className="pointer-events-none select-none"
                >
                  <ResilientImage
                    src={member.imageSrc}
                    fallbacks={member.fallbackSrcs}
                    alt={member.imageAlt}
                    showMissingHint
                    className="h-full w-full object-contain object-bottom"
                  />
                </div>

                {/* Left-Aligned Member Details */}
                <div
                  style={{
                    position: "absolute",
                    left: "9.8%",
                    top: "26.5%",
                    width: "46%",
                    zIndex: 20,
                  }}
                  className="flex flex-col items-start"
                >
                  <h2
                    style={{
                      fontSize: "clamp(2.4rem, min(6.1vw, 10.8vh), 124px)",
                      lineHeight: 0.91,
                    }}
                    className="flex flex-col font-black uppercase tracking-[-0.02em] text-white"
                  >
                    <span>{member.firstName}</span>
                    <span>{member.lastName}</span>
                  </h2>

                  <p
                    style={{
                      marginTop: "2.2vh",
                      fontSize: "clamp(13px, min(1.4vw, 2.5vh), 26px)",
                    }}
                    className="font-normal tracking-[0.01em] text-white/95"
                  >
                    {member.roleLine}
                  </p>

                  <div
                    style={{
                      marginTop: "1.8vh",
                      fontSize: "clamp(12px, min(1.32vw, 2.35vh), 24px)",
                      lineHeight: 1.32,
                    }}
                    className="flex flex-col font-light text-white/75"
                  >
                    <p>{member.bioLine1}</p>
                    <p>{member.bioLine2}</p>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      memberSectionRefs.current[member.id]?.scrollIntoView({
                        behavior: "smooth",
                      })
                    }
                    style={{
                      marginTop: "3.2vh",
                      width: "clamp(200px, 27.6vw, 440px)",
                      height: "clamp(50px, 13.8vh, 118px)",
                      fontSize: "clamp(13px, min(1.38vw, 2.45vh), 26px)",
                    }}
                    className="flex cursor-pointer items-center justify-center rounded-full bg-[#004AD6] font-bold text-white shadow-[0_8px_28px_rgba(0,45,180,0.5)] transition-transform hover:scale-[1.02] hover:bg-[#005cff] active:scale-[0.98]"
                  >
                    See more Info...
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Pagination Dots */}
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          style={{ bottom: "6.5%" }}
          className="absolute inset-x-0 z-30 flex items-center justify-center"
        >
          <div
            style={{ gap: "clamp(14px, 1.5vw, 28px)" }}
            className="flex items-center"
            role="tablist"
            aria-label="Portfolio slides"
          >
            {BASE_SLIDES.map((slide, index) => {
              const isActive = activeSlide === index;
              return (
                <button
                  key={slide.key}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-label={`Slide ${index + 1}`}
                  onClick={() => goToSlide(index)}
                  style={{
                    width: "clamp(16px, min(1.85vw, 3.3vh), 32px)",
                    height: "clamp(16px, min(1.85vw, 3.3vh), 32px)",
                    backgroundColor: isActive ? "#0044CC" : "#FFFFFF",
                    transform: isActive ? "scale(1.05)" : "scale(1)",
                  }}
                  className="cursor-pointer rounded-full shadow-[0_10px_18px_rgba(0,12,60,0.85)] transition-transform duration-300 hover:scale-110"
                />
              );
            })}
          </div>
        </div>
      </section>

      {/* SCROLL-DOWN SECTIONS: STACKED ALTERNATING EDUCATION & SKILLS */}
      {MEMBER_SLIDES.map((member, index) => {
        const isFirstDetailSection = index === 0;

        return (
          <section
            key={`education-${member.id}`}
            ref={(el) => {
              memberSectionRefs.current[member.id] = el;
            }}
            aria-label={`${member.firstName} ${member.lastName} Education and Skills`}
            style={{ zIndex: 10 + index * 10 }}
            className={`relative w-full ${
              isFirstDetailSection
                ? "h-screen min-h-[560px] overflow-hidden"
                : "h-[76vh] min-h-[460px] overflow-visible"
            }`}
          >
            {/* Heading Above Blue Card */}
            <h2
              style={{
                position: "absolute",
                fontSize: "clamp(1.35rem, min(2.85vw, 5vh), 58px)",
                zIndex: 20,
                ...member.detailHeadingStyle,
              }}
              className="font-black uppercase leading-none tracking-[-0.02em] text-white"
            >
              EDUCATION &amp; SKILLS
            </h2>

            {/* Blue Rounded Card Behind Portrait */}
            <div
              style={{
                position: "absolute",
                backgroundColor: "#003893",
                borderRadius: "10px",
                zIndex: 10,
                ...member.detailCardStyle,
              }}
            />

            {/* Member Portrait Overlapping Blue Card & Section Seam */}
            <div
              style={{
                position: "absolute",
                zIndex: 30,
                ...member.detailContainerStyle,
              }}
              className="pointer-events-none select-none"
            >
              <ResilientImage
                src={member.detailImageSrc}
                fallbacks={[member.imageSrc, ...(member.fallbackSrcs ?? [])]}
                alt={member.imageAlt}
                className="h-full w-full object-contain object-bottom"
              />
            </div>
          </section>
        );
      })}
    </main>
  );
}