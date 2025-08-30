# E-Commerce Loyalty Program

A full-stack loyalty program application built with Laravel 11 (Backend) and React TypeScript (Frontend).

## Installation requirements
NodeJS >=22
php8.2
composer

## Features

- Achievement system with automatic unlocking
- Badge progression system
- Automatic cashback rewards (300 Naira per badge unlock)
- Customer dashboard with progress tracking
- Real-time achievement progress
- Responsive design with Tailwind CSS

## Tech Stack

**Backend:**
- Laravel 11
- MySQL/PostgreSQL
- Event-driven architecture

**Frontend:**
- React 18 with TypeScript
- Tailwind CSS
- shadcn/ui components
- Lucide React icons

## Setup Instructions

### Backend Setup (Laravel)

1. **Clone and install dependencies:**
```bash
git clone https://github.com/Praiseike/assessment.git
cd backend
composer install
```

2. **Environment setup:**
```bash
cp .env.example .env
php artisan key:generate
```

3. **Database configuration:**
Uses sqlite database by default


4. **Run migrations and seed data:**
```bash
php artisan migrate
php artisan db:seed
```

5. **Start the development server:**
```bash
php artisan serve
# Server will run on http://localhost:8000
```

### Frontend Setup (React)

1. **Navigate to frontend directory:**
```bash
cd frontend
```

2. **Install dependencies:**
```bash
npm install
# or
yarn install
```

4. **Start the development server:**
```bash
npm run dev
# or
yarn dev
# Server will run on http://localhost:5173
```

## File Structure

### Backend Files

```
app/
├── Models/
│   ├── Achievement.php
│   ├── Purchase.php
│   └── User.php 
├── Http/Controllers/Api/
│   └── AchievementController.php
├── Services/
│   ├── AchievementService.php
│   └── PaymentService.php
├── Events/
│   ├── AchievementUnlocked.php
│   └── BadgeUnlocked.php
└── Listeners/
    └── ProcessBadgeCashback.php

database/
├── migrations/
│   ├── create_achievements_table.php
│   ├── create_user_achievements_table.php
│   └── create_purchases_table.php
└── seeders/
    └── AchievementSeeder.php

routes/
└── api.php 
```

### Frontend Files

```
src/
├── components/
│   └──dashboard
│       └── CustomerDashboard.tsx
└── components/ui/ (shadcn components)
    ├── card.tsx
    ├── button.tsx
    ├── badge.tsx
    └── progress.tsx
```

## API Endpoints

### Get User Achievements
```
GET /api/users/{user}/achievements
```

Response:
```json
{
  "success": true,
  "data": {
    "unlocked_achievements": ["First Purchase", "Shopping Enthusiast"],
    "next_available_achievements": ["Big Spender", "Loyal Customer"],
    "current_badge": "Newcomer",
    "next_badge": "Silver Shopper",
    "remaining_to_unlock_next_badge": 3
  }
}
```

## Achievement Configuration

The system comes pre-configured with these achievements:

| Achievement | Requirement | Badge Unlocked |
|-------------|-------------|----------------|
| First Purchase | 1 purchase | Newcomer |
| Shopping Enthusiast | 5 purchases | - |
| Big Spender | ₦10,000 spent | Silver Shopper |
| Loyal Customer | 10 purchases | - |
| Premium Shopper | ₦50,000 spent | Gold Shopper |
| VIP Customer | 25 purchases | - |
| Elite Shopper | ₦100,000 spent | Platinum Shopper |
| Champion Buyer | 50 purchases | Diamond Shopper |

## Key Features Explained

### Event-Driven Architecture
- When purchases are made, the system automatically checks for new achievements
- Achievement unlocks trigger `AchievementUnlocked` events
- Badge unlocks trigger `BadgeUnlocked` events with automatic 300 Naira cashback

### Cashback System
- Every badge unlock triggers a 300 Naira cashback payment
- Uses a mock payment service (logs transactions)
- Can be easily integrated with real payment providers

### Achievement Logic
- Supports both purchase count and spending amount requirements
- Flexible achievement criteria system
- Automatic progress tracking

## Testing

1. **Access the dashboard:**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:8000/api

2. **Test user credentials:**
   - User ID: 1 (Test User)
   - Email: test@example.com

3. **Simulate purchases:**
   - Use the "Simulate Purchase" button in the dashboard
   - Each simulation creates a random purchase and checks for achievements