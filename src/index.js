import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


// ========================================
// Where we will do all the fancy calculations
// ========================================

class CalcWorker extends React.Component {

}

// ========================================
// A JSX Component for a Slider
// ========================================

class CalcSlider extends React.Component {
  render() {
    return (
      <button className="square">
        {/* TODO */}
      </button>
    );
  }
}

// ========================================
// A JSX Component for the Slider Container
// ========================================

class CalcSliders extends React.Component {
  renderSlider(i) {
    return <CalcSlider />;
  }

  render() {

    return (
        <div className="living-calc_sliders">
          {this.renderSlider(0)}
          {this.renderSlider(1)}
          {this.renderSlider(2)}
          {this.renderSlider(3)}
          {this.renderSlider(4)}
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
                <CalcDataRow name="Single" value="0" />
                <CalcDataRow name="Joint" value="0" />

                <h3>Example mortgage structure</h3>
                <CalcDataRow name="Mortgage Years" value="0" />
                <CalcDataRow name="Mortgage Rate" value="0" />
                <CalcDataRow name="Mortgage (loan) Amount" value="0" />

                <h3>Monthly payments</h3>
                <CalcDataRow name="Rent payments/month" value="0" />
                <CalcDataRow name="Total" value="0" />
            </div>
         );
    }
}

// ========================================
// A JSX Component for the Calculator Container
// ========================================

class Calculator extends React.Component {
  render() {
    return (
      <div className="living-calc">
        {/*<CalcSliders />*/}
        <CalcData />
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Calculator />,
  document.getElementById('root')
);
