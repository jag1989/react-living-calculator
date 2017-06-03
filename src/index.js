import React from 'react';
import ReactDOM from 'react-dom';
import InputRange from 'react-input-range';
import './built/index.css';
import './built/input-range/input-range.css';

// ========================================
// A JSX Component for a Slider
// ========================================

class CalcSlider extends React.Component {
    handleChange(Value) {
        const Key   = this.props.propKey;

        this.props.changeValue(Key, Value);
    }

    render() {
        let Step = 1;
        if( this.props.step ) {
            Step = this.props.step;
        }

        return (
            <div className="form-control">
                <label>
                    {this.props.label}
					<p>{this.props.description}</p>
					<div className="form-slider">
						<InputRange
							minValue={this.props.minVal}
							maxValue={this.props.maxVal}
							step={Step}
							value={this.props.value}
							onChange={this.handleChange.bind(this)}
						/>
					</div>
                </label>
            </div>
        );
    }
}

// ========================================
// A JSX Component for a Value Input
// ========================================

class CalcValueInput extends React.Component {
    handleChange(e) {
        const Key   = this.props.propKey;
        const Value = this.ValidateNumberInput(Key, e.target.value);

        this.props.changeValue(Key, Value);
    }

    ValidateNumberInput(Key, Val) {
        const MaxDeposit = 80000;
        const MaxMarketValue = 1000000;

        let StrippedVal = Number(Val.replace(/[^0-9.]+/g, ""));

        if( Key === 'Deposit' 
            && StrippedVal > MaxDeposit ) {
                StrippedVal = MaxDeposit;
        } 
        else if ( Key === 'MarketValue'
            && StrippedVal > MaxMarketValue ) {
                StrippedVal = MaxMarketValue;
        }

        return StrippedVal;
    }

    render() {
        const value = this.props.value.toLocaleString('en-GB', {'minimumFractionDigits' : 0});

        return (
            <div className="form-control form-control--half">
                <label>
                    {this.props.label}
					<p>{this.props.description}</p>
                    <div className="input-currency">
                        <input className="input-currency" type="text" value={value} onChange={this.handleChange.bind(this)} pattern="\d*" />
                    </div>
                </label>
            </div>
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
                <CalcValueInput
                    changeValue={this.props.changeValue.bind(this)}
                    value={this.props.MarketValue}
                    label="Price of the Property"
					description="Full market value or asking price"
                    propKey="MarketValue"
                />
                <CalcValueInput
                    changeValue={this.props.changeValue.bind(this)}
                    value={this.props.Deposit}
                    label="Your Deposit"
					description="Up to a maximum of £80,000"
                    propKey="Deposit"
                />
                <CalcSlider
                    changeValue={this.props.changeValue.bind(this)}
                    minVal={40}
                    maxVal={75}
                    value={this.props.PercentageShare}
                    label="Percentage Share"
					description="The percentage of the property you will own"
                    propKey="PercentageShare"
                />
                <CalcSlider
                    changeValue={this.props.changeValue.bind(this)}
                    minVal={20}
                    maxVal={30}
                    value={this.props.MortgageTerm}
                    label="Mortgage Period"
					description="The amount of years you will pay the mortgage for"
                    propKey="MortgageTerm"
                />
                <CalcSlider
                    changeValue={this.props.changeValue.bind(this)}
                    minVal={0.5}
                    maxVal={10}
                    step={0.5}
                    value={this.props.MortgageRate}
                    label="Interest Rate"
					description="The interest rate on your mortgage repayments"
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

                <h3 className="has-support">Your Results</h3>
				<p className="living-calc_data__description">Minimum income required</p>
				<div className="living-calc_data__container">
					<CalcDataRow name="Single" value={this.props.ResultSingle } />
					<CalcDataRow name="Joint" value={this.props.ResultJoint} />
				</div>

                <h3>Example Mortgage Structure</h3>
				<div className="living-calc_data__container">
					<CalcDataRow name="Mortgage Years" value={this.props.MortgageTerm + " Years"} />
					<CalcDataRow name="Mortgage Rate" value={this.props.MortgageRate + "%"} />
					<CalcDataRow name="Mortgage (loan) Amount" value={this.props.MortgageAmount} />
				</div>

                <h3>Monthly Payments</h3>
				<div className="living-calc_data__container">
					<CalcDataRow name="Mortgage payments/month" value={this.props.PaymentsMortgage} />
					<CalcDataRow name="Rent payments/month" value={this.props.PaymentsRent} />
					<CalcDataRow name="Total" value={this.props.PaymentsTotal} />
				</div>
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
        const Locale = 'en-GB';
        const LocaleCurrency = {
            style: 'currency',
            currency: 'GBP'
        };

        // Calculations
        let PercentageShare     = this.state.PercentageShare / 100;
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
                        ResultSingle={ResultSingle.toLocaleString(Locale, LocaleCurrency)}
                        ResultJoint={ResultJoint.toLocaleString(Locale, LocaleCurrency)}
                        MortgageTerm={this.state.MortgageTerm}
                        MortgageRate={this.state.MortgageRate}
                        MortgageAmount={AmountToBorrow.toLocaleString(Locale, LocaleCurrency)}
                        PaymentsMortgage={PaymentsMortgage.toLocaleString(Locale, LocaleCurrency)}
                        PaymentsRent={RentAmount.toLocaleString(Locale, LocaleCurrency)}
                        PaymentsTotal={PaymentsTotal.toLocaleString(Locale, LocaleCurrency)}
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
