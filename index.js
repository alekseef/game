window.onload = function() {
     for (let i=0; i<50; i++) {
          update_stocks();
     }
     update();
     setTimeout("create_led(0)",0);
     setTimeout("led_go()",1);
     setTimeout("delete_led()",1700*speed_led);
};
var div_money = document.getElementById("money");
var div_income_total = document.getElementById('income_total');
var div_outlay_total = document.getElementById('outlay_total');
var div_potok = document.getElementById('potok_money');

var div_imcome_name = document.getElementById('imcome_name');
var div_imcome_money = document.getElementById('imcome_money');
var div_outlay_name = document.getElementById('outlay_name');
var div_outlay_money = document.getElementById('outlay_money');

var div_active_type = document.getElementById('active_type');
var div_active_name = document.getElementById('active_name');
var div_active_count = document.getElementById('active_count');
var div_active_profit = document.getElementById('active_profit');
var div_active_price = document.getElementById('active_price');
var div_passive_type = document.getElementById('passive_type');
var div_passive_name = document.getElementById('passive_name');
var div_passive_pay = document.getElementById('passive_pay');
var div_passive_debt = document.getElementById('passive_debt');

var div_passive_type_bank = document.getElementById('bank_passive_type');
var div_passive_name_bank = document.getElementById('bank_passive_name');
var div_passive_pay_bank = document.getElementById('bank_passive_pay');
var div_passive_debt_bank = document.getElementById('bank_passive_debt');
var led = document.getElementById('led');
var progress;
var currency = "₽";
//Процентная ставка для банка
var bank_rate = 30;
var bank_rate_deposit = 10;
//Стартовые деньги
var money = 1000;
var money_income;
var money_outlay;
var potok_money;

//Банк
var diolog_banker = document.getElementById('diolog_banker');
var min_sum_credit = 30000;
var max_sum_credit;
var card_limit = 300000;
var card = card_limit;
var card_commission = 7;
var card_rate = 12;
var card_payout = 0;

var base_imcome_name = ["Заработаная плата"];
var base_imcome_money = [80000];
var imcome_name = [];
var imcome_money = [];
var base_outlay_name = ["Квартплата", "Питание", "Дети"];
var base_outlay_money = [30000, 20000, 25000];
var outlay_name = [];
var outlay_money = [];

var names_actives =
//Тип              Название           Количество   Доход     Цена
["type",           "name",            "count",     "profit",  "price"];
var active = [
     [],
     ["Недвижимость",   "2x-ком кв.",       1,          16000,      200000],
     ["Облигации",      "Обл. Сбербанк",    20,          2000,       20000],
];
var names_passives =
//Тип              Название              Выплаты    Долг
["type",           "name",               "pay",     "debt"];
var passive = [
     [],
     ["Кредит",         "Кредит Тинькофф",     2500,       10000],
     ["Кредит",         "Кредит Сбербанк",     3000,        5000],
     ["Кредит",         "Ссуда за Машину",    15000,       20000],
];
var stocks = [
     [],
     ["Газпром", 1500],
     ["Лукоил", 1200],
     ["Роснефть", 1000],
     ["Мтс", 500],
     ["Яндекс", 700],
     ["АвтоВАЗ", 200]
];







function update() {
     update_stocks();
     //Высчитываем сумму выплаты по кредиту
     var arr_yes = in_array("Кредит в Банке", passive, 1);
     if (arr_yes != false) {
         passive[arr_yes][2] = Math.round((passive[arr_yes][3] / 100 * bank_rate) / 12);
     }
     var arr_yes = in_array("Кредитка", passive, 1);
     if (arr_yes != false) {
         passive[arr_yes][2] = Math.round((passive[arr_yes][3] / 100 * card_rate) / 12);
         card_payout = passive[arr_yes][2];
         if (passive[arr_yes][2] < 50) {
              card_payout = 1;
         }
     }
     var arr_yes = in_array("Кредитка", passive, 1);
     if (arr_yes != false) {
          if (passive[arr_yes][3] <= 0) {
               passive.splice(arr_yes, 1);
          }
     }

     //Высчитываем выплаты по депозиту
     var arr_yes = in_array("Вклад под 10%", active, 1);
     if (arr_yes != false) {
         active[arr_yes][3] = Math.round((active[arr_yes][4] / 100 * bank_rate_deposit) / 12);
     }

     imcome_name = [];
     imcome_name = imcome_name.concat(base_imcome_name);
     imcome_money = [];
     imcome_money = imcome_money.concat(base_imcome_money);
     outlay_name = [];
     outlay_name = outlay_name.concat(base_outlay_name);
     outlay_money = [];
     outlay_money = outlay_money.concat(base_outlay_money);

     //Добавляем в Доходы актуальные Активы
     active.forEach(function(item, i, elem) {
          if (active[i][3] > 0) {
               imcome_name.push(active[i][1]);
               imcome_money.push(active[i][3]);
          }
     });
     passive.forEach(function(item, i, elem) {
          if (passive[i][2] > 0) {
               outlay_name.push(passive[i][1]);
               outlay_money.push(passive[i][2]);
          }
     });

     //Подсчитываем доходы,расходы
     money_income = 0;
     imcome_money.forEach(function(item, i, elem) {
          money_income = money_income + item;
     });
     money_outlay = 0;
     outlay_money.forEach(function(item, i, elem) {
          money_outlay = money_outlay + item;
     });
     money_outlay = -money_outlay;
     potok_money = money_income + money_outlay;

     //Высчитываем какая сумма кредита доступна
     var arr_yes = in_array("Кредит в Банке", passive, 1);
     if (arr_yes != false) {
          max_sum_credit = (((money_income * 12 * 100) / bank_rate) / 100 * 30) - (passive[arr_yes][3]);
     } else {
          max_sum_credit = (((money_income * 12 * 100) / bank_rate) / 100 * 30);
     }
     google.charts.load('current', {packages: ['corechart', 'line']});
     google.charts.setOnLoadCallback(drawLineColors);
     display();
}
function next() {
     money = money + potok_money;
     update();
}
function create_klad() {
     active.splice(-1,1);
     update();
}
//------------------------------------------------------------
//Выводим актуальные значения
function display() {

     display_div(imcome_name, "text", div_imcome_name, ":", "");
     display_div(imcome_money, "money", div_imcome_money, " "+currency, "+ ");
     display_div(outlay_name, "text", div_outlay_name, ":", "");
     display_div(outlay_money, "money", div_outlay_money, " "+currency, "- ");

     names_actives.forEach(function(item, i, elem) {
          display_div_new(active, window["div_active_"+item], i);
     });
     names_passives.forEach(function(item, i, elem) {
          display_div_new(passive, window["div_passive_"+item], i);
     });
     names_passives.forEach(function(item, i, elem) {
          display_div_new(passive, window["div_passive_"+item+"_bank"], i);
     });

     div_money.innerHTML = money;
     div_income_total.innerHTML = minus_plus(money_income);
     div_outlay_total.innerHTML = minus_plus(money_outlay);
     div_potok.innerHTML = minus_plus(potok_money);
     div_income_total.classList.add("green");
     div_outlay_total.classList.add("red");
     div_potok.classList.remove("green");
     div_potok.classList.remove("red");
     potok_money >= 0 ? div_potok.classList.add("green") : div_potok.classList.add("red")
     close_deposit_update();
     document.getElementById('card_limit').innerHTML = "Кредитный лимит на карте: "+card_limit+" ₽.";
     document.getElementById('card').innerHTML = "Доступно: "+card+" ₽.";
     document.getElementById('card_commission').innerHTML = "Коммисия за снятие наличных: "+card_commission+" %.";
     document.getElementById('card_payout').innerHTML = "Выплаты по кредитной карте: "+card_payout+" ₽.";
     document.getElementById('card_dolg').innerHTML = "Задолжность: "+int(card-card_limit)+" ₽.";
}

function display_div(elem, name_class, div_elem, pin, sign) {
     while (div_elem.firstChild) {
         div_elem.removeChild(div_elem.firstChild);}
     elem.forEach(function(item, i, elem) {
         var elem_name = document.createElement('div');
         elem_name.classList.add(name_class)
         var elem_text = document.createTextNode(sign+item+pin);
         elem_name.appendChild(elem_text);
         div_elem.appendChild(elem_name);
     });
}

function display_div_new(elem, div_elem, k) {
     var pin;
     var sign;
     while (div_elem.firstChild) {
         div_elem.removeChild(div_elem.firstChild);
     }
     elem.forEach(function(item, i, elem) {
     if (i != 0) {
          var elem_name = document.createElement('div');
          elem_name.classList.add("text");
          if (div_elem === div_active_profit || div_elem === div_active_price || div_elem === div_passive_pay || div_elem === passive_debt) {
              pin = " "+currency;} else {pin = "";
          }
          if (div_elem === div_active_profit) {
               sign = "+ ";} else {sign = "";}
          if (div_elem === div_passive_pay) {
               sign = "- ";} else {sign = "";}
          var elem_text = document.createTextNode(sign+item[k]+pin);
          elem_name.appendChild(elem_text);
          div_elem.appendChild(elem_name);
          if (div_elem === div_passive_name_bank) {
              elem_name.setAttribute('onclick', 'return choose_credit("'+elem_name.innerHTML+'");');
          }
     }
     });
}



////////////////////////////////////////////////////////////////////////
/////////// Светодиодный дисплэй
////////////////////////////////////////////////////////////////////////
var speed_led = 7;
var text_time_led;
var what_rate;
function led_go(i) {
     var elements = document.querySelectorAll("div.rate");
     for (let elem of elements) {
          let obj = elem.style.left;
          obj.substring(0, obj.length - 2);
               obj = int(obj) - 1;
               elem.setAttribute('style', 'left: '+obj+'px;');
     }
     setTimeout("led_go()",speed_led);
}
function create_led(i) {
     i = i + 1;
     if (i == stocks.length) i = 1;
     let elem_name = document.createElement('div');
     elem_name.classList.add("rate");
     elem_name.setAttribute('style', 'left: 1230px;');
     let div_led_name = document.createElement('div');
     div_led_name.classList.add("rate_name");
     let div_led_value = document.createElement('div');
     div_led_value.classList.add("rate_value");
     let text = stocks[i][0];
     let value;
     if (stocks[i][stocks[i].length - 1] < stocks[i][stocks[i].length - 2]) {
          value = stocks[i][stocks[i].length - 1]+"▼";
          div_led_value.classList.add("rate_color_red");
     } else if (stocks[i][stocks[i].length - 1] == stocks[i][stocks[i].length - 2]) {
          value = stocks[i][stocks[i].length - 1]+" ";
     } else {
          value = stocks[i][stocks[i].length - 1]+"▲";
          div_led_value.classList.add("rate_color_green");
     }
     div_led_name.appendChild(document.createTextNode(text));
     div_led_value.appendChild(document.createTextNode(value));
     led.appendChild(elem_name);
     elem_name.appendChild(div_led_name);
     elem_name.appendChild(div_led_value);
     //text_time_led = int(text.length) + int(value.length);
     text_time_led = elem_name.offsetWidth / 13;
     setTimeout(create_led, speed_led*20*text_time_led, i);
}
function delete_led() {
     led.removeChild(led.firstChild);
     setTimeout(delete_led, speed_led*20*text_time_led);
}
////////////////////////////////////////////////////////////////////////
/////////// Курс акций
////////////////////////////////////////////////////////////////////////
//пока так... потом сделаю более интересно.
function update_stocks() {
     for (let i=1; i<stocks.length; i++) {
          let last_value = stocks[i][stocks[i].length - 1];
          if (last_value > 0 ) {
               if (last_value < 10) {
                    random_value = random_int( 0, 3);
               } else if (last_value >= 10 && last_value < 25) {
                    random_value = random_int( -2, 5);
               } else if (last_value >= 25 && last_value < 50) {
                    random_value = random_int( random_int( -5, 0), random_int( 5, 10));
               } else if (last_value >= 50 && last_value < 100) {
                    random_value = random_int( random_int( -10, 0), random_int( 0, 10));
               } else if (last_value >= 100 && last_value < 200) {
                    random_value = random_int( random_int( -25, 0), random_int( 0, 25));
               } else if (last_value >= 200 && last_value < 500) {
                    random_value = random_int( random_int( -50, -10), random_int( 10, 50));
               } else {
                    random_value = random_int( random_int( -100, -50), random_int( 50, 100));
               }
          }
          stocks[i].push(last_value+random_value);
     }
}
////////////////////////////////////////////////////////////////////////
/////////// Банкомат
////////////////////////////////////////////////////////////////////////
function get_cash_bankomat() {
     var input_cash_bankomat = document.getElementById('input_cash_bankomat');
     if (input_cash_bankomat.value != "" && input_cash_bankomat.value >= 50 && input_cash_bankomat.value <= int(card)) {
          var arr_yes = in_array("Кредитка", passive, 1);
          if (arr_yes != false) {
              passive[arr_yes][3] = int(input_cash_bankomat.value) +  int(passive[arr_yes][3]);
              money = int(money + (int(input_cash_bankomat.value) - int(input_cash_bankomat.value) / 100 * card_commission));
             card = card - int(input_cash_bankomat.value);
          } else {
               passive.push(["Кредитная карта", "Кредитка", 0, input_cash_bankomat.value]);
               money = int(money + (int(input_cash_bankomat.value) - int(input_cash_bankomat.value) / 100 * card_commission));
               card = card - int(input_cash_bankomat.value);
          }
     }
     input_cash_bankomat.value = "";
     update();
}
function refill_bankomat() {
     var input_cash_bankomat = document.getElementById('input_cash_bankomat');
     if (input_cash_bankomat.value != "" && card_limit-card > 0) {
          if (input_cash_bankomat.value > card_limit-card) {
               input_cash_bankomat.value = card_limit-card;
          }
          var arr_yes = in_array("Кредитка", passive, 1);
          if (input_cash_bankomat.value >= passive[arr_yes][3]) {
               input_cash_bankomat.value = passive[arr_yes][3];
          }
          if (money >= input_cash_bankomat.value) {
               card = card + int(input_cash_bankomat.value);
               money = money - int(input_cash_bankomat.value);
               passive[arr_yes][3] = int(passive[arr_yes][3]) - input_cash_bankomat.value;
          }
          input_cash_bankomat.value = "";
          update();
     }
}
////////////////////////////////////////////////////////////////////////
/////////// Bank
////////////////////////////////////////////////////////////////////////
var bank_what_pay;
function credit() {
      var input_sum_credit = document.getElementById('input_credit').value;
      var arr_yes = in_array("Кредит в Банке", passive, 1);
      if (input_sum_credit != "") {
           if (input_sum_credit >= min_sum_credit && input_sum_credit <= max_sum_credit) {
                if (arr_yes != false) {
                    passive[arr_yes][3] = parseInt(input_sum_credit, 10) + parseInt(passive[arr_yes][3], 10);
                    money = money + parseInt(input_sum_credit);
                    update();
                } else {
                     passive.push(["Кредит", "Кредит в Банке", 0, input_sum_credit]);
                     money = money + parseInt(input_sum_credit);
                     update();
                }
                diolog_banker.innerHTML = "Приятно с вами соотрудничать. Ваша сумма " + input_sum_credit + " ₽ уже зачислена на ваш счет.";
           } else {
               if (input_sum_credit < min_sum_credit) {
               diolog_banker.innerHTML = "Наш банк, выдает кредиты только от "+min_sum_credit+" ₽.";
               }
               if (input_sum_credit > max_sum_credit) {
               diolog_banker.innerHTML = "Мы не можем выдать вам сумму превышающую "+max_sum_credit+" ₽, так как выплаты по кредиту привышают сумму вашего дохода.";
               }
           }
           document.getElementById('input_credit').value = '';
      } else {
           diolog_banker.innerHTML = "Друг мой, о какой сумме идет речь?";
      }
}
function deposit() {
     var input_sum_deposit = document.getElementById('input_deposit').value;
     var arr_yes = in_array("Вклад под 10%", active, 1);
     if (input_sum_deposit != "") {
           if (input_sum_deposit >= 50000) {
                if(input_sum_deposit <= money) {
                     if (arr_yes != false) {
                          active[arr_yes][4] = parseInt(input_sum_deposit, 10) + parseInt(active[arr_yes][4], 10);
                          money = money - parseInt(input_sum_deposit);
                          update();
                     } else {
                          active.push(["Вклад", "Вклад под 10%", "-", 1000, input_sum_deposit]);
                          money = money - parseInt(input_sum_deposit);
                          update();
                     }
                } else {
                     diolog_banker.innerHTML = "Дружище, как найдешь деньги, тогда приходи. Не трать не мое время не свое...";
                }
           } else {
               diolog_banker.innerHTML = "Наш банк принимает вклады только от 50000 ₽.";
           }
           document.getElementById('input_deposit').value = '';
     } else {
          diolog_banker.innerHTML = "Друг мой, мы не принимаем пустые вклады...";
     }
}
function out_bank() {
     diolog_banker.innerHTML = "Наш банк может одобрить вам кредит до "+max_sum_credit+" ₽.";
}
function go_credit(){
     diolog_banker.innerHTML = "Наш банк может одобрить вам кредит до "+max_sum_credit+" ₽.";
}
function go_vklad(){
     diolog_banker.innerHTML = "Так же Вы можете вложить свое деньги в наш вклад под процент.";
}
function choose_credit(id) {
     diolog_banker.innerHTML = "Вы хотите рассчитаться с вашим долгом по "+id+" ?";
     bank_what_pay = id;
}
function close_deposit_update() {
     var close_deposit = document.getElementById('close_deposit');
     var arr_yes = in_array("Вклад под 10%", active, 1);
          if (arr_yes != false) {
               close_deposit.classList.remove("not_show");
          } else {
               close_deposit.classList.add("not_show");
          }
}
function close_deposit(){
     var arr_yes = in_array("Вклад под 10%", active, 1);
     money = money + parseInt(active[arr_yes][4], 10);
     active.splice(arr_yes, 1);
     update();
}
function credit_pay() {
     var input_credit_pay = document.getElementById('input_credit_pay').value;
     if (bank_what_pay != undefined) {
          var arr_yes = in_array(bank_what_pay, passive, 1);
          if (input_credit_pay != "") {
               if (arr_yes != false) {
                    if (passive[arr_yes][3] <= input_credit_pay) {
                         input_credit_pay = passive[arr_yes][3];
                    }
                    if (money >= input_credit_pay) {
                         money = money - input_credit_pay;
                         passive[arr_yes][3] = parseInt(passive[arr_yes][3], 10) - input_credit_pay;
                         if (passive[arr_yes][3] <= 0) {
                              passive.splice(arr_yes, 1);
                              diolog_banker.innerHTML = "Ваш долг по "+bank_what_pay+"  полностью.";
                         } else {
                              diolog_banker.innerHTML = "Ваш долг по "+bank_what_pay+"  частично погашен.";
                         }
                    } else {
                         diolog_banker.innerHTML = "Хм. У вас не хватает денег друг мой...";
                    }
               }
               document.getElementById('input_credit_pay').value = "";
               update();
          } else {
               diolog_banker.innerHTML = "Сколько вы хотите погасить по "+bank_what_pay+" ?";
          }
     } else {
          diolog_banker.innerHTML = "За что вы хотите совершить выплату?";
     }
}
function in_array(value, array, k) {
     for(var i = 0; i < array.length; i++) {
          if(array[i][k] == value) return i;
     }
     return false;
}
function minus_plus(money) {
     if (money >= 0) {
          money = "+ " +String(money);
          return money;
     } else {
          money = String(money);
          money = "- " +money.replace('-', '');
          return money;
     }
}
function int(value) {
     return parseInt(value, 10);
}
function random_int(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}




////////////////////////////////////////////////////////////////////////
/////////// График фондовой биржи
////////////////////////////////////////////////////////////////////////
function drawLineColors() {
      var data = new google.visualization.DataTable();
      data.addColumn('number', 'X');
      for (let i=1; i<stocks.length; i++) {
            data.addColumn('number', stocks[i][0]);
      }
        var stocks_new = [];
        for (let i=0; i<stocks[1].length-1; i++) {
             stocks_new[i] = [i];
             for (let j=1; j<stocks.length; j++) {
                  stocks_new[i].push(stocks[j][i+1]);
             }
        }
      data.addRows(stocks_new);

      var options = {
        hAxis: {
          title: 'Время'
        },
        height: 600,
        vAxis: {
          title: 'Цена'
        },
        // ["Газпром", 987],
        // ["Лукоил", 355],
        // ["Роснефть", 382],
        // ["Мтс", 122],
        // ["Яндекс", 477],
        // ["Пятерочка", 33]
        colors: ['#002EA4','#a52714', '#FFDD00','#FF0000','#FFBF00','#00CA00']
      };

      var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
      chart.draw(data, options);
}
