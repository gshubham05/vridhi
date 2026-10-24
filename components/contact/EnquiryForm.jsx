"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2 } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { enquirySchema, projectTypes, startTimeframes } from "@/lib/validations";
import { cn } from "@/lib/utils";
const field =
  "mt-2 block w-full border border-charcoal/30 bg-ivory px-4 py-3.5 text-[1rem] text-charcoal transition-colors placeholder:text-charcoal/45 focus:border-gold-deep focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-deep/40 aria-[invalid=true]:border-red-700";
const label = "block text-[0.8125rem] font-medium uppercase tracking-[0.12em] text-charcoal";
function Err({ id, message }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="mt-2 text-[0.875rem] text-red-800">
      {message}
    </p>
  );
}
export function EnquiryForm({ projectRef }) {
  const [status, setStatus] = useState({ kind: "idle" });
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(enquirySchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      location: "",
      budget: "",
      startTimeframe: "",
      message: "",
      website: "",
      projectRef,
    },
  });
  async function onSubmit(values) {
    setStatus({ kind: "sending" });
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        trackEvent("enquiry_submitted", { project_type: values.projectType });
        reset();
        setStatus({ kind: "success" });
        return;
      }
      if (res.status === 422 && data.fields) {
        for (const [name, message] of Object.entries(data.fields)) {
          setError(name, { message });
        }
        setStatus({ kind: "error", message: "Please check the highlighted fields and try again." });
        return;
      }
      if (res.status === 429) {
        setStatus({
          kind: "error",
          message: "You have sent several enquiries recently. Please try again in a few minutes, or call us.",
        });
        return;
      }
      setStatus({
        kind: "error",
        message:
          data.error === "not_configured"
            ? "Online enquiries are not available at the moment. Please call or message us directly."
            : "We could not send your enquiry. Please try again, or call or message us directly.",
      });
    } catch {
      setStatus({
        kind: "error",
        message: "We could not reach the server. Please check your connection and try again.",
      });
    }
  }
  if (status.kind === "success") {
    return (
      <div role="status" className="border border-gold/60 bg-paper p-10 text-center">
        <CheckCircle2 aria-hidden="true" className="mx-auto size-10 text-gold-deep" />
        <h3 className="display-sm mt-5">Thank you. Your enquiry has been sent.</h3>
        <p className="mx-auto mt-3 max-w-md text-charcoal/75">
          A member of our team will review the details and contact you personally.
        </p>
        <button
          type="button"
          onClick={() => setStatus({ kind: "idle" })}
          className="link-underline mt-6 text-[0.9375rem] hover:text-gold-deep"
        >
          Send another enquiry
        </button>
      </div>
    );
  }
  const sending = status.kind === "sending";
  const d = (name) => (errors[name] ? `${name}-error` : undefined);
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="grid gap-x-6 gap-y-7 sm:grid-cols-2"
      aria-describedby="form-status"
    >
      <input type="hidden" {...register("projectRef")} />
      {/* Honeypot: hidden from people and assistive tech. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Website
          <input type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
        </label>
      </div>

      {projectRef && (
        <p className="sm:col-span-2 border-l-2 border-gold pl-4 text-[0.9375rem] text-charcoal/75">
          Enquiring about: <span className="font-medium text-charcoal">{projectRef}</span>
        </p>
      )}

      <div>
        <label htmlFor="name" className={label}>
          Full name
        </label>
        <input
          id="name"
          autoComplete="name"
          aria-invalid={!!errors.name}
          aria-describedby={d("name")}
          className={field}
          {...register("name")}
        />
        <Err id="name-error" message={errors.name?.message} />
      </div>
      <div>
        <label htmlFor="phone" className={label}>
          Phone
        </label>
        <input
          id="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          aria-invalid={!!errors.phone}
          aria-describedby={d("phone")}
          className={field}
          {...register("phone")}
        />
        <Err id="phone-error" message={errors.phone?.message} />
      </div>
      <div>
        <label htmlFor="email" className={label}>
          Email <span className="normal-case tracking-normal text-charcoal/75">(optional)</span>
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          aria-invalid={!!errors.email}
          aria-describedby={d("email")}
          className={field}
          {...register("email")}
        />
        <Err id="email-error" message={errors.email?.message} />
      </div>
      <div>
        <label htmlFor="projectType" className={label}>
          Project type
        </label>
        <select
          id="projectType"
          defaultValue=""
          aria-invalid={!!errors.projectType}
          aria-describedby={d("projectType")}
          className={field}
          {...register("projectType")}
        >
          <option value="" disabled>
            Select
          </option>
          {projectTypes.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
        <Err id="projectType-error" message={errors.projectType?.message} />
      </div>
      <div>
        <label htmlFor="location" className={label}>
          Project location
        </label>
        <input
          id="location"
          autoComplete="off"
          placeholder="Locality and city"
          aria-invalid={!!errors.location}
          aria-describedby={d("location")}
          className={field}
          {...register("location")}
        />
        <Err id="location-error" message={errors.location?.message} />
      </div>
      <div>
        <label htmlFor="startTimeframe" className={label}>
          Planned start <span className="normal-case tracking-normal text-charcoal/75">(optional)</span>
        </label>
        <select
          id="startTimeframe"
          aria-describedby={d("startTimeframe")}
          className={field}
          {...register("startTimeframe")}
        >
          <option value="">Select</option>
          {startTimeframes.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="budget" className={label}>
          Budget range <span className="normal-case tracking-normal text-charcoal/75">(optional)</span>
        </label>
        <input
          id="budget"
          autoComplete="off"
          aria-invalid={!!errors.budget}
          aria-describedby={d("budget")}
          className={field}
          {...register("budget")}
        />
        <Err id="budget-error" message={errors.budget?.message} />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="message" className={label}>
          Tell us about your project
        </label>
        <textarea
          id="message"
          rows={5}
          aria-invalid={!!errors.message}
          aria-describedby={d("message")}
          className={cn(field, "resize-y")}
          {...register("message")}
        />
        <Err id="message-error" message={errors.message?.message} />
      </div>

      <div className="sm:col-span-2">
        <label className="flex items-start gap-3 text-[0.9375rem] leading-relaxed text-charcoal/80">
          <input
            type="checkbox"
            aria-invalid={!!errors.consent}
            aria-describedby={d("consent")}
            className="mt-1 size-5 shrink-0 accent-[var(--color-gold-deep)]"
            {...register("consent")}
          />
          <span>
            I agree that Vridhi Construction may contact me about this enquiry. See our{" "}
            <a href="/privacy-policy" className="link-underline">
              Privacy Policy
            </a>
            .
          </span>
        </label>
        <Err id="consent-error" message={errors.consent?.message} />
      </div>

      <div className="sm:col-span-2">
        <div id="form-status" aria-live="polite">
          {status.kind === "error" && (
            <p
              role="alert"
              className="mb-5 border-l-2 border-red-700 bg-red-50 px-4 py-3 text-[0.9375rem] text-red-900"
            >
              {status.message}
            </p>
          )}
        </div>
        <button
          type="submit"
          disabled={sending}
          className="inline-flex min-h-12 items-center justify-center gap-3 bg-charcoal px-8 text-[0.8125rem] font-medium uppercase tracking-[0.14em] text-ivory transition-colors duration-500 hover:bg-gold hover:text-charcoal disabled:cursor-not-allowed disabled:opacity-60"
        >
          {sending && <Loader2 aria-hidden="true" className="size-4 animate-spin" />}
          {sending ? "Sending…" : "Request a Consultation"}
        </button>
      </div>
    </form>
  );
}
