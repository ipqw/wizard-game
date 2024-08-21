import styled from 'styled-components';
import Canvas from './components/Canvas';
import { store } from './store';
import { observer } from 'mobx-react';
import { useEffect, useState } from 'react';

const App = observer(() => {
    // speed states
    const [leftSpeedRangeValue, setLeftSpeedRangeValue] = useState<number>(50);
    useEffect(() => {
        store.leftWizard?.setSpeed(leftSpeedRangeValue / 50);
    }, [leftSpeedRangeValue]);
    const [rightSpeedRangeValue, setRightSpeedRangeValue] = useState<number>(50);
    useEffect(() => {
        store.rightWizard?.setSpeed(rightSpeedRangeValue / 50);
    }, [rightSpeedRangeValue]);

    // frequency states
    const [leftFrequencyRangeValue, setLeftFrequencyRangeValue] = useState<number>(50);
    useEffect(() => {
        store.leftWizard?.setCastFrequency(leftFrequencyRangeValue / 50);
    }, [leftFrequencyRangeValue]);

    const [rightFrequencyRangeValue, setRightFrequencyRangeValue] = useState<number>(50);
    useEffect(() => {
        store.rightWizard?.setCastFrequency(rightFrequencyRangeValue / 50);
    }, [rightFrequencyRangeValue]);
    return (
        <Wrapper>
            <ScoreBlock>
                <ScoreText>
                    {store.leftWizardHits} {store.leftWizardHits <= 1 ? 'hit' : 'hits'}
                </ScoreText>
                <ScoreText>|</ScoreText>
                <ScoreText>
                    {store.rightWizardHits} {store.rightWizardHits <= 1 ? 'hit' : 'hits'}
                </ScoreText>
            </ScoreBlock>

            <CanvasBlock>
                <StyledRange
                    type="range"
                    style={{ writingMode: 'vertical-lr', direction: 'rtl' }}
                    value={leftFrequencyRangeValue}
                    $speed
                    onChange={(e) => {
                        setLeftFrequencyRangeValue(Number(e.target.value));
                    }}
                />
                <StyledRange
                    type="range"
                    style={{ writingMode: 'vertical-lr', direction: 'rtl' }}
                    value={leftSpeedRangeValue}
                    onChange={(e) => {
                        setLeftSpeedRangeValue(Number(e.target.value));
                    }}
                />
                <CanvasWrapper>
                    <Canvas width={900} height={500} />
                </CanvasWrapper>
                <StyledRange
                    type="range"
                    style={{ writingMode: 'vertical-lr', direction: 'rtl' }}
                    value={rightSpeedRangeValue}
                    onChange={(e) => {
                        setRightSpeedRangeValue(Number(e.target.value));
                    }}
                />
                <StyledRange
                    type="range"
                    style={{ writingMode: 'vertical-lr', direction: 'rtl' }}
                    value={rightFrequencyRangeValue}
                    onChange={(e) => {
                        setRightFrequencyRangeValue(Number(e.target.value));
                    }}
                    $speed
                />
            </CanvasBlock>
        </Wrapper>
    );
});
const StyledRange = styled.input<{ $speed?: boolean }>`
    accent-color: ${({ $speed }) => ($speed ? 'blue' : 'red')};
`;
const CanvasWrapper = styled.div`
    display: flex;
    width: fit-content;
    height: fit-content;
`;
const CanvasBlock = styled.div`
    display: flex;
    flex-direction: row;
    column-gap: 20px;
`;
const ScoreText = styled.p`
    font-family: 'Montserrat', sans-serif;
`;
const ScoreBlock = styled.div`
    column-gap: 40px;
    display: flex;
    align-items: center;
    margin-top: 30px;
`;
const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 40px;
    justify-content: center;
    align-items: center;
`;

export default App;
