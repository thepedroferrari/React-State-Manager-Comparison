import { store, Store, useStore } from './store';

const App = () => {
  return (
    <main style={{ margin: '0 auto', maxWidth: 1200, fontSize: '200%' }}>
      <h1>Hooks - useSyncExternalStore</h1>
      <section
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '2rem',
        }}
      >
        <IncrementValue item="count1" />
        <DisplayValue item="count1" />
        <IncrementValue item="count2" />
        <DisplayValue item="count2" />
      </section>
    </main>
  );
};

const DisplayValue = ({ item }: { item: keyof Store }) => (
  <div>
    {item}: {useStore((state) => state[item])}
  </div>
);

const IncrementValue = ({ item }: { item: keyof Store }) => {
  return (
    <button
      onClick={() => {
        const state = store.getState();
        store.setState({
          ...state,
          [item]: state[item] + 1,
        });
      }}
    >
      Increment {item}
    </button>
  );
};

export default App;
