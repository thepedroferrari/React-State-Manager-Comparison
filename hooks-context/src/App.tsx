import { useApplicationContext, ApplicationContextProvider } from './store';

const TimerDisplay = () => {
  const { seconds } = useApplicationContext();
  return (
    <div className="text-3xl">
      <span className="mr-5 font-bold">Stopwatch:</span>
      <span className="font-mono">{seconds.toFixed(1)}</span>
    </div>
  );
};

const TimerToggle = () => {
  const { running, onToggle } = useApplicationContext();
  return (
    <div className="my-5">
      <button
        onClick={onToggle}
        className="bg-blue-700 text-white px-10 py-2 font-bold rounded-full text-3xl"
      >
        {running ? 'Stop' : 'Start'}
      </button>
    </div>
  );
};

const Names = () => {
  const { names } = useApplicationContext();
  return names ? (
    <>
      <div className="text-3xl font-bold mb-5">Data</div>
      <div className="text-3xl font-mono">{JSON.stringify(names)}</div>
    </>
  ) : null;
};

const App = () => (
  <ApplicationContextProvider>
    <div className="mt-10 mx-auto max-w-3xl">
      <h1 className="font-bold text-5xl mb-5 border-b-2 border-gray-800">
        Hooks - Context
      </h1>
      <Form />
      <TimerDisplay />
      <TimerToggle />
      <Names />
    </div>
  </ApplicationContextProvider>
);

const NameFormInput = () => {
  const { name, setName } = useApplicationContext();
  return (
    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
      <label
        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
        htmlFor="grid-first-name"
      >
        Name
      </label>
      <input
        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
        id="grid-first-name"
        type="text"
        placeholder="Jane"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      {name === '' && (
        <p className="text-red-500 text-xs italic">
          Please fill out this field.
        </p>
      )}
    </div>
  );
};

const EmailFormInput = () => {
  const { email, setEmail } = useApplicationContext();
  return (
    <div className="w-full px-3">
      <label
        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
        htmlFor="grid-password"
      >
        Email Address
      </label>
      <input
        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        id="grid-email"
        type="email"
        placeholder="********@*****.**"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
    </div>
  );
};

const ProfessionFormInput = () => {
  const { profession, setProfession } = useApplicationContext();
  return (
    <div className="w-full md:w-1/2 px-3">
      <label
        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
        htmlFor="grid-first-name"
      >
        Profession
      </label>
      <input
        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
        id="grid-first-name"
        type="text"
        placeholder="Doctor"
        value={profession}
        onChange={(e) => setProfession(e.target.value)}
      />
      {profession === '' && (
        <p className="text-red-500 text-xs italic">
          Please fill out this field.
        </p>
      )}
    </div>
  );
};

const Form = () => {
  const { gdpr, setGdpr } = useApplicationContext();
  return (
    <div className="max-w-screen-md mx-auto p-5">
      <div className="text-center mb-16">
        <p className="mt-4 text-sm leading-7 text-gray-500 font-regular uppercase">
          Contact
        </p>
        <h3 className="text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight text-gray-900">
          Get In <span className="text-indigo-600">Touch</span>
        </h3>
      </div>
      <form className="w-full">
        <div className="flex flex-wrap -mx-3 mb-6">
          <NameFormInput />
          <ProfessionFormInput />
          <EmailFormInput />
        </div>

        <div className="w-full px-3">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-password"
          >
            Your Message
          </label>
          <textarea
            rows={10}
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          ></textarea>
        </div>
        <div className="flex justify-between w-full px-3">
          <div className="md:flex md:items-center">
            <label className="block text-gray-500 font-bold">
              <input
                className="mr-2 leading-tight"
                type="checkbox"
                checked={gdpr}
                onChange={() => setGdpr((prev) => !prev)}
              />
              <span className="text-sm">I am a big fan of GDPR</span>
            </label>
          </div>
          <button
            className="shadow bg-indigo-600 hover:bg-indigo-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-6 rounded"
            type="submit"
            disabled={!gdpr}
          >
            Send Message
          </button>
        </div>
      </form>
    </div>
  );
};

export default App;
