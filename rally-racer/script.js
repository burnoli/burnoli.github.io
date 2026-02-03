class RallyGame {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.isPlaying = false;
        
        // Set canvas size
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());
        
        // Initialize controls
        this.setupControls();
        this.setupFullscreen();
    }

    resizeCanvas() {
        this.canvas.width = this.canvas.offsetWidth;
        this.canvas.height = this.canvas.offsetHeight;
    }

    setupControls() {
        // Handle keyboard controls
        document.addEventListener('keydown', (e) => {
            if (!this.isPlaying) return;
            
            switch(e.key) {
                case 'ArrowUp':
                    // Accelerate
                    break;
                case 'ArrowDown':
                    // Brake
                    break;
                case 'ArrowLeft':
                    // Turn left
                    break;
                case 'ArrowRight':
                    // Turn right
                    break;
            }
        });
    }

    setupFullscreen() {
        const fullscreenBtn = document.getElementById('fullscreenBtn');
        const gameContainer = document.getElementById('game-container');
        const gameIframe = document.getElementById('gameIframe');

        fullscreenBtn.addEventListener('click', () => {
            if (!document.fullscreenElement) {
                gameContainer.requestFullscreen().catch(err => {
                    console.error(`Error attempting to enable fullscreen: ${err.message}`);
                });
            } else {
                document.exitFullscreen();
            }
        });

        document.addEventListener('fullscreenchange', () => {
            if (document.fullscreenElement) {
                gameContainer.style.width = '100vw';
                gameContainer.style.height = '100vh';
                gameContainer.style.margin = '0';
                gameContainer.style.padding = '0';
                gameContainer.style.borderRadius = '0';
                
                if (gameIframe.style.display === 'block') {
                    gameIframe.style.height = '100vh';
                }
            } else {
                gameContainer.style = '';
                gameIframe.style.height = '600px';
            }
            this.resizeCanvas();
        });
    }

    startGame() {
        this.isPlaying = true;
        this.gameLoop();
    }

    gameLoop() {
        if (!this.isPlaying) return;

        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw game elements here
        this.drawGame();

        // Continue game loop
        requestAnimationFrame(() => this.gameLoop());
    }

    drawGame() {
        // Example: Draw a simple car placeholder
        this.ctx.fillStyle = '#ff6b6b';
        this.ctx.fillRect(this.canvas.width/2 - 25, this.canvas.height/2 - 15, 50, 30);
    }
}

// Initialize game when window loads
window.addEventListener('load', () => {
    const game = new RallyGame();
}); 