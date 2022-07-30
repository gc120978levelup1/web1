import React from 'react'
import Header from '../components/Header';
import Alert from 'react-bootstrap/Alert';
import News from '../components/News';
import InputFeedback from '../components/InputFeedback';
import TodoList from '../components/TodoList';
import {useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    var userIsLoggedIn = window.localStorage.getItem("JAED_IS_LOGGED_IN");
    if (userIsLoggedIn==="false") navigate("/login");
  });


    const [usr, setUsr] = useState('garry pogi 2');
    const usrChangeHandler = (e) => {
      setUsr(e.target.value);
    }
    return (
        <>
      <TodoList initlist={[]}/>
      <br/>
      <InputFeedback value1={'0'} value2={'0'} />
      <br/>
      <News message={usr} />
      <br/>
      <input type="text" className="form-control" id="usr" value={usr} onChange={usrChangeHandler} />
      <Header />
      <h1 className="text-3xl font-bold underline">
        Hello world! Styled Using Tailwind
      </h1>

      {[
          'primary',
          'secondary',
          'success',
          'danger',
          'warning',
          'info',
          'light',
          'dark',
        ].map((variant) => (
          <Alert key={variant} variant={variant}>
            This is a {variant} alert—check it out!
          </Alert>
        ))
      }


      <button type="button" className='btn btn-primary'>
        Profile <span className='badge badge-pill badge-success'>9</span>
      </button>

      {[
          'primary',
          'secondary',
          'success',
          'danger',
          'warning',
          'info',
          'light',
          'dark',
        ].map((variant) => (
          <Alert key={variant} variant={variant}>
            This is a {variant} alert with{' '}
            <Alert.Link href="#">an example link</Alert.Link>. Give it a click if
            you like.
          </Alert>
        ))
      }


      <form action="#" className="bg-gray-100 shadow-sm rounded-md p-8">
          <div className="mb-6">
              <label for="name" className="mb-3 block text-gray-700">Full name:</label>
              <input type="text" id="name" className="bg-white rounded-md border border-gray-200 p-3 focus:outline-none w-full" placeholder="John Doe" required/>
          </div>
          <div className="mb-6">
              <label for="email" className="mb-3 block text-gray-700">Email address:</label>
              <input type="email" id="email" className="bg-white rounded-md border border-gray-200 p-3 focus:outline-none w-full" placeholder="john.doe@company.com" required/>
          </div>
          <div className="mb-8">
              <label for="company_size" className="mb-3 block text-gray-700">Company size:</label>
              <select id="company_size" className="bg-white rounded-md border border-gray-200 p-3 focus:outline-none w-full" required>
                  <option value="">Select an option</option>
                  <option value="1">1-101</option>
                  <option value="2">10-50</option>
                  <option value="3">50-100</option>
                  <option value="4">100+</option>
              </select>
          </div>
          <button type="submit" className="py-3 px-12 bg-teal-500 hover:bg-teal-600 mr-5 rounded-md text-white text-lg focus:outline-none w-full">Request Demo</button>
      </form>
     
      <form action="/action_page.php" className="bg-gray-100 shadow-sm rounded-md p-20">
        <div className="form-group">
          <label for="email">Email address:</label>
          <input type="email" className="form-control" id="email1" name="email1"/>
        </div>
        <div class="form-group">
          <label for="pwd">Password:</label>
          <input type="password" className="form-control" id="pwd1" name="pwd1"/>
        </div>
        <div className="checkbox">
          <label><input type="checkbox"/> Remember me</label>
        </div>
        <button type="submit" className='btn btn-primary'>Submit</button>
      </form>
        
        </>
    )
}

export default Home
