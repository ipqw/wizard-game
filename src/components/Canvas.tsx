import { FC, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Game } from '../models/Game';
import { Spell } from '../models/Spell';

interface IProps {
    width: number;
    height: number;
}

const CanvasComponent: FC<IProps> = ({ width, height }) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const contextRef = useRef<CanvasRenderingContext2D | null>(null);
    const gameRef = useRef<Game | null>(null);

    useEffect(() => {
        contextRef.current = canvasRef.current?.getContext('2d') || null;
        gameRef.current = new Game(width, height, contextRef.current || null);
    }, [canvasRef, width, height]);

    // animating
    const isFirstTimeRef = useRef<boolean>(true);
    useEffect(() => {
        if (isFirstTimeRef.current) {
            isFirstTimeRef.current = false;
            const animate = () => {
                if (gameRef.current && contextRef.current && canvasRef.current) {
                    gameRef.current.update();
                    gameRef.current.draw();
                    requestAnimationFrame(animate);
                }
            };
            animate();
            setInterval(() => {
                gameRef.current?.wizards.forEach((wizard) => {
                    if (gameRef.current) {
                        const spell = new Spell(
                            wizard.position === 'left'
                                ? { x: wizard.location.x + 30, y: wizard.location.y }
                                : { x: wizard.location.x - 30, y: wizard.location.y },
                            wizard.position === 'left' ? 'right' : 'left',
                            wizard,
                        );
                        wizard.spells.push(spell);
                        gameRef.current.spells.push(spell);
                    }
                });
            }, 500);
        }
    }, []);

    return (
        <Wrapper>
            <Canvas ref={canvasRef} width={width} height={height} />
        </Wrapper>
    );
};
const ScoreText = styled.p`
    font-family: 'Montserrat', sans-serif;
`;
const ScoreBlock = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;
const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 30px;
    justify-content: center;
    align-items: center;
`;
const Canvas = styled.canvas`
    border: 1px black solid;
    background-color: #ffffff;
    margin-top: 100px;
`;

export default CanvasComponent;
