import './App.css';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

const baseUrl = 'http://localhost:4000';

function Guest(props) {
  // checkbox State
  const [isChecked, setIsChecked] = useState(false);

  return (
    // Set each guest inside the div to this attribute
    <div data-test-id="guest">
      <h3>
        <input
          checked={false}
          type="checkbox"
          onChange={(event) => setIsChecked(event.currentTarget.checked)}
        />
        {props.firstName + ' '}
        {props.lastName}
        <button
          onClick={() => props.onRemoveClick(props.id)}
          className="removeGuestBtn"
        >
          Remove
        </button>
      </h3>
    </div>
  );
}

Guest.propTypes = {
  person: PropTypes.shape({
    firstname: PropTypes.string.isRequired,
    lastname: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }),
};

export default function App() {
  // first name state
  const [firstName, setFirstName] = useState('');

  // last name state
  const [lastName, setLastName] = useState('');

  const [guests, setGuests] = useState([]);

  const handleChangefirst = (event) => {
    setFirstName(event.target.value);
  };
  const handleChangelast = (event) => {
    setLastName(event.target.value);
  };

  const handleEnterPress = async (event) => {
    if (event.key === 'Enter') {
      // clear input
      setFirstName('');
      setLastName('');
      // Get input value
      const response = await fetch(`${baseUrl}/guests`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ firstName: firstName, lastName: lastName }),
      });
      const createdGuest = await response.json();
      setGuests([...guests, createdGuest]);
    }
  };

  // fetch data from guest API
  useEffect(() => {
    fetch(`${baseUrl}/guests`)
      .then((response) => response.json())
      .then((data) => setGuests(data))
      .catch((error) => console.log(error));
  }, []);
  console.log(guests);

  async function deleteGuest(id) {
    const response = await fetch(`${baseUrl}/guests/${id}`, {
      method: 'DELETE',
    });
    const deletedGuest = await response.json();
    console.log(deletedGuest);
    setGuests(guests.filter((guest) => guest.id !== id));
  }

  return (
    <div data-test-id="guest">
      <header className="App-header">
        <h1>Guest List</h1>
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
          {guests.map((guest) => {
            return (
              <div key={guest.id}>
                <Guest
                  firstName={guest.firstName}
                  lastName={guest.lastName}
                  id={guest.id}
                  onRemoveClick={deleteGuest}
                />
              </div>
            );
          })}
        </div>
      </header>
    </div>
  );
}
