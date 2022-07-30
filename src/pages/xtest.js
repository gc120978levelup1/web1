import { Container } from 'postcss';
import React,{useEffect, useState} from 'react';

const Xtest = () => {

    async function btnClick(){
    }
  return (
    <>
    <br/>
        
        <button
           onClick={()=>btnClick()} 
           className={`hover:scale-110 cursor-pointer h-8 bg-red-500 ring-red-500/70 focus:ring-4 hover:bg-red-600 text-white font-bold  m-2 px-4 border-b-4 border-red-700 hover:border-red-800 rounded-full`}> 
           Garry
        </button>

        <input 
            className="w-full max-w-xs rounded-full border-2 border-red-300 file:ring-blue-500/70 h-13 file:active:ring-4 p-2 text-sm text-grey-500
            file:-mt-0 file:ml-0 file:mr-5 file:py-1 file:px-2
            file:rounded-full file:border-1 file:border-blue-200
            file:text-sm file:font-semibold  file:text-white
            file:bg-gradient-to-r file:from-blue-600 file:to-purple-600
            hover:file:cursor-pointer hover:file:opacity-80" 
            type="file" 
            onChange={(e)=>{btnClick(e.target.files[0]);}}/>

<div class="flex items-center justify-center border-t-4"></div>


    <div class="flex items-center justify-center" >
        <div class="w-full max-w-xs bg-white shadow-lg rounded-lg px-8 pt-6 pb-2 m-2 mb-2 border-2 border-gray-600">
            <form >
                <div class="mb-2">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                        Username
                    </label>
                    <input class="focus:scale-110 focus:border-blue-800 focus:border-4 border-1 border-blue-500  shadow-lg  rounded-full w-full py-2 px-3 text-gray-700 mb-3 " id="username" type="text" placeholder="Username"/>
                </div>
                <div class="mb-2">
                    <label class="block text-gray-600 text-sm font-bold mb-2" for="password">
                        Password
                    </label>
                    <input class="focus:scale-110 focus:border-blue-800 focus:border-4 border-1 border-blue-500  shadow-lg  rounded-full w-full py-2 px-3 text-gray-700 mb-3 " id="password" type="password" placeholder="******************"/>
                    <p class="text-red-500 text-xs italic">Please choose a password.</p>
                </div>
                <div class="flex items-center justify-between">
                <button
                    onClick={()=>btnClick()} 
                    className={`hover:scale-110 cursor-pointer h-8 bg-red-500 ring-red-500/70 focus:ring-4 hover:bg-red-600 text-white font-bold  m-2 px-4 border-b-4 border-red-700 hover:border-red-800 rounded-full`}> 
                    Sign In
                </button>
                <a class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="">
                    Forgot Password?
                </a>
                </div>
            </form>
            <br/>
            <p class="text-center text-gray-500 text-xs">
                &copy;2020 Acme Corp. All rights reserved.
            </p>
        </div>
    </div>


<div class="flex items-center justify-center m-2 border-t-2 p-2"></div> 

<form class="w-full max-w-3xl backdrop-blur-sm bg-white shadow-lg rounded-lg px-2 pt-6 pb-2 m-2 mb-4 border-2 border-gray-600">
  <div class="flex flex-wrap -mx-3 mb-2">
    <div class="w-full md:w-1/2 px-3 mb-7 md:mb-0">
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
        First Name
      </label>
      <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-1 px-2 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Jane"/>
    </div>
    
    <div class="w-full md:w-1/2 px-3">
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
        Last Name
      </label>
      <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-1 px-2 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="Doe"/>
    </div>
  </div>
  <div class="flex flex-wrap -mx-3 mb-0">
    <div class="w-full px-3">
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
        Password
      </label>
      <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="password" placeholder="******************"/>
      <p class="text-gray-600 text-xs italic">Make it as long and as crazy as you'd like</p>
    </div>
  </div>
  <div class="flex flex-wrap -mx-3 mb-3">
    <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-city">
        City
      </label>
      <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="text" placeholder="Albuquerque"/>
    </div>
    <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
        State
      </label>
      <div class="relative">
        <select class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
          <option>New Mexico</option>
          <option>Missouri</option>
          <option>Texas</option>
        </select>
        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
        </div>
      </div>
    </div>
    <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-zip">
        Zip
      </label>
      <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-zip" type="text" placeholder="90210"/>
    </div>
  </div>
  <div class="flex items-center justify-between m-2 border-t-2 p-1">
      <div class="flex items-center justify-between m-2  p-1">
      <div class="flex items-center">
            <img class="w-20 h-20 rounded-full -ml-2 mr-4 -mt-2" src="/images/loginbg.jpg" alt="Avatar of Jonathan Reinink"/>
            <div class="text-sm -ml-3">
                <p class="text-sm text-gray-600 flex items-center mb-0 mt-2">
                    <svg class="fill-current text-gray-500 w-3 h-3 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M4 8V6a6 6 0 1 1 12 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z" />
                    </svg>
                    Members only
               </p>
                <p class="text-gray-900 leading-none m-0">Jonathan Reinink</p>
                <p class="text-gray-600">Aug 18</p>
            </div>
        </div>
      </div>

      <button
        onClick={()=>btnClick()} 
        className={`ring-red-500/70 h-8 bg-red-500 active:ring-4 hover:bg-red-600 text-white font-bold  m-2 px-4 border-b-4 border-red-700 hover:border-red-800 rounded-full`}> 
        Sign In
     </button>
    </div>
</form>
   
<div class="flex items-center justify-center m-t-4 border-t-2 p-2"></div> 

<div class="flex md:flex-row-reverse flex-wrap mb-4">
    <div class="w-full md:w-3/4">

        <form class="w-full max-w-3xl bg-white shadow-lg rounded-lg px-2 pt-6 pb-2 ml-2 mt-2 mr-20 mb-2 border-2 border-gray-600">
            <div class="flex flex-wrap -mx-3 mb-2">
                <div class="w-full md:w-1/2 px-3 mb-7 md:mb-0">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                    First Name
                </label>
                <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-1 px-2 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Jane"/>
                </div>
                
                <div class="w-full md:w-1/2 px-3">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                    Last Name
                </label>
                <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-1 px-2 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="Doe"/>
                </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-0">
                <div class="w-full px-3">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                    Password
                </label>
                <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="password" placeholder="******************"/>
                <p class="text-gray-600 text-xs italic">Make it as long and as crazy as you'd like</p>
                </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-3">
                <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-city">
                    City
                </label>
                <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="text" placeholder="Albuquerque"/>
                </div>
                <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
                    State
                </label>
                <div class="relative">
                    <select class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                        <option>New Mexico</option>
                        <option>Missouri</option>
                        <option>Texas</option>
                    </select>
                    <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                    </div>
                </div>
                </div>
                <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-zip">
                    Zip
                </label>
                <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-zip" type="text" placeholder="90210"/>
                </div>
            </div>
            <div class="flex items-center justify-between m-2 border-t-2 p-1">
                <div class="flex items-center justify-between m-2  p-1">
                <div class="flex items-center">
                        <img class="w-20 h-20 rounded-full -ml-2 mr-4 -mt-2" src="/images/loginbg.jpg" alt="Avatar of Jonathan Reinink"/>
                        <div class="text-sm -ml-3">
                            <p class="text-sm text-gray-600 flex items-center mb-0 mt-2">
                                <svg class="fill-current text-gray-500 w-3 h-3 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                <path d="M4 8V6a6 6 0 1 1 12 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z" />
                                </svg>
                                Members only
                        </p>
                            <p class="text-gray-900 leading-none m-0">Jonathan Reinink</p>
                            <p class="text-gray-600">Aug 18</p>
                        </div>
                    </div>
                </div>

                <button
                    onClick={()=>btnClick()} 
                    className={`ring-red-500/70 h-8 bg-red-500 active:ring-4 hover:bg-red-600 text-white font-bold  m-2 px-4 border-b-4 border-red-700 hover:border-red-800 rounded-full`}> 
                    Sign In
                </button>
                </div>
        </form>

    </div>
    <div class="w-full lg:w-1/4 sm:w-full">
    
        <form class="w-full max-w-full items-center justify-center bg-blend-lighten md:bg-blend-darken">
            <div class="w-full max-w-xs bg-white shadow-lg rounded-lg px-8 pt-6 pb-2 m-2 mb-2 border-2 border-gray-600">
                    <div class="mb-2">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                            Username
                        </label>
                        <input class="shadow-sm appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username"/>
                    </div>
                    <div class="mb-2">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
                            Password
                        </label>
                        <input class="shadow-sm appearance-none border border-red-500 rounded-lg w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************"/>
                        <p class="text-red-500 text-xs italic">Please choose a password.</p>
                    </div>
                    <div class="flex items-center justify-between">
                    <button
                        onClick={()=>btnClick()} 
                        className={`ring-red-500/70 h-8 bg-red-500 active:ring-4 hover:bg-red-600 text-white font-bold  m-2 px-4 border-b-4 border-red-700 hover:border-red-800 rounded-full`}> 
                        Sign In
                    </button>
                    <a class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="">
                        Forgot Password?
                    </a>
                    </div>
                <br/>
                <p class="text-center text-gray-500 text-xs">
                    &copy;2020 Acme Corp. All rights reserved.
                </p>
            </div>
        </form>

    </div>
</div>

<div class="flex items-center justify-center m-t-4 border-t-2 p-2"></div> 

<div class="bg-indigo-900 text-center py-4 lg:px-4">
  <div class="p-2 bg-indigo-800 items-center text-indigo-100 leading-none lg:rounded-full flex lg:inline-flex" role="alert">
    <span class="flex rounded-full bg-indigo-500 uppercase px-2 py-1 text-xs font-bold mr-3">New</span>
    <span class="font-semibold mr-2 text-left flex-auto">Get the coolest t-shirts from our brand new store</span>
    <svg class="fill-current opacity-75 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z"/></svg>
  </div>
</div>

<div class="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4" role="alert">
  <p class="font-bold">Be Warned</p>
  <p>Something not ideal might be happening.</p>
</div>

<div class="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md" role="alert">
  <div class="flex">
    <div class="py-1"><svg class="fill-current h-6 w-6 text-teal-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/></svg></div>
    <div>
      <p class="font-bold">Our privacy policy has changed</p>
      <p class="text-sm">Make sure you know how these changes affect you.</p>
    </div>
  </div>
</div>

<div class="bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3" role="alert">
  <p class="font-bold">Informational message</p>
  <p class="text-sm">Some additional text to explain said message.</p>
</div>
    </>
  )
}

export default Xtest


