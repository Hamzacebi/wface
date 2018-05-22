//#region imports 

import * as React from "react";
import { withRouter } from 'react-router-dom'
import { Paper, withStyles } from '@material-ui/core'
import { 
    WButton, WCard, WCardContent,
    WGrid, WIconButton, WNotificationBar,
    WTextField, WTypography
} from '@wface/components';
import * as classNames from 'classnames';   
import {    
    Visibility, VisibilityOff
} from '@material-ui/icons' 

import { Inject } from 'react.di';
import IAuthService from "../../providers/IAuthService";



//#endregion

interface WLoginPageState {
    username: string;
    password: string;
    showWrongPasswordText: boolean;
}

class WLoginPage extends React.Component<any, WLoginPageState> { 

    @Inject('IAuthService')
    private authService: IAuthService

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            showWrongPasswordText: false
        }
    }

    btnLoginClick() {
        this.authService.login(this.state.username, this.state.password, (result) => {
            if(result) {
                this.props.history.replace('/main');
            }
            else {
                this.setState({showWrongPasswordText: true});
            }
        });
        
    }

    handleChange = name => event => {
        this.setState({
          [name]: event.target.value,
        });
    };

    render() {
        const { classes } = this.props;

        return (     
            <div style={{height:'100%', backgroundImage: `url(./assets/login-bg.jpg)`}}>       
                <div style={{paddingTop:'12%'}}>
                    <WGrid container justify="center">
                        <WGrid item xs={12} sm={12} md={3}>
                            <WCard>
                                <WCardContent>
                                    <WTypography 
                                        variant="display1" 
                                        gutterBottom 
                                        className={classNames(classes.textCenter, classes.vSpace)}
                                        color="primary"
                                        >
                                        WFACE
                                    </WTypography>

                                    {this.state.showWrongPasswordText &&
                                        <WNotificationBar 
                                            text="Girdiğiniz kullanıcı adı veya şifre hatalıdır!" 
                                            type="error"
                                            onCloseClick={() => this.setState({showWrongPasswordText: false})}/>
                                    }

                                    <WTextField
                                        id="username"
                                        label="Kullanıcı Adı"                                
                                        fullWidth                                        
                                        margin="normal"
                                        className={classes.vSpace}
                                        value={this.state.username}
                                        onChange={this.handleChange('username')}
                                        />
                                    <WTextField
                                        id="password"
                                        label="Şifre"                                
                                        fullWidth
                                        margin="normal"   
                                        type="password"    
                                        autoComplete="current-password"                         
                                        className={classes.vSpace}
                                        value={this.state.password}
                                        onChange={this.handleChange('password')}
                                        />
                                    <div className={classes.vSpace}/>
                                    <WButton 
                                        variant="raised" 
                                        size="large" 
                                        fullWidth 
                                        color="primary" 
                                        className={classes.vSpace}
                                        style={{marginBottom:20}}
                                        onClick={this.btnLoginClick.bind(this)}>
                                        GİRİŞ
                                    </WButton>
                                </WCardContent>
                            </WCard>
                        </WGrid>
                    </WGrid>
                </div>                
            </div>
        );
    }
};

const styles = theme => ({
    card: {
      minWidth: 275,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      marginBottom: 16,
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
    textCenter: {
        textAlign: 'center'
    },
    vSpace: {
        marginTop: theme.spacing.unit * 3,
    },
    button: {
        marginTop: theme.spacing.unit * 3,
    },
});

export default withRouter(withStyles(styles as any)(WLoginPage))