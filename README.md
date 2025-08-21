# RecallMind - AI-Powered Knowledge Management Tool

> Transform your digital content into actionable insights with AI-powered summarization

[![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://www.typescriptlang.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green?logo=mongodb)](https://www.mongodb.com/)
[![OpenAI](https://img.shields.io/badge/OpenAI-API-orange?logo=openai)](https://openai.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-blue?logo=tailwindcss)](https://tailwindcss.com/)

## 🚀 Overview

RecallMind is a modern knowledge management platform that helps you save, process, and organize content from multiple sources. Using advanced AI technology, it transforms YouTube videos, web articles, and text notes into structured summaries with key insights, making information retrieval and knowledge management effortless.

**🔗 Live Demo**: [Your Deployed URL Here]

## ✨ Features

### 📚 Multi-Source Content Processing
- **YouTube Videos** → Automatic transcript extraction and summarization
- **Web Articles** → Smart content parsing and key insights extraction  
- **Raw Text** → Direct text processing and analysis

### 🤖 AI-Powered Summarization
- **Key Takeaways**: 3-5 bullet points highlighting main insights
- **TL;DR**: One-line summary for quick understanding
- **Smart Tagging**: Automatic categorization for easy organization
- **Full Summary**: Comprehensive overview of content

### 🔍 Personal Knowledge Library
- **Private Workspace**: Secure, user-specific content storage
- **Search Functionality**: Find information across all your summaries
- **Content Management**: View, organize, and delete summaries
- **Source Tracking**: Direct links back to original content

### 🔐 Secure Authentication
- **User Registration & Login**: Secure account management
- **Private Libraries**: Each user has isolated, private content
- **Session Management**: Secure authentication with NextAuth.js

## 🛠 Tech Stack

**Frontend:**
- **Next.js 15** (App Router) - React framework for production
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - Modern UI components
- **Lucide Icons** - Beautiful icons

**Backend:**
- **Next.js API Routes** - Serverless backend functions
- **NextAuth.js** - Authentication and session management
- **MongoDB** - NoSQL database with Mongoose ODM

**AI Integration:**
- **Gemini 2.5-flash Via Openai SDK** - Advanced text summarization
- **Content Processors** - YouTube, article, and text parsing

**DevOps:**
- **Vercel** - Deployment and hosting
- **MongoDB Atlas** - Cloud database
- **GitHub** - Version control

## 🚦 Getting Started

### Prerequisites
- Node.js 18+
- MongoDB Atlas account
- Gemini or Openai API key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/recallmind.git
   cd recallmind
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Environment setup**
   ```bash
   cp .env.example .env.local
   ```
   
   Configure your environment variables:
   ```env
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-super-secret-key
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/recallmind
   OPENAI_API_KEY=your-openai-api-key
   ```

4. **Run development server**
   ```bash
   pnpm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## 📖 Usage

### Adding Content
1. **Sign up** or **log in** to your account
2. **Choose content type**: YouTube video, web article, or raw text
3. **Paste URL or text** and optionally add a custom title
4. **Process content** - AI will generate summary with key insights
5. **View results** in your personal library

### Managing Your Library
- **Search**: Use keywords to find specific summaries
- **Browse**: View all summaries sorted by creation date
- **Access**: Click any summary to view full details and original source
- **Delete**: Remove summaries you no longer need

## 🏗 Project Structure

```
recallmind/
├── app/                    # Next.js 15 App Router
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   ├── workspace/         # Main workspace
│   └── globals.css        # Global styles
├── components/            # Reusable UI components
│   ├── ui/               # shadcn/ui components
│   └── ...               # Custom components
├── lib/                  # Utility functions
│   ├── services/         # Content processing services
│   ├── auth.js           # NextAuth configuration
│   └── db.js            # Database connection
├── models/               # Database models
│   ├── User.js          # User schema
│   └── Summary.js       # Summary schema
└── public/              # Static assets
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/[...nextauth]` - NextAuth.js authentication

### Content Management
- `POST /api/summaries` - Create new summary
- `GET /api/summaries` - Get user's summaries (with search)
- `GET /api/summaries/[id]` - Get specific summary
- `DELETE /api/summaries/[id]` - Delete summary

### Example API Usage

**Create Summary:**
```javascript
POST /api/summaries
{
  "sourceType": "youtube",
  "input": "https://youtube.com/watch?v=example",
  "title": "Optional custom title"
}
```

**Search Summaries:**
```javascript
GET /api/summaries?search=javascript
```

## 🚀 Deployment

### Vercel (Recommended)
1. Push code to GitHub repository
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Environment Variables for Production
```env
NEXTAUTH_URL=https://your-domain.vercel.app
NEXTAUTH_SECRET=production-secret-key
MONGODB_URI=your-production-mongodb-uri
OPENAI_API_KEY=your-openai-api-key
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request


## 🙏 Acknowledgments

- [OpenAI][Gemini](https://openai.com/)(https://gemini.com/) for powerful AI capabilities
- [Next.js](https://nextjs.org/) for the amazing React framework
- [shadcn/ui](https://ui.shadcn.com/) for beautiful UI components
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling
- [Vercel](https://vercel.com/) for seamless deployment

## 📞 Support

- 📧 Email: abrar.khan.dev@gmail.com
- 💬 Issues: [GitHub Issues](https://github.com/allenryan/recallmind/issues)


---

**Built with ❤️ by Abrar Khan**

*Transform your knowledge, amplify your insights with RecallMind.*
