$(document).ready(function () {

	var actors = ['Julia Roberts', 'Jennifer Tilly', 'Edward Norton', 'George Clooney'];

	function renderButtons() {

		$('#actorButtons').empty();

		for (var i = 0; i < actors.length; i++) {

			var a = $('<button>');
			a.addClass('actor');
			a.addClass('myButton');
			a.attr('data-name', actors[i]);
			a.attr('src', $(this).data('animate'));
			a.attr('data-state'), $(this).attr('data-state', 'animate');
			a.text(actors[i]);
			$('#actorButtons').append(a);

		}
	}

	$('#addButton').on('click', function () {


		var actor = $('#giphyInput').val().trim();

		actors.push(actor);

		renderButtons();

		return false;
	});

	renderButtons();

	// The next section performs the search and returns the GIFs

	$(document).on('click', '.actor', function () {
		var actor = $(this).data('name');
		var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + actor + "&api_key=dc6zaTOxFJmzC&limit=10";

		$.ajax({
			url: queryURL,
			method: 'GET'
		})
			.done(function (response) {

				var results = response.data;

				$('#giphyView').empty();

					for (var i = 0; i < results.length; i++) {

						var actorDiv = $('<div class="giphyShow">');

						var p = $('<p>').text("Rating: " + results[i].rating);

						var actorImage = $('<img>');

					actorImage.attr('src', results[i].images.fixed_height_still.url);
					actorImage.attr('data-still', results[i].images.fixed_height_still.url);
                    actorImage.attr('data-animate', results[i].images.fixed_height.url);
                    actorImage.attr('data-state', 'still');
					actorImage.addClass('actorGiphy');
					actorDiv.append(p);
					actorDiv.append(actorImage);
					actorDiv.prepend(p);
					actorDiv.prepend(actorImage);

					$('#giphyView').prepend(actorDiv);

				}

				// The next section should allow for pausing and unpausing of the GIFs

				$('#giphyView').on('click', '.actorGiphy', function () {

					var state = $(this).attr('data-state');
					var animate = $(this).attr('data-animate');
					var still = $(this).attr('data-still');

					if (state == 'still') {
						$(this).attr('src', animate);
						$(this).attr('data-state', 'animate');
					} else {
						$(this).attr('src', still);
						$(this).attr('data-state', 'still');
					}

			});

		});

	});

});
