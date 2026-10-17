# Yash Gori - Public Portfolio Profile

This file mirrors the current public portfolio and chatbot profile. It is intentionally concise and excludes private working notes.

## Positioning

- **Name:** Yash Gori
- **Current role:** AI Product Manager at FactWise, December 2025 to present
- **Location:** Mumbai, Maharashtra, India
- **Profile:** AI Product Manager who combines customer discovery, product judgment, and the technical fluency to build and ship with AI
- **Best fit:** AI Product Manager or APM roles in AI-first teams where hands-on building is valuable
- **Education:** B.Tech in Information Technology, K.J. Somaiya College of Engineering, 2021-2025, CGPA 8.12/10

### Summary

AI Product Manager combining enterprise product ownership with hands-on AI building. At FactWise, I designed a procurement AI agent and a BOM Data Mapper that turns inconsistent client files into structured parts lists. Shipped licensed APIs supporting 40K+ live purchase orders and contracts. At Webotix, I took SwiftCheck AI from discovery to production and secured $5,000 from Microsoft for Startups.

## Current Work - FactWise

FactWise is a B2B procurement and sourcing platform used by enterprise manufacturing clients.

### Enterprise Procurement AI Solution

Designed a conversational enterprise procurement AI solution with 140+ tools to simplify supplier comparisons, cross-currency cost analysis, and bulk procurement actions. Built in request clarification, transparent missing-data handling, and approval safeguards, with answers grounded in company records and behavior validated through AI evals.

Do not claim production client adoption, a measured time-savings figure, or an F1 score for this agent. Model Evaluation (Precision/Recall, F1 Score) is a skills entry, not a result claim.

### Purchase Orders and Bills of Materials

Yash owns the Purchase Order (PO) and Bill of Materials (BOM) product areas end-to-end for 4+ enterprise clients. He works directly with client teams, converts requirements and workflow problems into PRDs, prioritizes delivery, and drives engineering through features, bugs, and enhancements.

Key product capabilities include:

- An in-place PO revision workflow that allows issued orders to be changed with re-validation and a clear audit trail instead of being cancelled and recreated.
- Parallel BOM revisions that allow different versions of one multi-level product structure to run across live orders at the same time.

### BOM Data Mapper

An enterprise client showed that teams spent significant time manually restructuring inconsistent BOM files before importing them into FactWise. Yash turned that problem into a BOM Data Mapper that standardizes client files, preserves multi-level product structure, and produces usable Item Directory and BOM outputs.

Business value:

- Faster client onboarding
- Less manual data preparation
- Fewer import errors
- Reusable mappings for recurring client formats

Validated with 2 enterprise clients at annual pricing of INR 10-12 lakh per deployment, with a client-estimated 60% efficiency improvement. These are validation figures, not realized revenue, ARR, or measured production impact.

Technical product capabilities:

- Visual source-to-destination column mapping
- Fuzzy column suggestions
- Derived fields and default values
- Reusable mapping templates
- Excel, CSV, and PDF/OCR ingestion
- Selectable OCR zones and table extraction
- Transformation rules and previews
- Parent-child hierarchy preservation
- Support for document rows, quantities, alternate parts, and valid duplicates
- Standardized parts catalogue and connected multi-level BOM output

### Procurement OpenAPIs

Yash defined and shipped bulk create, bulk update, and bulk get APIs across Items, Vendors, Purchase Orders, and Contracts, plus an ID-mapping API for SAP/ERP synchronization. Each client receives its own API credentials.

- Sold as a licensed offering at INR 7-10 lakh per client
- Bought by 3 enterprise clients
- Used almost daily
- More than 40K live POs and contracts created through the APIs

### Related OpenAPI-backed MCP Agent

Clients found the OpenAPIs' strict request formats difficult to use directly. Yash built an AI agent, served via Model Context Protocol (MCP), that accepts a plain-language request, selects the right API, asks for missing information, builds the request, and executes it.

The agent is demo-stage and used as a product demonstration. No client adoption should be claimed.

This is related to but distinct from the broader 140+ tool procurement solution. Do not assume all of the broader solution is served through MCP.

## Previous Work - Webotix IT Consultancy

**AI Product Manager, December 2024 to December 2025**

Yash took SwiftCheck AI from an early product idea to production. The product digitized a paper-heavy food quality-control workflow in which teams manually created stage-wise inspection templates and reviewed thousands of QC documents each week.

- Built the first prototype with AI in about four weeks
- Secured $5,000 from Microsoft for Startups after pitching the product
- Led a cross-functional team of 3 to take the product to production
- Built SwiftCheck's AI agents, grounded in client specifications using RAG over FAISS/Pinecone vector databases
- AI-generated QC templates reached 80% accuracy against client product specifications
- Reduced QC-document creation time by 90% compared with building templates manually
- Refined the product through demos and feedback from multiple enterprise clients
- Led stakeholder management, aligning the CEO and COO on product scope and roadmap

SwiftCheck generates and manages quality-control documentation. It does not inspect physical products or automatically identify defects.

## Earlier Experience

### MetaRizz

**Product Management Intern, December 2023 to May 2024**

- Acted as product owner for GuestInMe and MediNobel across problem definition, feature prioritization, and delivery planning.
- Led user research and UX improvements for GuestInMe, which grew to 1K+ active users.
- Drove MediNobel from concept to delivery while maintaining 95% on-time execution.

### Watermelon Gang

**Business and Growth Management Intern, August 2022 to November 2023**

- Drove growth strategy for 5+ fintech and crypto clients, including CoinDCX, Binance, and Kotak 811.
- Used A/B testing to improve campaign performance by 30-60%.
- Acquired clients through targeted outreach and grew accounts through upsells and long-term partnerships.
- Helped scale Ali Solanki's YouTube channel from 50K to 80K subscribers through a Kanban-based content pipeline.

## Selected Projects

### Product Case Studies

Teardowns of Google Pay, JioCinema, Vercel, Blinkit, and Fireflies.ai covering acquisition, engagement and retention, and onboarding strategy.

### BOM Data Mapper

A visual mapping and normalization platform that converts inconsistent BOM files into structured parts data and connected multi-level assembly trees.

### SwiftCheck AI

An AI quality-control workflow platform whose agents generate inspection templates from product specifications, support mobile data capture, and manage digital approvals and records.

### Interactive AI Portfolio and Chatbot

A chat-first portfolio assistant grounded in Yash's verified career information, with model selection and guardrails designed to reduce hallucination and token cost.

### DocuTalk

A cross-platform retrieval-augmented generation assistant for conversational questions across documents, with source tracebacks.

### Inhance

A multi-agent LinkedIn and resume evaluation tool with role-specific recommendations, ATS scoring, and LaTeX resume generation.

### FinLLM-RAG

A regulatory-intelligence prototype for extracting and checking rules from RBI documents through an auditable retrieval workflow with human review.

### Customer Churn Predictor

An end-to-end machine-learning project covering data preparation, modeling, evaluation, feature importance, and Power BI visualization.

## Core Skills

Certification: IBM AI Product Manager Professional Certificate.

- Product Strategy, Customer Discovery & Interviews, PRDs, User Stories & Acceptance Criteria, Backlog Management & Prioritization, Success Metrics, Stakeholder Management
- Agentic AI & Orchestration, Model Evaluation (Precision/Recall, F1 Score), Prompt Design, MCP, RAG & Vector Databases (FAISS/Pinecone), Grounding, Guardrails & Fallback Design, Model Selection & Tradeoffs
- AI-assisted product building with Claude Code, Cursor, Codex, and Gemini
- Working knowledge of Python, APIs, SQL, React, Azure, Docker, Power BI, Figma, Jira, and Notion

## Public Claim Boundaries

- Present Yash as an AI Product Manager who ships, not as an AI Engineer.
- Use product ownership verbs for FactWise modules: owned, defined, designed, drove, and shipped.
- Use built for products and prototypes Yash personally built with AI.
- Treat the BOM Data Mapper's 2-client validation, 60% client-estimated efficiency improvement, and INR 10-12 lakh annual pricing as validation, not realized impact or revenue.
- Treat the MCP agent as demo-stage. Do not claim that clients use it in production or attribute its deployment status to the broader 140+ tool agent.
- Do not publish customer names in connection with BOM source files or mapper testing.

## Public Links

- Resume: https://yashgori20.vercel.app/pm.pdf
- Groww GR-1 annotated suggestions: https://yashgori20.vercel.app/groww-gr1
- FactWise: https://factwise.io/
- Webotix: https://webotix.ae/
- Vacha NGO: https://vacha.org.in/
