import { useGetPokemonByNameQuery } from './useGetPokemonByNameQuery';

export default function App() {
  return (
    <div className="App">
      <Pokemon name="pikachu" />
      <Pokemon name="charizard" />
      <Pokemon name="squirtle" />
      <Pokemon name="bulbasaur" />
      <Pokemon name="mewtwo" />
    </div>
  );
}

const Pokemon = ({ name }: { name: string }) => {
  const { data, error, isLoading } = useGetPokemonByNameQuery(name);

  if (isLoading) return <div>Loading...</div>;
  if (error)
    return (
      <div>
        An error has occurred: + <pre>{JSON.stringify(error, null, 2)}</pre>
      </div>
    );
  if (!data) return <div>No data available</div>;

  return (
    <div>
      <h1>{data.name}</h1>
      <img src={data.sprites.front_default} alt={data.name} />
      <img src={data.sprites.back_default} alt={data.name} />
      <img src={data.sprites.front_shiny} alt={data.name} />
      <img src={data.sprites.back_shiny} alt={data.name} />
    </div>
  );
};
