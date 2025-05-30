export interface MovieDTO {
  _id?: object;
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface TMDBResponse {
  page: number;
  results: MovieDTO[];
  total_pages: number;
  total_results: number;
}

export interface MovieDetails {
  id: number;
  title: string;
  release_date: string;
  runtime: number;
  vote_average: number;
  poster_path: string;
  backdrop_path: string;
  images: {
    logos: {
      aspect_ratio: number;
      height: number;
      iso_639_1: string | null;
      file_path: string;
      vote_average: number;
      vote_count: number;
      width: number;
    }[];
    posters: {
      aspect_ratio: number;
      height: number;
      iso_639_1: string | null;
      file_path: string;
      vote_average: number;
      vote_count: number;
      width: number;
    }[];
    id: number;
  };
  genres: { id: number; name: string }[];
  overview: string;
  credits: {
    cast: { id: number; name: string; character: string }[];
    crew: unknown[];
  };
  production_companies: { id: number; name: string }[];
  production_countries: { iso_3166_1: string; name: string }[];
  original_title: string;
  status: string;
  original_language: string;
  budget: number;
  revenue: number;
  keywords: { keywords: { id: number; name: string }[] };
}
