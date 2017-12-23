$('.granularity').click(function(ev){
	ev.preventDefault();
	$('.container .errorMessage').addClass('hidden');

	config = {
		url: 'https://api.fixer.io/latest',
		exchangeRates: 'todo'
	};

	config.exchangeRates = [];
	var gCountCalls = 1;

	switch($(ev.target).data('value')){
		case 'Historic': 
		console.log('Loading Historic');
		$('.container .errorMessage').addClass('hidden');

					// Iterate to get the foreign exchange rates for every year from 2009 to 2017 (fixer-io doesn't have data from MXN before that)
					for ( let i = 0; i < 9; i++ ) {

				        // Concat the month of the year to the url
				        config.url = 'https://api.fixer.io/' + (2009 + i) + '-01-01?base=MXN';

						// Make the call to get the foreign exchange rates of the month
						$.ajax(config.url).done(function(result){

							// Add the result to a common array
							config.exchangeRates[i] = result;

							if ( gCountCalls++ == 9 ) {
								drawGraph();
							}
						}).fail(function() {
							$('.container .errorMessage').removeClass('hidden');
						});

					}
					break;
					case 'Year': 
					console.log('Loading Year');

					// Iterate to get the foreign exchange rates for every month of the year 2017 (fixer-io doesn't have data from all of the months of 2017)
					for ( let i = 1; i <= 12; i++ ) {

				        // Concat the month of the year to the url
				        config.url = 'https://api.fixer.io/2017-' + (i.toString().length == 1 ? "0" : "") + i + '-01?base=MXN';

						// Make the call to get the foreign exchange rates of the month
						$.ajax(config.url).done(function(result){

							// Add the result to a common array
							config.exchangeRates[i] = result;

							if ( gCountCalls++ == 12 ) {
								drawGraph();
							}
						}).fail(function() {
							$('.container .errorMessage').removeClass('hidden');
						});

					}
					break;
					case 'Month': 
					console.log('Loading Month'); 
					// Iterate to get the foreign exchange rates for every day of December 2017th (fixer-io doesn't have data from all of the days of the month)
					for ( let i = 1; i < 31; i += 3 ) {

				        // Concat the month of the year to the url
				        config.url = 'https://api.fixer.io/2017-12-'+ (i.toString().length == 1 ? "0" : "") + i +'?base=MXN';

						// Make the call to get the foreign exchange rates of the month
						$.ajax(config.url).done(function(result){

							// Add the result to a common array
							config.exchangeRates[i] = result;

							if ( gCountCalls++ >= 10 ) {
								drawGraph();
							}
						}).fail(function() {
							$('.container .errorMessage').removeClass('hidden');
						});

					}
					break;
					case 'Week': 
					console.log('Loading Week'); 
					var d = new Date();

					// Iterate to get the foreign exchange rates for every year from the week before today (fixer-io doesn't have data from all of the days of the week)
					for ( let i = 0; i <= 7; i++ ) {
						var kDays_of_the_week = 7;
						var aDayOfTheWeek = d.getDate() - kDays_of_the_week + i;

				        // Concat the month of the year to the url
				        config.url = 'https://api.fixer.io/2017-12-'+ (aDayOfTheWeek.toString().length == 1 ? "0" : "") + aDayOfTheWeek +'?base=MXN';

						// Make the call to get the foreign exchange rates of the month
						$.ajax(config.url).done(function(result){

							// Add the result to a common array
							config.exchangeRates[i] = result;

							if ( gCountCalls++ == 7 ) {
								drawGraph();
							}
						}).fail(function() {
							$('.container .errorMessage').removeClass('hidden');
						});
					}
					break;
				}

				function drawGraph() {

				// Get data ready for the columns on the graph
				var currencies = [ 'AUD', 'BGN', 'BRL', 'CAD', 'CHF', 'CNY', 'CZK', 'DKK', 'EUR', 'GBP', 'HKD', 'HRK', 'HUF', 'ILS', 'INR', 'JPY', 'MYR', 'NOK', 'NZD', 'PHP', 'PLN', 'RON', 'RUB', 'SEK', 'SGD', 'THB', 'TRY', 'USD', 'ZAR' ];
				var columns = [];
				var currencyData = [];

				currencyData = ['x'];

				config.exchangeRates.forEach(function(values) { currencyData.push(values.date || ""); })

				columns.push(currencyData);

				currencies.forEach(function(currency) {
					currencyData = [currency];

					config.exchangeRates.forEach(function(values) {
						currencyData.push(values.rates[currency] || "0");
					})

					columns.push(currencyData);
				});

				// Generate graph
				var chart = c3.generate({
					bindto: '#chart',
					size: {
						height: 800,
						width: 1100
					},
					data: {
						x: 'x',
						columns: columns
					},
					axis: {
						x: {
							label: {
								text: 'Time',
								position: 'outer-center'
							},
							type : 'timeseries',
							tick: {
								fit: true,
								format: "%e %b %y"
							}
						},
						y: {
							label: {
								text: 'Currency Rates',
								position: 'outer-middle'
							}
						}
					}
				});
			}

		});
$('.granularity.active').trigger('click');


$('.nav-pills').find('a').click(function(ev){
	$('.nav-pills').find('a').removeClass('active');
	$(ev.target).addClass('active');
});