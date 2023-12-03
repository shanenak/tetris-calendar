# Tetris Calendar

Visit the live site [here](https://shanenak.github.io/tetris-calendar/)!

## Task

Input: a month and a day (e.g. November 20)
Output: visually generate all possible solutions for that date. A “solution” is a tiling of all the pieces such that only the given day is uncovered.

![Task](https://ucbc29ceb74fc01b5b287a5ecd8c.previews.dropboxusercontent.com/p/thumb/ACEw7zBGCzDQMgf7QQXcLhUKZVL4xgtSqdtYwTNTSkL0Bq-PX_FoSliVmyH8KSg8UUxNdZjq4ldbAfbVnQHoIDiHeoIyq8oUtm7gEIvth6PNxalLxrAQhPCI-ZAZiSa195IGOSLLYQA03HPMB3kqRKyZqdBYQj43IDpYkj8LOpZrEHIf5e_onPc2hEyuVvg6UXMVoQNq82YRi5HdmM58f7uus0KZw812a6M2bzgPdaEBU5X-UpnA0B69cdKY9h6pvUF6S9-sRWZMcdlEIkKFkHoTM9ZOnxkZzO_88Trr75ZoMyaacV3JNyqQhCbY7vxegyLsg6hWz__NDo_T-mo23hqd_Fhw_woME1FFo6V9tO7a3ev2y03xvsvNjoLp7VWyZtJ-1dYoMb4bHftg4byS1LMH/p.png)

The original prompt is described [here](https://paper.dropbox.com/doc/Basil-Front-End-Engineer-Interview-Question-o57ODZrRicGSpizdYsU3z). Another example is provided [here](https://www.dropbox.com/scl/fi/n01ir0xexx85ub7uiuvhm/Screen-Recording-2023-09-15-at-18.08.34.mov?rlkey=iu4m56w3agfxcblhd7pfqmayx&dl=0).

## Implementation

This quick implementation was built with React.js, Redux, and JavaScript. 

Efficiently finding solutions was the main challenge and was not fully optimized within the short development time frame. Initially, I attempted with a brute force method with a calculation limit to reduce latency. This method consistently placed at least 7 of the 8 blocks in a reasonable time frame. Rather than doing a sensitivity analysis to try to improve the performance, I switched to recursion. This method requires loading time, but always results in a complete solution (all 8 pieces are placed).




