import type { SchoolSite } from "../types";
import { themePresets } from "../theme";

/**
 * Demo content — in production these would come from a CMS / Lovable Cloud.
 * Each entry is a complete school site composed of reusable sections.
 */
export const sites: Record<string, SchoolSite> = {
  brightstar: {
    slug: "brightstar",
    identity: {
      name: "Brightstar High School",
      shortName: "Brightstar",
      logoText: "B",
      motto: "Knowledge · Discipline · Service",
    },
    theme: themePresets.forest,
    nav: [
      { label: "About", href: "/about" },
      { label: "Admissions", href: "/admissions" },
      { label: "Academics", href: "/" },
      { label: "Contact", href: "/contact" },
    ],
    footer: {
      tagline: "A leading private school in Lekki, Lagos — shaping curious, confident learners since 2004.",
      columns: [
        {
          title: "School",
          links: [
            { label: "About us", href: "/about" },
            { label: "Admissions", href: "/admissions" },
            { label: "Contact", href: "/contact" },
          ],
        },
        {
          title: "Portals",
          links: [
            { label: "Parent Login", href: "/parent" },
            { label: "Staff Login", href: "/login" },
          ],
        },
        {
          title: "Visit",
          links: [
            { label: "14 Admiralty Way, Lekki", href: "/contact" },
            { label: "+234 802 555 0119", href: "/contact" },
          ],
        },
      ],
    },
    pages: [
      {
        slug: "",
        title: "Home",
        sections: [
          {
            id: "hero",
            type: "hero",
            variant: "split",
            spacing: "xl",
            eyebrow: "Admissions open · 2025/2026",
            title: "Where curious minds become confident leaders.",
            subtitle:
              "Brightstar High School blends a rigorous Nigerian curriculum with creative arts, sports and character education — so every child finds their path.",
            primaryCta: { label: "Apply for admission", href: "/brightstar/admissions", variant: "primary" },
            secondaryCta: { label: "Book a tour", href: "/brightstar/contact", variant: "secondary" },
            image: { src: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=900", alt: "Students in classroom" },
          },
          {
            id: "stats",
            type: "stats",
            variant: "cards",
            background: "muted",
            spacing: "md",
            items: [
              { value: "21", label: "Years of excellence" },
              { value: "640+", label: "Students enrolled" },
              { value: "98%", label: "WAEC pass rate" },
              { value: "42", label: "Qualified teachers" },
            ],
          },
          {
            id: "features",
            type: "features",
            variant: "grid",
            columns: 3,
            eyebrow: "What sets us apart",
            title: "A complete education for the whole child",
            subtitle: "Academic excellence balanced with character, creativity and community.",
            items: [
              { icon: "BookOpen", title: "Rigorous academics", description: "Cambridge-aligned curriculum with strong STEM and humanities foundations." },
              { icon: "Palette", title: "Creative arts", description: "Music, drama, visual art and design weekly for every student." },
              { icon: "Trophy", title: "Sports & wellness", description: "Football, basketball, swimming and athletics with certified coaches." },
              { icon: "HeartHandshake", title: "Character & faith", description: "Values-based education rooted in service and integrity." },
              { icon: "Users", title: "Small class sizes", description: "1:18 teacher-to-student ratio so every child is truly known." },
              { icon: "Globe", title: "Global outlook", description: "Exchange programmes and international competitions every year." },
            ],
          },
          {
            id: "highlight",
            type: "text",
            variant: "split",
            background: "default",
            eyebrow: "Our promise",
            title: "Every child seen, every gift discovered.",
            body:
              "We believe great schools meet children where they are — then take them further than they imagined. Our teachers know each student by name, story and strength.\n\nFrom Year 1 through SS3, your child will be challenged academically, supported pastorally, and inspired to lead.",
            cta: { label: "Read our story", href: "/brightstar/about", variant: "primary" },
            image: { src: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=900", alt: "Teacher with students" },
          },
          {
            id: "gallery",
            type: "gallery",
            variant: "grid",
            columns: 3,
            background: "muted",
            eyebrow: "Life at Brightstar",
            title: "A vibrant, joyful campus",
            items: [
              { src: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=600", alt: "Library", caption: "The Adewale Library" },
              { src: "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=600", alt: "Science lab", caption: "Science Lab" },
              { src: "https://images.unsplash.com/photo-1526676037777-05a232554f77?w=600", alt: "Sports day", caption: "Annual Sports Day" },
              { src: "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=600", alt: "Music room", caption: "Music & Arts" },
              { src: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600", alt: "Outdoor learning", caption: "Outdoor learning" },
              { src: "https://images.unsplash.com/photo-1588072432836-e10032774350?w=600", alt: "Graduation", caption: "Class of 2024" },
            ],
          },
          {
            id: "cta",
            type: "cta",
            variant: "banner",
            background: "brand",
            spacing: "md",
            eyebrow: "Limited spaces",
            title: "Applications close 30 June",
            subtitle: "Secure your child's place for the 2025/2026 session.",
            primaryCta: { label: "Start application", href: "/brightstar/admissions", variant: "primary" },
            secondaryCta: { label: "Talk to admissions", href: "/brightstar/contact", variant: "ghost" },
          },
        ],
      },
      {
        slug: "about",
        title: "About",
        sections: [
          {
            id: "about-hero",
            type: "hero",
            variant: "centered",
            spacing: "lg",
            eyebrow: "About us",
            title: "Twenty-one years of nurturing extraordinary young Nigerians.",
            subtitle: "Founded in 2004, Brightstar has grown from 32 students to a community of over 640 learners.",
          },
          {
            id: "about-story",
            type: "text",
            variant: "two-column",
            title: "Our story",
            subtitle: "From a single classroom in Lekki to one of Lagos' most respected private schools.",
            body:
              "Brightstar opened its doors in September 2004 with one principal, four teachers and thirty-two pupils. The founders believed that excellent education should be accessible, joyful and rooted in African values.\n\nOver two decades, we've grown carefully — adding a senior secondary section in 2010, a science complex in 2017, and a creative arts centre in 2022.\n\nToday Brightstar is led by Mrs. Kemi Adebayo, a veteran educator with over 25 years of experience in Nigerian and international schools.\n\nWe remain a family-owned, mission-driven school — focused not on size but on the depth of every child's experience.",
          },
          {
            id: "about-values",
            type: "features",
            variant: "icon-list",
            background: "muted",
            columns: 2,
            title: "What we value",
            items: [
              { icon: "Compass", title: "Integrity", description: "Doing the right thing, even when no one is watching." },
              { icon: "Sparkles", title: "Curiosity", description: "Asking better questions before chasing easy answers." },
              { icon: "Hand", title: "Service", description: "Using our gifts to lift those around us." },
              { icon: "Mountain", title: "Resilience", description: "Persevering through difficulty with grace." },
            ],
          },
        ],
      },
      {
        slug: "admissions",
        title: "Admissions",
        sections: [
          {
            id: "adm-hero",
            type: "hero",
            variant: "image-bg",
            spacing: "xl",
            eyebrow: "2025/2026 session",
            title: "Begin your child's Brightstar journey.",
            subtitle: "We welcome applications year-round, with main intakes in September and January.",
            primaryCta: { label: "Start application", href: "#apply", variant: "primary" },
            secondaryCta: { label: "Download brochure", href: "#brochure", variant: "secondary" },
            image: { src: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1600", alt: "Campus" },
          },
          {
            id: "adm-process",
            type: "features",
            variant: "grid",
            columns: 4,
            eyebrow: "How it works",
            title: "Four simple steps",
            items: [
              { icon: "FileText", title: "1. Apply online", description: "Submit the application form and ₦10,000 fee." },
              { icon: "ClipboardCheck", title: "2. Assessment", description: "Age-appropriate entrance assessment on campus." },
              { icon: "Users", title: "3. Family interview", description: "Meet the principal and tour the campus." },
              { icon: "GraduationCap", title: "4. Offer & enrol", description: "Receive your offer and complete enrolment." },
            ],
          },
          {
            id: "adm-fees",
            type: "stats",
            variant: "split",
            background: "muted",
            eyebrow: "Investment",
            title: "Transparent, all-inclusive fees",
            subtitle: "Tuition includes books, uniforms, lunch, sports and most excursions. No surprise charges.",
            items: [
              { value: "₦450k", label: "Pre-school / term" },
              { value: "₦580k", label: "Primary / term" },
              { value: "₦720k", label: "JSS / term" },
              { value: "₦850k", label: "SSS / term" },
            ],
            image: { src: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=900", alt: "Library reading" },
          },
          {
            id: "adm-cta",
            type: "cta",
            variant: "centered",
            background: "brand",
            title: "Ready to apply?",
            subtitle: "Our admissions team replies within one working day.",
            primaryCta: { label: "Begin application", href: "/brightstar/contact", variant: "primary" },
          },
        ],
      },
      {
        slug: "contact",
        title: "Contact",
        sections: [
          {
            id: "contact-main",
            type: "contact",
            variant: "split",
            spacing: "lg",
            eyebrow: "Get in touch",
            title: "We'd love to hear from you.",
            subtitle: "Visit our campus, call our admissions team, or send us a message.",
            details: [
              { type: "address", label: "Campus", value: "14, Admiralty Way, Lekki Phase 1, Lagos" },
              { type: "phone", label: "Phone", value: "+234 802 555 0119" },
              { type: "email", label: "Email", value: "hello@brightstar.ng" },
              { type: "hours", label: "Office hours", value: "Mon–Fri · 8am – 4pm" },
            ],
            showForm: true,
          },
        ],
      },
    ],
  },

  // A second school proves themeability — same sections, different palette/content.
  greenfield: {
    slug: "greenfield",
    identity: { name: "Greenfield Academy", shortName: "Greenfield", logoText: "G" },
    theme: themePresets.royal,
    nav: [
      { label: "About", href: "/about" },
      { label: "Admissions", href: "/admissions" },
      { label: "Contact", href: "/contact" },
    ],
    footer: {
      tagline: "An IB World School in Abuja — preparing globally-minded leaders.",
      columns: [
        { title: "School", links: [{ label: "About", href: "/about" }, { label: "Admissions", href: "/admissions" }] },
        { title: "Portals", links: [{ label: "Parent Login", href: "/parent" }] },
      ],
    },
    pages: [
      {
        slug: "",
        title: "Home",
        sections: [
          {
            id: "hero",
            type: "hero",
            variant: "centered",
            background: "aurora",
            spacing: "xl",
            eyebrow: "IB World School · Abuja",
            title: "Educating tomorrow's global leaders, today.",
            subtitle: "An inquiry-based, multilingual learning community for ages 3–18.",
            primaryCta: { label: "Visit campus", href: "/greenfield/contact", variant: "primary" },
            secondaryCta: { label: "Our programme", href: "/greenfield/about", variant: "ghost" },
          },
          {
            id: "features",
            type: "features",
            variant: "icon-list",
            columns: 2,
            eyebrow: "The Greenfield difference",
            title: "An education without borders",
            items: [
              { icon: "Globe", title: "IB curriculum", description: "Authorised PYP, MYP and DP programmes." },
              { icon: "Languages", title: "Multilingual", description: "English, French and Yoruba from age 3." },
              { icon: "Microscope", title: "STEAM focus", description: "Robotics, design and creative tech labs." },
              { icon: "Users", title: "Boarding & day", description: "Optional weekly boarding from Grade 6." },
            ],
          },
          {
            id: "cta",
            type: "cta",
            variant: "centered",
            title: "Open Day · Saturday 14 June",
            subtitle: "Tour the campus, meet our teachers, see classrooms in action.",
            primaryCta: { label: "Reserve a slot", href: "/greenfield/contact", variant: "primary" },
          },
        ],
      },
      {
        slug: "about",
        title: "About",
        sections: [
          {
            id: "h",
            type: "hero",
            variant: "centered",
            spacing: "lg",
            eyebrow: "About",
            title: "A community of inquirers, thinkers and doers.",
          },
          {
            id: "t",
            type: "text",
            variant: "centered",
            title: "Our philosophy",
            body: "Greenfield Academy is built on the belief that learning is most powerful when it's curious, connected and contextual.",
          },
        ],
      },
      {
        slug: "admissions",
        title: "Admissions",
        sections: [
          {
            id: "h",
            type: "hero",
            variant: "centered",
            spacing: "lg",
            eyebrow: "Admissions",
            title: "Join the Greenfield family.",
            primaryCta: { label: "Apply now", href: "/greenfield/contact", variant: "primary" },
          },
        ],
      },
      {
        slug: "contact",
        title: "Contact",
        sections: [
          {
            id: "c",
            type: "contact",
            variant: "stacked",
            title: "Visit us in Abuja",
            details: [
              { type: "address", label: "Campus", value: "Plot 22, Diplomatic Drive, Abuja" },
              { type: "phone", label: "Phone", value: "+234 803 222 0001" },
              { type: "email", label: "Email", value: "hello@greenfield.ng" },
            ],
            showForm: true,
          },
        ],
      },
    ],
  },
};

export function getSite(slug: string): SchoolSite | undefined {
  return sites[slug];
}
