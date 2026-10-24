"use client";
import { MotionConfig, animate, motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
/**
 * Motion primitives. Principles: opacity and transform only, played once when
 * scrolled into view, short and quiet. `MotionConfig reducedMotion="user"`
 * (see MotionProvider) disables transform animation for visitors who prefer
 * reduced motion, and the pages stay fully readable with JavaScript off
 * (see the <noscript> rule in the root layout).
 */
const ease = [0.22, 1, 0.36, 1];
export function MotionProvider({ children }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
/** Fade-up reveal, once, as the element enters the viewport. */
export function Reveal({ children, delay = 0, y = 22, className }) {
  return (
    <motion.div
      data-reveal
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.9, ease, delay }}
    >
      {children}
    </motion.div>
  );
}
const group = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
};
const item = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
};
/** Staggered group: wrap children in <StaggerItem>. */
export function Stagger({ children, className }) {
  return (
    <motion.div
      data-reveal
      className={className}
      variants={group}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
    >
      {children}
    </motion.div>
  );
}
export function StaggerItem({ children, className }) {
  return (
    <motion.div data-reveal className={className} variants={item}>
      {children}
    </motion.div>
  );
}
/** List variants so staggered lists keep valid <ol>/<li> markup. */
export function StaggerList({ children, className }) {
  return (
    <motion.ol
      data-reveal
      className={className}
      variants={group}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
    >
      {children}
    </motion.ol>
  );
}
export function StaggerListItem({ children, className }) {
  return (
    <motion.li data-reveal className={className} variants={item}>
      {children}
    </motion.li>
  );
}
/**
 * Counts up once when scrolled into view. The server renders the final value,
 * so crawlers and no-JS visitors always see the real figure.
 */
export function CountUp({ value, decimals = 0, prefix = "", suffix = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const [current, setCurrent] = useState(value);
  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const controls = animate(0, value, {
      duration: 1.8,
      ease,
      onUpdate: setCurrent,
    });
    return () => controls.stop();
  }, [inView, value]);
  return (
    <span ref={ref} aria-label={`${prefix}${value.toFixed(decimals)}${suffix}`}>
      <span aria-hidden="true">
        {prefix}
        {current.toLocaleString("en-IN", {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        })}
        {suffix}
      </span>
    </span>
  );
}
