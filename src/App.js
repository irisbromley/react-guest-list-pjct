import './App.css';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

function Guest(props) {
  return (
    <div>
      <h3>
        <input
          checked={false}
          type="checkbox"
          // onChange={(event) => setIsChecked(event.currentTarget.checked)}
        />
        {props.firstName}
        {props.lastName}
      </h3>
    </div>
  );
}

Guest.propTypes = {
  person: PropTypes.shape({
    firstname: PropTypes.string.isRequired,
    lastname: PropTypes.string.isRequired,
  }),
};

export default function App() {
  // first name state
  const [firstName, setFirstName] = useState('');

  // last name state
  const [lastName, setLastName] = useState('');

  // checkbox State
  const [isChecked, setIsChecked] = useState(false);

  const [guests, setGuests] = useState([]);

  const handleChangefirst = (event) => {
    setFirstName(event.target.value);
  };
  const handleChangelast = (event) => {
    setLastName(event.target.value);
  };

  const handleEnterPress = (event) => {
    if (event.key === 'Enter') {
      // Get input value
      console.log('enter press here');
    }
  };

  // fetch data from guest API
  useEffect(() => {
    fetch('http://localhost:4000/guests')
      .then((response) => response.json())
      .then((data) => setGuests(data))
      .catch((error) => console.log(error));
  }, []);
  console.log(guests);

  return (
    <div data-test-id="guest">
      <header className="App-header">
        <h1>Guest List</h1>
        <p> Oscars's 7th birthday party:</p>
        <form>
          <label htmlFor="First name">
            <input
              name="firstname"
              onChange={handleChangefirst}
              value={firstName}
              placeholder="Add first name:"
              required
            />
          </label>
          <label htmlFor="Last name">
            <input
              name="lastname"
              onChange={handleChangelast}
              value={lastName}
              placeholder="Add last name:"
              onKeyDown={handleEnterPress}
              required
            />
          </label>
        </form>
        <div>
          <ul>
            <li>
              <input
                checked={isChecked}
                type="checkbox"
                onChange={(event) => setIsChecked(event.currentTarget.checked)}
              />
            </li>
          </ul>

          {guests.map((guest) => {
            return (
              <div key={guest.id}>
                <Guest firstName={guest.firstName} lastName={guest.lastName} />
              </div>
            );
          })}
        </div>
      </header>
    </div>
  );
}
