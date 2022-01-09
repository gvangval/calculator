   $(document).ready(function() {
            $('.calculatormin-button:first').addClass('active-button');
            let val = $('.active-button').text();
            let cost = getCostPerMts2(Number(val)).replace(' ₾', '');
            let selectVal = $('.calculatormin-select option:selected').val();
            let costAdd = getCostAddWork(selectVal).replace(' ₾', '');
            let totalCost = Number(costAdd) + Number(cost);
            $('.calculatormin-total').html('ფასი: ' + totalCost + " ₾");

        });

        //event click on buttons mts2
        $('.calculatormin-button').click(function() {
            $('.calculatormin-button').removeClass('active-button').removeAttr('style');
            $(this).addClass('active-button');
            let val = $('.active-button').text();
            if ($('.active-button').is('#calculatormin-button-input')) {
                $('#calculatormin-input').focus();
                val = $('#calculatormin-input').val();
                if ($('#calculatormin-input').val() == '') {
                    $('.calculatormin-total').html('');
                }
            }

            if (val.trim() != '') {
                let cost = getCostPerMts2(Number(val)).replace(' ₾', '');
                let selectVal = $('.calculatormin-select option:selected').val();
                let costAdd = getCostAddWork(selectVal).replace(' ₾', '');
                let totalCost = Number(costAdd) + Number(cost);
                $('.calculatormin-total').html('ფასი: ' + totalCost + " ₾");
            }
        });

        //check if input has value
        $("#calculatormin-input").on("input", function(e) {
            var totalCost = 0;
            this.value = this.value.replace(/[^0-9]/g, ''); //let only numbers
            var val = $(this).val();
            if (val.trim() != '') {
                let cost = getCostPerMts2(Number(val)).replace(' ₾', '');
                let selectVal = $('.calculatormin-select option:selected').val();
                let costAdd = getCostAddWork(selectVal).replace(' ₾', '');
                let totalCost = Number(costAdd) + Number(cost);
                $('.calculatormin-total').html('ფასი: ' + totalCost + " ₾");
            } else {
                $('.calculatormin-total').html('');
            }
        });


        //add work on select option change
        $('.calculatormin-select').on('change', function() {
            if ($('.active-button').is('#calculatormin-button-input')) {
                var val = $('.calculatormin-input').val();
            } else {
                var val = $('.active-button').text();
            }
            let cost = getCostPerMts2(Number(val)).replace(' ₾', '');
            let costAdd = getCostAddWork(this.value).replace(' ₾', '');
            let totalCost = Number(costAdd) + Number(cost);
            $('.calculatormin-total').html('ფასი: ' + totalCost + " ₾");
        });

        //event on button order
        $('.calculatormin-wrapper #btn-order').on('click', function() {
            var totalCost = Number($('.calculatormin-total').html().replace(' ₾', ''));
            if (totalCost === 0) {
                alert("Please add your order");
            } else {
           
                var total_str = $('.calculatormin-total').text();
                var total = total_str.match(/\d+/)[0];

                var service_name = $('select.calculatormin-select :selected').text();

                let area = $('.active-button').text();
                if ($('.active-button').is('#calculatormin-button-input')) { 
                    area = $('#calculatormin-input').val();
                }
                area = area + 'm²';  
                 
                $.ajax({
                    url : calculator_short.ajaxurl,
                    type : 'post',
                    data : {
                        action : 'calculator_short_add_cart',
                        service_name: service_name,
                        area: area, 
                        total: total
                    },
                    beforeSend: function(){
                    },
                    success : function( data ) {
                        location.href = data;
                    }
                });
            }
        });


        /* FUNCTIONS */

        //return cost per m²
        function getCostPerMts2(meters) {
            let cost = meters * 1.75 + " ₾";
            return cost;
        }

        //return cost per Ironing
        function getCostPerIroning(quantity) {
            let cost = quantity * 3 + " ₾";
            return cost;
        }

        //return cost per Hourly Work
        function getCostPerHourlyWork(quantity) {
            let cost = quantity * 11 + " ₾";
            return cost;
        }

        //return cost per Laundry
        function getCostPerLaundry(quantity) {
            let cost = quantity * 15 + " ₾";
            return cost;
        }

        //return cost per Balcony
        function getCostPerBalcony(quantity) {
            let cost = quantity * 13 + " ₾";
            return cost;
        }

        //return cost per Window Grilles
        function getCostPerWindow(quantity) {
            let cost = quantity * 16 + " ₾";
            return cost;
        }

        //return cost per Blinds
        function getCostPerBlinds(quantity) {
            let cost = quantity * 26 + " ₾";
            return cost;
        }

        //return cost per Reading
        function getCostPerReading(quantity) {
            let cost = quantity * 33 + " ₾";
            return cost;
        }

        function getCostAddWork(selectVal) {
            var cost;
            var inputVal = 1;
            switch (selectVal) {
                case '1':
                    cost = getCostPerIroning(inputVal);
                    break;
                case '2':
                    cost = getCostPerHourlyWork(inputVal);
                    break;
                case '3':
                    cost = getCostPerLaundry(inputVal);
                    break;
                case '4':
                    cost = getCostPerBalcony(inputVal);
                    break;
                case '5':
                    cost = getCostPerWindow(inputVal);
                    break;
                case '6':
                    cost = getCostPerBlinds(inputVal);
                    break;
                case '7':
                    cost = getCostPerReading(inputVal);
                    break;
            }
            return cost;
        }
