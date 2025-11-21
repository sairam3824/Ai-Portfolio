# Private Profile Page

## Overview
A password-protected profile page designed specifically for interviewers to view comprehensive information about the candidate.

## Access
- **URL**: `/profile`
- **Default Password**: `interview2025`
- **Authentication**: Session-based (persists until browser is closed)

## Features

### 1. Coding Profiles Section (Default)
- Displays all coding platform profiles with stats
- LeetCode (2150+ Rating, Guardian Badge)
- CodeChef (3 Star, 1600+ Rating)
- InterviewBit, TakeUForward, Codolio
- Key achievements and statistics

### 2. Resume Section
- View resume in browser
- Download resume as PDF
- Resume highlights summary

### 3. Projects Section
- Complete list of AI/ML projects
- Project descriptions and tech stacks
- Links to GitHub repositories and live demos

### 4. About Section
- Personal introduction
- Professional background
- Social and coding profile links

### 5. Skills Section
- Comprehensive technical skills
- AI/ML frameworks and tools
- Programming languages and technologies

### 6. Education Section
- Academic background
- Degrees and certifications
- Relevant coursework

## Security
- Password protection
- Session-based authentication
- Logout functionality
- Redirects to home on unauthorized access

## Customization
To change the password, edit the `PROFILE_PASSWORD` constant in `ProfilePage.tsx`:
```typescript
const PROFILE_PASSWORD = "your_new_password";
```

## Usage
Share the URL `/profile` and password with interviewers to give them complete access to your professional profile.
