# Kunal Kumar Portfolio

Personal portfolio and engineering lab for Kunal Kumar, focused on backend systems, distributed architecture, and AI-powered products.

## Stack

- React 19 and TypeScript
- Vite and Tailwind CSS
- Express development server
- Vercel serverless API routes
- Google Gemini through `@google/genai`

## Local Development

Requirements: Node.js 22+ and npm.

```powershell
npm install
Copy-Item .env.example .env
npm run dev
```

The development site runs at `http://localhost:3000`.

Set `GEMINI_API_KEY` in `.env` to enable live chatbot responses. Without it, the chatbot uses its built-in fallback responses. Never commit `.env` or expose the API key in source control.

## Scripts

```powershell
npm run dev      # Start the Express/Vite development server
npm run lint     # Run TypeScript validation
npm run build    # Build the frontend and local server bundle
npm run start    # Start the production server bundle
```

## Vercel Deployment

The project includes `vercel.json` and serverless handlers under `api/` for chat, health, and telemetry routes.

```powershell
vercel login
vercel --prod
vercel env add GEMINI_API_KEY production
```

The Vercel project should have `GEMINI_API_KEY` configured as a production secret before using the live chatbot.

## Main Routes

- `/api/chat` - Gemini-backed portfolio assistant
- `/api/health` - Deployment health check
- `/api/telemetry/visit` - Visitor event endpoint
- `/api/telemetry/my-location` - Visitor location summary
- `/api/telemetry/analytics` - Recent telemetry summary
