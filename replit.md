# Overview

This is an ERP (Enterprise Resource Planning) web application built as an Odoo clone, providing comprehensive business management functionality across multiple modules including CRM, Sales, Inventory, Accounting, HR, Project Management, and Manufacturing. The application follows a full-stack architecture with React frontend, Express backend, and PostgreSQL database.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React with TypeScript for type safety
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query for server state management
- **UI Components**: Radix UI primitives with shadcn/ui design system
- **Styling**: Tailwind CSS with CSS variables for theming
- **Build Tool**: Vite for fast development and optimized production builds

## Backend Architecture
- **Framework**: Express.js with TypeScript
- **API Pattern**: RESTful endpoints organized by business modules
- **Data Layer**: In-memory storage implementation with database interface abstraction
- **Development Server**: Vite integration for hot module replacement
- **Error Handling**: Centralized error middleware with structured responses

## Database Design
- **ORM**: Drizzle ORM for type-safe database operations
- **Schema**: PostgreSQL with comprehensive business entity modeling
- **Structure**: Modular schema design covering all ERP modules (users, companies, leads, opportunities, partners, products, sales orders, projects, tasks, employees, activities)
- **Migration**: Drizzle Kit for schema migrations

## Module Architecture
The application is organized into distinct business modules:
- **Dashboard**: KPI visualization and activity feeds
- **CRM**: Lead and opportunity management with pipeline views
- **Sales**: Order management and quotation system
- **Inventory**: Product and stock management
- **Accounting**: Financial records and reporting
- **HR**: Employee and attendance management
- **Project**: Task and project tracking
- **Manufacturing**: Production order management

## Component Architecture
- **Layout System**: Modular layout with sidebar navigation and top bar
- **View System**: Multiple view types (list, kanban, calendar, graph) for data presentation
- **Form Handling**: React Hook Form with Zod validation
- **Reusable Components**: Shared UI components following atomic design principles

# External Dependencies

## Core Technologies
- **Database**: PostgreSQL via Neon Database serverless connection
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Validation**: Zod schemas for runtime type validation

## UI and Styling
- **Component Library**: Radix UI primitives for accessibility
- **Design System**: shadcn/ui components with customizable themes
- **Styling**: Tailwind CSS with PostCSS processing
- **Icons**: Lucide React icon library

## Development Tools
- **Build System**: Vite with React plugin
- **Development**: Replit-specific plugins for debugging and development
- **TypeScript**: Full type checking across frontend and backend
- **Code Quality**: ESBuild for production bundling

## Runtime Dependencies
- **HTTP Client**: Built-in fetch API with custom query client
- **Session Management**: Connect-pg-simple for PostgreSQL session store
- **Date Handling**: date-fns for date manipulation
- **Form Management**: React Hook Form with Radix UI resolvers