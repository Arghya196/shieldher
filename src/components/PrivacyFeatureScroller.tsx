"use client";

import { useRef } from "react";

type PrivacySlide = {
  eyebrow: string;
  title: string;
  description: string;
  icon: string;
  toneClass: string;
  pills: string[];
};

const privacySlides: PrivacySlide[] = [
  {
    eyebrow: "Encryption",
    title: "End-to-End Encrypted",
    description:
      "Every screenshot and conversation is encrypted with AES-256 before analysis. Nobody but you can access raw data.",
    icon: "encrypted",
    toneClass: "tone-mint",
    pills: ["AES-256", "Client-side sealed", "Zero raw exposure"],
  },
  {
    eyebrow: "Privacy",
    title: "Ghost Mode",
    description:
      "Activate Ghost Mode to remove traces automatically so sensitive evidence never lingers on your device.",
    icon: "visibility_off",
    toneClass: "tone-sage",
    pills: ["24h auto-delete", "One tap on", "Forensic-safe"],
  },
  {
    eyebrow: "Monitoring",
    title: "24/7 AI Monitoring",
    description:
      "Our AI scans patterns in real time and escalates high-risk scenarios instantly so you never face threats alone.",
    icon: "shield",
    toneClass: "tone-ice",
    pills: ["Continuous scan", "Instant escalation", "Live risk score"],
  },
  {
    eyebrow: "Response",
    title: "Rapid Safety Routing",
    description:
      "The app can route you to safer paths and trusted contacts with contextual alerts when risk rises nearby.",
    icon: "route",
    toneClass: "tone-sand",
    pills: ["Safer route map", "Local risk radar", "Emergency share"],
  },
  {
    eyebrow: "Support",
    title: "Trusted Human Backup",
    description:
      "Escalate from AI to trained support when you need immediate help, documentation guidance, or response coordination.",
    icon: "support_agent",
    toneClass: "tone-cloud",
    pills: ["Human-in-the-loop", "Guided next steps", "Always available"],
  },
];

export default function PrivacyFeatureScroller() {
  const sliderRef = useRef<HTMLDivElement>(null);

  const scrollByDistance = (distance: number) => {
    const slider = sliderRef.current;
    if (!slider) return;
    slider.scrollBy({ left: distance, behavior: "smooth" });
  };

  const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    const slider = sliderRef.current;
    if (!slider) return;

    const hasHorizontalOverflow = slider.scrollWidth > slider.clientWidth;
    if (!hasHorizontalOverflow) return;

    if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;

    const atStart = slider.scrollLeft <= 0;
    const atEnd = slider.scrollLeft + slider.clientWidth >= slider.scrollWidth - 1;
    if ((event.deltaY < 0 && atStart) || (event.deltaY > 0 && atEnd)) return;

    event.preventDefault();
    slider.scrollBy({ left: event.deltaY, behavior: "auto" });
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const slider = sliderRef.current;
    if (!slider) return;
    const cardStep = Math.max(280, slider.clientWidth * 0.45);

    if (event.key === "ArrowRight") {
      event.preventDefault();
      scrollByDistance(cardStep);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      scrollByDistance(-cardStep);
    }
  };

  return (
    <div className="support-slider-shell">
      <div className="support-slider-meta">
        <p className="support-slider-hint">Scroll to explore</p>
      </div>

      <div
        ref={sliderRef}
        className="support-slider"
        onWheel={handleWheel}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        aria-label="Privacy and safety feature cards"
      >
        {privacySlides.map((slide) => (
          <article key={slide.title} className={`support-slide-card ${slide.toneClass}`}>
            <div>
              <p className="support-slide-eyebrow">{slide.eyebrow}</p>
              <h3>{slide.title}</h3>
              <p className="support-slide-desc">{slide.description}</p>
            </div>

            <div className="support-slide-visual">
              <div className="support-slide-icon">
                <span className="material-symbols-outlined">{slide.icon}</span>
              </div>
              <div className="support-pill-list">
                {slide.pills.map((pill) => (
                  <span key={`${slide.title}-${pill}`} className="support-pill">
                    {pill}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
