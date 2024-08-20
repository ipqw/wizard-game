import { FC, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Game } from '../models/Game';

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

    useEffect(() => {
        const animate = () => {
            if (gameRef.current && contextRef.current && canvasRef.current) {
                contextRef.current.closePath();
                contextRef.current.beginPath();
                gameRef.current.update();
                gameRef.current.draw();
                requestAnimationFrame(animate);
            }
        };
        animate();
    }, []);

    return <Canvas ref={canvasRef} width={width} height={height}></Canvas>;
};

const Canvas = styled.canvas`
    border: 1px black solid;
    background-color: #ffffff;
    margin-top: 100px;
`;

export default CanvasComponent;
