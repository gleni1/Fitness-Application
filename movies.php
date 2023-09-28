<?php
	require 'config.php';
	$page_Title = "Movies";
	require header;
?>
	<div class="container mt-3">

		<div class="card p-4 mb-3">
			<div class="input-group">
			    <input type="text" id="query" class="form-control" placeholder="Enter a movie name to search">
			    <button class="btn btn-success" id="search">Search</button>
		  	</div>
		</div>

		<div class="row mb-3" id="results-row">
			<div class="col-lg-12">
				<div class="card">
					<div class="card-header"><h4></h4></div>
					<div class="card-body">
						
					</div>
				</div>
			</div>
		</div>

	</div>

	<script type="text/javascript">
		'use strict';

		const ajax_results_title = document.querySelector("#results-row .card-header h4")
		const ajax_results_body = document.querySelector("#results-row .card-body")

		let customers;
		let customers_html = `
				<select id='customer-id' class="form-control mb-1">
					<option></option>
		`;

		const formData = new FormData(); 
	    formData.append( 'fetch', true );
	    formData.append( 'data', "Customers" );

	    doAjax(formData, "app/Processes/", "POST").then(
	        data => {
	        	customers = JSON.parse(data)

	        	for(let customer of customers){
	        		customers_html += `
							<option value='${customer.customer_id}'>${customer.first_name} ${customer.last_name}</option>
	        		`
	        	}

	        	customers_html += `
	        		</select>
	        	`;
	        	console.log(customers)

	        },
	        error => { 
	            console.log("An error occured: " + error); 
	        }
	    );


		document.querySelector("#search").addEventListener("click", event => {
			const query = document.querySelector("#query")

			if (query.value.trim().length < 3) {
				swal("Enter at least 3 characters", {icon: "error"}).then(x=>{
					query.focus()
				})
			}
			else{

				const formData = new FormData(); 
			    formData.append( 'fetch', true );
			    formData.append( 'query', query.value.trim() );
		    	
		    	swal("Searching...", { icon: "info", buttons: false, closeOnClickOutside: false, })

		    	doAjax(formData, "app/Processes/Search-movies.php", "POST").then(
			        data => {

			        	swal("Done!", {icon: "success", timer: 1000})
			        	data = JSON.parse(data)
						ajax_results_body.innerHTML = ""

			        	if (data.length == 0) {
							ajax_results_title.innerHTML = `Results for: <span class="text-success">${query.value.trim()}</span>`
							ajax_results_body.innerHTML = "No results found"
			        	}
			        	else{
							parse_Search_Data(data, query.value.trim())
			        	}
						
		        		document.querySelector("#results-row").style.visibility = "visible"

					},
			        error => { 
			            console.log("An error occured: " + error); 
			        }
		        )

			}
		})

		function parse_Search_Data(data, query) {
			ajax_results_title.innerHTML = `Results for:  <span class="text-success">${query}</span>`
			
			let sn = 1;
			for(let film of data){

				console.log(film)

				ajax_results_body.innerHTML += `
					<div class="result-card border p-3 my-3">
						<h5 class="">${film.title} <a class="btn btn-success btn-sm float-end"  data-bs-toggle="modal" data-bs-target="#film_${film.film_id}">View details</a> </h5>
					</div>

					<div class="modal fade" id="film_${film.film_id}">
					  	<div class="modal-dialog modal-dialog-centered">
						    <div class="modal-content">

					      	<div class="modal-header">
						        <h4 class="modal-title">${film.title}</h4>
						        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
					      	</div>

					      	<div class="modal-body">

					      		<p class="text-muted">
									${film.description}
								</p>
								<small>
									<ul>
										<li>Release year: <b>${film.release_year}</b></li>
										<li>Rental duration: <b>${film.rental_duration}</b></li>
										<li>Rating: <b>${film.rating}</b></li>
										<li>Rental rate: <b>$${film.rental_rate}</b></li>
										<li>Replacement cost: <b>$${film.replacement_cost}</b></li>
										<li>Length: <b>${film.length}mins</b></li>
										<li>Special features rate: <b>${film.special_features}</b></li>
									</ul>
								</small>

								<hr>
								<h5>Rent Out this Movie</h5>

								<div class="form-group mt-1" id="rent_${film.film_id}">
									<label>Select a customer</label>
									${customers_html}
								</div>
								<div class="text-center my-2">
        							<button class='btn btn-success' onclick="rent_Movie(${film.film_id})">Rent out</button>
        						</div>
        						
					      	</div>
					      	</div>
				      	</div>
			      	</div>
				`
				sn++
			}
		}

		function rent_Movie(film_id) {
			let customer_id = document.querySelector(`#rent_${film_id} select`).value

			if (customer_id != "") {
				console.log('customer_id:' + customer_id)
				console.log('film_id:' + film_id)
			}
		}


	</script>	
<?php
	require footer;