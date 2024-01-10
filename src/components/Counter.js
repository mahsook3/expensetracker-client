import React, { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);
  const [isIncrement, setIsIncrement] = useState(true);

  function toggleIncrementDecrement() {
    if (isIncrement) {
      setCount(prevCount => prevCount + 1);
    } else {
      setCount(prevCount => prevCount > 0 ? prevCount - 1 : 0);
    }
    setIsIncrement(!isIncrement);
  }

  return (
    <div className="App">
      <h1>{count}</h1>
      <button onClick={toggleIncrementDecrement}>
        {isIncrement ? "Increment" : "Decrement"}
      </button>
    </div>
  );
}