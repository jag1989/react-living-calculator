import React from 'react';
import { shallow, mount, render } from 'enzyme';

import Calculator from '../Calculator';

describe('<Calculator />', () => {
    it('should render front end input & data areas', () => {
        const Calc = shallow(<Calculator />);
        expect(Calc.find('.living-calc_body')).toHaveLength(1);
    });

    it('has calculated Single Income correct', () => {
        const Calc = shallow(<Calculator />);
        Calc.instance().calculateValues();
        Calc.update();

        const total = Math.round(Calc.state().ResultSingle * 1e2) / 1e2;

        expect(total).toBe(13600.00);
    });

    it('has calculated Joint Income correct', () => {
        const Calc = shallow(<Calculator />);
        Calc.instance().calculateValues();
        Calc.update();

        const total = Math.round(Calc.state().ResultJoint * 1e2) / 1e2;

        expect(total).toBe(15385.71);
    });

    it('has calculated Mortgage payments/month correct', () => {
        const Calc = shallow(<Calculator />);
        Calc.instance().calculateValues();
        Calc.update();

        const total = Math.round(Calc.state().PaymentsMortgage * 1e2) / 1e2;

        expect(total).toBe(237.11);
    });

    it('has calculated Rent payments/month correct', () => {
        const Calc = shallow(<Calculator />);
        Calc.instance().calculateValues();
        Calc.update();

        const total = Math.round(Calc.state().RentAmount * 1e2) / 1e2;

        expect(total).toBe(91.67);
    });

    it('has calculated Total Payments correct', () => {
        const Calc = shallow(<Calculator />);
        Calc.instance().calculateValues();
        Calc.update();

        const total = Math.round(Calc.state().PaymentsTotal * 1e2) / 1e2;

        expect(total).toBe(328.78);
    });
});