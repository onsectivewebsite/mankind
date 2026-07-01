import type { Metadata } from "next";
import Link from "next/link";
import { FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "General Terms & Conditions",
  description: "General Terms & Conditions of Sale for Mankind Healthcare.",
};

const SECTIONS: { id: string; title: string; body: string[] }[] = [
  {
    id: "acceptance",
    title: "1. Acceptance of Terms",
    body: [
      "These General Terms & Conditions of Sale (the “Terms”) govern the sale of products and equipment by Mankind Healthcare (“Mankind”, “we”, “us”) to the purchasing customer (“you”, “Customer”). By placing an order, creating an account, or purchasing from this website, you agree to be bound by these Terms.",
      "These Terms apply to the exclusion of any other terms that you may seek to impose or incorporate. We may update these Terms from time to time; the version in effect on the date of your order applies to that order.",
    ],
  },
  {
    id: "products",
    title: "2. Products, Professional Use & Availability",
    body: [
      "Many products offered by Mankind are intended for use by licensed dental, medical, veterinary and physiotherapy professionals. By ordering, you confirm that you are authorised to purchase and use such products, and that they will be used lawfully and in accordance with manufacturer instructions.",
      "Product descriptions, images and specifications are provided for general guidance and may be updated without notice. We make reasonable efforts to display products accurately, but colours, packaging and specifications may vary. Availability is not guaranteed and products may be discontinued or substituted with an equivalent item.",
    ],
  },
  {
    id: "orders",
    title: "3. Orders & Order Acceptance",
    body: [
      "Your order is an offer to purchase. All orders are subject to acceptance by Mankind. We may decline or cancel an order, in whole or in part, including where a product is unavailable, where there is an error in pricing or product information, or where we are unable to verify professional eligibility.",
      "A contract of sale is formed only when we confirm dispatch of the relevant products. Where an order is cancelled after payment, we will refund amounts paid for the cancelled items.",
    ],
  },
  {
    id: "pricing",
    title: "4. Pricing & Taxes",
    body: [
      "Prices are shown in Canadian Dollars (CAD) and are exclusive of applicable taxes unless stated otherwise. Applicable taxes are calculated and added at checkout. Prices, promotions and offers may change at any time and promotional discounts may be subject to conditions.",
      "In the event of an obvious pricing error, we reserve the right to cancel the affected order and refund any amount charged, even after order confirmation.",
    ],
  },
  {
    id: "payment",
    title: "5. Payment",
    body: [
      "Payment is due at the time of order unless credit terms have been agreed in writing. Where account/credit terms apply, invoices are payable within the agreed period. We reserve the right to suspend or cancel orders and deliveries where amounts are overdue.",
      "This website is a demonstration store; no live payment is processed and no card details are collected.",
    ],
  },
  {
    id: "delivery",
    title: "6. Shipping, Delivery, Title & Risk",
    body: [
      "We deliver across Canada. Delivery timeframes are estimates and are not guaranteed. Free shipping thresholds and dispatch times shown on the site are indicative and may vary by product, weight and destination.",
      "Risk of loss or damage passes to you on delivery. Title to the products remains with Mankind until we have received payment in full. Please inspect deliveries promptly and report shortages, errors or transit damage within 7 days of receipt.",
    ],
  },
  {
    id: "returns",
    title: "7. Returns, Cancellations & Refunds",
    body: [
      "Unopened, unused products in original packaging may generally be returned within 30 days of delivery, subject to our returns process and any restocking charges. For hygiene and safety reasons, certain sterile, single-use, special-order, refrigerated or personalised items may be non-returnable.",
      "Equipment and large or custom items may be subject to specific return, installation and warranty conditions notified at the time of sale. Please contact us before returning any item so we can provide return authorisation.",
    ],
  },
  {
    id: "warranty",
    title: "8. Warranties & Disclaimers",
    body: [
      "Products may carry a manufacturer’s warranty, which is passed through to you where applicable. Except for such manufacturer warranties and any rights that cannot be excluded under applicable law, products are supplied “as is” and we disclaim all other warranties, whether express or implied, including fitness for a particular purpose.",
      "You are responsible for determining that a product is suitable for your intended clinical use and for complying with all applicable regulatory, licensing and safety requirements.",
    ],
  },
  {
    id: "liability",
    title: "9. Limitation of Liability",
    body: [
      "To the maximum extent permitted by law, Mankind will not be liable for any indirect, incidental, special or consequential loss, or for loss of profits, revenue, data or goodwill. Our total aggregate liability arising out of or in connection with any order will not exceed the amount paid by you for the products giving rise to the claim.",
      "Nothing in these Terms excludes or limits liability that cannot lawfully be excluded or limited.",
    ],
  },
  {
    id: "indemnity",
    title: "10. Indemnification",
    body: [
      "You agree to indemnify and hold Mankind harmless from claims, damages and expenses arising from your misuse of products, your failure to comply with these Terms or applicable law, or your use of products outside their intended purpose or manufacturer instructions.",
    ],
  },
  {
    id: "ip",
    title: "11. Intellectual Property",
    body: [
      "All content on this website — including the Mankind Healthcare and MCare names, logos, text, graphics and imagery — is owned by or licensed to Mankind and is protected by intellectual-property laws. You may not copy, reproduce or use this content without our prior written consent.",
    ],
  },
  {
    id: "privacy",
    title: "12. Privacy",
    body: [
      "We handle personal information you provide (such as account and enquiry details) to process orders, respond to enquiries and operate the site. Account information created on this demonstration site is stored locally in your browser. A full privacy policy will govern live processing of personal data.",
    ],
  },
  {
    id: "law",
    title: "13. Governing Law",
    body: [
      "These Terms are governed by the laws of the Province in which Mankind operates and the federal laws of Canada applicable therein, and the courts of that jurisdiction will have exclusive jurisdiction over any dispute.",
    ],
  },
  {
    id: "contact",
    title: "14. Contact",
    body: [
      "Questions about these Terms can be directed to our team by phone at +1 437 268 2091, by email at info@mankindhealthcare.com, or via our contact page.",
    ],
  },
];

export default function TermsPage() {
  return (
    <div className="animate-fade-up">
      <section className="border-b border-line bg-section">
        <div className="container-page py-12">
          <span className="chip mb-4 w-fit border border-line bg-white text-primary shadow-sm">
            <FileText className="h-4 w-4 text-gold" /> Legal
          </span>
          <h1 className="text-3xl font-extrabold text-ink md:text-4xl">General Terms &amp; Conditions</h1>
          <p className="mt-2 max-w-2xl text-ink-2">
            These terms govern the sale of products by Mankind Healthcare. Please read them carefully.
          </p>
          <p className="mt-2 text-sm text-ink-3">Last updated: July 2026</p>
        </div>
      </section>

      <section className="container-page grid gap-10 py-12 lg:grid-cols-[16rem_1fr]">
        {/* TOC */}
        <aside className="hidden lg:block">
          <nav className="sticky top-28 space-y-1" aria-label="Sections">
            <p className="mb-2 px-2 text-xs font-bold uppercase tracking-wide text-ink-3">On this page</p>
            {SECTIONS.map((s) => (
              <a key={s.id} href={`#${s.id}`} className="block truncate rounded-lg px-2 py-1.5 text-sm text-ink-2 hover:bg-muted hover:text-primary">
                {s.title}
              </a>
            ))}
          </nav>
        </aside>

        {/* content */}
        <div className="max-w-3xl">
          <div className="mb-8 rounded-xl border border-line bg-canvas p-4 text-sm text-ink-2">
            This is a sample set of general terms provided for the demonstration site. Please have
            them reviewed by qualified legal counsel before publishing on a live store.
          </div>
          <div className="space-y-9">
            {SECTIONS.map((s) => (
              <section key={s.id} id={s.id} className="scroll-mt-28">
                <h2 className="mb-3 font-display text-xl font-bold text-ink">{s.title}</h2>
                <div className="space-y-3">
                  {s.body.map((p, i) => (
                    <p key={i} className="leading-relaxed text-ink-2">{p}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-3 border-t border-line pt-6">
            <Link href="/contact" className="btn btn-primary">Contact us</Link>
            <Link href="/products" className="btn btn-outline">Continue shopping</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
