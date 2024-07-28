
# Cryptonite: Cryptocurrency Tracker Web Application

## Overview

Cryptonite is a web application designed to track various cryptocurrencies. It provides real-time updates on cryptocurrency prices, detailed information on individual cryptocurrencies, including historical data and market trends. The application is built using Next.js, with a focus on delivering a user-friendly experience.

## Objectives

1. Develop a user-friendly web application to track various cryptocurrencies.
2. Provide real-time updates on cryptocurrency prices.
3. Offer detailed information on individual cryptocurrencies, including historical data and market trends.

## Technologies Used

- **Frontend Framework**: Next.js
- **Styling**: CSS, Tailwind CSS, Styled-Components
- **State Management**: Redux/Redux Toolkit
- **Deployment**: Vercel

## Features

### 1. Homepage
- **Global Market Cap Chart**: Display a Line/Candle graph showing the global market cap data for cryptocurrencies.
- **Public Companies Holdings**: Display information about public companies holding Bitcoin and Ethereum.

### 2. Explore Page
- **Paginated Coin List/Grid**: Display a paginated list or grid of cryptocurrencies. Each page contains a specified number (20 items) of items with navigation to load more.
- **Navigation**: Clicking on a card routes the user to the product page of the selected cryptocurrency.

### 3. Product Page
- **Display Basic Information**: Show basic information about the selected cryptocurrency.
- **Candle/Line Graph**: Display a candle/line graph of the cryptocurrency’s price over time.

### 4. Common Header
- **Application Name**: Display the application name.
- **Search Bar**: Include a search bar that shows suggested cryptocurrencies as the user types.
- **Draggable Watchlist**: Implement a drag-and-drop functionality that allows users to easily add coins to their watchlist by dragging and dropping them.

## Running Instructions

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/priyansh2120/assignment.git
   cd assignment
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```


### Running the Application

To run the application locally:

```bash
npm run dev
```

This will start the Next.js development server. Open your browser and navigate to `http://localhost:3000/coins` to access the homepage.

### Building for Production

To build the application for production:

```bash
npm run build
```

To start the production server:

```bash
npm start
```

