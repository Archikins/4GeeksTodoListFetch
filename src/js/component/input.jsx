import React, { useEffect, useState } from "react";
const Inputs = (props) => {
  const [value, setValue] = useState("This is the initial value");

  const handleChange = (e) => setValue(e.target.value);

  return <input value={value} onChange={handleChange} />;
};

export default Inputs;