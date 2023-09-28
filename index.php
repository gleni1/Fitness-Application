<?php
	require 'config.php';
	$page_Title = "Home";

	require header;
?>

	<div class="container mt-3">

		<div class="row mb-3">
			<div class="col-lg-6 col-sm-12">
				<div class="card">
					<div class="card-header"><h4>List of Movies</h4></div>
					<div class="card-body">
						Top 5 rented movies<br><br>
						<button onclick="fetch_Data('Top Movies')" class="btn btn-success">Fetch</button>
					</div>
				</div>
			</div>
			<div class="col-lg-6 col-sm-12">
				<div class="card">
					<div class="card-header"><h4>List of Actors</h4></div>
					<div class="card-body">
						Top 5 actors by # of films<br><br>
						<button onclick="fetch_Data('Top Actors')" class="btn btn-success">Fetch</button>
					</div>
				</div>
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

		function fetch_Data(query) {

			const formData = new FormData(); 
		    formData.append( 'fetch', true );
		    formData.append( 'data', query );

		    swal("Fetching..", { icon: "info", buttons: false, closeOnClickOutside: false, })
		    doAjax(formData, "app/Processes/", "POST").then(
		        data => {

		        	swal("Done!", {icon: "success", timer: 2000})
		        	data = JSON.parse(data)
					
					ajax_results_body.innerHTML = ""

		        	if (query === "Top Movies") {
		        		parse_Movies(data)
		        	}

		        	if (query === "Top Actors") {
		        		parse_Actors(data)
		        	}

		        	document.querySelector("#results-row").style.visibility = "visible"

		        },
		        error => { 
		            console.log("An error occured: " + error); 
		        }
		    );
		}

		function parse_Actors(data) {

			ajax_results_title.innerHTML = "Results for: Top 5 actors by # of films"

			let sn = 1;
			for(let actor of data){

				const film_info = actor.film_info.replaceAll(";", "<br>")

				console.log(actor)

				ajax_results_body.innerHTML += `
					<div class="result-card border p-3 my-3">
						<h5>${sn}. ${actor.first_name}  ${actor.last_name} <a class="btn btn-success btn-sm float-end"  data-bs-toggle="modal" data-bs-target="#actor_${actor.actor_id}">View details</a> </h5>
					</div>

					<div class="modal fade" id="actor_${actor.actor_id}">
					  	<div class="modal-dialog modal-dialog-centered">
						    <div class="modal-content">

					      	<div class="modal-header">
						        <h4 class="modal-title">${actor.first_name}  ${actor.last_name}</h4>
						        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
					      	</div>

					      	<div class="modal-body">

					      		<small>
									<p>Number of movies: ${actor.num_films}</p>
									<p>Film info: <hr>${film_info}</p>
								</small>
					      	</div>
					      	</div>
				      	</div>
			      	</div>
				`
				sn++
			}

		}

		function parse_Movies(data) {

			ajax_results_title.innerHTML = "Results for: Top 5 rented movies"

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
					      	</div>
					      	</div>
				      	</div>
			      	</div>
				`
				sn++
			}


		}
	</script>

<?php
	require footer;
	