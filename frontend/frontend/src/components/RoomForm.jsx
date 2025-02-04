import React, { useState, useRef } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import { useLoadScript } from "@react-google-maps/api";

const libraries = ["places"];

const RoomForm = ({ formData, setFormData, onSubmit, onClose }) => {
  const autocompleteRef = useRef(null);
  const [autocomplete, setAutocomplete] = useState(null);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyBomix11iWSqJTY_0DTKUvy6QPxUQrQcBk",
    libraries,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRentChange = (value) => {
    setFormData((prev) => ({ ...prev, rent: value }));
  };

  const handleAutocompleteLoad = (autocompleteInstance) => {
    setAutocomplete(autocompleteInstance);

    autocompleteInstance.addListener("place_changed", () => {
      const place = autocompleteInstance.getPlace();
      if (place.geometry) {
        setFormData((prev) => ({
          ...prev,
          address: place.formatted_address,
          latitude: place.geometry.location.lat(),
          longitude: place.geometry.location.lng(),
        }));
      }
    });

    // Ensure Google Maps suggestions have higher z-index
    setTimeout(() => {
        const pacContainer = document.querySelector('.pac-container');
        if (pacContainer) {
        pacContainer.style.zIndex = '1500';
        }
    }, 100); 
  };

  const handlePhotosChange = (e) => {
    const files = Array.from(e.target.files).map((file) =>
      URL.createObjectURL(file)
    );
    setFormData((prev) => ({ ...prev, photos: files }));
  };

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <Box>
      <Stack spacing={4}>
        <FormControl>
          <FormLabel>Heading</FormLabel>
          <Input
            name="heading"
            value={formData.heading}
            onChange={handleInputChange}
            placeholder="Enter a catchy heading"
          />
        </FormControl>

        <FormControl>
          <FormLabel>Description</FormLabel>
          <Textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Provide details about the room"
          />
        </FormControl>

        <FormControl>
          <FormLabel>Rent</FormLabel>
          <NumberInput
            min={0}
            value={formData.rent}
            onChange={handleRentChange}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>

        <FormControl>
          <FormLabel>Address</FormLabel>
          <Input
            ref={autocompleteRef}
            placeholder="Start typing the address..."
            onFocus={() => {
              if (!autocomplete && window.google) {
                const autocompleteInstance = new window.google.maps.places.Autocomplete(
                  autocompleteRef.current,
                  {
                    types: ["geocode"],
                    componentRestrictions: { country: "au" },
                  }
                );
                handleAutocompleteLoad(autocompleteInstance);

                // Ensure Google Maps suggestions have higher z-index
                const pacContainer = document.querySelector(".pac-container");
                if (pacContainer) {
                  pacContainer.style.zIndex = "1500";
                }
              }
            }}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Photos</FormLabel>
          <Input
            type="file"
            accept="image/*"
            multiple
            onChange={handlePhotosChange}
          />
        </FormControl>
      </Stack>

      <Stack direction="row" spacing={4} mt={4}>
        <Button onClick={onSubmit}>
          Submit
        </Button>
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
      </Stack>
    </Box>
  );
};

export default RoomForm;
