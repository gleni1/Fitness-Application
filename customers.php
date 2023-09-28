<?php
	require 'config.php';
	$page_Title = "Customers";
	require header;
?>

	<div class="container mt-3">

		<div class="card p-4 mb-3">
			<div class="input-group">
			    <input type="text" id="query" class="form-control" placeholder="Enter a customer name">
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

		window.addEventListener('load', function () {

			let query = "All customers"

			const formData = new FormData(); 
		    formData.append( 'fetch', true );
		    formData.append( 'query', query );
	    	
		    swal("Fetching customers. Please wait...", { icon: "info", buttons: false, closeOnClickOutside: false, })
	    	doAjax(formData, "app/Processes/Search-customers.php", "POST").then(
		        data => {

		        	swal("Done!", {icon: "success", timer: 3000})
		        	data = JSON.parse(data)
					ajax_results_body.innerHTML = ""

		        	if (data.length == 0) {
						ajax_results_title.innerHTML = `Results for: <span class="text-success">${query}</span>`
						ajax_results_body.innerHTML = "No results found"
		        	}
		        	else{
						console.log(data)
						parse_Search_Data(data, query)
		        	}
					
	        		document.querySelector("#results-row").style.visibility = "visible"

				},
		        error => { 
		            console.log("An error occured: " + error); 
		        }
	        )
	    })

		document.querySelector("#search").addEventListener("click", event => {
			const query = document.querySelector("#query")

			if (query.value.trim().length < 1) {
				swal("Enter at least 3 characters", {icon: "error"}).then(x=>{
					query.focus()
				})
			}
			else{

				const formData = new FormData(); 
			    formData.append( 'fetch', true );
			    formData.append( 'query', query.value.trim() );
		    	
		    	swal("Searching...", { icon: "info", buttons: false, closeOnClickOutside: false, })

		    	doAjax(formData, "app/Processes/Search-customers.php", "POST").then(
			        data => {

			        	swal("Done!", {icon: "success", timer: 2000})
			        	data = JSON.parse(data)
						ajax_results_body.innerHTML = ""


			        	if (data.length == 0) {
							ajax_results_title.innerHTML = `Results for: <span class="text-success">${query.value.trim()}</span>`
							ajax_results_body.innerHTML = "No results found"
			        	}
			        	else{
							console.log(data)
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
			for(let customer of data){

				ajax_results_body.innerHTML += `
					<div class="result-card border p-3 my-3">
						<h5 class="">${customer.first_name} ${customer.last_name} <a class="btn btn-success btn-sm float-end"  data-bs-toggle="modal" data-bs-target="#film_${customer.customer_id}">View details</a> </h5>
					</div>

					<div class="modal fade" id="film_${customer.customer_id}">
					  	<div class="modal-dialog modal-dialog-centered">
						    <div class="modal-content">

						      	<div class="modal-header">
							        <h4 class="modal-title">${customer.first_name} ${customer.last_name}</h4>
							        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
						      	</div>

						      	<div class="modal-body">

						      		<div class="form-group mb-2">
						      			<label>Customer ID</label>
						      			<input id="" class="form-control" value="${customer.customer_id}" readonly>
						      		</div>

						      		<div class="form-group mb-2">
						      			<label>First name</label>
						      			<input id="" class="form-control" value="${customer.first_name}">
						      		</div>

						      		<div class="form-group mb-2">
						      			<label>Last name</label>
						      			<input id="" class="form-control" value="${customer.last_name}">
						      		</div>

						      		<div class="form-group mb-2">
						      			<label>Email</label>
						      			<input id="" class="form-control" value="${customer.email}">
						      		</div>

						      		<div class="form-group mb-2">
						      			<label>Address</label>
						      			<input id="" class="form-control" value="${customer.address}">
						      		</div>

						      		<div class="form-group mb-2">
						      			<label>Postal code</label>
						      			<input id="" class="form-control" value="${customer.postal_code}">
						      		</div>

						      		<div class="text-center">
						      			<button class="btn btn-danger" onclick="delete_Customer(${customer.customer_id})">Delete</button>
						      		</div>

						      	</div>

					      	</div>
				      	</div>
			      	</div>
				`
				sn++
			}
		}

		function delete_Customer(customer_id) {
			swal({
				title: "Proceed to delete customer?",
				text: "This step is not reversible!",
				icon: "warning", buttons: true, dangerMode: true,
			})
			.then((willDelete) => {
			  	if (willDelete) {
			    	const formData = new FormData(); 
				    formData.append( 'delete', true );
				    formData.append( 'customer_id', customer_id );

				    doAjax(formData, "app/Processes/Customer-action.php", "POST").then(
			        	data => {
			        		swal("Deleted!", {icon: "success"}).then(x=>{
		        				window.location.reload()
		        			})
			        	},
			        	error => { 
				            console.log("An error occured: " + error); 
				        }
			        )
		  		}
			});
		}

	</script>
<?php
	require footer;