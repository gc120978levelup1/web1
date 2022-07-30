import React from 'react'

const News = (props) => {
  return (
    <news>
      <h1 className="text-3xl font-bold underline">
        {props.message}!
      </h1>
    </news>
  )
}

export default News
