import React, { useEffect, useState } from 'react';
const TimerDisplay: React.FunctionComponent<{
  seconds: number;
}> = ({ seconds }) => (
  <div className="text-3xl">
    <span className="mr-5 font-bold">Stopwatch:</span>
    <span className="font-mono">{seconds.toFixed(1)}</span>
  </div>
);

const TimerToggle: React.FunctionComponent<{
  running: boolean;
  onToggle: () => void;
}> = ({ running, onToggle }) => (
  <div className="my-5">
    <button
      onClick={onToggle}
      className="bg-blue-700 text-white px-10 py-2 font-bold rounded-full text-3xl"
    >
      {running ? 'Stop' : 'Start'}
    </button>
  </div>
);

const Names: React.FunctionComponent<{
  names?: string[];
}> = ({ names }) =>
  names ? (
    <>
      <div className="text-3xl font-bold mb-5">Data</div>
      <div className="text-3xl font-mono">{JSON.stringify(names)}</div>
    </>
  ) : null;

function App() {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [profession, setProfession] = useState<string>('');
  const [gdpr, setGdpr] = useState<boolean>(false);
  const onToggle = () => setRunning((running) => !running);
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  const [data, setData] = useState<{
    names: string[];
  }>();

  useEffect(() => {
    if (running) {
      const timer = setInterval(() => {
        setSeconds((seconds) => seconds + 0.1);
      }, 100);
      return () => clearInterval(timer);
    }
  }, [running]);

  useEffect(() => {
    if (seconds > 2) {
      fetch('/names.json')
        .then((res) => res.json())
        .then((data) => setData(data));
    }
  }, [seconds > 2]);

  return (
    <div className="mt-10 mx-auto max-w-3xl">
      <h1 className="font-bold text-5xl mb-5 border-b-2 border-gray-800">
        Prop Drilling
      </h1>
      <Form
        name={name}
        email={email}
        profession={profession}
        gdpr={gdpr}
        setName={setName}
        setEmail={setEmail}
        setProfession={setProfession}
        setGdpr={setGdpr}
      />
      <TimerDisplay seconds={seconds} />
      <TimerToggle running={running} onToggle={onToggle} />
      <Names names={data?.names} />
    </div>
  );
}

const NameFormInput = ({
  name,
  setName,
}: {
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
}) => {
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

const EmailFormInput = ({
  email,
  setEmail,
}: {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
}) => {
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

const ProfessionFormInput = ({
  profession,
  setProfession,
}: {
  profession: string;
  setProfession: React.Dispatch<React.SetStateAction<string>>;
}) => {
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

const Form = ({
  name,
  setName,
  email,
  setEmail,
  profession,
  setProfession,
  gdpr,
  setGdpr,
}: {
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  profession: string;
  setProfession: React.Dispatch<React.SetStateAction<string>>;
  gdpr: boolean;
  setGdpr: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
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
          <NameFormInput name={name} setName={setName} />
          <ProfessionFormInput
            profession={profession}
            setProfession={setProfession}
          />
          <EmailFormInput email={email} setEmail={setEmail} />
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
