import { FC, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Game } from '../models/Game';
import { Spell } from '../models/Spell';
import { store } from '../store';
import { observer } from 'mobx-react';

interface IProps {
    width: number;
    height: number;
}
// ПРОДУМАТЬ ЛОГИКУ ЧАСТОТы КАСТОВ
const CanvasComponent: FC<IProps> = observer(({ width, height }) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const contextRef = useRef<CanvasRenderingContext2D | null>(null);
    const gameRef = useRef<Game | null>(null);

    useEffect(() => {
        contextRef.current = canvasRef.current?.getContext('2d') || null;
        gameRef.current = new Game(width, height, contextRef.current || null);
    }, [canvasRef, width, height]);

    // animating
    const isFirstTimeRef = useRef<boolean>(true);

    const castFrequencyToTime = (castFrequency: number): number => {
        if (castFrequency > 1.6) {
            return 200;
        } else if (castFrequency > 1.2) {
            return 400;
        } else if (castFrequency > 0.8) {
            return 600;
        } else if (castFrequency > 0.4) {
            return 800;
        } else {
            return 1000;
        }
    };

    const wizardCast = (wizardPosition: 'left' | 'right') => {
        const wizard = wizardPosition === 'left' ? store.leftWizard : store.rightWizard;
        if (gameRef.current && wizard) {
            setTimeout(() => {
                const spell = new Spell(
                    wizard.position === 'left'
                        ? { x: wizard.location.x + 30, y: wizard.location.y }
                        : { x: wizard.location.x - 30, y: wizard.location.y },
                    wizard.position === 'left' ? 'right' : 'left',
                    wizard,
                );
                wizard.spells.push(spell);
                gameRef.current?.spells.push(spell);
                wizardCast(wizardPosition);
            }, castFrequencyToTime(wizard.castFrequency));
        }
    };

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
            wizardCast('left');
            wizardCast('right');
        }
    });

    return (
        <Wrapper>
            <Canvas ref={canvasRef} width={width} height={height} />
        </Wrapper>
    );
});
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
`;

export default CanvasComponent;
