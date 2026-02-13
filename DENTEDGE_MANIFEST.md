# DentEdge PRO: Project Manifest & Deployment Guide

This document provides a comprehensive overview of the **DentEdge** application and the exact settings needed to deploy it successfully on **Cloudflare Pages**.

## 1. Project Overview
DentEdge is a high-performance dental education platform built with React, Vite, and Tailwind CSS. It features:
- **Interactive Dashboards**: Progress tracking for FCPS, ORE, and BDS streams.
- **AI Tutor**: Integrated Gemini AI for real-time dental clinical support.
- **Vast MCQ Bank**: Thousands of parsed questions across all major dental subjects.
- **Glassmorphism UI**: A premium, modern design optimized for both desktop and mobile.

## 2. Technical Stack
- **Framework**: React 18 (TypeScript)
- **Build Tool**: Vite
- **Styling**: Tailwind CSS (with Typography & Forms plugins)
- **AI Integration**: Google Gemini API via server-side environment variables.

## 3. File Structure (Critical for Deployment)
The project is rooted in the `dentedge` folder.
```text
/dentedge
  ├── package.json         <-- Cloudflare needs this in the ROOT
  ├── vite.config.ts       <-- Build settings
  ├── index.html           <-- Entry point
  ├── App.tsx              <-- Main Application Logic
  ├── data/                <-- Study Modules (Adhesion, Amalgam, Cements, etc.)
  ├── components/          <-- UI Elements (Dashboards, Quiz, AI View)
  └── public/              <-- Static Assets (Images, Icons)
```

## 4. Cloudflare Pages Deployment Settings
To fix the "Failed to build" error, use these exact settings in the Cloudflare Dashboard:

| Setting | Value |
| :--- | :--- |
| **Framework Preset** | `Vite` |
| **Build Command** | `npm run build` |
| **Build Output Directory** | `dist` |
| **Root Directory** | `/` (or `/dentedge` if your folder is inside another) |

### Environment Variables
You MUST add this variable in `Settings > Variables` for the AI to work:
- `GEMINI_API_KEY`: [Your Google Gemini API Key]

## 5. Current Data Modules
The study modules currently built include:
- **Dental Materials**: Amalgam, GIC, Composite, Cements, Gypsum, Impression, Investment, Wax, Metals.
- **Oral Biology**: Histology & Morphology (Logic Gated).
- **Basic Sciences**: Anatomy, Physiology, Biochemistry (Structure Gated).

## 6. Maintenance Commands
- **Local Dev**: `npm run dev`
- **Final Build**: `npm run build` (Generates the `dist` folder)
