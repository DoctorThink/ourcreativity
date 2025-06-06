

# OUR CREATIVITY

**Dimana imajinasi bertemu dengan inovasi. Bergabunglah dengan komunitas kreatif kami.** [1](#0-0) 

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18.3.1-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4.18-646CFF.svg)](https://vitejs.dev/)
[![Supabase](https://img.shields.io/badge/Supabase-2.49.4-3ECF8E.svg)](https://supabase.com/)

## Table of Contents

- [About The Project](#about-the-project)
- [Key Features](#key-features)
- [Built With](#built-with)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Project](#running-the-project)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Database Schema](#database-schema)
- [Documentation Hub](#documentation-hub)
- [Community Integration](#community-integration)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)
- [Acknowledgements](#acknowledgements)

## About The Project

OUR CREATIVITY is a modern web-based creative community platform designed for young Indonesian creators. [2](#0-1)  The platform serves as a collaborative space where imagination meets innovation, connecting over 1000+ creative individuals across various disciplines.

The project began in early 2022 with a small group of 5 passionate students who recognized the need for a dedicated space where young talents could explore, develop, and collaborate on creative projects. [2](#0-1) 

### 🎯 **Mission**
To provide a comprehensive digital ecosystem where creative minds can connect, collaborate, and showcase their work while building a supportive community.

## Key Features

- **🎨 Creative Portfolio Showcase** - Display and discover creative works from community members
- **📢 Community Announcements** - Stay updated with latest news and events
- **👥 Team Management** - Meet the team behind the platform and community leaders
- **🔐 Admin Dashboard** - Comprehensive content management system for administrators [3](#0-2) 
- **💬 Multi-Platform Integration** - Seamless integration with WhatsApp groups and Linktree [4](#0-3) 
- **🌙 Dark/Light Theme Support** - Adaptive theming with smooth transitions
- **📱 Responsive Design** - Optimized for all device sizes with modern UI components
- **⚡ Real-time Updates** - Live content updates using Supabase real-time subscriptions

## Built With

### Frontend Technologies
- **React 18.3.1** - Modern React with hooks and concurrent features [5](#0-4) 
- **TypeScript 5.5.3** - Type-safe development [6](#0-5) 
- **Vite** - Next-generation build tool for faster development [7](#0-6) 
- **Tailwind CSS** - Utility-first CSS framework [8](#0-7) 

### UI/UX Framework
- **shadcn/ui** - Modern, accessible React components [9](#0-8) 
- **Framer Motion** - Production-ready motion library for React [10](#0-9) 
- **Lucide React** - Beautiful, customizable SVG icons [11](#0-10) 

### Backend & Database
- **Supabase** - Open-source Firebase alternative with PostgreSQL [12](#0-11) 
- **TanStack Query** - Data fetching and caching library [13](#0-12) 

### Development Tools
- **ESLint** - Code linting and formatting [14](#0-13) 
- **PostCSS** - CSS transformation tool [15](#0-14) 

## Getting Started

### Prerequisites

Before running this project, ensure you have the following installed:

- **Node.js** v18.0.0 or higher
- **npm** v8.0.0 or higher
- **Git** for version control

Check your versions:
```bash
node --version
npm --version
git --version
```

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/DoctorThink/ourcreativity.git
   cd ourcreativity
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Configure your Supabase credentials in `.env.local`:
   ```
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Set up Supabase (if running locally)**
   ```bash
   npx supabase start
   ```

### Running the Project

1. **Development mode**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173` [16](#0-15) 

2. **Build for production**
   ```bash
   npm run build
   ```

3. **Preview production build**
   ```bash
   npm run preview
   ```

## Usage

### For Community Members

1. **Browse Creative Works** - Visit the "Karya Kami" section to explore community creations
2. **Join Community Groups** - Click "AYO GABUNG!" to access WhatsApp groups and Linktree [17](#0-16) 
3. **Stay Updated** - Check announcements for latest community news
4. **Learn About Us** - Explore our brand story and team information

### For Administrators

1. **Admin Login** - Access `/admin-login` for administrative functions [18](#0-17) 
2. **Content Management** - Use the admin dashboard to manage announcements, works, and community content
3. **Protected Routes** - All admin functions are secured with authentication [3](#0-2) 

## Project Structure

```
ourcreativity/
├── public/                     # Static assets
├── src/
│   ├── components/            # Reusable UI components
│   │   ├── ui/               # shadcn/ui components
│   │   ├── layouts/          # Page layout components
│   │   ├── admin/            # Admin-specific components
│   │   └── karya/            # Creative works components
│   ├── contexts/             # React contexts (Theme, Auth)
│   ├── hooks/                # Custom React hooks
│   ├── integrations/         # Third-party integrations
│   │   └── supabase/        # Supabase client and types
│   ├── lib/                  # Utility functions
│   ├── models/               # Data models and types
│   ├── pages/                # Route components
│   ├── services/             # API services
│   └── types/                # TypeScript type definitions
├── supabase/                  # Supabase configuration
└── README.md
``` [19](#0-18) 

## Database Schema

The application uses Supabase with PostgreSQL database configured with the following key settings: [20](#0-19) 

- **Database Port**: 54322
- **API Port**: 54321 
- **Studio Port**: 54323
- **Real-time subscriptions** enabled for live updates [21](#0-20) 

Key tables include:
- `karya` - Creative works and portfolios
- `announcements` - Community announcements
- `admin_activity_log` - Administrative activity tracking

## Documentation Hub

- **Component Documentation** - View component APIs and examples in `/src/components`
- **Type Definitions** - Comprehensive TypeScript types in `/src/types`
- **Integration Guides** - Supabase integration patterns in `/src/integrations`

## Community Integration

### WhatsApp Groups
The platform integrates with multiple specialized WhatsApp groups: [4](#0-3) 

- **O.C Kartul** - Creative discussions and tutorials
- **O.C Community** - General community chat
- **O.C Meme** - Lighter community content and memes

### Social Media Hub
- **Linktree Integration** - Centralized access to all social media platforms at `https://linktr.ee/ourcreativity.ofc` [22](#0-21) 

## Contributing

We welcome contributions from the community! Here's how you can help:

1. **Fork the Project**
2. **Create your Feature Branch** (`git checkout -b feature/AmazingFeature`)
3. **Commit your Changes** (`git commit -m 'Add some AmazingFeature'`)
4. **Push to the Branch** (`git push origin feature/AmazingFeature`)
5. **Open a Pull Request**

### Coding Standards
- Follow TypeScript best practices
- Use ESLint configuration provided [23](#0-22) 
- Maintain component structure with proper props typing
- Follow existing naming conventions

## License

This project is distributed under the MIT License. See `LICENSE` file for more information.

## Contact

**OUR CREATIVITY Team**
- **Website**: [Project Repository](https://github.com/DoctorThink/ourcreativity)
- **Community**: [Linktree](https://linktr.ee/ourcreativity.ofc)
- **Designer**: [@ardel.yo](https://bit.ly/Ardelyo) [24](#0-23) 

## Acknowledgements

- **shadcn/ui** for the beautiful component library
- **Framer Motion** for smooth animations and transitions
- **Supabase** for providing the backend infrastructure
- **Tailwind CSS** for the utility-first styling approach
- **Radix UI** for accessible component primitives [9](#0-8) 
- **React Community** for the amazing ecosystem and tools

---

**© 2024 OUR CREATIVITY** - Dimana imajinasi bertemu dengan inovasi ✨ [25](#0-24) 

## Notes

This README is based on the actual codebase analysis of the OUR CREATIVITY project. The application is primarily designed for Indonesian-speaking creative communities, featuring a modern React-based architecture with Supabase backend integration. The platform emphasizes community building through multiple WhatsApp groups and social media integration while providing a sophisticated admin dashboard for content management.

The project demonstrates modern web development practices with TypeScript, component-based architecture, and real-time data synchronization. The use of Framer Motion and custom animations creates an engaging user experience suitable for a creative community platform.
