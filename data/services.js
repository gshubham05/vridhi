import { placeholder } from "@/data/images";
/**
 * Service pages. Copy is drafted from the project brief and describes the
 * general approach; the firm should confirm every scope item and FAQ answer
 * before launch and set `enabled: false` on anything it does not offer.
 * No figures, guarantees or comparative claims appear here by design.
 */
export const services = [
  {
    slug: "residential-construction",
    status: "published",
    enabled: true,
    title: "Residential Construction",
    eyebrow: "Residences",
    summary: "Homes built with structural discipline and a finish you will notice every day.",
    intro: [
      "A home is the most personal commission most families will ever make. We begin with how you intend to live in it, and build outward from there.",
      "Our residential work covers independent houses, villas and multi-storey family residences. Structure, services and finishes are coordinated as one continuous project, so decisions are never lost between trades and the result feels singular.",
    ],
    image: placeholder(
      "service-residential",
      "Architectural elevation illustration of a contemporary residence",
    ),
    offerings: [
      {
        title: "Independent houses and villas",
        description: "Single-family homes composed around your plot, your light and your way of life.",
      },
      {
        title: "Multi-storey family residences",
        description:
          "Layouts that give each generation its own space without losing the sense of one household.",
      },
      {
        title: "Structure and civil works",
        description: "Foundations, framing and masonry executed to the approved drawings and specifications.",
      },
      {
        title: "Services coordination",
        description:
          "Electrical, plumbing and mechanical works planned alongside the structure, not after it.",
      },
      {
        title: "Finishing and external works",
        description:
          "Flooring, joinery, façade and landscaping: the final details that make a house feel complete.",
      },
    ],
    benefits: [
      {
        title: "One accountable team",
        description: "Design intent and site execution stay connected from the first sketch to handover.",
      },
      {
        title: "Detail at every stage",
        description: "Junctions, edges and thresholds are resolved on paper before they are built on site.",
      },
      {
        title: "Clear communication",
        description:
          "You always know what is happening, what comes next and what decisions are needed from you.",
      },
    ],
    faqs: [
      {
        q: "Where do we begin if we only have a plot?",
        a: "Start with a private consultation. We discuss your brief, then visit the site to understand its orientation, access and constraints before any design or estimate is prepared.",
      },
      {
        q: "How is a home construction project priced?",
        a: "After the site visit and requirement analysis we prepare a written estimate and proposal. Cost depends on built-up area, specification, structural complexity and site conditions, so we avoid quoting a figure before we understand your project.",
      },
      {
        q: "Can the design change once construction has started?",
        a: "Changes are possible, though they affect cost and programme. We recommend settling major decisions before work begins, and any later change is discussed and recorded before it is carried out.",
      },
      {
        q: "How will I follow progress on site?",
        a: "We share progress updates at agreed intervals and welcome site visits. Work is reviewed against the approved drawings before each stage is signed off.",
      },
    ],
    primaryKeyword: "residential construction company in Dehradun",
    seo: {
      title: "Residential Construction in Dehradun",
      description:
        "Considered home construction in Dehradun, from independent houses to family residences. Begin with a private consultation with Vridhi Construction.",
    },
    relatedCategory: "residential",
  },
  {
    slug: "commercial-construction",
    status: "published",
    enabled: true,
    title: "Commercial Construction",
    eyebrow: "Workplaces",
    summary:
      "Workplaces and commercial spaces delivered to a clear programme, ready for your business to open with confidence.",
    intro: [
      "A commercial space has a job to do. It must welcome customers, support the people who work in it and stand up to daily use, all within a schedule the business can plan around.",
      "We build offices, showrooms, retail spaces and other commercial premises with close attention to programme, budget visibility and the practical needs of operation. Construction and fit-out are coordinated together so the space is handed over complete.",
    ],
    image: placeholder(
      "service-commercial",
      "Architectural elevation illustration of a multi-storey commercial building",
    ),
    offerings: [
      {
        title: "Offices and workplaces",
        description: "Efficient, comfortable environments designed around how teams actually work.",
      },
      {
        title: "Showrooms and retail",
        description: "Spaces that present a brand well and guide customers naturally.",
      },
      {
        title: "Core and shell construction",
        description: "Structure and building envelope executed to the approved design and specification.",
      },
      {
        title: "Commercial fit-out",
        description:
          "Partitions, ceilings, lighting, joinery and finishes coordinated with building services.",
      },
      {
        title: "Programme and cost planning",
        description: "A clear sequence of works so you can plan your opening or move-in.",
      },
    ],
    benefits: [
      {
        title: "A clear programme",
        description: "Works are sequenced and communicated so you can plan around them.",
      },
      {
        title: "Built for daily use",
        description: "Materials and details are chosen for durability as well as appearance.",
      },
      {
        title: "Coordinated trades",
        description: "One team manages structure, services and finishes together.",
      },
    ],
    faqs: [
      {
        q: "Do you handle both construction and interior fit-out for commercial spaces?",
        a: "Where the brief calls for it, we coordinate construction and fit-out together so the space is delivered complete. We confirm the exact scope with you during the initial consultation.",
      },
      {
        q: "How do you plan around our business operations?",
        a: "We discuss your timelines, working hours and access constraints during the consultation and site visit, and build the programme around them.",
      },
      {
        q: "Can you work to our existing design drawings?",
        a: "In many cases, yes. We review the drawings and specifications during the estimate stage and raise any questions before work begins.",
      },
      {
        q: "How is a commercial project estimated?",
        a: "We prepare a written estimate after the site visit and a review of your requirements. It reflects the scope, specification and programme agreed with you.",
      },
    ],
    primaryKeyword: "commercial construction services in Dehradun",
    seo: {
      title: "Commercial Construction Services in Dehradun",
      description:
        "Offices, showrooms and commercial premises built to a clear programme in Dehradun. Speak with Vridhi Construction about your project.",
    },
    relatedCategory: "commercial",
  },
  {
    slug: "interior-design",
    status: "published",
    enabled: true,
    title: "Interior Design",
    eyebrow: "Interiors",
    summary: "Interiors composed around the way you live and work, down to the last detail.",
    intro: [
      "Good interiors are felt before they are noticed. Proportion, light, texture and storage quietly shape how a space feels, and how well it works every day.",
      "We design residential and commercial interiors as a complete composition: layout, lighting, joinery, materials, furniture and finishes, considered together and delivered with the same care as the architecture around them.",
    ],
    image: placeholder("service-interior", "Architectural floor plan illustration of a furnished interior"),
    offerings: [
      {
        title: "Space planning and layouts",
        description: "Plans that make the most of every room and the way you move between them.",
      },
      {
        title: "Material and finish selection",
        description: "A restrained palette chosen for character, durability and ease of care.",
      },
      {
        title: "Custom joinery and storage",
        description: "Wardrobes, kitchens and built-in furniture designed to fit your space and routines.",
      },
      {
        title: "Lighting and ceiling design",
        description: "Layered lighting that supports each activity and sets the mood.",
      },
      {
        title: "Furniture and styling",
        description: "Furnishings and finishing touches that bring a space together.",
      },
    ],
    benefits: [
      { title: "A cohesive composition", description: "Every element is designed to belong to the whole." },
      {
        title: "Designed for real life",
        description: "Storage, circulation and maintenance are considered from the start.",
      },
      {
        title: "Execution you can trust",
        description: "Design and site delivery stay connected, so what is drawn is what is built.",
      },
    ],
    faqs: [
      {
        q: "What is included in an interior design project?",
        a: "The scope is agreed with you at the start. It typically covers space planning, material selection, joinery and lighting design, with execution on site where you would like us to deliver it.",
      },
      {
        q: "Can you design interiors for an existing home or office?",
        a: "Yes. We begin with a site visit to measure and understand the space, then develop a design that works with its structure and services.",
      },
      {
        q: "How do you help us choose materials and finishes?",
        a: "We present considered options in context, discuss durability, maintenance and budget, and help you settle on a palette that suits the space.",
      },
      {
        q: "Do you also manage the execution of the interiors?",
        a: "Where you choose, yes. Having design and execution under one team keeps the finished space true to the design.",
      },
    ],
    primaryKeyword: "interior designer in Dehradun",
    seo: {
      title: "Interior Designer in Dehradun",
      description:
        "Residential and commercial interior design in Dehradun, from space planning to custom joinery and finishes. Begin with a private consultation.",
    },
    relatedCategory: "interior-design",
  },
  {
    slug: "home-renovation",
    status: "published",
    enabled: true,
    title: "Home Renovation",
    eyebrow: "Renovation",
    summary: "Considered renovation that renews a home while keeping what you love about it.",
    intro: [
      "Renovation is part design, part detective work. Every older home has its own structure, quirks and possibilities, and the best results come from understanding them before anything is opened up.",
      "We plan renovations carefully, from single-room updates to full-home transformations, so you know what will change, what will stay, and how living with the work will be managed.",
    ],
    image: placeholder("service-renovation", "Architectural elevation illustration of a renovated residence"),
    offerings: [
      { title: "Full-home renovation", description: "A complete renewal of layout, finishes and services." },
      {
        title: "Kitchen and bathroom upgrades",
        description: "The rooms that work hardest, redesigned for how you live today.",
      },
      {
        title: "Layout and structural alterations",
        description: "Opening, extending or reconfiguring spaces with proper structural consideration.",
      },
      {
        title: "Services and systems upgrades",
        description: "Electrical, plumbing and waterproofing renewed alongside the visible work.",
      },
      { title: "Façade and exterior refresh", description: "A new face for an existing home." },
    ],
    benefits: [
      {
        title: "Understanding before action",
        description: "We assess the existing structure and conditions before proposing changes.",
      },
      { title: "A sequenced plan", description: "Works are phased so you know what to expect and when." },
      { title: "Respect for what works", description: "We retain what is good and renew what is not." },
    ],
    faqs: [
      {
        q: "Can we stay in the house during renovation?",
        a: "It depends on the scope. Smaller works can often be phased around daily life, while larger renovations are usually easier to manage when the home is vacant. We discuss this candidly during the site visit.",
      },
      {
        q: "How do you handle surprises once walls are opened?",
        a: "Older buildings can reveal unexpected conditions. We assess the property beforehand to reduce surprises, and if something unexpected appears we explain it, the options, and any effect on cost and time before proceeding.",
      },
      {
        q: "Can you renovate just one part of the home?",
        a: "Yes. Many projects focus on a kitchen, a bathroom or a few rooms. We scope the work so it integrates cleanly with the rest of the home.",
      },
      {
        q: "How long will a renovation take?",
        a: "Duration depends on the scope, the condition of the building and the specification. After the site visit we give you a realistic programme alongside the estimate.",
      },
    ],
    primaryKeyword: "home renovation in Dehradun",
    seo: {
      title: "Home Renovation in Dehradun",
      description:
        "Thoughtful home renovation in Dehradun, from kitchens and bathrooms to full-home transformations. Plan yours with Vridhi Construction.",
    },
    relatedCategory: "renovation",
  },
  {
    slug: "turnkey-solutions",
    status: "published",
    enabled: true,
    title: "Turnkey Solutions",
    eyebrow: "Turnkey",
    summary: "One team from first sketch to the day you receive the keys.",
    intro: [
      "Turnkey delivery means a single point of responsibility for your whole project. Architecture, construction, interiors and handover are managed together, so you are not left coordinating several parties yourself.",
      "It is the simplest way to build a home or workplace: one conversation, one programme and one team accountable for the result. You stay involved in the decisions that matter, without carrying the burden of managing every trade.",
    ],
    image: placeholder(
      "service-turnkey",
      "Architectural elevation illustration of a completed residence at dusk",
    ),
    offerings: [
      {
        title: "Design and planning",
        description: "Architecture and interior design developed together from the start.",
      },
      {
        title: "Construction management",
        description: "Day-to-day coordination of structure, services and finishes on site.",
      },
      {
        title: "Interiors and fit-out",
        description: "Joinery, lighting, finishes and furnishing delivered as part of the same project.",
      },
      {
        title: "Cost and programme control",
        description: "A clear estimate and schedule, with any change discussed and recorded.",
      },
      {
        title: "Final inspection and handover",
        description: "A thorough review of the completed project before you receive the keys.",
      },
    ],
    benefits: [
      {
        title: "A single point of contact",
        description: "One team to speak with, from first consultation to handover.",
      },
      {
        title: "Design and build, aligned",
        description: "Design intent is protected all the way through construction.",
      },
      {
        title: "Less to manage, more to enjoy",
        description: "We carry the coordination so you can focus on your decisions.",
      },
    ],
    faqs: [
      {
        q: "What is the difference between turnkey and regular construction?",
        a: "In a conventional arrangement you may engage separate parties for design, construction and interiors. With turnkey delivery one team is responsible for all of it, including the coordination between stages.",
      },
      {
        q: "Do I lose control over design decisions?",
        a: "No. You approve the design, specification and estimate at defined stages. Turnkey removes the coordination burden, not your say in the result.",
      },
      {
        q: "How is a turnkey project priced?",
        a: "We prepare a written estimate and proposal after the consultation and site visit, based on the scope and specification we agree together.",
      },
      {
        q: "What happens at handover?",
        a: "We carry out a final inspection against the agreed scope, resolve any items that need attention, and then hand the completed project over to you.",
      },
    ],
    primaryKeyword: "turnkey construction company in Dehradun",
    seo: {
      title: "Turnkey Construction in Dehradun",
      description:
        "Turnkey home and workplace delivery in Dehradun: design, construction, interiors and handover from one team. Request a private consultation.",
    },
    relatedCategory: undefined,
  },
  {
    slug: "architecture-and-planning",
    status: "published",
    enabled: true,
    title: "Architecture and Planning",
    eyebrow: "Architecture",
    summary: "Architecture that begins with the site, the light and the way you will live.",
    intro: [
      "Every building begins with a place. Orientation, climate, views, access and the character of the neighbourhood all shape what a home or workplace should become.",
      "Our architecture and planning work translates your brief into drawings that are clear, buildable and considered, giving you confidence in the design before construction begins.",
    ],
    image: placeholder("service-architecture", "Architectural floor plan illustration with dimension lines"),
    offerings: [
      {
        title: "Concept design",
        description: "Early ideas and massing studies that explore what your site can become.",
      },
      { title: "Space planning", description: "Layouts that balance privacy, flow, light and ventilation." },
      {
        title: "Working drawings",
        description: "Detailed drawings and specifications to guide accurate construction.",
      },
      {
        title: "Façade and elevation design",
        description: "Exterior character that suits the site and your taste.",
      },
      {
        title: "Coordination with consultants",
        description: "Structure and services designed to work with the architecture.",
      },
    ],
    benefits: [
      {
        title: "Designed for the site",
        description: "Orientation, light and context inform every decision.",
      },
      { title: "Buildable by design", description: "Drawings are developed with construction in mind." },
      {
        title: "Clarity before commitment",
        description: "You see and understand the design before work begins.",
      },
    ],
    faqs: [
      {
        q: "Do you provide architectural design only, or construction as well?",
        a: "Either. You can engage us for design and planning alone, or continue with us into construction and interiors for a single, coordinated project.",
      },
      {
        q: "What should I bring to the first meeting?",
        a: "Anything you have: plot documents, site photographs, ideas you have collected and a sense of how you want to live. We will help shape the brief from there.",
      },
      {
        q: "How many design options will I see?",
        a: "We develop the design in consultation with you and share it at agreed stages for feedback. The process is collaborative rather than a fixed number of options.",
      },
      {
        q: "Will the drawings be detailed enough to build from?",
        a: "The aim is for drawings and specifications to be clear and complete enough to guide accurate construction.",
      },
    ],
    primaryKeyword: "architecture and planning services in Dehradun",
    seo: {
      title: "Architecture and Planning in Dehradun",
      description:
        "Site-led architecture and planning in Dehradun, from concept design to detailed drawings. Begin with a private consultation.",
    },
    relatedCategory: undefined,
  },
];
