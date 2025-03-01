# 🧩 Globetrotter Challenge

The ultimate travel guessing game where users get cryptic clues about famous places and must guess which destination it refers to. Once they guess, they'll unlock fun facts, trivia, and surprises about the destination!

## 🚀 Features

### 1️⃣ Dataset & AI Integration
- Rich dataset of 100+ destinations (currently includes a starter set of 10)
- Each destination includes:
  - Multiple cryptic clues
  - Fun facts revealed on correct guesses
  - Interesting trivia shown on incorrect guesses
- Designed for easy expansion using AI tools (e.g., ChatGPT, OpenAI API)

### 2️⃣ Core Game Features
- Random destination selection with multiple-choice answers
- Immediate feedback with animations:
  - 🎉 Confetti animation for correct answers
  - Fun facts revealed after each guess
- Score tracking system
- Responsive design for all devices
- Dark mode support

### 3️⃣ Social Features
- User registration with unique usernames
- "Challenge a Friend" functionality
- Share scores via WhatsApp or copy link


## 🛠️ Technical Stack

- **Frontend**: Next.js 15, React 19
- **Backend**: Next.js API Routes
- **Styling**: Tailwind CSS with shadcn/ui components
- **Data Storage**: MongoDB & file-based (easily upgradeable to a database) 
- **Animations**: canvas-confetti
- **Icons**: Lucide React

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/racky7/travel-guessing-game
cd travel-guessing-game
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables

```bash
cp .env.example .env
```
You need to set up your environment variable for MongoDB


4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser



## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the beautiful UI components
- [Lucide](https://lucide.dev/) for the icons
- [canvas-confetti](https://www.npmjs.com/package/canvas-confetti) for the celebration animations