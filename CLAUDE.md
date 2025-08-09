# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Start development server**: `npm run dev`
- **Build for production**: `npm run build`
- **Build for development**: `npm run build:dev`
- **Lint code**: `npm run lint`
- **Preview build**: `npm run preview`

## Project Architecture

This is an **Interactive AI Portfolio** built as a React TypeScript application with Vite. The project showcases Yash Gori's professional profile through an innovative chat-based interface.

### Core Architecture

- **Framework**: React 18 with TypeScript, built using Vite
- **Styling**: Tailwind CSS with Shadcn/ui components
- **State Management**: TanStack Query for API calls, React hooks for local state
- **Routing**: React Router DOM with single-page application structure
- **AI Integration**: Custom API integration at `https://yashgori20-yashgori.hf.space/ask`

### Key Components Structure

- **Main Layout**: `src/pages/Index.tsx` - Central orchestrator managing all views and states
- **Chat System**: Core feature enabling AI-powered conversations about the portfolio
  - `src/hooks/useChatApi.ts` - Handles API communication with custom AI model
  - `src/components/ChatInterface.tsx` - Main chat UI component
  - `src/components/ChatInputBar.tsx` - Input handling for chat
- **Navigation**: Multi-modal navigation system supporting both desktop and mobile
  - Page-based navigation with smooth transitions
  - Sidebar navigation with collapsible states
  - Mobile-first responsive design with gesture support
- **Data Layer**: `src/data/resume.ts` - Centralized data store containing all portfolio information

### Views System

The application uses a view-based architecture with these main sections:
- **Chat**: AI-powered conversation interface
- **About**: Personal introduction and summary
- **Experience**: Professional work history
- **Projects**: Showcase of technical projects
- **Skills**: Technical and soft skills visualization
- **Contact**: Contact form and information

### Custom Hooks Architecture

The project heavily utilizes custom hooks for state management:
- `useChatApi` - AI API communication and message handling
- `usePageNavigation` - View switching and animation control
- `useMobileGestures` - Touch and gesture handling for mobile
- `useProfileCard` - Profile image modal state
- `useSidebarState` - Sidebar collapse and mobile menu states

### API Integration

The chat system connects to a Hugging Face-hosted AI model specifically trained on Yash's portfolio data. The API endpoint expects POST requests with `{"question": "user input"}` format and returns `{"answer": "AI response"}`.

### Responsive Design

- Mobile-first approach with conditional rendering based on screen size
- Gesture-based navigation for mobile devices
- Collapsible sidebar that adapts to screen size
- Touch-optimized interactions and animations

### Development Notes

- Uses absolute imports via `@/` alias for clean import paths
- Heavily leverages Shadcn/ui component library for consistent design
- Implements custom sound effects and animations for enhanced UX
- All resume data is centralized in `src/data/resume.ts` for easy updates