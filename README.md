# Tenzies Game

A React-based implementation of the Tenzies dice game where players compete against the computer to match all dice values in the fewest possible rolls.

## Description

Tenzies is a fast-paced dice game where the objective is to get all ten dice showing the same number. Players can lock dice between rolls to maintain their values, strategically working towards matching all dice.

## Features

- Interactive dice interface with lock/unlock functionality
- Computer opponent with randomized roll count (7-25 rolls)
- Visual feedback for locked dice
- Roll counter to track player progress
- Responsive grid layout
- Victory/loss/draw conditions

## Game Rules

1. Start the game by clicking the "Play" button
2. Roll the dice by clicking the "Roll" button
3. Click individual dice to lock them at their current value
4. Continue rolling and locking dice until all ten show the same number
5. Win by completing the sequence in fewer rolls than the computer

## Technical Implementation

### Dependencies

- React
- Lucide React (for dice icons)
- Tailwind CSS (for styling)

### Components

- `App.js` - Main game logic and UI
- `DieButton` - Individual die component (imported from components folder)

### State Management

The game uses several React hooks for state management:

- `useState` for game state, rolls, and dice values
- `useRef` for tracking selected dice and click counts
- `useEffect` for monitoring locked dice

### Key Functions

- `playGame()` - Initializes a new game
- `lockButton()` - Handles die selection and locking
- `rollDice()` - Generates new values for unlocked dice
- `finishGame()` - Resets game state and unlocks all dice

## Winning Conditions

- Player wins if they complete the sequence in fewer rolls than the computer
- Computer wins if the player uses more rolls
- Draw if both use the same number of rolls

## Styling

The game uses Tailwind CSS for styling with:

- Responsive layout
- Color transitions
- Hover effects
- Dynamic background colors for locked/unlocked states

## Getting Started

1. Install dependencies:

```bash
npm install react lucide-react
```

2. Add Tailwind CSS to your project if not already installed

3. Import the component and start playing!

## Game States

- **Home Screen**: Displays game title and play button
- **Game Screen**: Shows dice grid, roll button, and game instructions
- **Result Screen**: Displays final scores and done button
# tenzies
