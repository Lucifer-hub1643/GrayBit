import {
  Brain,
  Workflow,
  MessagesSquare,
  PhoneCall,
  Database,
  Eye,
  Smartphone,
  Server,
  Compass,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

// ─── Company ────────────────────────────────────────────────────────────────

export const COMPANY = {
  name: "GrayBit Labs",
  tagline: "Where intelligence becomes infrastructure.",
  description:
    "GrayBit Labs is an AI engineering studio. We ship production-ready AI for businesses that need real results: fine-tuned LLMs, multi-agent systems, conversational and voice AI, RAG, computer vision, and the web and mobile apps that put them in your users' hands.",
  email: "graybitlabs@gmail.com",
  phones: [
    { display: "+91 81789 24588", href: "tel:+918178924588", whatsapp: "https://wa.me/918178924588" },
    { display: "+91 93540 70060", href: "tel:+919354070060", whatsapp: "https://wa.me/919354070060" },
  ],
  twitter: "@graybitlabs",
  linkedin: "#",
  instagram: "#",
  location: "Delhi NCR, India. Remote worldwide.",
};

// ─── Navigation ─────────────────────────────────────────────────────────────

export const NAV_LINKS = [
  { to: "/services", label: "Services" },
  { to: "/work", label: "Work" },
  { to: "/about", label: "About" },
] as const;

export const FOOTER_SITE_LINKS = [
  { to: "/", label: "Home" },
  { to: "/work", label: "Work" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact Us" },
] as const;

export const FOOTER_SOCIAL_LINKS = [
  { href: COMPANY.linkedin, label: "LinkedIn" },
  { href: COMPANY.instagram, label: "Instagram" },
] as const;

// ─── Services ───────────────────────────────────────────────────────────────

export interface ServiceDetail {
  tagline: string;
  timeline: string;
  ideal: string;
  intro: string;
  inPractice: string[];
  whatYouGet: Array<{ t: string; b: string }>;
  process: Array<{ t: string; b: string }>;
  stack: string[];
  whenRight: string;
  whenNot: string;
}

export interface Service {
  icon: LucideIcon;
  slug: string;
  title: string;
  body: string;
  items: string[];
  detail: ServiceDetail;
}

export const SERVICES: Service[] = [
  {
    icon: Brain,
    slug: "llm-fine-tuning",
    title: "Custom LLM Fine-tuning",
    body: "We fine-tune open-source models on your data. Domain vocabulary, internal tone, regulated workflows. You stop renting general intelligence and start owning a model that thinks like your business.",
    items: ["Domain adaptation", "LoRA / QLoRA / DPO", "RLHF and evaluation", "On-prem or VPC deploy"],
    detail: {
      tagline: "Stop renting general intelligence. Own a model that thinks like your business.",
      timeline: "6 to 10 weeks",
      ideal: "Teams with 1,000+ examples of repeatable work and a real accuracy or cost problem on generic LLMs.",
      intro:
        "Generic LLMs are powerful, but they don't know your business. They speak corporate English when your customers speak in industry shorthand. They draft polite refusals when your support team would solve the problem. Fine-tuning fixes both, on a model you actually own.",
      inPractice: [
        "We start with the data you already have. Support transcripts, internal wikis, regulatory documents, recorded sales calls. We clean it, structure it, and use it to train a smaller open-source model (usually a Llama, Mistral, or Qwen variant) to behave like a domain expert who works at your company.",
        "The result is a model that runs cheaper, responds faster, and is dramatically more accurate on the work you actually care about. You stop paying GPT-4 prices for tasks a fine-tuned 7B model now handles better. You also stop sending your data to a third-party API every time someone hits a button.",
      ],
      whatYouGet: [
        { t: "A fine-tuned model", b: "Deployed in your VPC, on dedicated GPUs, or fully on-prem. You hold the weights. No vendor lock-in." },
        { t: "An evaluation harness", b: "Automated tests that prove the new model beats the baseline, and re-run after every retraining." },
        { t: "An inference API", b: "Logging, rate limiting, per-user attribution, observability. Wired into your existing auth layer." },
        { t: "A retraining playbook", b: "Step-by-step documentation so your team can re-fine-tune the model as your data grows. Nothing locked in our heads." },
      ],
      process: [
        { t: "Data audit", b: "We catalogue what data you have, what's labelled, and what's missing. The honest answer usually surprises everyone." },
        { t: "Curation", b: "Cleaning, deduplication, and structuring into the right training pairs. The 80% of work that determines the final 20% of model quality." },
        { t: "Baseline evaluation", b: "Run the off-the-shelf model against held-out tasks. This sets the bar we have to beat to justify shipping anything." },
        { t: "Training runs", b: "LoRA or QLoRA fine-tuning with disciplined hyperparameter sweeps. We track every run in Weights & Biases so we know what worked and why." },
        { t: "Eval, iterate, repeat", b: "Score against the baseline. Adjust data, prompts, training recipe. Keep going until the wins are clear and stable." },
        { t: "Production deployment", b: "Ship to your VPC with monitoring, rollback, and rate limiting. Quiet rollout to a small slice of traffic first." },
        { t: "Handover", b: "Documentation, retraining playbook, and a pair-programming session with your team so they can do the next round themselves." },
      ],
      stack: ["LoRA", "QLoRA", "DPO", "Llama 3", "Mistral", "Qwen", "vLLM", "TGI", "Weights & Biases", "Modal", "RunPod"],
      whenRight:
        "Your task is repetitive. Accuracy beats novelty. Latency or per-call cost is hurting your unit economics. Your data is genuinely proprietary and gives you an edge no off-the-shelf model can match.",
      whenNot:
        "You need cutting-edge reasoning across broad topics (Claude or GPT-4 will serve you better). You have fewer than around 1,000 quality training examples. The task changes every week, so any fine-tune would be stale by the time it shipped.",
    },
  },
  {
    icon: Workflow,
    slug: "ai-agents",
    title: "AI Agents and Automation",
    body: "Multi-step agents that read, reason, and act across your tools. Research, drafting, ticketing, billing. With deterministic guardrails and human-in-the-loop checkpoints, you stay in control.",
    items: ["Tool-use orchestration", "Multi-agent systems", "Workflow automation", "Safety guardrails"],
    detail: {
      tagline: "Software that doesn't just respond. It acts.",
      timeline: "8 to 14 weeks",
      ideal: "Teams drowning in multi-step internal workflows that span three or more tools.",
      intro:
        "An agent is software that can read, think, and act on its own. It can pull data from your CRM, draft a follow-up in your tone, post it to Slack for review, and update the ticket when the reply lands. Done well, it removes hours of grunt work per person per day. Done badly, it creates expensive, plausible-sounding chaos.",
      inPractice: [
        "We build agents the way good systems engineers build any production software: small surface area, deterministic guardrails, explicit error handling, and a human approval step wherever the cost of being wrong is high.",
        "We start with one workflow you'd pay real money to automate. We instrument it carefully, ship it in shadow mode first (the agent suggests, your team approves), then promote to autonomous mode only when the metrics earn it. No grand 'AI transformation' programs. Just measurable wins, one workflow at a time.",
      ],
      whatYouGet: [
        { t: "A working agent in production", b: "End-to-end. Reading your tools, doing the work, writing back. With audit logs you'd be happy to show your CISO." },
        { t: "Tool integrations", b: "Native connections to your existing stack (Slack, Linear, Salesforce, Zendesk, your internal APIs). No middleware soup." },
        { t: "Guardrails and approval flows", b: "Configurable per action. The agent never spends money, sends an external email, or modifies a record without the right kind of permission." },
        { t: "An observability dashboard", b: "Every decision the agent made, every tool it called, every dollar it saved. Auditable, queryable, exportable." },
      ],
      process: [
        { t: "Workflow scoping", b: "Pick one workflow you'd happily pay to automate. Map its inputs, outputs, edge cases, and the cost of getting it wrong." },
        { t: "Tool integration", b: "Wire the agent into your CRM, ticketing, calendar, internal APIs. Real connectors, not screen-scraping." },
        { t: "Shadow-mode pilot", b: "The agent suggests, your team approves. We measure the agreement rate to know when it's earned the next level of trust." },
        { t: "Guardrails", b: "Define what the agent can do alone and what needs sign-off. Per-action policies, hard money limits, blast-radius caps." },
        { t: "Autonomous promotion", b: "Move high-confidence actions to autonomous mode. Keep humans in the loop for everything else." },
        { t: "Observability and audit", b: "Dashboard showing every decision, every tool call, every saved minute. Queryable for compliance and reporting." },
        { t: "Expansion", b: "Add the second workflow only when the first is rock-solid. No grand programmes, just compounding wins." },
      ],
      stack: ["LangGraph", "DSPy", "Pydantic", "Temporal", "Inngest", "OpenAI", "Anthropic", "Mistral", "Postgres", "Redis"],
      whenRight:
        "You have a repeatable workflow with clear inputs and outputs. It currently takes a human 15+ minutes per instance. The cost of doing it wrong is recoverable. You have an internal champion who can define success.",
      whenNot:
        "The workflow is irregular, ambiguous, or requires deep human judgement. The cost of a bad action is catastrophic and can't be mitigated by approval flows. You don't have anyone internal who can describe the ideal-case execution.",
    },
  },
  {
    icon: MessagesSquare,
    slug: "chatbots",
    title: "Conversational AI and Chatbots",
    body: "Customer-facing assistants and internal copilots, grounded in your data. Slack, WhatsApp, web, in-app. Built to resolve, not deflect. Hand-off to humans when it matters, with audit trails for everything.",
    items: ["Support copilots", "Sales and lead bots", "Slack, WhatsApp, web", "Live hand-off and analytics"],
    detail: {
      tagline: "Assistants that solve problems. Not deflection machines.",
      timeline: "4 to 8 weeks",
      ideal: "Companies with high support volume, a knowledge base, and customers who would rather self-serve.",
      intro:
        "Most chatbots are designed to deflect. Their real job is keeping users away from a human until they give up. Ours are designed to resolve. That changes everything: the data they're grounded in, how they handle ambiguity, and what they're allowed to do on the user's behalf.",
      inPractice: [
        "We ground every assistant in your actual content (help docs, ticket history, product specs) and your actual permissions model. The bot can do things in your system: cancel a subscription, issue a refund, look up an order. Not because we trust the model to do the right thing every time, but because we wire in policy checks around each action.",
        "When the bot can't resolve something cleanly, it hands the conversation to a human with the full context already loaded. No 'starting from scratch' frustration. The result is faster resolution, lower volume reaching humans, and a measurable lift in self-serve.",
      ],
      whatYouGet: [
        { t: "A grounded chatbot", b: "Trained on your docs, your tickets, and your product. Cited answers. No hallucinated policies." },
        { t: "Live human hand-off", b: "Clean escalation with full context, sentiment scoring, and routing rules. Built for the agents who inherit the conversation." },
        { t: "Multi-channel deploy", b: "Web widget, Slack, WhatsApp, in-app. One brain, many surfaces." },
        { t: "Analytics and eval suite", b: "What did the bot resolve? Where did it fail? How does it compare to the human baseline? You'll know." },
      ],
      process: [
        { t: "Content audit", b: "Map your help docs, ticket archive, and product spec into retrievable chunks. Identify the gaps that need fresh writing." },
        { t: "Grounding pipeline", b: "Build the retrieval layer against your real corpus, with citation enforcement so every claim is traceable." },
        { t: "Action wiring", b: "Connect the bot to the things it should be allowed to do. Refund, cancel, lookup, escalate. With policy checks around each." },
        { t: "Persona and tone", b: "Calibrate voice, refusal style, and escalation triggers. Trained against real edge cases from your past tickets." },
        { t: "Internal pilot", b: "Run with your own team first. We surface every weird interaction before any customer sees it." },
        { t: "Production launch", b: "Phased rollout with live monitoring, hand-off integration, and on-call coverage for the first two weeks." },
        { t: "Weekly iteration", b: "Improvements driven by conversation logs. The bot gets sharper every week without retraining everything from scratch." },
      ],
      stack: ["LangChain", "LlamaIndex", "Pinecone", "Weaviate", "pgvector", "Twilio", "WhatsApp Business API", "Slack Bolt"],
      whenRight:
        "You have substantial documented content. You have repeat questions you'd love to deflect from your support queue. You're willing to give the bot real abilities (not just FAQ lookups). Your agents will treat the bot as a teammate.",
      whenNot:
        "Your customer base is small enough that human support already scales fine. Your interactions are highly emotional, highly regulated, or one-of-a-kind. You don't have any structured content for grounding (we'll need to create it before we build).",
    },
  },
  {
    icon: PhoneCall,
    slug: "voice-ai",
    title: "Voice AI and Calling Bots",
    body: "Real-time voice agents that book appointments, qualify leads, and run outbound campaigns at scale. Natural prosody, sub-second latency, full call recordings with CRM sync.",
    items: ["Inbound IVR replacement", "Outbound calling", "Multilingual voice", "Twilio, Vapi, LiveKit"],
    detail: {
      tagline: "Voice agents that sound human, scale like software, and book real revenue.",
      timeline: "6 to 10 weeks",
      ideal: "Sales, support, scheduling, and onboarding teams making or taking 500+ calls a week.",
      intro:
        "Voice is hard. Latency has to be under 800 milliseconds end-to-end or it feels like a robot. The agent has to know when to interrupt, when to wait, and when to escalate. Pronunciation, prosody, and turn-taking matter as much as the words themselves. Most teams underestimate this until they ship and the demos that wowed everyone fall apart on the third real call.",
      inPractice: [
        "We design voice agents around a specific job: outbound qualification, appointment booking, inbound triage, post-purchase confirmation. One job done excellently beats a dozen done passably.",
        "We obsess over latency (the cheapest model that hits the speed budget wins), prompt design for spoken language (humans say 'um', 'so', 'wait' and the agent has to handle it), and graceful failure (when in doubt, hand off to a human cleanly). The result is a voice product your customers tolerate, and your operations team actually loves.",
      ],
      whatYouGet: [
        { t: "A production voice agent", b: "Real phone numbers or in-app calling, full conversation logs, recording on demand. Deployed on Twilio, LiveKit, or Vapi." },
        { t: "CRM sync", b: "Every call writes back to your system of record. Call notes, outcomes, next steps. Your sales team works the leads, not the data entry." },
        { t: "Live monitoring and barge-in", b: "Supervisors can listen in, take over a call mid-stream, or train the bot on objections in real time." },
        { t: "Compliance recording", b: "Full call recording with consent prompts. PII redaction in the transcript. Regulator-friendly." },
      ],
      process: [
        { t: "Define the one job", b: "Pick a single call type: booking, qualifying, triaging, confirming. One thing done excellently, not a dozen done badly." },
        { t: "Voice casting", b: "Pick the right voice for your brand and language mix. Bilingual handling and accent calibration come built in." },
        { t: "Script engineering", b: "Prompts designed for spoken conversation, not for text. Interruption handling, turn-taking, graceful confusion." },
        { t: "Latency tuning", b: "Hit sub-800ms end-to-end. The cheapest model that meets the budget wins. We measure obsessively." },
        { t: "Compliance plumbing", b: "Consent prompts, recording disclosure, PII redaction in transcripts, retention policy. Built before launch, not bolted on." },
        { t: "Supervised pilot", b: "Fifty live calls with a human shadowing. We refine objection handling and edge-case responses against real data." },
        { t: "Production scale", b: "Roll out with live monitoring, supervisor barge-in tools, and weekly tuning based on the calls that didn't go well." },
      ],
      stack: ["LiveKit", "Vapi", "Twilio", "Deepgram", "ElevenLabs", "Cartesia", "OpenAI Realtime", "Anthropic"],
      whenRight:
        "You have a well-defined call objective with a measurable outcome (booked, qualified, resolved). Your call volume is high enough that even 10% deflection moves the business. You have someone internal who knows what 'good' sounds like.",
      whenNot:
        "Your calls are open-ended consultations with no fixed shape. You're in a heavily regulated industry that bans synthetic voices (some healthcare and financial contexts). You haven't run the pilot math on what a 10% improvement is worth.",
    },
  },
  {
    icon: Database,
    slug: "rag",
    title: "RAG and Knowledge Systems",
    body: "Give your team instant, cited answers from the contracts, manuals, and ticket history locked inside your stack. Hybrid search, document parsing, citation grounding, continuous evaluation. Hallucination-resistant by design.",
    items: ["Hybrid vector search", "Document parsing", "Citation grounding", "Continuous eval"],
    detail: {
      tagline: "Give your team instant, cited answers from the knowledge you already own.",
      timeline: "4 to 8 weeks",
      ideal: "Teams with thousands of documents, a knowledge problem, and humans doing search-and-summarize as a day job.",
      intro:
        "Most internal knowledge dies in PDFs, Confluence pages, ticket histories, and old Slack threads no one searches anymore. RAG lets your team ask questions in plain English and get answers grounded in your actual documents, with citations. Done right, it's the difference between an organisation that remembers and one that keeps rediscovering the same things.",
      inPractice: [
        "We don't just throw your documents into a vector database and call it a day. We design retrieval for your specific corpus: hybrid search (semantic plus keyword), document-aware chunking (legal contracts are not blog posts), citation enforcement, and continuous evaluation against questions your team actually asks.",
        "For sensitive content, we deploy in your VPC with role-based access so the bot only retrieves what each user is allowed to see. The same RAG that helps customer success answer questions in seconds shouldn't let a contractor read next quarter's pricing strategy.",
      ],
      whatYouGet: [
        { t: "A grounded knowledge system", b: "Searchable, citable, accessible from your existing tools (Slack, web app, internal portal)." },
        { t: "Smart document ingestion", b: "PDFs, Word, Confluence, Notion, Drive, S3. New documents indexed automatically as they're added." },
        { t: "Per-user access control", b: "The bot honors your permissions model. Sensitive content only surfaces for authorized users." },
        { t: "An eval suite that doesn't lie", b: "Question-answer pairs scored by both LLM-as-judge and human review. You'll know exactly how trustworthy the system is on day one and every day after." },
      ],
      process: [
        { t: "Source inventory", b: "Catalogue every place your knowledge lives. PDFs, Confluence, Notion, Drive, ticket history, Slack archives. Prioritize by use." },
        { t: "Document parsing", b: "Extract clean text from messy formats. Tables, scanned PDFs, embedded images, legal headers. Quality here decides everything downstream." },
        { t: "Chunking strategy", b: "Document-aware splitting. Legal contracts are not blog posts. We design the chunker for each content type." },
        { t: "Hybrid retrieval", b: "Semantic search plus keyword plus reranking. Each query type gets the right blend automatically." },
        { t: "Permissions wiring", b: "Per-user access control tied to your auth system. The bot only shows you what you're allowed to see." },
        { t: "Eval suite", b: "Real questions from your team, scored continuously. We catch regressions before your users do." },
        { t: "Production surface", b: "Slack, web app, internal portal, or embedded in your product. Same brain, multiple interfaces." },
      ],
      stack: ["Pinecone", "Qdrant", "Weaviate", "pgvector", "Cohere Rerank", "BM25", "LlamaParse", "Unstructured.io", "OpenAI", "Anthropic"],
      whenRight:
        "You have a substantial volume of structured or semi-structured text. Your team spends significant time looking things up. The answers exist somewhere in your documents already. You care about citations and don't want hallucinations.",
      whenNot:
        "Your content is mostly tabular data (use a regular database). Your team needs answers that require synthesis with no documented basis (that's a research problem, not retrieval). Your documents are wildly out of date and you're not willing to clean them.",
    },
  },
  {
    icon: Eye,
    slug: "computer-vision",
    title: "Computer Vision",
    body: "Real-time detection, OCR, defect inspection, and spatial intelligence at the edge or in your cloud. From manufacturing QA to retail shelf analytics. Vision systems that actually ship.",
    items: ["Detection and tracking", "OCR pipelines", "Edge inference", "MLOps integration"],
    detail: {
      tagline: "Vision systems that work in the messy real world, not just on a clean test set.",
      timeline: "8 to 16 weeks",
      ideal: "Manufacturing QA, retail analytics, security, healthcare imaging, and edge deployments.",
      intro:
        "Anyone can show you a YOLO demo on a clean dataset. The actual work is making it run reliably on a factory floor at 60 frames per second, under bad lighting, with three years of weights and an MLOps pipeline behind it. That's what we build.",
      inPractice: [
        "We design for the deployment environment first. Edge or cloud? GPU, CPU, or NPU? What's the latency budget? What happens when the network drops? These constraints decide model architecture, quantization strategy, and the entire pipeline shape.",
        "Then we obsess over the data. Real-world vision systems live or die on training data that matches deployment conditions. We help you build a labeling workflow, an active-learning loop that prioritizes the most informative new samples, and an evaluation set that reflects the hard cases, not the easy ones that inflate your metric.",
      ],
      whatYouGet: [
        { t: "A production vision pipeline", b: "From camera or upload to result, with logging at every stage. Deployable on edge devices, on-prem servers, or in your cloud." },
        { t: "A labeling and retraining loop", b: "When the model gets something wrong in production, it gets flagged for relabeling and folded into the next training run automatically." },
        { t: "Honest accuracy metrics", b: "Precision, recall, and per-class performance broken down by lighting, angle, and category. You know exactly where the model is strong and weak." },
        { t: "Edge deployment artifacts", b: "Quantized, optimized models for Jetson, Coral, ONNX runtime, or whatever hardware you've standardized on. Plus the OTA update tooling." },
      ],
      process: [
        { t: "Environment audit", b: "Camera placement, lighting conditions, latency budget, hardware target. These constraints decide the entire pipeline shape." },
        { t: "Data collection", b: "Capture or source images that actually look like your deployment environment. Lab data fools models." },
        { t: "Annotation", b: "Label samples with the right tool for your team. Active learning surfaces the hard cases worth a human's attention." },
        { t: "Model training", b: "Pick the architecture for your accuracy and latency tradeoff. YOLO, SAM, or a custom head depending on the task." },
        { t: "Optimization", b: "Quantize, prune, and compile for your edge target. The model that wins the benchmark rarely wins the deployment." },
        { t: "Pilot deployment", b: "Run alongside humans for two weeks. Measure agreement, capture disagreements, retrain on the misses." },
        { t: "Production", b: "OTA updates, monitoring dashboards, and a relabeling pipeline so the model improves with every week of use." },
      ],
      stack: ["YOLO", "Segment Anything", "OpenCV", "ONNX Runtime", "TensorRT", "PyTorch", "Roboflow", "Label Studio", "NVIDIA Jetson"],
      whenRight:
        "You have a clear visual decision to make at scale (defect, count, classify, locate, read). You can collect or already have representative training data. You can tolerate the engineering reality that vision systems take weeks of careful work.",
      whenNot:
        "You need fluid scene understanding across arbitrary objects and contexts (that's a frontier research problem). Your data is too sensitive to label externally and you have no internal annotation team. Your accuracy requirement is essentially zero error in a high-stakes medical context (that needs a different process than what we deliver).",
    },
  },
  {
    icon: Smartphone,
    slug: "web-mobile",
    title: "Web and Mobile Apps",
    body: "Fast, polished applications with AI built in from day one, not bolted on later. React, Next.js, React Native, Expo. Real-time interfaces, generative UIs, production telemetry.",
    items: ["React, Next.js", "React Native, Expo", "Real-time streaming UI", "Design and engineering"],
    detail: {
      tagline: "Fast, polished applications with AI as the architecture, not the afterthought.",
      timeline: "8 to 20 weeks",
      ideal: "Companies launching a new AI-first product or refreshing a tired one.",
      intro:
        "Most AI products feel bolted on. A chat widget in the corner. A 'powered by GPT' badge in the footer. That's not what we build. We design and engineer apps where AI is the architecture: real-time streaming responses, generative UIs, telemetry that learns from every user interaction, prompts that adapt to each user.",
      inPractice: [
        "We work as one team: design, frontend, backend, ML. No throwing requirements over a wall. The same engineers who build the model write the React component that streams its output, because the two decisions are inseparable.",
        "We default to fast, native-feeling experiences: React with SSR, React Native or Expo for mobile, type-safe APIs, edge-deployed inference. We don't ship something that takes four seconds to start replying. If we can't get a streaming token in under 400ms, we redesign the architecture.",
      ],
      whatYouGet: [
        { t: "A finished product", b: "Designed, engineered, deployed. App store, web, or both. With a real backend, not a Vercel demo." },
        { t: "AI-native interactions", b: "Streaming responses, generative UIs, smart defaults, suggested next actions. The kind of UX you can't get by bolting GPT-4 onto a static screen." },
        { t: "Production telemetry", b: "Per-user analytics, per-prompt cost tracking, error logging, A/B test infrastructure. You'll know what's working and what's burning money." },
        { t: "Engineering handover", b: "Full source, deployment automation, runbooks, and as much pair-programming with your team as you want. We're not trying to make you dependent on us." },
      ],
      process: [
        { t: "Discovery", b: "User flows, competitive audit, brand audit, technical constraints. We come back with a sharp opinion on what to build first." },
        { t: "Design", b: "Figma wireframes through to high-fidelity. Opinionated, not template. We design AI behaviour and visual surface together." },
        { t: "Frontend build", b: "React with SSR or React Native with Expo. Type-safe end to end. Streaming-native components from day one." },
        { t: "Backend", b: "Type-safe APIs, edge inference, observability built in. Postgres for state, Redis where it earns its place." },
        { t: "AI integration", b: "Streaming responses, generative UIs, smart defaults, suggested actions. The model is part of the interaction design." },
        { t: "QA and launch", b: "Cross-device testing, app-store submission, soft launch with telemetry watching every metric that matters." },
        { t: "Handover", b: "Source, deployment automation, on-call runbooks. Pair programming with your team until they're driving solo." },
      ],
      stack: ["React 19", "Next.js", "TanStack Start", "React Native", "Expo", "tRPC", "Tailwind", "Postgres", "Vercel", "Cloudflare Workers"],
      whenRight:
        "You have a real product idea (not just 'something with AI'). You care about how the product feels, not just what it does. You have a budget that respects what production engineering actually costs. You're ready to ship something opinionated, not generic.",
      whenNot:
        "You want a cheap MVP to test demand (use a no-code tool first). You need a generic CMS-driven site (we'll be expensive overkill). You don't have a team ready to take the product live after we finish.",
    },
  },
  {
    icon: Server,
    slug: "mlops",
    title: "Data Engineering and MLOps",
    body: "The infrastructure that makes AI actually work. Pipelines, vector stores, eval harnesses, observability, CI/CD for models. We build the rails your AI rides on.",
    items: ["Data pipelines", "Vector and feature stores", "Eval and monitoring", "Model CI/CD"],
    detail: {
      tagline: "The unglamorous infrastructure that makes AI actually work in production.",
      timeline: "4 to 10 weeks",
      ideal: "Teams who've shipped a model into production and watched it slowly degrade.",
      intro:
        "AI projects don't usually die because the model was wrong. They die because the pipeline broke at 3am and nobody noticed, the evaluation suite never existed, and the data shifted underneath the model until the customers complained louder than the engineers. We build the rails so that doesn't happen to you.",
      inPractice: [
        "We start by auditing what you already have. Most teams have more infrastructure than they realize and more gaps than they want to admit. We fix the gaps, document what's there, and add the missing pieces: an evaluation pipeline that runs on every model change, an observability layer that tells you when latency or quality drifts, a retraining schedule that doesn't require a human to remember to kick it off.",
        "We design for the team you have today and the team you'll have in six months. Documentation matters. Runbooks matter. Boring, predictable systems beat clever ones that only one person understands.",
      ],
      whatYouGet: [
        { t: "Data pipelines you can trust", b: "Ingestion, validation, transformation, versioning. With automated alerts when something looks wrong." },
        { t: "Model CI/CD", b: "Push a change, the eval suite runs, you see whether it's a regression before you deploy. No more 'deploy and pray'." },
        { t: "Observability for AI", b: "Latency, cost, quality drift, error rates, per-customer breakdowns. Dashboards your team will actually look at." },
        { t: "On-call runbooks", b: "What to do when (not if) things break. Written for the engineer who joins next month, not the one who built it." },
      ],
      process: [
        { t: "Infrastructure audit", b: "Inventory of your current pipelines, evals, and observability gaps. The honest map of where you actually are." },
        { t: "Eval framework", b: "Build the test suite that should have existed from day one. Without this, every improvement is guesswork." },
        { t: "Pipeline rebuild", b: "Ingestion, validation, transformation, versioning. Idempotent, observable, alert-friendly." },
        { t: "Model CI/CD", b: "Eval suite runs on every model change. Regressions caught before deploy. Promotion to production via clear gates." },
        { t: "Observability layer", b: "Latency, cost, quality drift, error rates. Dashboards your on-call engineer will actually check at 3am." },
        { t: "Runbook authoring", b: "On-call documentation written for the engineer who joins next month. Boring, complete, life-saving." },
        { t: "Handover", b: "Knowledge transfer, on-call shadowing, and a clean exit. Your team is driving by week four, not depending on us forever." },
      ],
      stack: ["Airflow", "Prefect", "Dagster", "Modal", "Ray", "MLflow", "Weights & Biases", "Datadog", "Grafana", "Postgres", "DuckDB"],
      whenRight:
        "You have a model already in production and the cracks are showing. You have an engineering team capable of owning the infrastructure once we hand it over. You're tired of finding out about quality drops from customer support tickets.",
      whenNot:
        "You don't have a model in production yet (we'd build the model first). You're allergic to documentation or testing (cultural mismatch). You believe the right answer is always to throw more compute at the problem (sometimes it is, but usually it isn't).",
    },
  },
  {
    icon: Compass,
    slug: "strategy",
    title: "AI Strategy and Advisory",
    body: "Not sure where to start? We audit your operations, find the highest-leverage AI opportunities, and deliver a clear implementation roadmap. Counsel from engineers, not slide-deck consultants.",
    items: ["Operations audit", "Roadmap design", "Model selection", "Team coaching"],
    detail: {
      tagline: "Counsel from engineers who've shipped what they recommend.",
      timeline: "2 to 4 weeks",
      ideal: "Leadership teams unsure where to start, or whether to start at all.",
      intro:
        "Most AI consulting is slides and frameworks from people who've never trained a model. We come from the opposite direction. We audit your operations, find the highest-leverage opportunities, and write a roadmap that an engineering team can actually execute. No buzzwords, no 'AI maturity matrices'. Just where the real ROI lives in your company and how to ship it.",
      inPractice: [
        "We spend the first week talking to people: leadership, engineering, the folks doing the repetitive work that you suspect could be automated. We look at your data, your stack, your business model, and the constraints (regulatory, cultural, technical) that any AI program will have to live inside.",
        "Then we deliver a written report you can show your board: ranked opportunities, expected impact, realistic timelines, what to build in-house versus buy, and which engagements (if any) make sense to outsource. We're happy to recommend that you do nothing or hire someone other than us. The integrity of the advice matters more than the next engagement.",
      ],
      whatYouGet: [
        { t: "An operations audit", b: "Documented inventory of where AI could actually help in your business, ranked by expected ROI and engineering difficulty." },
        { t: "An implementation roadmap", b: "Six-to-twelve-month plan, sequenced for dependencies and quick wins. Realistic, not aspirational." },
        { t: "Build versus buy guidance", b: "For each opportunity, a clear recommendation: build custom, integrate a vendor, or skip entirely. With reasoning, not just opinions." },
        { t: "A short-list of partners", b: "If parts of the roadmap fit other firms or in-house hires better, we'll tell you. We'd rather earn the right work than win the wrong work." },
      ],
      process: [
        { t: "Stakeholder interviews", b: "One week of conversations with leadership, engineering, operations, and the people doing the repetitive work." },
        { t: "Data audit", b: "What you have, what's missing, what's worth using. We score each dataset on quality, volume, and freshness." },
        { t: "Opportunity mapping", b: "Every workflow we found, scored against expected ROI and engineering difficulty. The grid that drives every decision." },
        { t: "Architecture review", b: "For each top opportunity, the technical shape: build custom, integrate a vendor, or skip. With reasoning." },
        { t: "Roadmap drafting", b: "Six-to-twelve-month plan sequenced for dependencies and quick wins. Realistic timelines, honest budgets." },
        { t: "Partner shortlist", b: "Including us, including not-us where appropriate. We tell you who's actually qualified for each part." },
        { t: "Final report", b: "Board-ready document plus a one-page executive summary. Plus a workshop with leadership to walk through it." },
      ],
      stack: ["Notion", "Linear", "Figma", "Loom", "Google Docs"],
      whenRight:
        "You're early in your AI thinking and want a credible external view. You've been burned by previous consulting engagements that delivered slides and not systems. You want recommendations from people who'd be qualified to also build them.",
      whenNot:
        "You already know exactly what you want built (skip straight to engagement). You're looking for someone to validate a decision you've already made (we won't). You expect a deliverable that's primarily decorative.",
    },
  },
];

// ─── Case Studies ───────────────────────────────────────────────────────────

export interface CaseStudy {
  name: string;
  sector: string;
  year: string;
  tagline: string;
  blurb: string;
  role: string;
  capabilities: string[];
  result: string;
  tags: string[];
  image: string;
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    name: "SkyBridge",
    sector: "Drone Services",
    year: "2025",
    tagline: "A platform that connects clients with drone pilots for aerial projects.",
    blurb:
      "SkyBridge is a two-sided marketplace for the drone services industry. Businesses and individuals describe what they need filmed or inspected, compare quotes from qualified pilots, and manage the full job in one place, from booking through delivery and payment. On the other side, operators showcase their work, respond to jobs, run missions step by step, and handle billing without juggling spreadsheets and email threads.",
    role:
      "We built the backend that powers the platform: booking flows, project lifecycle, notifications, payments, file delivery, and airspace compliance checks before work begins.",
    capabilities: [
      "Client job requests, quote comparison, and live project tracking",
      "Pilot profiles, mission management, team coordination, and deliverable uploads",
      "Integrated booking, invoicing, and payment flows",
      "Pre-flight airspace and compliance validation",
    ],
    result: "Two-sided drone marketplace",
    tags: ["Marketplace", "Booking", "Payments", "Compliance"],
    image:
      "https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&w=1400&q=80",
  },
  {
    name: "VisionAtlas",
    sector: "Computer Vision",
    year: "2025",
    tagline: "AI-assisted labeling, review, and model training in one platform.",
    blurb:
      "VisionAtlas is a labeling and training studio for computer vision teams. Annotators stay fast with click-and-box segmentation, natural-language prompts, and video-aware workflows. Leads keep quality tight with review paths and dataset versioning. Approved data moves straight into detection and segmentation model training without switching tools.",
    role:
      "We engineered the platform core: labeling pipelines, assistant runtimes, review and versioning systems, multi-tenant training job orchestration, and workflow automation for teams scaling annotation work.",
    capabilities: [
      "Smart labeling with click, box, prompt, and video assistance",
      "Roles, review workflows, chat, and dataset versioning",
      "YOLO, Detectron2, and RF-DETR training with fair job queuing",
      "Workflow builder, imports, exports, and preprocessing hooks",
    ],
    result: "Label to train in one place",
    tags: ["Computer Vision", "Labeling", "Model Training", "MLOps"],
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1400&q=80",
  },
  {
    name: "LeadIntel",
    sector: "Sales Automation",
    year: "2025",
    tagline:
      "Find the right people, reach them on every channel, and let AI close the conversation.",
    blurb:
      "LeadIntel is a fully automated sales outreach platform for businesses that need more pipeline without hiring a larger sales team. Enter a company name and the platform finds decision-makers, pulls verified contact details, and reaches out across email, LinkedIn, WhatsApp, and live AI phone calls. Every action is logged in real time so clients see exactly who was contacted, what was said, and what happened next.",
    role:
      "We built the backend orchestration: contact enrichment, multi-channel delivery, conversational voice agents, real-time activity logging, white-label configuration, and a knowledge base that improves from call transcripts over time.",
    capabilities: [
      "Automated contact research with verified emails, phones, and LinkedIn profiles",
      "Personalised outreach across email, LinkedIn, WhatsApp, and voice in parallel",
      "Conversational AI calls in Hindi or English with objection handling and meeting booking",
      "White-label setup, live dashboard, and learning knowledge base from past conversations",
    ],
    result: "Multi-channel outreach on autopilot",
    tags: ["Voice AI", "Outreach", "White-label", "Automation"],
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1400&q=80",
  },
];

// ─── Process Steps ───────────────────────────────────────────────────────────

export const PROCESS_STEPS = [
  {
    n: "01",
    t: "Discovery and Audit",
    b: "We map your data, define what success looks like in numbers, and find the smallest AI solution that delivers the biggest impact.",
  },
  {
    n: "02",
    t: "Rapid Prototype",
    b: "A working proof-of-concept in a sandboxed environment within three to four weeks. Real results before you commit to the full build.",
  },
  {
    n: "03",
    t: "Production Build",
    b: "Full engineering: evals, monitoring, observability, CI/CD, and security review. Designed to run unattended at scale.",
  },
  {
    n: "04",
    t: "Continuous Improvement",
    b: "Ongoing model retraining, evaluation, and tuning as your data and business evolve.",
  },
];

// ─── Stats ───────────────────────────────────────────────────────────────────

export const STATS = [
  { k: "30+", v: "AI systems shipped", n: 30, suffix: "+" },
  { k: "20+", v: "clients across industries", n: 20, suffix: "+" },
  { k: "5M+", v: "model inferences daily", n: 5, suffix: "M+" },
  { k: "48 hr", v: "average project kickoff", n: 48, suffix: " hr" },
];

// ─── Principles ──────────────────────────────────────────────────────────────

export const PRINCIPLES = [
  {
    n: "01",
    t: "Ship, don't demo.",
    b: "Every engagement ends with a live, monitored system, not a slide deck. Success is measured by what runs in production, not by what looks good in a notebook.",
  },
  {
    n: "02",
    t: "Small team, deep focus.",
    b: "Two to three senior engineers per project. No account managers, no juniors. You work directly with the people building your system.",
  },
  {
    n: "03",
    t: "Your data stays yours.",
    b: "We deploy in your cloud, behind your VPC, or on-prem. Your data never leaves your infrastructure. Zero vendor lock-in, full data sovereignty.",
  },
  {
    n: "04",
    t: "Honest about fit.",
    b: "If AI isn't the right tool for your problem, we'll tell you. We'd rather build the right thing than the wrong thing expensively.",
  },
];

// ─── Services for contact form ───────────────────────────────────────────────

export const CONTACT_SERVICES = [
  "LLM Fine-tuning",
  "AI Agents",
  "Chatbots",
  "Voice AI",
  "RAG Systems",
  "Computer Vision",
  "Web and Mobile",
  "Data and MLOps",
  "Strategy and Advisory",
];

// ─── Client logos (marquee) ──────────────────────────────────────────────────

export const CLIENT_LOGOS = [
  "SYNTHEX",
  "ORBITA",
  "NEXVAULT",
  "CLARANET",
  "DRIFTIO",
  "AXONCORE",
  "WAVEMIND",
  "SOLARA",
];

/** Set to true when you have real client names to show in the homepage marquee. */
export const SHOW_CLIENT_MARQUEE = false;
