// Shared trigger for the newsletter popup.
// Any component can call openNewsletterPopup() to open it; NewsletterPopup
// listens for this event. Avoids prop-drilling / context across the page.

export const NEWSLETTER_POPUP_EVENT = "vaultra:open-newsletter";

export function openNewsletterPopup() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(NEWSLETTER_POPUP_EVENT));
  }
}
