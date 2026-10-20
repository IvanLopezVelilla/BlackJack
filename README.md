# Blackjack

A browser-based Blackjack game built with JavaScript, PHP, and MySQL/MariaDB. Players can place virtual bets, play against the dealer, create an account, and compare their balance on the leaderboard.

> This project is for educational and portfolio purposes. It does not involve real money.

## Features

- Play Blackjack against an automated dealer.
- Place virtual bets using the available bet controls.
- Create an account, sign in, and sign out.
- Track account balances and view a player leaderboard.
- Draw cards from the [Deck of Cards API](https://deckofcardsapi.com/), with a locally generated deck as a fallback.

## Built with

- **Frontend:** HTML, CSS, JavaScript, Bootstrap
- **Backend:** PHP
- **Database:** MySQL or MariaDB, accessed with PDO
- **External service:** Deck of Cards API

## Getting started

### Requirements

- Apache with PHP
- PHP extensions: **PDO MySQL** and **cURL**
- MySQL or MariaDB
- A browser

### 1. Place the project in your web server's document root

For example, with XAMPP:
<xampp-installation>/htdocs/blackjack

Start Apache and MySQL from the XAMPP control panel.

### 2. Create the database and table

Run this SQL in MySQL or MariaDB:

CREATE DATABASE blackJack
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE blackJack;

CREATE TABLE users (
    users_id INT AUTO_INCREMENT PRIMARY KEY,
    nickname VARCHAR(30) UNIQUE NOT NULL,
    email VARCHAR(30) UNIQUE NOT NULL,
    money INT,
    hash VARCHAR(300)
);

### 3. Configure the database connection

The database connection is initialized in `backend/ajax/models.php`. Update the host, port, database name, and credentials to match your local MySQL/MariaDB setup.

Do not commit real database credentials. For a production deployment, load them from environment variables or another secret-management mechanism.

### 4. Open the game

Visit:
http://localhost/blackjack/

If you placed the project in a differently named folder, replace `blackjack` in the URL with that folder name.

## Project structure
.
├── assets/
│   ├── css/
│   │   ├── bj.css            # Game interface styles
│   │   └── lg.css            # Authentication views styles
│   └── js/
│       ├── blackJack.js      # Game client logic & API handlers
│       └── login.js          # Authentication request handlers
├── backend/
│   ├── ajax/                 # API endpoints
│   │   ├── api.php
│   │   ├── bet.php
│   │   ├── drawCard.php
│   │   ├── getBestPlayers.php
│   │   ├── getCurrentDecks.php
│   │   ├── getCurrentMoney.php
│   │   ├── getLoggedUser.php
│   │   ├── getTotalDeckValues.php
│   │   ├── login.php
│   │   ├── logout.php
│   │   ├── models.php
│   │   ├── newDecks.php
│   │   ├── newGame.php
│   │   ├── register.php
│   │   └── updateMoney.php
│   └── db.php                # Database connection wrapper
├── index.html                # Main game interface
├── login.html                # Login view
├── register.html             # Registration view
└── README.md                 # Project documentation

## Notes

- Player balances are virtual and stored in the database for registered users.
- The game uses PHP sessions to keep track of the current game state.
- The Deck of Cards API requires an internet connection. The backend includes a local deck fallback when the API request fails.

## Before production deployment

This project is a learning and portfolio project, not a production-ready service. Before deploying it publicly:

- Move database credentials out of source code.
- Review input validation, authentication, session handling, and error responses.
- Use HTTPS and appropriate security headers.

## Possible next steps

- Add automated tests for game logic and backend endpoints.
- Separate application configuration from the PHP source code.
- Improve accessibility and add responsive UI tests.
- Document the game rules and add screenshots or a short gameplay recording.

## License

Add a license before redistributing or accepting contributions. If you choose an open-source license, include its text in a `LICENSE` file.

## Author

**Iván López**  
[GitHub](https://github.com/IvanLopezVelilla) · [LinkedIn](https://www.linkedin.com/in/iv%C3%A1n-l%C3%B3pez-fern%C3%A1ndez-30b994415/?isSelfProfile=true)
