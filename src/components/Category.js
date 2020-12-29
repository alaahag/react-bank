import React, { Component } from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

export default class Category extends Component {
    render() {
        return (
            <tr><td>
                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <div className="tr_max">
                            <div className="td_left_category">{this.props.category._id}</div>
                            <div className="td_right_category" style={{color: this.props.category.total >= 0 ? "limegreen" : "tomato"}}>{this.props.category.total} $</div>
                        </div>
                    </AccordionSummary>
                    <AccordionDetails>
                        <div className="tr_max">
                            {
                                this.props.transactions.map(transaction => <div>
                                    <div className="td_left_category">Vendor: {transaction.vendor}</div>
                                    <div className="td_right_category" style={{color: transaction.amount >= 0 ? "limegreen" : "tomato"}}>Amount: {transaction.amount} $</div>
                                    </div>
                                )
                            }
                        </div>
                    </AccordionDetails>
                </Accordion>
            </td></tr>
        )
    }
}
