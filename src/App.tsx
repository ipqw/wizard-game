import styled from 'styled-components';
import Canvas from './components/Canvas';

const App = () => {
    return (
        <Wrapper>
            <Canvas width={900} height={500} />
        </Wrapper>
    );
};

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
`;

export default App;
