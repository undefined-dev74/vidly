import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';

class Movies extends React.Component {
	state = {
		movies: getMovies(),
	};

	handleDelete = (movie) => {
		console.log(movie);
		const movies = this.state.movies.filter((m) => m._id !== movie._id);
		this.setState({ movies });
	};
	render() {
		return (
			<div>
				<table className="table">
					<thead>
						<tr>
							<th scope="col">Title</th>
							<th scope="col">Genre</th>
							<th scope="col">Stock</th>
							<th scope="col">Rate</th>
							<th scope="col"></th>
						</tr>
					</thead>
					<tbody>
						{this.state.movies.map((movie) => (
							<tr key={movie._id}>
								<td>{movie.title}</td>
								<td>{movie.genre.name}</td>
								<td>{movie.numberInStock}</td>
								<td>{movie.dailyRentalRate}</td>
								<td>
									<button
										className="btn btn-md btn-danger"
										onClick={() => this.handleDelete(movie)}>
										Delete
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		);
	}
}

export default Movies;
