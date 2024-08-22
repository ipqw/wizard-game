import { Dispatch, FC, SetStateAction } from 'react';
import styled from 'styled-components';
import { ILocation, Wizard } from '../models/Wizard';

interface IProps {
    isVisible: boolean;
    location: ILocation;
    wizard: Wizard | null;
    setIsPopupVisible: Dispatch<SetStateAction<boolean>>;
}

const PopupMenu: FC<IProps> = ({ isVisible, location, wizard, setIsPopupVisible }) => {
    const clickHandler = (color: string) => {
        wizard?.setColor(color);
        setIsPopupVisible(false);
    };
    return (
        <Wrapper $location={location} $isVisible={isVisible}>
            <Color
                onClick={() => {
                    clickHandler('#001bff');
                }}
                $color={'#001bff'}
            />
            <Color
                onClick={() => {
                    clickHandler('#00fff2');
                }}
                $color={'#00fff2'}
            />
            <Color
                onClick={() => {
                    clickHandler('#fff700');
                }}
                $color={'#fff700'}
            />
            <Color
                onClick={() => {
                    clickHandler('#2eff00');
                }}
                $color={'#2eff00'}
            />
            <Color
                onClick={() => {
                    clickHandler('#ff00e8');
                }}
                $color={'#ff00e8'}
            />
        </Wrapper>
    );
};
const Color = styled.div<{ $color: string }>`
    border-radius: 100px;
    width: 20px;
    height: 20px;
    user-select: none;
    cursor: pointer;
    background-color: ${({ $color }) => $color};
`;
const Wrapper = styled.div<{ $isVisible: boolean; $location: ILocation }>`
    display: ${({ $isVisible }) => ($isVisible ? 'flex' : 'none')};
    position: absolute;
    left: ${({ $location }) => $location.x}px;
    top: ${({ $location }) => $location.y}px;
    background-color: #ecfdfc;
    border-radius: 15px;
    column-gap: 5px;
    padding: 10px;
`;

export default PopupMenu;
