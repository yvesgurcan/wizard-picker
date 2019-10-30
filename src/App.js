import React, { useState } from 'react';
import styled from 'styled-components';

import wizards from './data';

function pickColor() {
    return Math.floor(Math.random() * Math.floor(255))
}

const WIZARD_DATA_FILE_URI = 'https://github.com/yvesgurcan/wizard-picker/blob/master/src/data.js';

export default () => {
    const [selectedWizard, selectWizard] = useState({});

    const unusedWizards = [];
    const usedWizards = [];

    wizards.forEach(w => {
        if (w.used) {
            return usedWizards.push(w);
        }

        return unusedWizards.push(w);
    });

    const pickWizard = () => {
        if (unusedWizards.length === 0) {
            return;
        }

        const randomIndex = Math.floor(Math.random() * Math.floor(unusedWizards.length));
        selectWizard(unusedWizards[randomIndex]);
    }

    return (
        <View>
            <ViewContainer>
                <WizardPickerContainer>
                    <WizardPicker onClick={pickWizard}>Pick a wizard!</WizardPicker>
                    <SelectedWizard>{selectedWizard.name}</SelectedWizard>
                </WizardPickerContainer>
                <AddWizard href={WIZARD_DATA_FILE_URI} target="_blank" rel="noopener noreferrer">Click here to add a wizard via GitHub.</AddWizard>
                {unusedWizards.map(wizard => <WizardItem key={wizard.name}>{wizard.name}</WizardItem>)}
        {usedWizards.map(wizard => <WizardItem key={wizard.name} used={true}>{wizard.name} <WizardUsed>({wizard.used})</WizardUsed></WizardItem>)}
            </ViewContainer>
        </View>
    );
}

const View = styled.div`
    margin: -8px;
    padding: 30px;
    box-sizing: border-box;
    min-height: 100vh;
    min-width: 100vw;
    background: black;
    color: white;
    font-family: 'Dancing Script', cursive;
    font-size: 38px;
    font-weight: bold;
    line-height: 1.70em;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ViewContainer = styled.div`
    width: 500px;
`;

const WizardPickerContainer = styled.div`
    display: flex;
    align-items: center;
    padding-bottom: 30px;
    margin-bottom: 20px;
    border-bottom: 1px solid white;
`;

const WizardPicker = styled.button`
    padding: 10px;
    font-size: 25px;
    margin-right: 20px;
    min-height: 70px;
    background: rgb(180, 180, 180);
    border: 1px solid grey;
    border-radius: 20px;
    outline: none;

    &:active {
        background: rgb(100, 100, 100);
    }
`;

const SelectedWizard = styled.div`
    color: ${() => `rgb(${pickColor()}, ${pickColor()}, ${pickColor()})`};
    transition: all 1s;
`;

const AddWizard = styled.a`
    font-size: 30px;
    color: orange;
    text-decoration: none;
`;

const WizardItem = styled.div`
    color: ${props => props.used && 'grey'}
`;

const WizardUsed = styled.span`
    font-size: 23px;
`;