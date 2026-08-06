import { TALLY_CONTACT_FORM_URL } from "@/lib/site";

/**
 * Hosted by Tally so submissions are delivered without exposing a credential
 * in this static export. The API key stays solely in Tally's dashboard.
 */
export function ContactForm() {
  return (
    <div className="panel overflow-hidden">
      <iframe
        src={TALLY_CONTACT_FORM_URL}
        title="Contact Epoch"
        loading="lazy"
        className="min-h-[640px] w-full border-0 bg-surface"
      />
    </div>
  );
}
