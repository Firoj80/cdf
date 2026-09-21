"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ZoomIn } from "lucide-react";

gsap.registerPlugin(SplitText);

const DEFAULT_ROOT_MARGIN = "256px";

type RafRoot = Element | null | { current: Element | null } | (() => Element | null);

function resolveElement(root: RafRoot): Element | null {
  if (!root) return null;
  if (typeof root === "function") return root() ?? null;
  if (typeof root === "object" && "current" in root) return root.current ?? null;
  return root;
}

interface VisibilityGateOptions {
  root?: RafRoot;
  rootMargin?: string;
  threshold?: number;
  observeTab?: boolean;
  observeOffscreen?: boolean;
  onChange?: (active: boolean) => void;
}

interface VisibilityGate {
  readonly isActive: boolean;
  observe: (nextRoot?: RafRoot) => void;
  destroy: () => void;
}

function createVisibilityGate({
  root = null,
  rootMargin = DEFAULT_ROOT_MARGIN,
  threshold = 0,
  observeTab = true,
  observeOffscreen = true,
  onChange,
}: VisibilityGateOptions = {}): VisibilityGate {
  let tabVisible =
    typeof document === "undefined" ? true : !document.hidden;
  let onscreen = true;
  let destroyed = false;
  let observer: IntersectionObserver | null = null;

  const isActive = () => {
    if (destroyed) return false;
    if (observeTab && !tabVisible) return false;
    if (observeOffscreen && resolveElement(root) && !onscreen) return false;
    return true;
  };

  let lastActive = isActive();

  const emit = () => {
    if (destroyed) return;
    const next = isActive();
    if (next === lastActive) return;
    lastActive = next;
    onChange?.(next);
  };

  const onVisibilityChange = () => {
    tabVisible = !document.hidden;
    emit();
  };

  if (observeTab && typeof document !== "undefined") {
    document.addEventListener("visibilitychange", onVisibilityChange);
  }

  const bindObserver = () => {
    if (!observeOffscreen || typeof IntersectionObserver === "undefined") {
      return;
    }

    const el = resolveElement(root);
    if (!el) return;

    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          onscreen = entry.isIntersecting;
        }
        emit();
      },
      { rootMargin, threshold },
    );

    observer.observe(el);
  };

  bindObserver();

  return {
    get isActive() {
      return isActive();
    },

    observe(nextRoot?: RafRoot) {
      if (destroyed) return;
      if (nextRoot != null) root = nextRoot;
      if (observer) {
        observer.disconnect();
        observer = null;
      }
      onscreen = true;
      bindObserver();
      emit();
    },

    destroy() {
      if (destroyed) return;
      destroyed = true;
      if (observeTab && typeof document !== "undefined") {
        document.removeEventListener("visibilitychange", onVisibilityChange);
      }
      if (observer) {
        observer.disconnect();
        observer = null;
      }
    },
  };
}

interface SuspendedRafOptions {
  onFrame: (time: number) => void;
  root?: RafRoot;
  rootMargin?: string;
  threshold?: number;
  observeTab?: boolean;
  observeOffscreen?: boolean;
}

interface SuspendedRaf {
  start: () => void;
  stop: () => void;
  readonly isRunning: boolean;
  readonly isActive: boolean;
  observe: (nextRoot?: RafRoot) => void;
  destroy: () => void;
}

function createSuspendedRaf({
  onFrame,
  root = null,
  rootMargin = DEFAULT_ROOT_MARGIN,
  threshold = 0,
  observeTab = true,
  observeOffscreen = true,
}: SuspendedRafOptions): SuspendedRaf {
  if (typeof onFrame !== "function") {
    throw new TypeError("createSuspendedRaf: onFrame is required");
  }

  let rafId: number | null = null;
  let running = false;
  let destroyed = false;

  const stopRaf = () => {
    if (rafId != null) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
  };

  const tick = (time: number) => {
    rafId = null;
    if (destroyed || !running || !gate.isActive) return;
    onFrame(time);
    if (!destroyed && running && gate.isActive) {
      rafId = requestAnimationFrame(tick);
    }
  };

  const sync = () => {
    if (destroyed) return;
    if (running && gate.isActive) {
      if (rafId == null) {
        rafId = requestAnimationFrame(tick);
      }
    } else {
      stopRaf();
    }
  };

  const gate = createVisibilityGate({
    root,
    rootMargin,
    threshold,
    observeTab,
    observeOffscreen,
    onChange: sync,
  });

  return {
    start() {
      if (destroyed) return;
      running = true;
      sync();
    },

    stop() {
      running = false;
      stopRaf();
    },

    get isRunning() {
      return running;
    },

    get isActive() {
      return gate.isActive;
    },

    observe(nextRoot?: RafRoot) {
      gate.observe(nextRoot);
      sync();
    },

    destroy() {
      if (destroyed) return;
      destroyed = true;
      running = false;
      stopRaf();
      gate.destroy();
    },
  };
}

export interface InfinitePerspectiveSliderItemData {
  src?: string;
  number?: string | number;
  title?: string;
  desc?: string;
  description?: string;
  badge?: string;
  beforeImage?: string;
  afterImage?: string;
}

export type InfinitePerspectiveSliderItem = string | InfinitePerspectiveSliderItemData;

const getItemData = (
  item: InfinitePerspectiveSliderItem
): InfinitePerspectiveSliderItemData =>
  typeof item === "string" ? { src: item } : item;

interface CardSetter {
  x: (value: number | string) => void;
  rotateY: (value: number | string) => void;
}

interface SliderConfig {
  cardWidth: number;
  scrollSpeed: number;
  scrollLerp: number;
  velocityLerp: number;
  rotationSensitivity: number;
  rotationDamp: number;
  rotationLerp: number;
  maxRotation: number;
  scrollStopDelay: number;
  textEnterDuration: number;
  textLeaveDuration: number;
  textStagger: number;
}

export interface InfinitePerspectiveSliderProps {
  images?: InfinitePerspectiveSliderItem[];
  cardWidth?: number;
  cardGap?: number;
  perspective?: number;
  scrollSpeed?: number;
  scrollLerp?: number;
  velocityLerp?: number;
  rotationSensitivity?: number;
  rotationDamp?: number;
  rotationLerp?: number;
  maxRotation?: number;
  scrollStopDelay?: number;
  textEnterDuration?: number;
  textLeaveDuration?: number;
  textStagger?: number;
  onItemClick?: (item: InfinitePerspectiveSliderItemData, index: number) => void;
}

function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
}

const DEFAULT_CARD_WIDTH = 320;
const DEFAULT_CARD_GAP = 24;
const MOBILE_BREAKPOINT = 640;
const TABLET_BREAKPOINT = 1025;
const MOBILE_CARD_WIDTH = 250;
const MOBILE_CARD_GAP = 16;
const TABLET_CARD_WIDTH = 340;
const TABLET_CARD_GAP = 20;

const ACTIVE_CONTENT_CLEAR_DELTA = 2;
const TEXT_LEAVE_STAGGER = 0.04;

export default function InfinitePerspectiveSlider({
  images = [],
  cardWidth = DEFAULT_CARD_WIDTH,
  cardGap = DEFAULT_CARD_GAP,
  perspective = 2200,
  scrollSpeed = 1.0,
  scrollLerp = 0.1,
  velocityLerp = 0.09,
  rotationSensitivity = 0.025,
  rotationDamp = 0.1,
  rotationLerp = 0.12,
  maxRotation = 80,
  scrollStopDelay = 180,
  textEnterDuration = 0.35,
  textLeaveDuration = 0.35,
  textStagger = 0.06,
  onItemClick,
}: InfinitePerspectiveSliderProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const stripRef = useRef<HTMLDivElement | null>(null);
  const settersRef = useRef<CardSetter[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const numberRefs = useRef<(HTMLDivElement | null)[]>([]);
  const titleRefs = useRef<(HTMLDivElement | null)[]>([]);
  const descriptionRefs = useRef<(HTMLDivElement | null)[]>([]);

  const activeHoverIndexRef = useRef<number | null>(null);
  const hoveredIndexRef = useRef<number | null>(null);
  const isScrollingRef = useRef(false);
  const scrollStopTimerRef = useRef<number | null>(null);

  const leaveHandlersRef = useRef<Record<number, () => void>>({});
  const enterHandlersRef = useRef<Record<number, () => void>>({});

  const [viewportWidth, setViewportWidth] = useState(DEFAULT_CARD_WIDTH * 4);

  const isMobileViewport = viewportWidth < MOBILE_BREAKPOINT;
  const isTabletViewport =
    viewportWidth >= MOBILE_BREAKPOINT && viewportWidth < TABLET_BREAKPOINT;

  const resolvedCardWidth = isMobileViewport
    ? MOBILE_CARD_WIDTH
    : isTabletViewport
      ? TABLET_CARD_WIDTH
      : cardWidth;

  const resolvedCardGap = isMobileViewport
    ? MOBILE_CARD_GAP
    : isTabletViewport
      ? TABLET_CARD_GAP
      : cardGap;

  const cardStep = resolvedCardWidth + resolvedCardGap;

  const cardHeight = isMobileViewport
    ? "calc(38vh + 60px)"
    : isTabletViewport
      ? "calc(42vh + 70px)"
      : "calc(46vh + 80px)";

  const stateRef = useRef({
    current: 0,
    target: 0,
    velocity: 0,
    smoothVelocity: 0,
    rotationVelocity: 0,
    currentRotation: 0,
    prevDirection: 0,
    isDragging: false,
    startX: 0,
    lastX: 0,
    totalDragDist: 0,
  });

  const configRef = useRef<SliderConfig>({
    cardWidth: resolvedCardWidth,
    scrollSpeed,
    scrollLerp,
    velocityLerp,
    rotationSensitivity,
    rotationDamp,
    rotationLerp,
    maxRotation,
    scrollStopDelay,
    textEnterDuration,
    textLeaveDuration,
    textStagger,
  });

  configRef.current = {
    cardWidth: resolvedCardWidth,
    scrollSpeed,
    scrollLerp,
    velocityLerp,
    rotationSensitivity,
    rotationDamp,
    rotationLerp,
    maxRotation,
    scrollStopDelay,
    textEnterDuration,
    textLeaveDuration,
    textStagger,
  };

  const lerp = (a: number, b: number, n: number) => a + (b - a) * n;
  const clamp = (value: number, min: number, max: number) =>
    Math.max(min, Math.min(max, value));

  const clearActiveContent = useCallback(() => {
    const activeIndex = activeHoverIndexRef.current;
    if (activeIndex === null) return;
    const leaveHandler = leaveHandlersRef.current[activeIndex];
    if (leaveHandler) {
      leaveHandler();
    }
    activeHoverIndexRef.current = null;
  }, []);

  const markScrolling = useCallback(() => {
    isScrollingRef.current = true;
    clearActiveContent();

    if (scrollStopTimerRef.current) {
      window.clearTimeout(scrollStopTimerRef.current);
    }

    scrollStopTimerRef.current = window.setTimeout(() => {
      isScrollingRef.current = false;
      scrollStopTimerRef.current = null;

      const hoveredIndex = hoveredIndexRef.current;
      if (hoveredIndex === null) return;
      const enterHandler = enterHandlersRef.current[hoveredIndex];
      if (enterHandler) {
        enterHandler();
      }
    }, configRef.current.scrollStopDelay);
  }, [clearActiveContent]);

  const initSetters = () => {
    if (!stripRef.current) return;

    settersRef.current = Array.from(stripRef.current.children).map(
      (element) =>
        ({
          x: gsap.quickSetter(element, "x", "px"),
          rotateY: gsap.quickSetter(element, "rotateY", "deg"),
        }) as CardSetter
    );
  };

  const positionCards = useCallback(
    (offset: number, rotation: number) => {
      const strip = stripRef.current;
      if (!strip || !images.length) return;

      const cards = strip.children;
      const setters = settersRef.current;
      const count = images.length;
      const loopWidth = count * cardStep;

      const viewW = containerRef.current?.clientWidth || window.innerWidth;
      const centerX = viewW / 2;
      const centreOffset = centerX - configRef.current.cardWidth / 2;

      for (let index = 0; index < cards.length; index += 1) {
        let x = index * cardStep - offset + centreOffset;
        x = ((x % loopWidth) + loopWidth) % loopWidth;

        if (x > loopWidth - cardStep) {
          x -= loopWidth;
        }

        setters[index]?.x(x);
        setters[index]?.rotateY(rotation);
      }
    },
    [cardStep, images]
  );

  useEffect(() => {
    const updateViewport = () => {
      if (containerRef.current) {
        setViewportWidth(containerRef.current.clientWidth);
      } else {
        setViewportWidth(window.innerWidth);
      }
    };

    updateViewport();
    window.addEventListener("resize", updateViewport);
    return () => {
      window.removeEventListener("resize", updateViewport);
    };
  }, []);

  useEffect(() => {
    if (!images.length) return;

    const state = stateRef.current;
    const loopWidth = images.length * cardStep;
    const reducedMotion = prefersReducedMotion();

    initSetters();

    const tick = () => {
      if (reducedMotion) {
        state.current = state.target;
        state.velocity = 0;
        state.smoothVelocity = 0;
        state.rotationVelocity = 0;
        state.currentRotation = 0;
      } else {
        const config = configRef.current;
        state.current = lerp(state.current, state.target, config.scrollLerp);
        state.velocity = state.target - state.current;

        state.smoothVelocity = lerp(
          state.smoothVelocity,
          state.velocity,
          config.velocityLerp
        );

        state.rotationVelocity = lerp(
          state.rotationVelocity,
          state.velocity,
          config.rotationDamp
        );

        const absVel = Math.abs(state.rotationVelocity);
        const sign = Math.sign(state.rotationVelocity);
        const targetRotation = sign * absVel * config.rotationSensitivity;

        state.currentRotation = lerp(
          state.currentRotation,
          targetRotation,
          config.rotationLerp
        );
      }

      const finalRotation = clamp(
        state.currentRotation,
        -configRef.current.maxRotation,
        configRef.current.maxRotation
      );

      if (Math.abs(state.current - state.target) < 0.05) {
        const shift = Math.round(state.current / loopWidth) * loopWidth;
        state.current -= shift;
        state.target -= shift;
      }

      positionCards(state.current, finalRotation);
    };

    const containerEl = containerRef.current;

    const onWheel = (event: WheelEvent) => {
      const delta = event.deltaY || event.deltaX;
      if (Math.abs(delta) >= ACTIVE_CONTENT_CLEAR_DELTA) {
        markScrolling();
      }
      state.target += delta * configRef.current.scrollSpeed;
    };

    const onDown = (clientX: number) => {
      state.isDragging = true;
      state.startX = clientX;
      state.lastX = clientX;
      state.totalDragDist = 0;
      markScrolling();
    };

    const onMove = (clientX: number) => {
      if (!state.isDragging) return;
      const delta = clientX - state.lastX;
      state.totalDragDist += Math.abs(delta);
      state.lastX = clientX;

      if (Math.abs(delta) >= ACTIVE_CONTENT_CLEAR_DELTA) {
        markScrolling();
      }

      state.target += -delta * configRef.current.scrollSpeed;
    };

    const onUp = () => {
      state.isDragging = false;
    };

    const handleMouseDown = (event: MouseEvent) => onDown(event.clientX);
    const handleMouseMove = (event: MouseEvent) => onMove(event.clientX);
    const handleMouseUp = () => onUp();

    const handleTouchStart = (event: TouchEvent) =>
      onDown(event.touches[0].clientX);
    const handleTouchMove = (event: TouchEvent) =>
      onMove(event.touches[0].clientX);
    const handleTouchEnd = () => onUp();

    const onResize = () => {
      markScrolling();
      initSetters();
      positionCards(state.current, state.currentRotation);
    };

    state.current = 0;
    state.target = 0;
    state.velocity = 0;
    state.smoothVelocity = 0;
    state.rotationVelocity = 0;
    state.currentRotation = 0;
    state.prevDirection = 0;

    activeHoverIndexRef.current = null;
    hoveredIndexRef.current = null;
    isScrollingRef.current = false;

    positionCards(0, 0);
    gsap.set(cardRefs.current, { opacity: 1 });

    const loop = createSuspendedRaf({
      root: stripRef,
      onFrame: tick,
    });
    loop.start();

    if (containerEl) {
      containerEl.addEventListener("wheel", onWheel, { passive: true });
      containerEl.addEventListener("mousedown", handleMouseDown);
      containerEl.addEventListener("touchstart", handleTouchStart, { passive: true });
    }

    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      loop.destroy();
      if (scrollStopTimerRef.current) {
        window.clearTimeout(scrollStopTimerRef.current);
      }

      if (containerEl) {
        containerEl.removeEventListener("wheel", onWheel);
        containerEl.removeEventListener("mousedown", handleMouseDown);
        containerEl.removeEventListener("touchstart", handleTouchStart);
      }

      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [cardStep, images, positionCards, markScrolling]);

  useEffect(() => {
    if (!images.length) return;

    interface AnimationEntry {
      image: HTMLElement;
      handleImageEnter: () => void;
      handleImageLeave: () => void;
      numberSplit: InstanceType<typeof SplitText>;
      titleSplit: InstanceType<typeof SplitText>;
      descriptionSplit: InstanceType<typeof SplitText>;
    }

    const animations: AnimationEntry[] = [];

    leaveHandlersRef.current = {};
    enterHandlersRef.current = {};
    activeHoverIndexRef.current = null;
    hoveredIndexRef.current = null;

    cardRefs.current.forEach((card, index) => {
      const image = imageRefs.current[index];
      const number = numberRefs.current[index];
      const title = titleRefs.current[index];
      const description = descriptionRefs.current[index];

      if (!card || !image || !number || !title || !description) return;

      const numberSplit = SplitText.create(number, {
        type: "lines",
        mask: "lines",
      });

      const titleSplit = SplitText.create(title, {
        type: "lines",
        mask: "lines",
      });

      const descriptionSplit = SplitText.create(description, {
        type: "lines",
        mask: "lines",
      });

      const numberLines = numberSplit.lines;
      const titleLines = titleSplit.lines;
      const descriptionLines = descriptionSplit.lines;

      const allLines = [...numberLines, ...titleLines, ...descriptionLines];

      gsap.set([number, title, description], {
        autoAlpha: 0,
      });

      gsap.set(allLines, {
        yPercent: 100,
      });

      const enter = () => {
        if (isScrollingRef.current) return;

        if (
          activeHoverIndexRef.current !== null &&
          activeHoverIndexRef.current !== index
        ) {
          const previousLeave =
            leaveHandlersRef.current[activeHoverIndexRef.current];
          if (previousLeave) {
            previousLeave();
          }
        }

        activeHoverIndexRef.current = index;

        gsap.killTweensOf(allLines);
        gsap.killTweensOf([number, title, description]);

        gsap
          .timeline({
            defaults: {
              ease: "power3.out",
              overwrite: "auto",
            },
          })
          .set([number, title, description], { autoAlpha: 1 })
          .to(
            numberLines,
            {
              yPercent: 0,
              duration: configRef.current.textEnterDuration,
              stagger: configRef.current.textStagger,
            },
            0
          )
          .to(
            [titleLines, descriptionLines],
            {
              yPercent: 0,
              duration: configRef.current.textEnterDuration,
              stagger: configRef.current.textStagger,
            },
            0.05
          );
      };

      const leave = () => {
        if (activeHoverIndexRef.current === index) {
          activeHoverIndexRef.current = null;
        }

        gsap.killTweensOf(allLines);
        gsap.killTweensOf([number, title, description]);

        gsap
          .timeline({
            defaults: {
              ease: "power3.in",
              overwrite: "auto",
            },
          })
          .to(
            [titleLines, descriptionLines],
            {
              yPercent: 100,
              duration: configRef.current.textLeaveDuration,
              stagger: TEXT_LEAVE_STAGGER,
            },
            0
          )
          .to(
            numberLines,
            {
              yPercent: 100,
              duration: configRef.current.textLeaveDuration,
              stagger: TEXT_LEAVE_STAGGER,
            },
            0.04
          )
          .set([number, title, description], { autoAlpha: 0 });
      };

      const handleImageEnter = () => {
        hoveredIndexRef.current = index;
        if (isScrollingRef.current) return;
        enter();
      };

      const handleImageLeave = () => {
        if (hoveredIndexRef.current === index) {
          hoveredIndexRef.current = null;
        }
        leave();
      };

      enterHandlersRef.current[index] = enter;
      leaveHandlersRef.current[index] = leave;

      image.addEventListener("mouseenter", handleImageEnter);
      image.addEventListener("mouseleave", handleImageLeave);

      animations.push({
        image,
        handleImageEnter,
        handleImageLeave,
        numberSplit,
        titleSplit,
        descriptionSplit,
      });
    });

    return () => {
      animations.forEach(
        ({
          image,
          handleImageEnter,
          handleImageLeave,
          numberSplit,
          titleSplit,
          descriptionSplit,
        }) => {
          image.removeEventListener("mouseenter", handleImageEnter);
          image.removeEventListener("mouseleave", handleImageLeave);
          numberSplit.revert();
          titleSplit.revert();
          descriptionSplit.revert();
        }
      );

      leaveHandlersRef.current = {};
      enterHandlersRef.current = {};
      activeHoverIndexRef.current = null;
      hoveredIndexRef.current = null;
    };
  }, [images]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[65vh] min-h-[480px] max-h-[720px] overflow-hidden select-none cursor-grab active:cursor-grabbing bg-brand-card-3/40 rounded-3xl border border-teal-950/60"
    >
      <div
        className="pointer-events-none relative flex h-full items-center overflow-hidden"
        style={{ perspective }}
      >
        <div
          ref={stripRef}
          className="relative w-full"
          style={{ height: cardHeight, transformStyle: "preserve-3d" }}
        >
          {images.map((item, index) => {
            const data = getItemData(item);
            const { src, number, title, desc, description, badge } = data;

            return (
              <div
                key={index}
                ref={(element) => {
                  cardRefs.current[index] = element;
                }}
                onClick={() => {
                  if (stateRef.current.totalDragDist < 8 && onItemClick) {
                    onItemClick(data, index);
                  }
                }}
                className="pointer-events-auto absolute left-0 top-0 opacity-0 will-change-transform group cursor-pointer"
                style={{
                  width: resolvedCardWidth,
                  height: cardHeight,
                  transformOrigin: "center center",
                  transform: "translateZ(1px)",
                }}
              >
                {/* Number & Badge */}
                <div className="mb-2 flex items-center justify-between">
                  <div
                    ref={(element) => {
                      numberRefs.current[index] = element;
                    }}
                    className="text-xl font-mono font-bold leading-none tracking-tight text-brand-teal opacity-0 max-md:text-base"
                  >
                    {number}
                  </div>
                  {badge && (
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-[10px] font-bold text-emerald-400 uppercase tracking-widest">
                      {badge}
                    </span>
                  )}
                </div>

                {/* Image Container with uncropped full image & ambient backdrop */}
                <div
                  ref={(element) => {
                    imageRefs.current[index] = element;
                  }}
                  className="relative h-[34vh] min-h-[220px] w-full overflow-hidden rounded-2xl bg-slate-950 border border-teal-500/30 shadow-2xl transition-all duration-300 group-hover:border-teal-400/80 group-hover:shadow-[0_0_25px_rgba(20,184,166,0.25)]"
                >
                  {/* Ambient blurred backdrop */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={src}
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-0 h-full w-full object-cover blur-xl opacity-30 scale-110 pointer-events-none"
                    draggable={false}
                  />

                  {/* Crisp uncropped image */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={src}
                    alt={title || `slide-${index}`}
                    className="relative z-10 h-full w-full object-contain p-2 pointer-events-none transition-transform duration-700 group-hover:scale-105"
                    draggable={false}
                  />

                  {/* Tap hint overlay */}
                  <div className="absolute top-2.5 right-2.5 z-20 flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/80 border border-teal-500/40 text-[10px] font-medium text-brand-teal backdrop-blur-md">
                    <ZoomIn className="w-3 h-3 text-emerald-400" />
                    <span>View</span>
                  </div>
                </div>

                {/* Title and Description */}
                <div className="mt-3 space-y-1">
                  <div
                    ref={(element) => {
                      titleRefs.current[index] = element;
                    }}
                    className="text-base sm:text-lg font-playfair font-bold uppercase leading-tight tracking-[0.04em] text-white opacity-0 group-hover:text-brand-teal transition-colors"
                  >
                    {title}
                  </div>

                  <div
                    ref={(element) => {
                      descriptionRefs.current[index] = element;
                    }}
                    className="text-xs text-slate-400 opacity-0 italic"
                  >
                    {desc || description || ""}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Swipe / Scroll Instruction Cue */}
      <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-2 text-xs font-medium text-slate-400 pointer-events-none">
        <span>Swipe, drag or scroll to explore</span>
        <svg
          width="16"
          height="20"
          className="size-3.5 animate-bounce text-brand-teal"
          viewBox="0 0 20 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <polyline
            points="2,2 10,9 18,2"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <polyline
            points="2,10 10,17 18,10"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}
