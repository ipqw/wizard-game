import { store } from '../store';
import { Game } from './Game';
import { Spell } from './Spell';

export interface IPosition {
    x: number;
    y: number;
}

export class Wizard {
    speed: number = 1;
    location: IPosition;
    position: 'left' | 'right';
    direction: 'up' | 'down';
    game: Game;
    spells: Spell[] = [];
    context: CanvasRenderingContext2D | null;
    hits: number = 0;
    castFrequency: number = 0.5;

    constructor(position: 'left' | 'right', game: Game, context: CanvasRenderingContext2D | null) {
        this.location =
            position === 'left' ? { x: 50, y: 50 } : { x: game.width - 80, y: game.height - 80 };
        this.position = position;
        this.direction = position === 'left' ? 'down' : 'up';
        this.game = game;
        this.context = context;
    }

    update = () => {
        if (this.direction === 'up') {
            if (this.location.y <= 0) {
                this.direction = 'down';
            }
            if (
                store.cursorLocation.y >= this.location.y - 1 &&
                store.cursorLocation.y <= this.location.y + 1 &&
                store.cursorLocation.x >= this.location.x &&
                store.cursorLocation.x <= this.location.x + 30
            ) {
                this.direction = 'down';
            }
            this.location.y -= this.speed;
        } else {
            if (this.location.y >= this.game.height - 30) {
                this.direction = 'up';
            }
            if (
                store.cursorLocation.y >= this.location.y + 29 &&
                store.cursorLocation.y <= this.location.y + 31 &&
                store.cursorLocation.x >= this.location.x &&
                store.cursorLocation.x <= this.location.x + 30
            ) {
                this.direction = 'up';
            }
            this.location.y += this.speed;
        }
        this.spells.forEach((spell) => {
            if (this.context) {
                spell.update();
            }
        });
    };

    draw = (context: CanvasRenderingContext2D) => {
        context.beginPath();
        context.roundRect(this.location.x, this.location.y, 30, 30, 100);
        context.fillStyle = 'red';
        context.fill();
        context.closePath();
        this.spells.forEach((spell) => {
            if (this.context) {
                spell.draw(this.context);
            }
        });
    };
    setSpeed = (value: number) => {
        this.speed = value;
    };
    setCastFrequency = (value: number) => {
        this.castFrequency = value;
    };
}
