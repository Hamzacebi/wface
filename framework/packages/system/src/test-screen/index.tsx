import * as React from 'react';
import * as WFace from '@wface/components';

interface TestScreenState {
    name: string,
    surname: string
    [key: string]: string
}

export class TestScreen extends React.Component<WFace.BaseScreenProps, TestScreenState> {
    constructor(props) {
        super(props);

        this.state = this.props.screenContext.state || {
            name: 'mehmet',
            surname: 'baran'
        }
    }

    handleChange = name => event => {
        this.setState({
          [name]: event.target.value,
        });
    };

    changeState = () => {
        this.setState({
            name: 'C1',
            surname: 'C2'
        })
    }

    changeState2 = () => {
        this.setState({
            name: 'X1',
            surname: ''
        })
    }

    public render() {
        return (        
            <div>
                <WFace.WGrid container>
                    <WFace.WGrid item xs={12} md={4}>
                        <WFace.WCard>
                            <WFace.WCardHeader title="Test Bilgileri"/>
                            <WFace.WCardContent>
                                <WFace.WTextField label="Adı" fullWidth
                                    value={this.state.name}
                                    onChange={this.handleChange('name')}/>
                                <WFace.WTextField label="Soyadı" fullWidth
                                    value={this.state.surname}
                                    onChange={this.handleChange('surname')}/>
                            </WFace.WCardContent>
                            <WFace.WCardActions>
                                <WFace.WButton onClick={this.changeState} >Do</WFace.WButton>
                                <WFace.WButton onClick={this.changeState2} >Do2</WFace.WButton>
                            </WFace.WCardActions>
                        </WFace.WCard>
                    </WFace.WGrid>
                    <WFace.WGrid item xs={12} md={4}>
                        <WFace.WCard>
                            <WFace.WCardHeader title="Test Bilgileri 2"/>
                            <WFace.WCardContent>
                            </WFace.WCardContent>
                        </WFace.WCard>
                    </WFace.WGrid>
                    <WFace.WGrid item xs={12} md={4}>
                        <WFace.WCard>
                            <WFace.WCardHeader title="Test Bilgileri 3"/>
                            <WFace.WCardContent>
                                <WFace.WTextField label="Doğum Tarihi" fullWidth/>
                            </WFace.WCardContent>
                        </WFace.WCard>
                    </WFace.WGrid>
                </WFace.WGrid>
            </div>
        );
    }
}