$(document).ready(function() {

  // Enter fx rate
  $( "[id$='_date']" ).datepicker({ dateFormat: "yy-mm-dd" });

  // Enter trade form fields
  $( "#trade_enter_date" ).datepicker({ dateFormat: "yy-mm-dd" });

  calc_enter_local_value = function(){
    $('#trade_enter_local_value').val( $('#trade_quantity').val() * $('#trade_enter_local_price').val() );
  }

  calc_enter_usd_value = function(){
    $('#trade_enter_usd_value').val( $('#trade_enter_local_value').val() / $('#trade_enter_usd_fx_rate').val() );
  }

  $('#trade_quantity, #trade_enter_local_price').keyup( calc_enter_local_value );
  $('#trade_quantity, #trade_enter_usd_fx_rate, #trade_enter_local_value').keyup( calc_enter_usd_value );



  // Exit trade form fields
  $( "#trade_exit_date" ).datepicker({ dateFormat: "yy-mm-dd" });

  calc_exit_local_value = function(){
    $('#trade_exit_local_value').val( $('#trade_quantity').val() * $('#trade_exit_local_price').val() );
  }

  calc_exit_usd_value = function(){
    $('#trade_exit_usd_value').val( $('#trade_exit_local_value').val() / $('#trade_exit_usd_fx_rate').val() );
  }

  $('#trade_quantity, #trade_exit_local_price').keyup( calc_exit_local_value );
  $('#trade_quantity, #trade_exit_usd_fx_rate, #trade_exit_local_value').keyup( calc_exit_usd_value );

  // Date dropdown
  $('select#date').change(function(){

      var queryParameters = {}, queryString = location.search.substring(1),
      re = /([^&=]+)=([^&]*)/g, m;

      while (m = re.exec(queryString)) {
          queryParameters[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
      }

      // Add new parameters or update existing ones
      queryParameters['date'] = $(this).val();
      location.search = $.param(queryParameters);
  })


  // Table sorter
  $('table').tablesorter({theme: 'dxmodel'});
})

