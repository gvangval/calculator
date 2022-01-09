$(document).ready(function() {
        $('.calculator-button:first').addClass('active-button');
        let val = $('.active-button').text();
        let cost = getCostPerMts2(Number(val));
        $('#cost-mts2').html(cost);
        $('#calculator-summary-mts2').html("კვადრატულის ჯამი x " + val + " m²");
        $('#cost-total').html(cost);
        $('.calculator-input').after(`<span class="calculator-button-m2"> m²</span>`);
    });

    //event click on buttons mts2
    $('.calculator-button').click(function() {
        var totalCost = 0;
        $('.calculator-button').removeClass('active-button').removeAttr('style');
        $(this).addClass('active-button');
        let val = $('.active-button').text();
        if ($('.active-button').is('#calculator-button-input')) {
            $('#calculator-input').focus();
            val = $('#calculator-input').val();
            if ($('#calculator-input').val() == '') {
                $('#calculator-summary-mts2').html("");
                $('#cost-mts2').html("");
            }
        }

        if (val.trim() != '') {
            let cost = getCostPerMts2(Number(val));
            $('#cost-mts2').html(cost);
            totalCost = Number(cost.replace(' ₾', ''));
            $('#calculator-summary-mts2').html("კვადრატულის ჯამი x " + val + " m²");
        }

        //check if checkbox washing is checked
        if ($('#w-washing').is(":checked") && val.trim() !== '') {
            let cost = getCostPerWashing(Number(val));
            $('#cost-w-washing').html(cost);
            $('#calculator-summary-w-washing').html("Window washing x " + val + " m²");
            totalCost = totalCost + Number(cost.replace(' ₾', ''));
        } else {
            $('#calculator-summary-w-washing').html("");
            $('#cost-w-washing').html("");
        }

        //check if checkbox cleaning meters is checked
        if ($('#cleaning-m').is(":checked") && val.trim() !== '') {
            let cost = getCostPerCleaningMeters(Number(val));
            $('#cost-cleaning-m').html(cost);
            $('#calculator-summary-cleaning-m').html("Cleaning above 1.8 meters x " + val + " m²");
            totalCost = totalCost + Number(cost.replace(' ₾', ''));
        } else {
            $('#calculator-summary-cleaning-m').html("");
            $('#cost-cleaning-m').html("");
        }

        //check if checkbox cleaning eco-friendly is checked
        if ($('#cleaning-ef').is(":checked") && val.trim() !== '') {
            let cost = getCostPerCleaningEF(Number(val));
            $('#cost-cleaning-ef').html(cost);
            $('#calculator-summary-cleaning-ef').html("Cleaning by eco-friendly means x " + val + " m²");
            totalCost = totalCost + Number(cost.replace(' ₾', ''));
        } else {
            $('#calculator-summary-cleaning-ef').html("");
            $('#cost-cleaning-ef').html("");
        }

        var addCost = getTotalCostAdditionalWork();
        if ($('.active-button').is('#calculator-button-input') && val == '') {
            if (addCost === 0) {
                $('#cost-total').html("");
                $('.calculator-total').html("");
            }
            else{
                $('#cost-total').html(addCost + " ₾");
            }
        } else {
            if (addCost !== 0) {
                totalCost = totalCost + addCost;
            }
            $('.calculator-total').html("ჯამი  ");
            $('#cost-total').html(totalCost + ' ₾');
        }

    });

    //check if input has value
    $("#calculator-input").on("input", function(e) {
        var totalCost = 0;
        this.value = this.value.replace(/[^0-9]/g, ''); //let only numbers
        var val = $(this).val();
        let val_washing = $('#w-washing').is(":checked");
        let val_cleaning_meters = $('#cleaning-m').is(":checked");
        let val_cleaning_ef = $('#cleaning-ef').is(":checked");

        if (val_washing === true) {
            let cost = getCostPerWashing(Number(val));
            $('#cost-w-washing').html(cost);
            totalCost = totalCost + Number(cost.replace(' ₾', ''));
            $('#calculator-summary-w-washing').html("+ ფანჯრების წმენდა x " + val + " m²");
        }
        if (val_cleaning_meters === true) {
            let cost = getCostPerCleaningMeters(Number(val));
            $('#cost-cleaning-m').html(cost);
            totalCost = totalCost + Number(cost.replace(' ₾', ''));
            $('#calculator-summary-cleaning-m').html("+ 1.8 ზემოთ x " + val + " m²");
        }
        if (val_cleaning_ef === true) {
            let cost = getCostPerCleaningEF(Number(val));
            $('#cost-cleaning-ef').html(cost);
            totalCost = totalCost + Number(cost.replace(' ₾', ''));
            $('#calculator-summary-cleaning-ef').html("+ ეკო საშუალებები x " + val + " m²");
        }

        if (val.trim() != '') {
            let cost = getCostPerMts2(Number(val));
            $('#cost-mts2').html(cost);
            totalCost = totalCost + Number(cost.replace(' ₾', ''));
            var addCost = getTotalCostAdditionalWork();
            if (addCost !== 0) {
                totalCost = totalCost + addCost;
            }
            $('#calculator-summary-mts2').html("კვადრატულის ჯამი x " + val + " m²");
            $('#cost-total').html(totalCost + ' ₾');
            $('.calculator-total').html("ჯამი ");
        } else {
            $('#calculator-summary-mts2').html("");
            $('#calculator-summary-w-washing').html("");
            $('#calculator-summary-cleaning-m').html("");
            $('#calculator-summary-cleaning-ef').html("");
            $('#cost-w-washing').html("");
            $('#cost-cleaning-m').html("");
            $('#cost-cleaning-ef').html("");
            $('#cost-mts2').html("");
            var addCost = getTotalCostAdditionalWork();
            if (addCost === 0) {
                $('.calculator-total').html("");
            }
        }
    });

    //event on checkbox washing changed
    $('#w-washing').change(function() {
        var totalCost = Number($('#cost-total').html().replace(' ₾', ''));
        if ($('#calculator-input').val() != "" && $('.active-button').is('#calculator-button-input')) {
            var val = $('#calculator-input').val();
        } else {
            var val = $('.active-button').text();
        }
        if (this.checked) {
            if (val.trim() != "") {
                $('.w-washing-p').css('display', 'block');
                var cost = getCostPerWashing(Number(val));
                $('#cost-w-washing').html(cost);
                totalCost = totalCost + Number(cost.replace(' ₾', ''));
                $('#cost-total').html(totalCost + ' ₾')
                $('#calculator-summary-w-washing').html("Window washing x " + val + " m²");
            }
        } else {
            $('.w-washing-p').css('display', 'none');
            var cost = getCostPerWashing(Number(val.trim()));
            totalCost = totalCost - Number(cost.replace(' ₾', ''));
            $('#cost-total').html(totalCost + ' ₾')
            $('#cost-w-washing').html("");
            $('#calculator-summary-w-washing').html("");
        }
    });

    //event on checkbox cleaning meters changed
    $('#cleaning-m').change(function() {
        var totalCost = Number($('#cost-total').html().replace(' ₾', ''));
        if ($('#calculator-input').val() != "" && $('.active-button').is('#calculator-button-input')) {
            var val = $('#calculator-input').val();
        } else {
            var val = $('.active-button').text();
        }
        if (this.checked) {
            if (val.trim() != "") {
                $('.cleaning-m-p').css('display', 'block');
                let cost = getCostPerCleaningMeters(Number(val));
                $('#cost-cleaning-m').html(cost);
                totalCost = totalCost + Number(cost.replace(' ₾', ''));
                $('#cost-total').html(totalCost + ' ₾')
                $('#calculator-summary-cleaning-m').html("Cleaning above 1.8 meters x " + val + " m²");
            }
        } else {
            $('.cleaning-m-p').css('display', 'none');
            var cost = getCostPerCleaningMeters(Number(val.trim()));
            totalCost = totalCost - Number(cost.replace(' ₾', ''));
            $('#cost-total').html(totalCost + ' ₾')
            $('#cost-cleaning-m').html("");
            $('#calculator-summary-cleaning-m').html("");
        }
    });

    //event on checkbox cleaning eco-friendly changed
    $('#cleaning-ef').change(function() {
        var totalCost = Number($('#cost-total').html().replace(' ₾', ''));
        if ($('#calculator-input').val() != "" && $('.active-button').is('#calculator-button-input')) {
            var val = $('#calculator-input').val();
        } else {
            var val = $('.active-button').text();
        }
        if (this.checked) {
            if (val.trim() != "") {
                $('.cleaning-ef-p').css('display', 'block');
                let cost = getCostPerCleaningEF(Number(val));
                $('#cost-cleaning-ef').html(cost);
                totalCost = totalCost + Number(cost.replace(' ₾', ''));
                $('#cost-total').html(totalCost + ' ₾')
                $('#calculator-summary-cleaning-ef').html("Cleaning by eco-friendly means x " + val + " m²");
            }
        } else {
            $('.cleaning-ef-p').css('display', 'none');
            var cost = getCostPerCleaningEF(Number(val.trim()));
            totalCost = totalCost - Number(cost.replace(' ₾', ''));
            $('#cost-total').html(totalCost + ' ₾')
            $('#cost-cleaning-ef').html("");
            $('#calculator-summary-cleaning-ef').html("");
        }
    });

    //button add aditional work
    $('.calculator-button-addwork').on('click', function() {
        if ($('.container-addwork').html().trim() == "") {
            $('.container-addwork').append(`<h3> Additional. Work </h3> 
        <select name='calculator-select' class='calculator-select'> 
        <option value='1'>სამზარეულოს კარადების დასუფთავება (1 სამზარეულო)</option> 
        <option value='2'>მაცივრის დასუფთავება შიგნიდან</option>

        <option value='4'>თეთრეულის რეცხვა</option>
        <option value='5'>აირღუმელის წმენდა შიგნიდან გარედან</option>
        <option value='6'>სპეციალისტის საათობრივი მუშაობა</option>
        <option value='7'>თეთრეულის დაუთოება</option>
        </select>`);
        } else {
            var original = $('select.calculator-select:eq(0)');
            var allSelects = $('select.calculator-select');
            var clone = original.clone();
            $('option', clone).filter(function(i) {
                return allSelects.find('option:selected[value="' + $(this).val() + '"]').length;
            }).remove();
            $('.container-addwork').append(clone);
            $('.calculator-total-p').before(`<p><span class="calculator-summary-addwork" class="calculator-summary"></span><span class="calculator-cost-addwork"></span></p>`);
        }
        $('.container-addwork').append(`<div class='calculator-additional-elements'>
        <span class='calculator-minus-button'> - </span>
        <input type='text' class='calculator-select-input'> 
        <span class='calculator-plus-button'> + </span>
        </div>
        `);
        if ($('.calculator-select:last option').length == 1) {
            $('.calculator-button-addwork').hide();
        }
    });

    //event on change value input number on additional workmat
    $(document).on('input', '.calculator-select-input', function() {
        this.value = this.value.replace(/[^0-9]/g, ''); //let only numbers
        var inputVal = Number($(this).val());
        var index = $(".calculator-select-input").index(this);
        var selectVal = $('.calculator-select option:selected').eq(index).val();
        getQuantityAddWork(selectVal, inputVal, index);
        var totalCost = getTotalCost();
        $('#cost-total').html(totalCost + ' ₾');
        $('.calculator-total').html("ჯამი  ");
    });

    //plus button
    $(document).on('click', '.calculator-plus-button', function() {
        var index = $(".calculator-plus-button").index(this);
        var inputVal = Number($('.calculator-select-input').eq(index).val());
        $('.calculator-select-input').eq(index).focus();
        $('.calculator-select-input').eq(index).val(inputVal + 1);
        var inputVal = $('.calculator-select-input').eq(index).val();
        var selectVal = $('.calculator-select option:selected').eq(index).val();
        getQuantityAddWork(selectVal, inputVal, index);
        var totalCost = getTotalCost();
        $('#cost-total').html(totalCost + ' ₾');
        $('.calculator-total').html("ჯამი ");
    });

    //minus button
    $(document).on('click', '.calculator-minus-button', function() {
        var index = $(".calculator-minus-button").index(this);
        var inputVal = Number($('.calculator-select-input').eq(index).val());
        if (inputVal >= 1) {
            $('.calculator-select-input').eq(index).focus();
            $('.calculator-select-input').eq(index).val(inputVal - 1);
            var inputVal = $('.calculator-select-input').eq(index).val();
            var selectVal = $('.calculator-select option:selected').eq(index).val();
            getQuantityAddWork(selectVal, inputVal, index);
            var totalCost = getTotalCost();
            $('#cost-total').html(totalCost + ' ₾');
            $('.calculator-total').html("ჯამი ");
        }
    });

    //event on change select add additional work
    $(document).on('change', '.calculator-select', function() {
        var index = $(".calculator-select").index(this);
        var inputVal = $('.calculator-select-input').eq(index).val();
        var selectVal = $('.calculator-select option:selected').eq(index).val();
        getQuantityAddWork(selectVal, inputVal, index);
        var totalCost = getTotalCost();
        $('#cost-total').html(totalCost + ' ₾');
    });

    //event on button order
    $('.calculator-wrapper #btn-order').on('click', function() {
        var totalCost = Number($('#cost-total').html().replace(' ₾', ''));
        if (totalCost === 0) {
            alert("Please add your order");
        } else {

            var mts2 = $('#calculator-summary-mts2').html();
            var w_washing = $('#calculator-summary-w-washing').text();
            var cleaning_m = $('#calculator-summary-cleaning-m').text();
            var cleaning_ef = $('#calculator-summary-cleaning-ef').text();
            var addwork = [];
            var total_str = $('#cost-total').text();
            var total = total_str.match(/\d+/)[0];
            /**
            $( ".container-addwork .calculator-select" ).each(function() {
                let add_w = $(this).find(":selected").text();
                
                add_w += $( this ).next().find('.calculator-select-input').val();
                addwork.push(add_w);
            });
            */
            $( ".calculator-wrapper .row-2 .calculator-summary-addwork" ).each(function() {
                let add_w = $(this).text();
                
                add_w += $( this ).next().text();
                addwork.push(add_w);
            });
             
            $.ajax({
                url : calculator.ajaxurl,
                type : 'post',
                data : {
                    action : 'calculator_add_cart',
                    w_washing: w_washing,
                    cleaning_m: cleaning_m,
                    cleaning_ef: cleaning_ef,
                    addwork: addwork,
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

    //return cost per თეთრეულის რეცხვა
    function getCostPerWashing(meters) {
        let cost = meters * 10 + " ₾";
        return cost;
    }

    //return cost per cleaning meters
    function getCostPerCleaningMeters(meters) {
        let cost = meters * 7 + " ₾";
        return cost;
    }

    //return cost per cleaning eco-friendly
    function getCostPerCleaningEF(meters) {
        let cost = meters * 8 + " ₾";
        return cost;
    }

    //return cost per სამზარეულოს კარადების დასუფთავება
    function getCostPerIroning(quantity) {
        let cost = quantity * 25 + " ₾";
        return cost;
    }

    //return cost per მაცივრის დასუფთავება შიგნიდან
    function getCostPerHourlyWork(quantity) {
        let cost = quantity * 20 + " ₾";
        return cost;
    }

    //return cost per Laundry
    function getCostPerLaundry(quantity) {
        let cost = quantity * 15 + " ₾";
        return cost;
    }

    //return cost per Balcony თეთრეულის რეცხვა
    function getCostPerBalcony(quantity) {
        let cost = quantity * 10 + " ₾";
        return cost;
	}

    //return cost per Window Grilles აირღუმელის წმენდა შიგნიდან გარედან
    function getCostPerWindow(quantity) {
        let cost = quantity * 30 + " ₾";
        return cost;
    }

    //return cost per Blinds სპეციალისტის საათობრივი მუშაობა
    function getCostPerBlinds(quantity) {
        let cost = quantity * 30 + " ₾";
        return cost;
    }

    //return cost per Reading თეთრეულის დაუთოება
    function getCostPerReading(quantity) {
        let cost = quantity * 20 + " ₾";
        return cost;
    }

    function getQuantityAddWork(selectVal, inputVal, index) {
        var cost;
        switch (selectVal) {
            case '1':
                cost = getCostPerIroning(inputVal);
                $('.calculator-summary-addwork').eq(index).html("სამზარეულოს კარადების დასუფთავება (1 სამზარეულო) x ");
                $('.calculator-cost-addwork').eq(index).html(cost);
                break;
            case '2':
                cost = getCostPerHourlyWork(inputVal);
                $('.calculator-summary-addwork').eq(index).html("მაცივრის დასუფთავება შიგნიდან (1 მაცივარი) x ");
                $('.calculator-cost-addwork').eq(index).html(cost);
                break;
            case '3':
                cost = getCostPerLaundry(inputVal);
                $('.calculator-summary-addwork').eq(index).html("Laundry x ");
                $('.calculator-cost-addwork').eq(index).html(cost);
                break;
            case '4':
                cost = getCostPerBalcony(inputVal);
                $('.calculator-summary-addwork').eq(index).html("თეთრეულის რეცხვა 1 ჩატვირთვა მანქანა x ");
                $('.calculator-cost-addwork').eq(index).html(cost);
                break;
            case '5':
                cost = getCostPerWindow(inputVal);
                $('.calculator-summary-addwork').eq(index).html("აირღუმელის წმენდა შიგნიდან გარედან x ");
                $('.calculator-cost-addwork').eq(index).html(cost);
                break;
            case '6':
                cost = getCostPerBlinds(inputVal);
                $('.calculator-summary-addwork').eq(index).html("სპეციალისტის საათობრივი მუშაობა x ");
                $('.calculator-cost-addwork').eq(index).html(cost);
                break;
            case '7':
                cost = getCostPerReading(inputVal);
                $('.calculator-summary-addwork').eq(index).html("თეთრეულის დაუთოება 1 საათი x ");
                $('.calculator-cost-addwork').eq(index).html(cost);
                break;
        }
    }

    //get total cost (whitout additional work)
    function getTotalCost() {
        if ($('#cost-mts2').html() !== '' || $('#cost-mts2').html() !== undefined) {
            var cost_mts2 = Number($('#cost-mts2').html().replace(' ₾', ''));
        }
        if ($('#cost-w-washing').html() !== '' || $('#cost-w-washing').html() !== undefined) {
            var cost_w_washing = Number($('#cost-w-washing').html().replace(' ₾', ''));
        }
        if ($('#cost-cleaning-m').html() !== '' || $('#cost-cleaning-m').html() !== undefined) {
            var cost_cleaning_m = Number($('#cost-cleaning-m').html().replace(' ₾', ''));
        }
        if ($('#cost-cleaning-ef').html() !== '' || $('#cost-cleaning-ef').html() !== undefined) {
            var cost_cleaning_ef = Number($('#cost-cleaning-ef').html().replace(' ₾', ''));
        }
        let totalCost = cost_mts2 + cost_w_washing + cost_cleaning_m + cost_cleaning_ef;
        let totalVal = getTotalCostAdditionalWork();
        return totalCost + totalVal;
    }

    //get total cost only additional work
    function getTotalCostAdditionalWork() {
        var totalVal = 0;
        $('.calculator-cost-addwork').each(function() {
            var val = Number($(this).html().replace(' ₾', ''));
            if (val !== 0) {
                totalVal = totalVal + val;
            }
        });
        return totalVal
    }
