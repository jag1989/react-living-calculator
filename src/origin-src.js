(function($) {  
 
 
/* Set the sliders up*/  
$(function(){ 
$('.marketValue').noUiSlider({ 
start: [ 100 ], 
step: 5, 
serialization: { 
format: { decimals: 0 } 
}, 
range: { 'min': 50, 'max': 450 } 
}); 
 
 
$('.percentageShare').noUiSlider({ 
start: [ 40 ], 
step: 1, 
serialization: { 
format: { decimals: 0 } 
}, 
range: { 'min': 30, 'max': 75 } 
}); 
 
 
$('.depositAvailable').noUiSlider({ 
start: [ 10 ], 
step: 1, 
serialization: { 
format: { 
decimals: 0 } 
}, 
range: { 'min': 0, 'max': 80 } 
}); 
 
 
 
$('.mortgagePeriod').noUiSlider({ 
start: [ 25 ], 
step: 1, 
serialization: { 
format: { 
decimals: 0 } 
}, 
range: { 'min': 20, 'max': 30 } 
}); 
 
 
$('.interestRate').noUiSlider({ 
start: [ 5 ], 
step: 0.25, 
serialization: { 
format: { 
decimals: 2 } 
}, 
range: { 'min': 0.5, 'max': 10.0 } 
}); 
 
 
 
 
 
 
 
function toCurrency(number) { 
 var number = number.toString(),  
 dollars = number.split('.')[0],  
 cents = (number.split('.')[1] || '') +'00'; 
 dollars = dollars.split('').reverse().join('') 
 .replace(/(\d{3}(?!$))/g, '$1,') 
 .split('').reverse().join(''); 
 return '£' + dollars + '.' + cents.slice(0, 2); 
} 
 
 
 
 
 
 
/* ------------------------ MAIN CALCULATION */ 
function updateCalculator() { 
 // Get Slider Values 
 var fullMarketValue = $('.marketValue').val() * 1000; // console.log("fullMarketValue = " + fullMarketValue); 
 var depositAvailable = $('.depositAvailable').val() * 1000; // console.log("depositAvailable = " + depositAvailable); 
 var percentageShare = $('.percentageShare').val()/100; // console.log("percentageShare = " + percentageShare); 
 var mortgageRate = $('.interestRate').val(); // console.log("mortgageRate = " + mortgageRate); 
 var mortgageYears = $('.mortgagePeriod').val(); // console.log("mortgageYears = " + mortgageYears); 
 
 // Set up some Variables 
 // var mortgageRate = 6.5;  
 var rateOnRent = 2.75; 
 var incomeMultiplesForSingleIncome = 4; 
 var incomeMultiplesForJointIncome = 3.5; 
 var totalNumberOfMonthlyPayments = mortgageYears * 12; 
 var shareValue = fullMarketValue*percentageShare; // console.log("shareValue = " + shareValue); 
 var amountWeNeedToBorrow = shareValue - depositAvailable; // console.log("amountWeNeedToBorrow = " + amountWeNeedToBorrow); 
 var equityLeftOverToGoForRent = fullMarketValue - shareValue; 
 
 
 
 // http://hscripts.com/scripts/JavaScript/loan-calculator.php 
 var a = amountWeNeedToBorrow; // console.log("amountWeNeedToBorrow = " + a); 
 var r = (mortgageRate/100)/12; // console.log("monthlyRate = " + r); 
 var n = totalNumberOfMonthlyPayments; // console.log("totalNumberOfMonthlyPayments = " + n); 
 var p = (a * r *Math.pow((1+r),n))/(Math.pow((1+r),n)-1); // console.log("- = " + p); 
 var prin = Math.round(p*100)/100; // console.log("prin = " + prin); 
 var monthlyMortgageAmount = prin; 
 
 var rent = (equityLeftOverToGoForRent * (rateOnRent/100)); var finalRent = (rent/12); 
  
 /* was this but we think "shareValue" is wrongs and should be "amountWeNeedToBorrow" 
 var minSingleIncome = (shareValue / incomeMultiplesForSingleIncome) + (12 * finalRent); var minSingleIncome = minSingleIncome.toFixed(2); // console.log("minSingleIncome = " + minSingleIncome); 
 var minJointIncome = (shareValue / incomeMultiplesForJointIncome) + (12 * finalRent); var minJointIncome = minJointIncome.toFixed(2); // console.log("minJointIncome = " + minJointIncome); */ 
  
 var minSingleIncome = (amountWeNeedToBorrow / incomeMultiplesForSingleIncome) + (12 * finalRent); var minSingleIncome = minSingleIncome.toFixed(2); // console.log("minSingleIncome = " + minSingleIncome); 
 var minJointIncome = (amountWeNeedToBorrow / incomeMultiplesForJointIncome) + (12 * finalRent); var minJointIncome = minJointIncome.toFixed(2); // console.log("minJointIncome = " + minJointIncome); 
 
 
 var finalAmountWeNeedToBorrow = toCurrency(amountWeNeedToBorrow); // console.log("finalAmountWeNeedToBorrow = " + finalAmountWeNeedToBorrow); 
 var finalMinSingleIncome = toCurrency(minSingleIncome); // console.log("finalMinSingleIncome = " + finalMinSingleIncome); 
 var finalMinJointIncome = toCurrency(minJointIncome); // console.log("finalMinJointIncome = " + finalMinJointIncome); 
 var finalFinalRent = toCurrency(finalRent); // console.log("finalFinalRent = " + finalFinalRent); 
 
 var paymentTotal = finalRent + monthlyMortgageAmount; 
 var finalPaymentTotal = toCurrency(paymentTotal); // console.log("finalPaymentTotal = " + finalPaymentTotal); 
 
 var finalMonthlyMortgageAmount = toCurrency(prin); // console.log("finalMonthlyMortgageAmount = " + finalMonthlyMortgageAmount); 
 
 
 // Set the values in the display 
 $("#resultsSingle").val(finalMinSingleIncome); 
 $("#resultsJoint").val(finalMinJointIncome); 
 $("#mortgageTerm").val(mortgageYears + " years"); 
 $("#mortgageRate").val(mortgageRate + "%"); 
 $("#mortgageAmount").val(finalAmountWeNeedToBorrow); 
 $("#paymentsMortgage").val(finalMonthlyMortgageAmount); 
 $("#paymentsRents").val(finalFinalRent); 
 $("#paymentsTotal").val(finalPaymentTotal); 
 } 
/* ------------------------ END OF MAIN CALCULATION */ 
 
 
 
 
 
 
/* GET THE TRIGGER "onslide" and Populate the 'value' divs when the handle slides */  
$('.marketValue').on('slide', function(){ 
 $(".mv-value").html("£" + $('.marketValue').val() + "k"); 
 updateCalculator(); 
 }); 
 
$('.percentageShare').on('slide', function(){ 
 $(".ps-value").html($('.percentageShare').val() + "%"); 
 updateCalculator(); 
 }); 
 
 
$('.depositAvailable').on('slide', function(){ 
 $(".da-value").html("£" + $('.depositAvailable').val() + "k"); 
 updateCalculator(); 
 }); 
  
$('.mortgagePeriod').on('slide', function(){ 
 $(".mp-value").html($('.mortgagePeriod').val() + "years"); 
 updateCalculator(); 
 }); 
  
$('.interestRate').on('slide', function(){ 
 $(".ir-value").html($('.interestRate').val() + "%"); 
 updateCalculator(); 
 }); 
 
}); 
 
})(jQuery);  
 