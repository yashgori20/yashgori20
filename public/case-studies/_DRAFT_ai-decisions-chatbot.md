<!--
DRAFT, AI DECISION LOG: This site's chatbot.
Yash: verify/correct everything in [BRACKETS]. Drafted from the real backend code (Backend/app.py)
+ the anti-hallucination fix we built together. Replace anything that isn't exactly how it happened.
Structure adopted from r/AIProductManagers (what it does / must never do / hallucination / failure modes).
-->

# The AI behind this site, and how I keep it from lying about me

> This portfolio's chatbot is itself a small, live AI product. Below are the real product decisions I
> made building it, framed the way I'd frame any AI feature: what it does, what it must never do, how
> I keep it honest, and the ways it could embarrass me in public. You can test every claim by chatting
> with it right now.

**Stack:** Groq (Llama 3.3 70B), Flask API on Hugging Face Spaces. Per-session memory, intent
detection, rate limiting, graceful fallback.

---

## What the model does
Answers questions about me (experience, projects, skills) in a natural, recruiter-friendly way,
adapting its depth to who's asking (recruiter vs. engineer vs. casual), grounded in a single
structured profile that is the source of truth.

## What it must never do
- **Never invent facts about me** (dates, titles, metrics, years of experience). If it isn't in the
  profile, the bot doesn't say it.
- **Never inflate.** No "5 years of experience," no fabricated client names or numbers.
- **Never double down when challenged.** If a user pushes back, it re-checks the facts and corrects
  itself instead of defending a wrong answer.
- **Never hard-fail in a recruiter's face.** If the model API is down, it degrades gracefully.

## How I avoided "hallucination-as-a-service"
The fix was not a bigger model. It was **grounding + constraints**:
- The system prompt is built **programmatically from my real, dated work history**, so the model
  always reasons from the same source of truth and can't drift from my résumé.
- Explicit guardrails: state roles and dates, never a computed "X years"; FactWise is current,
  Webotix is past; use only facts present in the prompt; if unsure, say so rather than guess.
- A self-correction rule so disagreement triggers a re-check, not a defense.

---

## Decision 1: It told a recruiter I had "5 years of experience." I fixed it by grounding, not by buying a bigger model.
- **Problem:** Asked "how much experience does Yash have?", the model confidently said **"around 5
  years."** I graduated in 2025. A plausible, confident lie about me, to a recruiter: the worst kind.
- **Options:** (1) bigger/smarter model (expensive, wouldn't fix it; the model wasn't dumb, it was
  ungrounded); (2) fine-tune on my résumé (overkill, brittle every time a fact changes); (3) ground
  the prompt in my real dated timeline + constrain it.
- **Chose (3), and why:** the model had no timeline to reason from, so it filled the gap. The answer
  is giving it the facts and constraining it, not a smarter model. Cheapest, instant, and it
  generalizes (every answer now reasons from one source of truth).
- **Result:** the "5 years" hallucination is gone; it answers with real roles and dates. [YASH:
  confirm live after deploy; the fix is built, pending push to the HF Space.]
- **The PM point:** most "the AI is wrong" problems are grounding and constraint problems, not
  model-quality problems. Reaching for a bigger model first is the expensive wrong instinct.

## Decision 2: One model, on purpose. Llama 3.3 70B on Groq.
- **Options:** a GPT-4-class model (best quality, slowest, priciest), a tiny model (cheap, flubs
  nuance), or Llama 3.3 70B on Groq.
- **Chose Llama 3.3 70B on Groq, and why:** Groq's inference is very fast, so the chat feels
  real-time, and a 70B model is more than enough to answer questions about one person from a known
  profile. Paying for a frontier model here would be spending money to solve a problem I don't have.
- **Result:** snappy, low-cost, quality that fits the task. [YASH: add latency/cost numbers or "tried
  X first" if true; real numbers make this stronger.]
- **The PM point:** model selection is a fit decision, not a leaderboard decision. Match the model to
  the job-to-be-done.

## Decision 3: Spend tokens on the right users, not every visitor.
- **Problem:** an LLM behind a public URL is an open invoice; every curious click costs tokens.
- **What I did:** detect intent/sophistication and adapt the response; rate-limit per IP and per
  session so one visitor can't run up the bill; cap conversation memory to recent turns instead of
  resending the whole history each call.
- **Why:** token cost scales with context length and call volume, so context discipline + routing is
  a cheaper lever than a worse, smaller model.
- **Result:** [YASH: add a usage/cost figure if you have one; even "runs on the low/free tier" is real.]
- **The PM point:** in AI products, cost is a design constraint from day one, not a cleanup task.

---

## Failure modes: ways this could embarrass us in public
Naming the failure modes is the job. Here's what could go wrong and what's in place for each:
- **Fabricating a fact about me** (the original "5 years" bug). → Grounded prompt + "only use facts
  here" guardrail.
- **Doubling down when a user says it's wrong.** → Self-correct rule: re-check and fix, don't defend.
- **Saying something off-brand or unprofessional to a recruiter.** → Constrained tone + bounded
  knowledge (it only talks about me, from the profile).
- **The model API goes down mid-conversation.** → Fallback mode answers basics instead of throwing a
  500 in front of a visitor.
- **Cost blowing up from abuse/scraping.** → Per-IP and per-session rate limits + capped context.
- [YASH: add any real incident you hit while building it; an honest "here's what broke and how I
  caught it" is the most credible thing on this whole page.]

---

### The through-line
Reduce hallucination by **grounding + constraints** (not a bigger model). Pick models by **fit**.
Treat **cost as a design input**. **Name the failure modes** and plan for them. That's the difference
between using AI and managing an AI product.
