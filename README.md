# Introduction

A small space shooter for the web using Pixi.js

# About the game

The game features the followign elements

## 1: Splash screen
Bitmap, shown for 2 seconds, then fades out and the application continues to the main screen.

## 2: Main screen
elements:
- background (bitmap, some kind of animation to make the view more interesting)
- logo (bitmap)
- under the logo, 4 buttons placed from top to bottom (bitmaps, for handling states): GAME1, GAME2, GAME3 and EXIT
Clicking the EXIT button navigates somewhere, clicking any of the GAME buttons takes the user to the game area.

## 3: Game
A simple side scroller shoot’em up game with space ships.
- The space ship can be moved around on the game area, and it can shoot rockets.
- The game’s background moves from right to left, with parallax scrolling (the background is made up of two graphical layers, the farther layer moves slower).
- Every 2 seconds, an enemy space ship arrives from the front. The enemy space ships move randomly.
- If the projectile of the player space ship hits an enemy space ship, the enemy ship blows up and disappears (emitting 10 or more particles, where the particles can be any graphical element).
- If the space ship collides with an enemy object, it blows up (like the enemy space ships), the game indicates that it’s over, then it goes back to the main menu.
