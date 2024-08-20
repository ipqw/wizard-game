import styled from 'styled-components';
import Canvas from './components/Canvas';
import { store } from './store';
import { observer } from 'mobx-react';

const App = observer(() => {
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
            <Canvas width={900} height={500} />
        </Wrapper>
    );
});
const ScoreText = styled.p`
    font-family: 'Montserrat', sans-serif;
`;
const ScoreBlock = styled.div`
    column-gap: 40px;
    display: flex;
    align-items: center;
`;
const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 40px;
    justify-content: center;
    align-items: center;
`;

export default App;
