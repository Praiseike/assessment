# E-Commerce Loyalty Program

A full-stack loyalty program application built with Laravel 11 (Backend) and React TypeScript (Frontend).

## System Requirements

- **PHP**: 8.2 or higher
- **Node.js**: 22.x or higher
- **Composer**: Latest version
- **Database**: SQLite (default) or MySQL/PostgreSQL
- **Operating System**: Linux/macOS/Windows (with appropriate package managers)

## Pre-Installation Setup

### For Ubuntu/Debian Users

```bash
# Update package manager
sudo apt update

# Install PHP 8.2 and required extensions
sudo apt install software-properties-common
sudo add-apt-repository ppa:ondrej/php
sudo apt update
sudo apt install php8.2 php8.2-cli php8.2-fpm php8.2-mbstring php8.2-xml php8.2-bcmath php8.2-tokenizer php8.2-json php8.2-curl php8.2-zip php8.2-sqlite3 php8.2-mysql libapache2-mod-php8.2

# Install Composer
curl -sS https://getcomposer.org/installer | php
sudo mv composer.phar /usr/local/bin/composer

# Verify installations
php --version
composer --version
```

### For macOS Users

```bash
# Install Homebrew (if not already installed)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install PHP 8.2
brew install php@8.2
brew link php@8.2 --force

# Install Composer
brew install composer

# Install Node.js 22
brew install node@22
brew link node@22 --force

# Verify installations
php --version
composer --version
node --version
npm --version
```

### For Windows Users

1. **Install PHP 8.2:**
   - Download from [php.net](https://windows.php.net/download/)
   - Extract to `C:\php`
   - Add `C:\php` to your system PATH
   - Enable required extensions in `php.ini`:
     ```ini
     extension=mbstring
     extension=openssl
     extension=pdo_sqlite
     extension=sqlite3
     extension=curl
     extension=fileinfo
     ```

2. **Install Composer:**
   - Download from [getcomposer.org](https://getcomposer.org/download/)
   - Run the installer

3. **Install Node.js 22:**
   - Download from [nodejs.org](https://nodejs.org/)
   - Install the LTS version

## Installation Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/Praiseike/assessment.git
cd assessment
```

### 2. Backend Setup (Laravel)

```bash
# Navigate to backend directory
cd backend

# Install PHP dependencies
composer install

# Create environment file
cp .env.example .env

# Generate application key
php artisan key:generate

# Run database migrations
php artisan migrate

# Seed the database with sample data
php artisan db:seed

# Start the Laravel development server
php artisan serve
```

The backend server will be available at: `http://localhost:8000`

### 3. Frontend Setup (React)

**Open a new terminal window/tab and run:**

```bash
# Navigate to frontend directory (from project root)
cd frontend

# Install Node.js dependencies
npm install

# Start the React development server
npm run dev
```

The frontend application will be available at: `http://localhost:5173`

## Verification Steps

### 1. Check Backend API
Visit `http://localhost:8000/api/users/1/achievements` in your browser. You should see:
```json
{
  "success": true,
  "data": {
    "unlocked_achievements": [],
    "next_available_achievements": ["First Purchase"],
    "current_badge": null,
    "next_badge": "Newcomer",
    "remaining_to_unlock_next_badge": 1
  }
}
```

### 2. Check Frontend Application
Visit `http://localhost:5173` and you should see the customer dashboard.

### 3. Test the System
- Click "Simulate Purchase" button in the dashboard
- Watch achievements unlock in real-time
- Verify badge progression and cashback notifications

## Troubleshooting

### Common Issues and Solutions

**PHP Version Issues:**
```bash
# Check current PHP version
php --version

# If wrong version, update alternatives (Ubuntu/Debian)
sudo update-alternatives --install /usr/bin/php php /usr/bin/php8.2 82
sudo update-alternatives --config php
```

**Composer Issues:**
```bash
# Clear Composer cache
composer clear-cache

# Update Composer to latest version
composer self-update
```

**Laravel Issues:**
```bash
# Clear application cache
php artisan cache:clear
php artisan config:clear
php artisan route:clear

# Regenerate autoload files
composer dump-autoload
```

**Node.js Issues:**
```bash
# Check Node.js version
node --version

# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Database Issues:**
```bash
# Recreate database (SQLite)
rm database/database.sqlite
touch database/database.sqlite
php artisan migrate:fresh --seed
```

**Port Conflicts:**
- If port 8000 is in use: `php artisan serve --port=8001`
- If port 5173 is in use: `npm run dev -- --port 3000`

## Environment Configuration

### Backend (.env file)
```env
APP_NAME="E-Commerce Loyalty Program"
APP_ENV=local
APP_KEY=base64:YOUR_GENERATED_KEY
APP_DEBUG=true
APP_URL=http://localhost:8000

DB_CONNECTION=sqlite
DB_DATABASE=/absolute/path/to/your/project/backend/database/database.sqlite

# For MySQL (optional)
# DB_CONNECTION=mysql
# DB_HOST=127.0.0.1
# DB_PORT=3306
# DB_DATABASE=loyalty_program
# DB_USERNAME=your_username
# DB_PASSWORD=your_password
```

### Frontend Configuration
The frontend is configured to connect to `http://localhost:8000` by default. If you change the backend port, update the API base URL in your frontend configuration.

## Development Workflow

1. **Backend Development:**
   ```bash
   cd backend
   php artisan serve --port=8000
   ```

2. **Frontend Development:**
   ```bash
   cd frontend
   npm run dev
   ```

3. **Database Management:**
   ```bash
   # Reset database
   php artisan migrate:fresh --seed
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

| Achievement         | Requirement    | Badge Unlocked   |
| ------------------- | -------------- | ---------------- |
| First Purchase      | 1 purchase     | Newcomer         |
| Shopping Enthusiast | 5 purchases    | -                |
| Big Spender         | ₦10,000 spent  | Silver Shopper   |
| Loyal Customer      | 10 purchases   | -                |
| Premium Shopper     | ₦50,000 spent  | Gold Shopper     |
| VIP Customer        | 25 purchases   | -                |
| Elite Shopper       | ₦100,000 spent | Platinum Shopper |
| Champion Buyer      | 50 purchases   | Diamond Shopper  |

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

## Need Help?

If you encounter any issues:

1. Check the troubleshooting section above
2. Ensure all system requirements are met
3. Verify that both servers are running on the correct ports
4. Check the browser console and terminal for error messages