# AI Tool Usage and Contributions

Three AI tools were used during the development process. Each tool had a distinct role.

## 1. ChatGPT

**Purpose:** Project planning, prompt engineering, technical guidance and debugging.

Contributions:
- Helped analyze the project requirements.
- Assisted in planning improvements to the existing SaaS Analytics Platform.
- Helped design and refine prompts using Role, Task, Context, Constraints and Output Format.
- Provided technical explanations and debugging guidance.
- Assisted in reviewing implementation results.

## 2. OpenAI Codex

**Purpose:** AI-assisted software development and code implementation.

Contributions:
- Implemented Supabase authentication.
- Integrated protected routes and session management.
- Implemented password reset and password update functionality.
- Developed the AI chatbot interface.
- Integrated the chatbot with the Groq API.
- Improved chatbot input readability and UI styling.
- Assisted with code checks and production build verification.

## 3. Claude

**Purpose:** Research and technical exploration.

Contributions:
- Researched suitable project architecture and technology choices.
- Explored the Groq API and its integration approach.
- Researched available language models and their capabilities.
- Helped build an understanding of the technology decisions used in the project.

## AI API Provider: Groq

Groq is the API provider used by the website's AI chatbot.

- Model: `openai/gpt-oss-120b`
- Purpose: Generate responses to user questions.
- Integration: Server-side API route in Next.js.
- API credentials are stored in environment variables and are not exposed to the browser.

## Summary

The tools were used for different purposes:
- ChatGPT: Planning and guidance.
- OpenAI Codex: Implementation.
- Claude: Research.

Groq provides the language model API used by the chatbot.