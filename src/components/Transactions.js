import React, { Component } from 'react';
import Transaction from './Transaction';

export default class Transactions extends Component {
    render() {
        const balance = Object.values(this.props.transactions).reduce((t, {amount}) => t + amount, 0);
        return (
            <div className="App-header">
                <span className="component_title">Transactions</span>
                <p className="component_body"><span>Balance: </span><span style={{color: balance >= 0 ? "greenyellow" : "tomato"}}>{balance} $</span></p>
                <table>
                    <thead>
                        <th>Amount</th><th>Vendor</th><th>Category</th><th className="delete_width"></th>
                    </thead>
                    <tbody>
                        {this.props.transactions.map(transaction => <Transaction key={transaction._id} removeTrans={this.props.removeTrans} transaction={transaction} />)}
                    </tbody>
                </table>
            </div>
        )
    }
}
