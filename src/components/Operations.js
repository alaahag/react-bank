import React, { Component } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import Fade from '@material-ui/core/Fade';
import CircularProgress from '@material-ui/core/CircularProgress';

export default class Operations extends Component {
    constructor(props) {
		super();
		this.state = {
        }
    }

    oneLiner = (method) => {
        //validate amount value
        let amount = document.getElementById("amount");
        if(!/^[0-9]+$/.test(amount.value)){
            this.setState({open: true, severity: "error", message: "Incorrect 'amount' value."});
            amount.value = "";
            amount.focus();
            return;
        }

        const category = document.getElementById("category").value;
        const vendor = document.getElementById("vendor").value;

        if (!category || !vendor) {
            this.setState({open: true, severity: "info", message: "Please fill all details."});
            return;
        }

        //disable inputs and "do loading" then we later redirect user to transactions page
        const inputs = document.getElementsByTagName("input");
        for (let i = 0; i < inputs.length; i++)
            inputs[i].disabled = true;

        this.setState({loading: true});

        //method = withdraw or deposit
        amount.value = amount.value * method;

        this.props.operate(parseInt(amount.value), category, vendor);
    }

    withdraw = () => {
        const balance = Object.values(this.props.transactions).reduce((t, {amount}) => t + amount, 0);
        if (balance < 500) {
            this.setState({open: true, severity: "warning", message: "Insufficient funds!"});
        }
        else
            this.oneLiner(-1);
    }

    deposit = () => {
        this.oneLiner(1);
    }

    render() {
        const balance = Object.values(this.props.transactions).reduce((t, {amount}) => t + amount, 0);
        return (
            <div className="App-header">
                <span className="component_title">Operations</span>
                <p className="component_body"><span>Balance: </span><span style={{color: balance >= 0 ? "greenyellow" : "tomato"}}>{balance} $</span></p>
                <input type="text" id="amount" placeholder="Amount"></input>
                <input type="text" id="vendor" placeholder="Vendor"></input>
                <input type="text" id="category" placeholder="Category"></input>
                <div><input type="button" value="Withdraw" onClick={this.withdraw}/><input type="button" value="Deposit" onClick={this.deposit}/></div>
                <Fade in={this.state.loading} unmountOnExit>
                    <CircularProgress color="secondary"/>
                </Fade>
                <Snackbar open={this.state.open} anchorOrigin={{vertical: 'bottom',horizontal: 'center'}} autoHideDuration={3000} onClose={() => this.setState({open: false})}>
                    <Alert onClose={() => this.setState({open: false})} severity={this.state.severity}>
                        {this.state.message}
                    </Alert>
                    {/* <Alert severity="error">This is an error message!</Alert>
                    <Alert severity="warning">This is a warning message!</Alert>
                    <Alert severity="info">This is an information message!</Alert>
                    <Alert severity="success">This is a success message!</Alert> */}
                </Snackbar>
            </div>
        )
    }
}
