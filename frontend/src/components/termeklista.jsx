import {useState, useEffect} from 'react';
import api from '../api/axiost';
import TermekKartya from './termekkartya';

export default function TermekLista() {
    const [termekek, setTermekek] = useState([]);

    useEffect(() => {
        const fetchDat = async () => {
            try {
                const response = await api.get('/');
                setTermekek(response.data);
            } catch (error) {
                console.error('Hiba a termékek lekérésekor:', error);
            }
        };
        fetchDat();
    }, []);

  return (
    <div>
      <h1>Terméklista</h1>
        <ul>
            {termekek.map((termekek) => (
                <li key={termekek.id}>
                    <h2>{termekek.nev}</h2>
                    <p>Ár: {termekek.ar}</p>
                    <p>keszlet:{termekek.keszlet}</p>
                </li>
            ))}
        </ul>
    </div>
  );
}