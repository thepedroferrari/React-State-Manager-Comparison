import React, { useState, useEffect, createContext, useContext } from 'react';

interface ApplicationState {
  seconds: number;
  running: boolean;
  names?: string[];
  onToggle: () => void;
  name: string;
  setName: (name: string) => void;
  email: string;
  setEmail: (email: string) => void;
  profession: string;
  setProfession: (profession: string) => void;
  gdpr: boolean;
  setGdpr: React.Dispatch<React.SetStateAction<boolean>>;
}

const ApplicationContext = createContext<ApplicationState>({
  seconds: 0,
  running: false,
  onToggle: () => {},
  name: '',
  setName: () => {},
  email: '',
  setEmail: () => {},
  profession: '',
  setProfession: () => {},
  gdpr: false,
  setGdpr: () => {},
});

const useApplicationState = (): ApplicationState => {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [profession, setProfession] = useState<string>('');
  const [gdpr, setGdpr] = useState<boolean>(false);

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

  return {
    seconds,
    running,
    onToggle: () => setRunning((running) => !running),
    names: data?.names,
    name,
    setName,
    email,
    setEmail,
    profession,
    setProfession,
    gdpr,
    setGdpr,
  };
};

export const ApplicationContextProvider: React.FunctionComponent = ({
  children,
}) => (
  <ApplicationContext.Provider value={useApplicationState()}>
    {children}
  </ApplicationContext.Provider>
);

export const useApplicationContext = () => useContext(ApplicationContext);
