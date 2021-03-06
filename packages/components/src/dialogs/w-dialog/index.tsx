import * as React from 'react';
import Dialog, { DialogProps } from '@material-ui/core/Dialog'
import { createStyles, withStyles, withTheme } from '@material-ui/core/styles';
import { WTheme } from '../../others/w-theme-provider/w-theme';

export interface WDialogProps extends DialogProps { 
  theme?: WTheme;
}

class WDialogInner extends React.Component<WDialogProps, any> {
  static defaultProps: WDialogProps = { 
    open: false,
    scroll: "paper" 
  }

  public render() {
    const { classes } = this.props;
    return <Dialog {...this.props} classes={{ paperScrollPaper: classes.root }} PaperProps={{ elevation: this.props.theme.designDetails.defaultElevation, ...this.props.PaperProps }}/>
  }
}

const styles = theme => createStyles({ root: {  } });

export const WDialog = withStyles(styles)(withTheme()((props: WDialogProps) => <WDialogInner {...props}/>))
