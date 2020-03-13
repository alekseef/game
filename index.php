<!DOCTYPE html>
<html lang="en" dir="ltr">
     <head>
          <meta charset="utf-8">
          <title>Game</title>
          <link rel="shortcut icon" href="img/favicon.ico" type="image/x-icon">
          <link rel="stylesheet" href="main.css">
          <link rel="stylesheet" href="style.css">
          <link rel="stylesheet" href="buttons.css">
          <link rel="stylesheet" href="okno.css">
          <link rel="stylesheet" href="banks.css">
          <link rel="stylesheet" href="bankomat.css">
          <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
     </head>
     <body>
          <div class="main">
               <header>
                    <div class="my_money">Наличные: <font id="money"></font> ₽</div>

                    <a href="#window_bankomat">
                    <div class="header_btn bankomat">
                         <img src="img/bankomat.png" alt="">
                    </div>
                    </a>
                    <a href="#window_stock_exchange">
                    <div class="header_btn stock_exchange">
                         <img src="img/stock_exchange.png" alt="">
                    </div>
                    </a>
                    <a href="#window_sell">
                    <div class="header_btn sells">
                         <img src="img/sell.png" alt="">
                    </div>
                    </a>
                    <a href="#window_banks" onclick="return out_bank();">
                    <div class="header_btn banks">
                         <img src="img/banks.png" alt="">
                    </div>
                    </a>
               </header>



               <div class="">
                    <div class="container">
                         <div class="line">
                              <div class="line_text" id="led"></div>
                              <div class="line_cover"></div>
                         </div>
                    </div>
               </div>







               <section class="base">
                    <div class="income_outlay">
                         <div class="income">
                              <div class="header_text">
                                   Доходы:<font class="header_money"><font id="income_total"></font> ₽</font>
                              </div>
                              <div class="poles">
                                   <div id="imcome_name" class="pole_name"></div>
                                   <div  id="imcome_money" class="pole_money"></div>
                              </div>
                         </div>
                         <div class="outlay">
                              <div class="header_text">
                                   Расходы:<font class="header_money"><font id="outlay_total"></font> ₽</font>
                              </div>
                              <div class="poles">
                                   <div id="outlay_name" class="pole_name"></div>
                                   <div id="outlay_money" class="pole_money"></div>
                              </div>
                         </div>
                         <div class="potok">
                              <div class="header_potok">
                                   Денежный поток:<font class="header_money"><font id="potok_money"></font> ₽</font>
                              </div>
                         </div>
                    </div>
                    <div class="game_block">
                         <button class="button_next" type="button" name="button" onclick="return next();">Следующий ход</button>
                    </div>

               </section>
               <section class="active_passive">
                    <div class="active">
                         <div class="header_text">
                              Активы:
                         </div>
                         <div class="poles">
                              <div class="pole_big text_t">Тип</div>
                              <div class="pole_big text_t">Название</div>
                              <div class="pole text_t">Количество</div>
                              <div class="pole text_t">Доход</div>
                              <div class="pole text_t">Цена</div>
                         </div>
                         <div class="poles">
                              <div id="active_type" class="pole_big"></div>
                              <div id="active_name" class="pole_big"></div>
                              <div id="active_count" class="pole"></div>
                              <div id="active_profit" class="pole"></div>
                              <div id="active_price" class="pole"></div>
                         </div>
                    </div>
                    <div class="passive">
                         <div class="header_text">
                              Пассивы:
                         </div>
                         <div class="poles">
                              <div class="pole_2 text_t">Тип</div>
                              <div class="pole_2_big text_t">Название</div>
                              <div class="pole_2 text_t">Выплаты</div>
                              <div class="pole_2 text_t">Долг</div>
                         </div>
                         <div class="poles">
                              <div id="passive_type" class="pole_2"></div>
                              <div id="passive_name" class="pole_2_big"></div>
                              <div id="passive_pay" class="pole_2"></div>
                              <div id="passive_debt" class="pole_2"></div>
                         </div>
                    </div>
               </section>
               <footer>
                    footer
               </footer>
          </div>
          <!-- Банк -->
               <a href="#x" class="overlay" id="window_bankomat" onclick="return out_bank();"></a>
               <div class="popup" style="max-width: 600px;">
                    <div class="bankomat">
                         <center>
                              <h1>Банкомат</h1>
                         </center>
                         <div class="bankomat_display">
                              <div id="card_limit"></div>
                              <div id="card"></div>
                              <div id="card_dolg"></div>
                              <div id="card_commission"></div>
                              <div id="card_payout"></div>
                              <div class="bankomat_dop"></div>
                              <center>
                                   <input type="text" onkeyup="this.value = this.value.replace (/\D/gi, '').replace (/^0+/, '')" id="input_cash_bankomat" class="input_bank" value="" placeholder="Введите сумму ..." pattern="[0-9]{5,10}">
                              </center>
                              <center>
                                   <div class="">
                                        <button class="button_bank bankomat_btn" type="button" name="button" onclick="return refill_bankomat();">Пополнить</button>
                                        <button class="button_bank bankomat_btn" type="button" name="button" onclick="return get_cash_bankomat();">Снять</button>
                                   </div>
                              </center>
                         </div>
                    </div>
               </div>


               <a href="#x" class="overlay" id="window_stock_exchange" onclick="return out_bank();"></a>
               <div class="popup">
                     <div id="chart_div"></div>
               </div>
               <a href="#x" class="overlay" id="window_sell" onclick="return out_bank();"></a>
               <div class="popup">
                    Тут купля\продажа
               </div>






               <a href="#x" class="overlay" id="window_banks" onclick="return out_bank();"></a>
               <div class="popup" style="max-width: 600px;">
                    <img class="img_bank" src="img/bank.png" alt="">
                    <div class="bank_diolog">
                         <div id="diolog_banker" class="diolog_text"></div>
                         <img src="img/banker.png" alt="">
                         <img id="img_diolog" src="img/banker_diolog.png" alt="">
                    </div>
                    <div class="bank">
                         <div class="tabs_bank">
                              <input id="tab1" type="radio" name="tabs_bank" checked>
                              <label for="tab1" onclick="return go_credit();">Кредит</label>
                              <input id="tab2" type="radio" name="tabs_bank">
                              <label for="tab2" onclick="return go_vklad();">Вклад</label>
                              <div id="content-tab1">
                                   <div class="center">
                                        <h3>Оформить кредит:</h3>
                                        <div id="bank_form">
                                           <input type="text" onkeyup="this.value = this.value.replace (/\D/gi, '').replace (/^0+/, '')" id="input_credit" class="input_bank" value="" placeholder="Введите сумму ..." pattern="[0-9]{5,10}">
                                           <font> ₽</font>
                                           <button class="button_bank" type="button" name="button" onclick="return credit();">Взять кредит</button>
                                           <div class="bank_mini_text red">
                                                 Процентная ставка по кредиту 25% в год.
                                           </div>
                                        </div>
                                        <hr>
                                        <h3>Ваши кредиты:</h3>
                                        <div class="passive_bank">
                                        <div class="poles">
                                             <div class="pole_bank_shot text_t">Тип</div>
                                             <div class="pole_bank_big text_t">Название</div>
                                             <div class="pole_bank_shot text_t">Выплаты</div>
                                             <div class="pole_bank_shot text_t">Долг</div>
                                        </div>
                                        <div class="poles">
                                             <div id="bank_passive_type" class="pole_bank_shot"></div>
                                             <div id="bank_passive_name" class="pole_bank_big"></div>
                                             <div id="bank_passive_pay" class="pole_bank_shot"></div>
                                             <div id="bank_passive_debt" class="pole_bank_shot"></div>
                                        </div>
                                        </div>
                                        <div class="">
                                             Выберете за что хотите рассчитаться и введите нужную сумму.
                                        </div>
                                        <div class="">
                                             <input type="text" onkeyup="this.value = this.value.replace (/\D/gi, '').replace (/^0+/, '')" id="input_credit_pay" class="input_bank" value="" placeholder="Введите сумму ..." pattern="[0-9]{5,10}">
                                             <font> ₽</font>
                                             <button class="button_bank" type="button" name="button" onclick="return credit_pay();">Погасить</button>
                                        </div>
                                   </div>

                           </div>
                           <div id="content-tab2">
                                <div class="center">
                                     <div id="bank_form">
                                         <input type="text" onkeyup="this.value = this.value.replace (/\D/gi, '').replace (/^0+/, '')" id="input_deposit"  class="input_bank" value="" placeholder="Введите сумму ..." pattern="[0-9]{5,10}">
                                         <font> ₽</font>
                                         <button class="button_bank" type="button" name="button" onclick="return deposit();">Открыть вклад</button>
                                         <div class="bank_mini_text green">
                                              Процентная ставка по вкладу 10% в год.
                                         </div>
                                         <div class="">
                                              <button id="close_deposit" class="button_bank" type="button" name="button" onclick="return close_deposit();">Закрыть вклад</button>
                                         </div>
                                     </div>
                                </div>
                           </div>
                         </div>
                    </div>
                    <a class="close"title="Закрыть" href="#close" onclick="return out_bank();"></a>
               </div>



          <script src="index.js"></script>
          <script src="okno.js"></script>
     </body>
</html>
