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
                <CalcDataRow name="Mortgage Years" value={this.props.MortgageTerm + " Years"} />
                <CalcDataRow name="Mortgage Rate" value={this.props.MortgageRate + "%"} />
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
            MortgageTerm: 25, 
            MortgageRate: 5, 
            MortgageAmount: 0, 
            PaymentsMortgage: 0, 
            PaymentsRent: 0, 
            PaymentsTotal: 0,
            MarketValue: 100000,            
            PercentageShare: 40,
            Deposit: 10000
        }

    }

    changeValue( Key, Val ) {
        this.setState({ [Key]: Val });
    }

    calcMortgagePayments( AmountToBorrow, NumberOfPayments ) {
        const a = AmountToBorrow; 
        const n = NumberOfPayments;    

        let r = ( this.state.MortgageRate / 100 ) / 12;
        let p = (a * r *Math.pow((1+r),n))/(Math.pow((1+r),n)-1); 
        let prin = Math.round( p * 100 ) / 100; 

        return prin;
    }

    render() {
        // Immutable definitions
        const RateOnRent = 2.75; 
        const IncomeMultiplesSingle = 4; 
        const IncomeMultiplesJoint = 3.5; 

        // Calculations
        let PercentageShare = this.state.PercentageShare / 100;        
        let NumberOfPayments    = this.state.MortgageTerm * 12;
        let ShareValue          = this.state.MarketValue * PercentageShare;
        let AmountToBorrow      = ShareValue - this.state.Deposit;
        let EquityToRent        = this.state.MarketValue - ShareValue; 
        let RentAmount          = ( EquityToRent * ( RateOnRent / 100 ) ) / 12; 
        let PaymentsMortgage    = this.calcMortgagePayments( AmountToBorrow, NumberOfPayments ); 
        let ResultSingle        = ( AmountToBorrow / IncomeMultiplesSingle ) + ( 12 * RentAmount );
        let ResultJoint         = ( AmountToBorrow / IncomeMultiplesJoint ) + ( 12 * RentAmount );
        let PaymentsTotal       = RentAmount + PaymentsMortgage;

        return (
            <div className="living-calc">
                <div className="living-calc_header">
                    <h2>Living Calculator</h2>
                </div>
                <div className="living-calc_body">
                    <CalcSliders 
                        changeValue={this.changeValue.bind(this)}
                        MarketValue={this.state.MarketValue}
                        PercentageShare={this.state.PercentageShare}
                        Deposit={this.state.Deposit}
                        MortgageTerm={this.state.MortgageTerm}
                        MortgageRate={this.state.MortgageRate}
                        />
                    <CalcData
                        ResultSingle={ResultSingle}
                        ResultJoint={ResultJoint}
                        MortgageTerm={this.state.MortgageTerm}
                        MortgageRate={this.state.MortgageRate}
                        MortgageAmount={AmountToBorrow}
                        PaymentsMortgage={PaymentsMortgage}
                        PaymentsRent={RentAmount}
                        PaymentsTotal={PaymentsTotal}
                    />
                 </div>
                 <div className="living-calc_blurb">
                     Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestiae, neque, inventore cupiditate sit deleniti minus eum. Cupiditate optio amet, quo ea eum, natus, adipisci incidunt, corrupti asperiores repellendus voluptas minus.
                </div>
            </div>
        );
    }
}

// ========================================

ReactDOM.render(
    <Calculator />,
    document.getElementById('root')
);
