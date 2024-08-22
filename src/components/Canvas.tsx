import { FC, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Game } from '../models/Game';
import { Spell } from '../models/Spell';
import { store } from '../store';
import { observer } from 'mobx-react';
import { getCursorPosition } from '../assets/functions';
import PopupMenu from './PopupMenu';
import { ILocation } from '../models/Wizard';

interface IProps {
    width: number;
    height: number;
}
const CanvasComponent: FC<IProps> = observer(({ width, height }) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const contextRef = useRef<CanvasRenderingContext2D | null>(null);
    const gameRef = useRef<Game | null>(null);

    const [isLeftPopupVisible, setIsLeftPopupVisible] = useState<boolean>(false);
    const [leftPopupLocation, setLeftPopupLocation] = useState<ILocation>({ x: 0, y: 0 });

    const [isRightPopupVisible, setIsRightPopupVisible] = useState<boolean>(false);
    const [rightPopupLocation, setRightPopupLocation] = useState<ILocation>({ x: 0, y: 0 });

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
        if (canvasRef.current) {
            const mouseOverHandler = (event: MouseEvent) => {
                store.setCursorLocation(getCursorPosition(canvasRef.current, event));
            };
            const mouseDownHandler = (event: MouseEvent) => {
                let isOnWizard: boolean = false;
                gameRef.current?.wizards.forEach((wizard) => {
                    if (
                        getCursorPosition(canvasRef.current, event).x >= wizard.location.x &&
                        getCursorPosition(canvasRef.current, event).x <= wizard.location.x + 30 &&
                        getCursorPosition(canvasRef.current, event).y >= wizard.location.y &&
                        getCursorPosition(canvasRef.current, event).y <= wizard.location.y + 30
                    ) {
                        if (wizard.position === 'left') {
                            setLeftPopupLocation({
                                x: wizard.location.x + 35,
                                y: wizard.location.y,
                            });
                            setIsLeftPopupVisible(true);
                            isOnWizard = true;
                        } else {
                            setRightPopupLocation({
                                x: wizard.location.x - 145,
                                y: wizard.location.y,
                            });
                            setIsRightPopupVisible(true);
                            isOnWizard = true;
                        }
                    }
                    if (!isOnWizard) {
                        setIsRightPopupVisible(false);
                        setIsLeftPopupVisible(false);
                    }
                });
            };

            canvasRef.current.addEventListener('mousemove', mouseOverHandler);
            canvasRef.current.addEventListener('mousedown', mouseDownHandler);
            return () => {
                canvasRef.current?.removeEventListener('mousemove', mouseOverHandler);
                canvasRef.current?.removeEventListener('mousedown', mouseDownHandler);
            };
        }
    });

    return (
        <Wrapper>
            <Canvas ref={canvasRef} width={width} height={height} />
            <PopupMenu
                setIsPopupVisible={setIsLeftPopupVisible}
                wizard={store.leftWizard}
                location={leftPopupLocation}
                isVisible={isLeftPopupVisible}
            />
            <PopupMenu
                setIsPopupVisible={setIsRightPopupVisible}
                wizard={store.rightWizard}
                location={rightPopupLocation}
                isVisible={isRightPopupVisible}
            />
        </Wrapper>
    );
});
const Wrapper = styled.div`
    display: flex;
    position: relative;
    width: fit-content;
    height: fit-content;
`;
const Canvas = styled.canvas`
    border: 1px black solid;
    background-color: #ffffff;
`;

export default CanvasComponent;
