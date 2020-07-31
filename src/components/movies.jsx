import React from 'react';
import { getMovies } from '../services/fakeMovieService';
import Like from './common/like';
import Pagination from './common/pagination';
import { paginate} from '../util/paginate'
class Movies extends React.Component {
	state = {
		movies: getMovies(),
		pageSize: 4,
		currentPage: 1,
	};

	handleLike = (movie) => {
		const movies = [...this.state.movies];
		const idx = movies.indexOf(movie);
		movies[idx] = { ...movies[idx] };

		movies[idx].liked = !movies[idx].liked;

		this.setState({ movies });
	};

	handleDelete = (movie) => {
		console.log(movie);
		const movies = this.state.movies.filter((m) => m._id !== movie._id);
		this.setState({ movies });
	};

	handlePageChange = (page) => {
		this.setState({currentPage: page})
	};
	render() {
		const { length: count } = this.state.movies;
		const { pageSize, currentPage, movies : allMovies } = this.state;

		if (count === 0) {
			return <p>There is no movies in the database</p>;
		}

		const movies = paginate(allMovies, currentPage, pageSize);
		return (
			<React.Fragment>
				<p>showing {count} movies in the database</p>
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
						{movies.map((movie) => (
							<tr key={movie._id}>
								<td>{movie.title}</td>
								<td>{movie.genre.name}</td>
								<td>{movie.numberInStock}</td>
								<td>{movie.dailyRentalRate}</td>
								<td>
									<Like
										liked={movie.liked}
										onClick={() => this.handleLike(movie)}
									/>
								</td>
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
				<Pagination
					itemsCount={count}
					pageSize={pageSize}
					onPageChange={this.handlePageChange}
					currentPage={currentPage}
				/>
			</React.Fragment>
		);
	}
}

export default Movies;
