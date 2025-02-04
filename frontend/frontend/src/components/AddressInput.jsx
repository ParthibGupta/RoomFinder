import React, { useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";

const AddressInput = ({ onSelect }) => {
  const [address, setAddress] = useState(null);

  return (
    <div>
      <GooglePlacesAutocomplete
        apiKey="AIzaSyBomix11iWSqJTY_0DTKUvy6QPxUQrQcBk"
        selectProps={{
          value: address,
          onChange: (val) => {
            setAddress(val);
            onSelect(val); 
          },
          placeholder: "Start typing your address...",
        }}
      />
    </div>
  );
};

export default AddressInput;
