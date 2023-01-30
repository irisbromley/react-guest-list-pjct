import './App.css';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

function Guest(props) {
  return (
    <>
      <div>
        <h3>
          {props.firstname}
          {props.lastname}
        </h3>
      </div>
      <hr />
    </>
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

  const handleChangefirst = (event) => {
    setFirstName(event.target.value);
    Guest.firstName = event.target.value;
  };
  const handleChangelast = (event) => {
    setLastName(event.target.value);
    Guest.lastName = event.target.value;
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
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  }, []);

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
          <table>
            <tr>
              <th>
                <input
                  checked={isChecked}
                  type="checkbox"
                  onChange={(event) =>
                    setIsChecked(event.currentTarget.checked)
                  }
                />
              </th>
              <th>First name: </th>
              <th>Last name:</th>
            </tr>
            <tr>
              <td>
                <Guest input type="checkbox" isAttending={false} />
              </td>
              <td>
                <Guest firstname />
              </td>
              <td>
                <Guest lastname />
              </td>
            </tr>
          </table>
        </div>
      </header>
    </div>
  );
}
