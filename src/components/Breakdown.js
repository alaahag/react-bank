import React, { Component } from 'react';
import Category from './Category';
const axios = require('axios');

export default class Breakdown extends Component {
    async componentDidMount() {
        //getting "_id" as category and "total" as total amount
        const response = await axios.get("http://localhost:3001/breakdown");
        this.setState({ breakdown: response.data });
    }

    render() {
        const balance = Object.values(this.props.transactions).reduce((t, {amount}) => t + amount, 0);
        return (
            <div className="App-header">
                <span className="component_title">Breakdown</span>
                <p className="component_body"><span>Balance: </span><span style={{color: balance >= 0 ? "greenyellow" : "tomato"}}>{balance} $</span></p>
                <table className="table_breakdown">
                    <thead>
                        <th>Categories & Total Amounts</th>
                    </thead>
                    <tbody>
                        {this.state ? this.state.breakdown.map(category => <Category transactions={this.props.transactions.filter(transaction => transaction.category === category._id )} category={category}/> ) : ""}
                    </tbody>
                </table>
            </div>
        )
    }
}
