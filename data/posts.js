import { placeholder } from "@/data/images";
/**
 * Journal articles.
 *
 * The three starter articles below are general, educational drafts for the
 * firm to review, adapt to its own experience and then publish. They are
 * flagged `sample: true`, so they stay hidden in production (and noindexed)
 * until the sample flag is removed. They contain no prices, statistics or
 * claims about the firm.
 *
 * Publishing workflow: status moves draft → review → published (or archived).
 * Only "published" items without `sample: true` appear on the live site.
 */
export const posts = [
  {
    slug: "how-to-choose-a-construction-company-in-dehradun",
    status: "published",
    sample: true,
    title: "How to Choose a Construction Company in Dehradun",
    excerpt:
      "A practical checklist for comparing builders: what to ask, what to see and what to put in writing before you commit.",
    category: "Planning",
    tags: ["construction", "choosing a builder", "Dehradun"],
    cover: placeholder("blog-1", "Placeholder illustration of a residence elevation"),
    author: { name: "Vridhi Construction" },
    publishedAt: "2026-10-01",
    focusKeyword: "construction company in Dehradun",
    relatedKeywords: ["home construction in Dehradun", "choose a builder"],
    body: [
      {
        type: "p",
        text: "Choosing who builds your home or workplace is one of the biggest decisions of the project. The right team protects your budget, your schedule and the quality of the result. These questions will help you compare companies fairly.",
      },
      { type: "h2", text: "Start with your own brief" },
      {
        type: "p",
        text: "Before speaking to anyone, write down what you want: the size of the home or space, the number of rooms, the style you like, your timeline and a realistic budget range. A clear brief lets every company respond to the same requirements, which makes proposals far easier to compare.",
      },
      { type: "h2", text: "Look at completed work, in person" },
      {
        type: "p",
        text: "Photographs help, but nothing replaces visiting a finished project. Look closely at the details that are hard to fake: how walls meet floors, how doors close, how edges are finished. If possible, speak to the owners about their experience, including how the team handled problems.",
      },
      { type: "h2", text: "Ask how the project will be run" },
      {
        type: "ul",
        items: [
          "Who will be your single point of contact?",
          "Who supervises the work on site, and how often?",
          "How and when will you receive progress updates?",
          "How are changes to the design or specification handled and recorded?",
        ],
      },
      { type: "h2", text: "Insist on clarity in writing" },
      {
        type: "p",
        text: "A good proposal sets out the scope of work, the specification of materials and finishes, the programme and the payment schedule. Payments linked to completed stages are easier to manage than large payments up front. If something is not written down, it is easy to misunderstand later.",
      },
      { type: "h2", text: "Compare like with like" },
      {
        type: "p",
        text: "The lowest figure is not always the best value. Two estimates can differ because one assumes cheaper materials, leaves out items or allows less for site conditions. Ask each company to explain what is and is not included, and compare the specification line by line.",
      },
      { type: "h2", text: "Trust how they communicate" },
      {
        type: "p",
        text: "The way a company treats you before you hire it is a good indicator of how it will treat you during the project. Look for clear answers, honest advice (including when the answer is not what you hoped to hear) and a willingness to explain.",
      },
    ],
  },
  {
    slug: "residential-construction-vs-turnkey-construction",
    status: "published",
    sample: true,
    title: "Residential Construction vs. Turnkey Construction",
    excerpt:
      "Two ways to build a home, and how to decide which suits you: control, coordination, cost clarity and your own time.",
    category: "Planning",
    tags: ["turnkey", "residential construction", "planning"],
    cover: placeholder("blog-2", "Placeholder illustration of a floor plan"),
    author: { name: "Vridhi Construction" },
    publishedAt: "2026-10-08",
    focusKeyword: "turnkey construction company in Dehradun",
    relatedKeywords: ["residential construction", "turnkey vs contract construction"],
    body: [
      {
        type: "p",
        text: "When planning a new home, one of the earliest decisions is how the project will be delivered. Broadly, there are two approaches: engaging separate parties for each stage, or engaging a single team for everything. Each has strengths.",
      },
      { type: "h2", text: "What conventional construction looks like" },
      {
        type: "p",
        text: "In a conventional arrangement you might appoint an architect, then a builder, then an interior designer and several specialists. You hold the relationships with each and carry responsibility for coordinating them. This can suit people who want direct control over every stage and have the time to manage it.",
      },
      { type: "h2", text: "What turnkey construction means" },
      {
        type: "p",
        text: "Turnkey delivery places design, construction, interiors and handover with one team. You make the key decisions, while the team takes responsibility for coordinating everything between them, ending with a completed project handed over to you.",
      },
      { type: "h2", text: "How they compare" },
      {
        type: "ul",
        items: [
          "Responsibility: with turnkey, one team is accountable for the whole result; with separate parties, responsibility is divided.",
          "Coordination: turnkey places the coordination burden on the delivery team; otherwise it falls to you.",
          "Control: separate appointments give you direct control of each choice; turnkey gives you approval at defined stages instead.",
          "Time: turnkey asks less of your time during the project.",
          "Cost clarity: a single written estimate covering the full scope can make the overall budget easier to understand.",
        ],
      },
      { type: "h2", text: "Questions to ask yourself" },
      {
        type: "ol",
        items: [
          "How much time can I give to managing the project week to week?",
          "Do I want to choose every contractor and supplier myself?",
          "How important is a single point of accountability?",
          "How clearly can I define my requirements at the start?",
        ],
      },
      {
        type: "p",
        text: "There is no universally right answer. The best approach is the one that matches your priorities, your time and your appetite for involvement. Whichever route you choose, insist on a clear written scope, specification and programme.",
      },
    ],
  },
  {
    slug: "how-to-plan-a-home-before-construction-begins",
    status: "published",
    sample: true,
    title: "How to Plan a Home Before Construction Begins",
    excerpt:
      "The decisions worth making early: your plot, your brief, your budget and your specification, before the first foundation is dug.",
    category: "Planning",
    tags: ["home planning", "design brief", "construction"],
    cover: placeholder("blog-3", "Placeholder illustration of a residence at dusk"),
    author: { name: "Vridhi Construction" },
    publishedAt: "2026-10-15",
    focusKeyword: "plan a home before construction",
    relatedKeywords: ["home design brief", "how to plan a house"],
    body: [
      {
        type: "p",
        text: "Time spent planning is the cheapest time of any construction project. Changes on paper cost almost nothing; changes on site cost money and delay. Here is how to prepare.",
      },
      { type: "h2", text: "Understand your plot" },
      {
        type: "p",
        text: "Orientation, slope, access, neighbouring buildings and local regulations all influence what you can build and how it will perform. A site visit with your design team early on avoids unpleasant surprises later.",
      },
      { type: "h2", text: "Write your brief" },
      {
        type: "p",
        text: "Describe how you live, not just the rooms you want. Who lives in the home? Where do you work? How do you entertain? Do you expect your needs to change over the next decade? A thoughtful brief produces a more thoughtful home.",
      },
      { type: "h2", text: "Set a realistic budget range" },
      {
        type: "p",
        text: "Decide what you can comfortably invest, and keep a contingency for the unexpected. Be honest about priorities: knowing what you will not compromise on helps the team make good decisions when trade-offs arise.",
      },
      { type: "h2", text: "Separate must-haves from nice-to-haves" },
      {
        type: "ul",
        items: [
          "Must-haves: the elements the home cannot do without.",
          "Nice-to-haves: the features you would love if the budget allows.",
          "Later phases: items that can be added after you move in.",
        ],
      },
      { type: "h2", text: "Review the drawings carefully" },
      {
        type: "p",
        text: "Walk through the plans room by room, imagining a normal day. Check where furniture will go, how doors open, where light falls and where storage lives. Ask for anything you do not understand to be explained.",
      },
      { type: "h2", text: "Agree the specification and programme" },
      {
        type: "p",
        text: "Before construction begins, confirm the materials and finishes, the schedule and the way progress and changes will be communicated. A clear agreement at the start protects everyone.",
      },
    ],
  },
];
