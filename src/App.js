import React, { Component } from 'react';
import './App.css';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Operations from './components/Operations';
import Transactions from './components/Transactions';
import Breakdown from './components/Breakdown';
import Snackbar from '@material-ui/core/Snackbar';
import AddShoppingCartRoundedIcon from '@material-ui/icons/AddShoppingCartRounded';
import LocalAtmRoundedIcon from '@material-ui/icons/LocalAtmRounded';
import PollRoundedIcon from '@material-ui/icons/PollRounded';
import Alert from '@material-ui/lab/Alert';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Divider from '@material-ui/core/Divider';
const axios = require('axios');


class App extends Component {
	constructor(){
		super();
		this.state = {
      transactions: [
        // { amount: 3200, vendor: "Elevation", category: "Salary" },
        // { amount: -7, vendor: "Runescape", category: "Entertainment" },
        // { amount: -20, vendor: "Subway", category: "Food" },
        // { amount: -98, vendor: "La Baguetterie", category: "Food" }
      ]
    };
  }

  async componentDidMount() {
    const response = await axios.get("http://localhost:3001/transactions");
    const transactions = [...this.state.transactions];
    response.data.forEach(f => transactions.push(f));
    this.setState({ transactions });
  }

  operate = async (amount, vendor, category) => {
    //add new trans
    const tran = {amount, vendor, category};
    const transactions = [...this.state.transactions];
    transactions.push(tran);
    this.setState({transactions});
    await axios.post("http://localhost:3001/transaction", tran);

    this.setState({open: false, openP: false, severity: "success", message: "Transaction has been updated successfully!"});
    setTimeout(() => { window.location.href = "/"; }, 3000);
  }

  removeTrans = async (tran) => {
    //delete trans
    const transactions = [...this.state.transactions];
    const index = transactions.findIndex(t => t === tran);
    transactions.splice(index, 1);
    this.setState({transactions});
    await axios.delete(`http://localhost:3001/transaction/${tran._id}`);
  }

  handleToggle = () => {
    this.setState({openP: !this.state.openP});
  };

  handleClose = (event) => {
    this.setState({openP: false});
  };

	render(){
		return (
      <div>
        <Router>
        <AppBar>
          <Toolbar>
            <IconButton edge="start" color="inherit">
              <MenuIcon aria-controls={this.state.open ? 'menu-list-grow' : undefined} onClick={this.handleToggle}/>
              <Popper open={this.state.openP} transition disablePortal>
              {({ TransitionProps, placement }) => (
                <Grow {...TransitionProps} style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}>
                  <Paper>
                    <ClickAwayListener onClickAway={this.handleClose}>
                      <MenuList>
                        <MenuItem onClick={this.handleClose}><Link className="main-links" to="/"><AddShoppingCartRoundedIcon/><span className="main-links-spans">Transactions</span></Link></MenuItem>
                        <Divider />
                        <MenuItem onClick={this.handleClose}><Link className="main-links" to="/operations"><LocalAtmRoundedIcon/><span className="main-links-spans">Operations</span></Link></MenuItem>
                        <Divider />
                        <MenuItem onClick={this.handleClose}><Link className="main-links" to="/breakdown"><PollRoundedIcon/><span className="main-links-spans">Breakdown</span></Link></MenuItem>
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
            </IconButton>
            <Typography variant="h6">
              React-Bank
            </Typography>
                <Breadcrumbs aria-label="breadcrumb">
                  <Link className="main-links" to="/"><AddShoppingCartRoundedIcon/><span className="main-links-spans">Transactions</span></Link>
                  <Link className="main-links" to="/operations"><LocalAtmRoundedIcon/><span className="main-links-spans">Operations</span></Link>
                  <Link className="main-links" to="/breakdown"><PollRoundedIcon/><span className="main-links-spans">Breakdown</span></Link>
                </Breadcrumbs>
          </Toolbar>
        </AppBar>
        <Route path="/" exact render={() => <Transactions removeTrans={this.removeTrans} transactions={this.state.transactions} /> } />
                <Route path="/operations" exact render={() => <Operations transactions={this.state.transactions} operate={this.operate} /> } />
                <Route path="/breakdown" exact render={() => <Breakdown transactions={this.state.transactions} /> } />
        </Router>
        <Snackbar open={this.state.open} onClose={() => this.setState({open: false})} anchorOrigin={{vertical: 'bottom',horizontal: 'center'}} autoHideDuration={3000}>
          <Alert onClose={() => this.setState({open: false})} severity={this.state.severity}>
            {this.state.message}
            {/* <Alert severity="error">This is an error message!</Alert>
            <Alert severity="warning">This is a warning message!</Alert>
            <Alert severity="info">This is an information message!</Alert>
            <Alert severity="success">This is a success message!</Alert> */}
          </Alert>
        </Snackbar>
      </div>
		);
	}
}

export default App;
