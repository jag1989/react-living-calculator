import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
const PropTypes = require('prop-types');


// ========================================
// A JSX Component for a Slider
// ========================================

class CalcSlider extends React.Component {
    handleChange(e) {
        const Key   = this.props.propKey;
        const Value = e.target.value;

        this.props.changeValue(Key, Value);
    }

    render() {
        return (
            <input value={this.props.value} onChange={this.handleChange.bind(this)} />
        );
    }
}

// ========================================
// A JSX Component for the Slider Container
// ========================================

class CalcSliders extends React.Component {
    render() {
        return (
            <div className="living-calc_sliders">
                <CalcSlider  
                    changeValue={this.props.changeValue.bind(this)}
                    value={this.props.MarketValue} 
                    propKey="MarketValue"
                />
                <CalcSlider  
                    changeValue={this.props.changeValue.bind(this)}
                    value={this.props.PercentageShare} 
                    propKey="PercentageShare"
                />
                <CalcSlider  
                    changeValue={this.props.changeValue.bind(this)}
                    value={this.props.Deposit} 
                    propKey="Deposit"
                />
                <CalcSlider  
                    changeValue={this.props.changeValue.bind(this)}
                    value={this.props.MortgageTerm} 
                    propKey="MortgageTerm"
                />
                <CalcSlider  
                    changeValue={this.props.changeValue.bind(this)}
                    value={this.props.MortgageRate} 
                    propKey="MortgageRate"
                />
            </div>
        );
    }
}

// ========================================
// A JSX Component for a Data Row
// ========================================

class CalcDataRow extends React.Component {
    render() {
        return (
            <div className="living-calc_data__row">
                <div>{this.props.name}</div>
                <div>{this.props.value}</div>
            </div>
        );
    }
}

// ========================================
// A JSX Component for the Data Container
// ========================================

class CalcData extends React.Component {
    render() {       
         return (
            <div className="living-calc_data">

                <h3>Your results</h3>
                <CalcDataRow name="Single" value={this.props.ResultSingle } />
                <CalcDataRow name="Joint" value={this.props.ResultJoint} />

                <h3>Example mortgage structure</h3>
                <CalcDataRow name="Mortgage Years" value={this.props.MortgageTerm} />
                <CalcDataRow name="Mortgage Rate" value={this.props.MortgageRate} />
                <CalcDataRow name="Mortgage (loan) Amount" value={this.props.MortgageAmount} />

                <h3>Monthly payments</h3>
                <CalcDataRow name="Mortgage payments/month" value={this.props.PaymentsMortgage} />
                <CalcDataRow name="Rent payments/month" value={this.props.PaymentsRent} />
                <CalcDataRow name="Total" value={this.props.PaymentsTotal} />
            </div>
         );
    }
}

// ========================================
// A JSX Component for the Calculator Container
// ========================================

class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ResultSingle: 0, 
            ResultJoint: 0, 
            MortgageTerm: 24, 
            MortgageRate: 4.75, 
            MortgageAmount: 0, 
            PaymentsMortgage: 0, 
            PaymentsRent: 0, 
            PaymentsTotal: 0,
            MarketValue: 100000,            
            PercentageShare: 25,
            Deposit: 10000 
        }
    }

    workCalc() {
        console.log('WorkCalc');
    }

    changeValue( Key, Val ) {
        this.setState({ [Key]: Val });

        // this.workCalc();
    }


    render() {
        return (
            <div className="living-calc">
                <CalcSliders 
                    changeValue={this.changeValue.bind(this)}
                    MarketValue={this.state.MarketValue}
                    PercentageShare={this.state.PercentageShare}
                    Deposit={this.state.Deposit}
                    MortgageTerm={this.state.MortgageTerm}
                    MortgageRate={this.state.MortgageRate}
                    />
                <CalcData
                    MarketValue={this.state.MarketValue}
                    ResultSingle={this.state.ResultSingle}
                    ResultJoint={this.state.ResultJoint}
                    MortgageTerm={this.state.MortgageTerm}
                    MortgageRate={this.state.MortgageRate}
                    MortgageAmount={this.state.MortgageAmount}
                    PaymentsMortgage={this.state.PaymentsMortgage}
                    PaymentsRent={this.state.PaymentsRent}
                    PaymentsTotal={this.state.PaymentsTotal}
                 />
            </div>
        );
    }
}

// ========================================

ReactDOM.render(
    <Calculator />,
    document.getElementById('root')
);
