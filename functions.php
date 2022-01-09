//BIG CALCULATOR
function shortcode_calculator() {
wp_register_script('calculator', get_stylesheet_directory_uri(). '/calculator.js', array('jquery'), '1', true );
wp_enqueue_script('calculator');

wp_localize_script( 'calculator', 'calculator', array( 'ajaxurl' => admin_url( 'admin-ajax.php' ) ) );
 return  '
 <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<div class="calculator-wrapper">
    <div class="row-1">
        <h2>ღირებულების გამოთვლა</h2>
        <h3>შეარჩიეთ ბინის ფართობი:</h3>
        <div class="calculator-counter">
            <div class="calculator-button">
                40
            </div>
            <div class="calculator-button">
                50
            </div>
            <div class="calculator-button">
                60
            </div>
            <div class="calculator-button">
                70
            </div>
            <div class="calculator-button">
                80
            </div>
            <div class="calculator-button">
                90
            </div>
            <div class="calculator-button" id="calculator-button-input">
                <input min="0" type="text" id="calculator-input" class="calculator-input">
            </div>
        </div>
        <br />
        <input type="checkbox" id="w-washing" class="calculator-checkbox"> <span class="ui-checkbox__label">+ ფანჯრები</span><br />
        <input type="checkbox" id="cleaning-m" class="calculator-checkbox"> <span class="ui-checkbox__label">1.8 ზემოთ</span><br />
        <input type="checkbox" id="cleaning-ef" class="calculator-checkbox"> <span class="ui-checkbox__label">+ ეკო საშუალებებით</span><br />
        <hr />
        <div class="container-addwork">
        </div>
        <hr class="hr-hidde" />
        <button class="calculator-button-addwork"> + დამატებითი სერვისი</button>
    </div>
    <div class="row-2">
        <h2>შეკვეთა</h2>
        <p><span id="calculator-summary-mts2" class="calculator-summary"></span><span class="calculator-cost" id="cost-mts2"></span></p>
        <p class="w-washing-p"><span id="calculator-summary-w-washing" class="calculator-summary"></span><span class="calculator-cost" id="cost-w-washing"></span></p>
        <p class="cleaning-m-p"><span id="calculator-summary-cleaning-m" class="calculator-summary"></span><span class="calculator-cost" id="cost-cleaning-m"></span></p>
        <p class="cleaning-ef-p"><span id="calculator-summary-cleaning-ef" class="calculator-summary"></span><span class="calculator-cost" id="cost-cleaning-ef"></span></p>
        <p><span class="calculator-summary-addwork" class="calculator-summary"></span><span class="calculator-cost-addwork"></span></p>
        <p class="calculator-total-p"><span class="calculator-total">ჯამი </span> </span><span id="cost-total"></span></p>
        <button name="btn-order" id="btn-order" class="calculator-btn-order">შეკვეთა</button>
    </div>
</div>

</div>
';
 }
add_shortcode('calculator', 'shortcode_calculator');  

//SHORT CALCULATOR
function shortcode_short_calculator() {
wp_register_script('calculator_short', get_stylesheet_directory_uri(). '/calculator_short.js', array('jquery'), '1', true );
wp_enqueue_script('calculator_short');
wp_localize_script( 'calculator_short', 'calculator_short', array( 'ajaxurl' => admin_url( 'admin-ajax.php' ) ) );
 return  '
 <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<div class="calculatormin-wrapper">
    <select name="calculatormin-select" class="calculatormin-select">
        <option value="1">რემონტის შემდგომი დასუფთავება</option>
        <option value="2">კომპლექსური დასუფთავება</option>
        <option value="3">გენერალური დასუფთავება</option>
        <option value="4">დაუთოება</option>
        <option value="5">ფანჯრების გაწმენდა</option>

    </select>
    <div class="calculatormin-counter">
	    <div class="calculatormin-button">20</div>
        <div class="calculatormin-button">40</div>
        <div class="calculatormin-button">50</div>
        <div class="calculatormin-button">60</div>
        <div class="calculatormin-button" id="calculatormin-button-input">
            <input min="0" type="text" id="calculatormin-input" class="calculatormin-input">
            <span class="calculatormin-button-m2"> m²</span>
        </div>

    </div>
    <p class="calculatormin-total-p"><span class="calculatormin-total"></span></p>
    <button name="btn-order" id="btn-order" class="calculator-btn-order">შეკვეთა</button><br />
    <div class="calculatormin-calculate-more">
        <a href="/kalkulatori/" class="calculatormin-link">გამოთვალეთ მეტი</a>
    </div>
';
 }
add_shortcode('calculator_short', 'shortcode_short_calculator');  


add_action( 'wp_ajax_nopriv_calculator_add_cart', 'calculator_add_cart' );
add_action( 'wp_ajax_calculator_add_cart', 'calculator_add_cart' );

function calculator_add_cart() {
	global $woocommerce;
	$woocommerce->cart->empty_cart();
    $w_washing =  trim( $_POST['w_washing'] ) != '' ? trim($_POST['w_washing'] ).'<br />' :''; 
	$w_washing = str_replace(array("\n", "\r"), '', $w_washing);
	$cleaning_m = trim($_POST['cleaning_m'] ) != '' ? trim($_POST['cleaning_m'] ).'<br />' :'';
	$cleaning_m = str_replace(array("\n", "\r"), '', $cleaning_m);
	$cleaning_ef = trim( $_POST['cleaning_ef'] ) != '' ? trim($_POST['cleaning_ef'] ).'<br />' :'';
	$cleaning_ef = str_replace(array("\n", "\r"), '', $cleaning_ef);

	$addwork = $_POST['addwork'];
	$total = $_POST['total']; 

	$cart_item_meta = array();
    $cart_item_meta['custom_cleaning']['Area'] = $w_washing.$cleaning_m.cleaning_ef;
	if(count($addwork)){
		$cart_item_meta['custom_cleaning']['Additional'] = implode('<br />',$addwork);
	}
    

    $price = wc_format_decimal( $total );
    $cart_item_meta['_cpo_price'] = $total;
    $_SESSION['custom_price'] = $total;
    $woocommerce->cart->add_to_cart(5170, 1, 0, array(), $cart_item_meta);

	echo wc_get_checkout_url();
    wp_die();
}


add_action( 'wp_ajax_nopriv_calculator_short_add_cart', 'calculator_short_add_cart' );
add_action( 'wp_ajax_calculator_short_add_cart', 'calculator_short_add_cart' );

function calculator_short_add_cart() {
	global $woocommerce;
	$woocommerce->cart->empty_cart();
    $service_name =  trim( $_POST['service_name'] );  
	$area = trim($_POST['area'] );  
	$total = $_POST['total']; 

	$cart_item_meta = array();
    $cart_item_meta['custom_cleaning'][$service_name] = $area;
	 
    

    $price = wc_format_decimal( $total );
    $cart_item_meta['_cpo_price'] = $total;
    $_SESSION['custom_price'] = $total;
	$_SESSION['service_name'] = $service_name;
    $woocommerce->cart->add_to_cart(5170, 1, 0, array(), $cart_item_meta);

	echo wc_get_checkout_url();
    wp_die();
}




add_filter( 'woocommerce_get_item_data', 'display_custom_metadata_cart_form110', 10, 2 );
function display_custom_metadata_cart_form110( $item_data, $cart_item ) {
     
    if ( !empty( $cart_item['custom_cleaning'] ) ) {
        foreach($cart_item['custom_cleaning'] as $key => $item){
            $item_data[] = array(
                'key'     => $key,
                'value'   => wc_clean( $item ),
                'display' => '',
            );
        }
    }
    
    return $item_data;
}




//add_filter( 'woocommerce_get_cart_item_from_session', 'uni_cpo_get_cart_item_from_session', 10, 3);

function uni_cpo_get_cart_item_from_session( $session_data, $values, $key )
{
    
    if ( isset( $values['_cpo_price'] ) ){ 
        $session_data['_cpo_price'] = $values['_cpo_price']; 
        $session_data['data']->set_price( $values['_cpo_price'] );
    }
     
    return $session_data;
}
add_filter('woocommerce_add_cart_item','uni_cpo_add_cart_item', 10, 1);
function uni_cpo_add_cart_item( $cart_item_data )
{

    if(isset($_SESSION['custom_price'])){ 
    $cart_item_data['data']->set_price( $_SESSION['custom_price'] );
    return $cart_item_data;
    }
}

add_action('woocommerce_before_calculate_totals', 'form10_before_calculate_totals', 10, 1);
function form10_before_calculate_totals( $object )
{
	if(isset($_SESSION['custom_price'])){ 
		foreach ( $object->get_cart() as $cart_item ) {
			$cart_item['data']->set_price( $_SESSION['custom_price'] );
		}
	}
}

 

add_action('woocommerce_add_order_item_meta','wdm_add_values_to_order_item_meta',1,2);
if(!function_exists('wdm_add_values_to_order_item_meta'))
{
  function wdm_add_values_to_order_item_meta($item_id, $values)
  {
        global $woocommerce,$wpdb;
        if(!empty($values['custom_cleaning']['Area']))
        {
            wc_add_order_item_meta($item_id,'Area',$values['custom_cleaning']['Area']);  
        }
        if(!empty($values['custom_cleaning']['Additional']))
        {
            wc_add_order_item_meta($item_id,'Additional',$values['custom_cleaning']['Additional']);  
        }
		if(isset($_SESSION['service_name'])){
			if(!empty($values['custom_cleaning'][$_SESSION['service_name']]))
			{
				wc_add_order_item_meta($item_id,$_SESSION['service_name'],$values['custom_cleaning'][$_SESSION['service_name']]);  
			}
		}
         
  }
}

add_action('init', 'isu_StartSession', 1);
function isu_StartSession() {
    if(!session_id()) {
        session_start();
    }
}

/*CART BUTTON SHORTCODE*/
add_shortcode ('woo_cart_but', 'woo_cart_but' );
/**
 * Create Shortcode for WooCommerce Cart Menu Item
 */
function woo_cart_but() {
	ob_start();
 
        $cart_count = WC()->cart->cart_contents_count; // Set variable for cart item count
        $cart_url = wc_get_cart_url();  // Set Cart URL
  
        ?>
        <a class="menu-item cart-contents" href="<?php echo $cart_url; ?>" title="Cart">
	    <?php
        if ( $cart_count > 0 ) {
       ?>
            <span class="cart-contents-count"><?php echo $cart_count; ?></span>
        <?php
        }
        ?>
        </a>
        <?php
	        
    return ob_get_clean();
 
}
/*CART BUTTON SHORTCODE*/
