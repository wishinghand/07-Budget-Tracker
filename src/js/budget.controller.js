(function() {
    'use strict';
angular
    .module('budget-app')
    .controller('BudgetController', BudgetController);

    function BudgetController(){
        /* jshint validthis: true */
        //capturing this as a variable
        var vm = this;
        vm.totalIncome = 0;
        vm.totalExpense = 0;
        vm.sum = 0;
        //instantiate ng-model recipient
        vm.income = {};
        vm.expense = {};

        //instantiate array to hold the models
        vm.incomes = [];
        vm.expenses = [];

        // functions in this controller
        vm.addIncome = addIncome;
        vm.addExpenses = addExpenses;
        vm.addTotalIncome = addTotalIncome;
        vm.addTotalExpense = addTotalExpense;
        vm.addToSummary = addToSummary;

        function addIncome(){
            vm.incomes.push(vm.income);
            addTotalIncome(vm.income.amount);
            //clear the inputs
            vm.income = {};
        }

        function addExpenses(){
            vm.expenses.push(vm.expense);
            addTotalExpense(vm.expense.amount);
            //clear the inputs
            vm.expense = {};
        }

        function addTotalIncome(lineItem){
            vm.sum += lineItem;
            return vm.totalIncome += lineItem;
            // addToSummary(lineItem);
        }

        function addTotalExpense(lineItem){
            vm.sum += (lineItem * -1);
            return vm.totalExpense += lineItem;
            // addToSummary(lineItem * -1);
        }

        function addToSummary(num){
            return vm.sum += num;
        }
    }
})();