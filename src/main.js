// import "./style.css";

//Стилизация выпадающего списка

//Полифилл для метода forEach для NodeList (из библиотеки MDN)
if (window.NodeList && !NodeList.prototype.forEach) {
  NodeList.prototype.forEach = function (callback, thisArg) {
    thisArg = thisArg || window;
    for (let i = 0; i < this.length; i++) {
      callback.call(thisArg, this[i], i, this);
    }
  };
}


//Отработает со всеми списками на странице
document.querySelectorAll('.dropdown').forEach(function (dropDownWrapper) {
  const dropDownBtn = dropDownWrapper.querySelector('.dropdown__button');
  const dropDownList = dropDownWrapper.querySelector('.dropdown__list');
  const dropDownListItems = dropDownList.querySelectorAll('.dropdown__list-item');
  const dropDownInput = dropDownWrapper.querySelector('.dropdown__input-hidden');

  //Клик по кнопке. Открыть/Закрыть select
  dropDownBtn.addEventListener('click', function (e) {
    dropDownList.classList.toggle('dropdown__list--visible');
    this.classList.add('dropdown__button--active');
  });

  //Выбор элемента списка. Запомнить выбранное значение. Закрыть дропдаун

  dropDownListItems.forEach(function (listItem) {
    listItem.addEventListener('click', function (e) {
      e.stopPropagation();
      dropDownBtn.innerText = this.innerText;
      dropDownBtn.focus();
      dropDownInput.value = this.dataset.value;
      dropDownList.classList.remove('dropdown__list--visible');

      if (dropDownInput.value === '1' || dropDownInput.value === '3' || dropDownInput.value === '5' || dropDownInput.value === '7' || dropDownInput.value === '8' || dropDownInput.value === '10' || dropDownInput.value === '12') {
        numberOfDays = 31;
      } else if (dropDownInput.value === '4' || dropDownInput.value === '6' || dropDownInput.value === '9' || dropDownInput.value === '11') {
        numberOfDays = 30;
      } else if (dropDownInput.value === '2') {
        numberOfDays = 28;
      } else {
        numberOfDays = 0;
      }

      calculationPrecents();
    });
  });

  //Клик снаружи дропдауна. Закрыть дропдаун
  document.addEventListener('click', function (e) {
    if (e.target !== dropDownBtn) {
      dropDownBtn.classList.remove('dropdown__button--active');
      dropDownList.classList.remove('dropdown__list--visible');
    }
  });

  //Нажатие на Tab или Escape. Закрыть дропдаун
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Tab' || e.key === 'Escape') {
      dropDownBtn.classList.remove('dropdown__button--active');
      dropDownList.classList.remove('dropdown__list--visible');
    }
  });

  //income inputs
  const incomeSalary = document.getElementById('income_salary'),
    incomeFreelance = document.getElementById('income_freelance'),
    incomeExtra1 = document.getElementById('income_extra_1'),
    incomeExtra2 = document.getElementById('income_extra_2');

  //costs inputs
  const costsFlat = document.getElementById('costs_flat'),
    costsHouseServices = document.getElementById('costs_house_services'),
    costsTransport = document.getElementById('costs_transport'),
    costsCredit = document.getElementById('costs_credit');

  //total inputs
  const totalMonthInput = document.getElementById('total_month'),
    totalDayInput = document.getElementById('total_day'),
    totalYearInput = document.getElementById('total_year');

  let totalMonth, totalDay, totalYear;

  //money box
  const moneyBoxRange = document.getElementById('money_box_range'),
    accumulationInput = document.getElementById('accumulation'),
    spend = document.getElementById('spend');

  let accumulation = 0;
  let totalPrecents = 0;

  const inputs = document.querySelectorAll('.input');
  for (input of inputs) {
    input.addEventListener('input', () => {
      countingAvailableMoney();
      calculationPrecents();
    })
  }

  const stringToNumber = str => str.value ? parseInt(str.value) : 0

  const countingAvailableMoney = () => {
    const totalPerMonth = stringToNumber(incomeSalary) + stringToNumber(incomeFreelance) + stringToNumber(incomeExtra1) + stringToNumber(incomeExtra2);
    const totalCosts = stringToNumber(costsFlat) + stringToNumber(costsHouseServices) + stringToNumber(costsTransport) + stringToNumber(costsCredit);

    totalMonth = totalPerMonth - totalCosts;
    totalMonthInput.value = totalMonth;
  }

  moneyBoxRange.addEventListener('input', e => {
    const totalPrecentEl = document.getElementById('total_precents');
    totalPrecents = e.target.value;
    totalPrecentEl.innerHTML = totalPrecents;
    calculationPrecents();
  });

  const calculationPrecents = () => {
    accumulation = ((totalMonth * totalPrecents) / 100).toFixed();
    accumulationInput.value = accumulation;

    spend.value = totalMonth - accumulation;

    totalDay = (spend.value / numberOfDays).toFixed(2);
    totalDayInput.value = totalDay;

    totalYear = accumulation * 12;
    totalYearInput.value = totalYear;
  };
});