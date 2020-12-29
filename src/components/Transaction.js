import React, { Component } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import SvgIcon from '@material-ui/core/SvgIcon';

export default class Transaction extends Component {
    removeTrans = () => {
        this.props.removeTrans(this.props.transaction);
    }

    render() {
        return (
            <tr>
                <td style={{color: this.props.transaction.amount >= 0 ? "limegreen" : "tomato"}}>{this.props.transaction.amount} $</td>
                <td>{this.props.transaction.vendor}</td>
                <td>{this.props.transaction.category}</td>
                <td className="delete_width">
                    <DeleteIcon aria-label="delete" className="delete_trans" onClick={this.removeTrans} style={{color: "bisque"}}>
                        <SvgIcon>
                            <path d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z" />
                        </SvgIcon>
                    </DeleteIcon>
                </td>
            </tr>
        )
    }
}
