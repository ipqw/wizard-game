import { Game } from './Game';

interface IPosition {
    x: number;
    y: number;
}

export class Wizard {
    public speed: number = 1;
    public location: IPosition = { x: 0, y: 0 };
    public position: 'left' | 'right';
    public direction: 'up' | 'down';
    public game: Game;

    constructor(position: 'left' | 'right', game: Game) {
        this.location =
            position === 'left' ? { x: 50, y: 50 } : { x: game.width - 80, y: game.height - 80 };
        this.position = position;
        this.direction = position === 'left' ? 'down' : 'up';
        this.game = game;
    }

    update = () => {
        if (this.direction === 'up') {
            if (this.location.y <= 0) {
                this.direction = 'down';
            }
            this.location.y -= this.speed;
        } else {
            if (this.location.y >= this.game.height - 30) {
                this.direction = 'up';
            }
            this.location.y += this.speed;
        }
    };

    draw = (context: CanvasRenderingContext2D) => {
        context.roundRect(this.location.x, this.location.y, 30, 30, 100);
        context.fillStyle = 'red';
        context.fill();
    };
}
