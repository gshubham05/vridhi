import { placeholder } from "@/data/images";
/**
 * Portfolio.
 *
 * Everything below is SAMPLE layout content (sample: true). It is hidden on a
 * production site unless SHOW_SAMPLE_CONTENT=true, is always labelled "Sample"
 * in the UI, is noindexed and is excluded from the sitemap.
 *
 * To publish a real project, add an entry WITHOUT `sample: true` and with
 * status: "published". No page or component needs to change. Only include
 * details the client has approved for publication.
 */
export const projects = [
  {
    slug: "sample-contemporary-residence",
    status: "published",
    sample: true,
    featured: true,
    name: "Sample Project: Contemporary Residence",
    category: "residential",
    locality: "Locality name",
    city: "City",
    year: undefined,
    summary: "Sample entry showing how a residential commission appears in the portfolio.",
    cover: placeholder("project-residential-cover", "Placeholder illustration of a contemporary residence"),
    gallery: [
      placeholder(
        "project-residential-cover",
        "Placeholder illustration of a contemporary residence elevation",
      ),
      placeholder("project-residential-2", "Placeholder illustration of a residence floor plan"),
      placeholder("project-residential-3", "Placeholder illustration of a residence in daylight"),
    ],
    overview: [
      "Sample copy. Replace this with a short, approved description of the commission: the client's brief, the site and what the finished home offers.",
      "Add a second paragraph for context if helpful. Keep claims factual and only publish what the client has approved.",
    ],
    scope: [
      "Sample scope: architectural design",
      "Sample scope: structural and civil works",
      "Sample scope: interior finishes",
    ],
    concept: "Sample design concept. Describe the idea that shaped the design, in the firm's own words.",
    materials: ["Sample material or finish, if approved for publication"],
    challenges: [
      {
        challenge: "Sample challenge the project faced.",
        solution: "Sample description of how the team resolved it.",
      },
    ],
  },
  {
    slug: "sample-commercial-workplace",
    status: "published",
    sample: true,
    featured: true,
    name: "Sample Project: Commercial Workplace",
    category: "commercial",
    locality: "Locality name",
    city: "City",
    summary: "Sample entry showing how a commercial commission appears in the portfolio.",
    cover: placeholder("project-commercial-cover", "Placeholder illustration of a commercial building"),
    gallery: [
      placeholder("project-commercial-cover", "Placeholder illustration of a commercial building elevation"),
      placeholder("project-commercial-2", "Placeholder illustration of a commercial building at dusk"),
      placeholder("project-commercial-3", "Placeholder illustration of a workplace floor plan"),
    ],
    overview: [
      "Sample copy. Replace this with an approved description of the commercial commission, its purpose and what was delivered.",
    ],
    scope: ["Sample scope: core and shell construction", "Sample scope: commercial fit-out"],
  },
  {
    slug: "sample-considered-interior",
    status: "published",
    sample: true,
    featured: true,
    name: "Sample Project: Considered Interior",
    category: "interior-design",
    locality: "Locality name",
    city: "City",
    summary: "Sample entry showing how an interior design commission appears in the portfolio.",
    cover: placeholder("project-interior-cover", "Placeholder illustration of an interior floor plan"),
    gallery: [
      placeholder("project-interior-cover", "Placeholder illustration of an interior plan"),
      placeholder("project-interior-2", "Placeholder illustration of an interior plan, dark variant"),
      placeholder("project-interior-3", "Placeholder illustration of an alternative interior plan"),
    ],
    overview: ["Sample copy. Replace this with an approved description of the interior commission."],
    scope: ["Sample scope: space planning", "Sample scope: custom joinery", "Sample scope: lighting design"],
  },
  {
    slug: "sample-renovated-home",
    status: "published",
    sample: true,
    featured: true,
    name: "Sample Project: Renovated Home",
    category: "renovation",
    locality: "Locality name",
    city: "City",
    summary: "Sample entry showing a renovation with a before-and-after comparison.",
    cover: placeholder("project-renovation-cover", "Placeholder illustration of a renovated residence"),
    gallery: [
      placeholder("project-renovation-cover", "Placeholder illustration of the renovated residence"),
      placeholder("project-renovation-2", "Placeholder illustration of the renovated floor plan"),
    ],
    overview: ["Sample copy. Replace this with an approved description of the renovation and what changed."],
    scope: [
      "Sample scope: layout alterations",
      "Sample scope: services upgrade",
      "Sample scope: façade refresh",
    ],
    beforeAfter: {
      before: placeholder(
        "project-renovation-before",
        "Placeholder illustration of the home before renovation",
      ),
      after: placeholder("project-renovation-after", "Placeholder illustration of the home after renovation"),
    },
  },
];
