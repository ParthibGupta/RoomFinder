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
  Image,
  useToast,
  Spacer
} from "@chakra-ui/react";
import { useLoadScript } from "@react-google-maps/api";
import { useDropzone } from "react-dropzone";

const libraries = ["places"];
import axios from "axios";
import { v4 as uuidv4 } from "uuid"; // For generating unique IDs
import { useAuth0 } from "@auth0/auth0-react";


const RoomForm = ({ formData, setFormData, onSubmit, onClose }) => {
    const autocompleteRef = useRef(null);
  const [autocomplete, setAutocomplete] = useState(null);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyBomix11iWSqJTY_0DTKUvy6QPxUQrQcBk",
    libraries,
  });

  const [localPhotos, setLocalPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth0();

  const toast = useToast();
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      const previewPhotos = acceptedFiles.map((file) => ({
        file,
        preview: URL.createObjectURL(file),
      }));
      setLocalPhotos((prev) => [...prev, ...previewPhotos]);
    },
  });

  const handleAutocompleteLoad = (autocompleteInstance) => {
    setAutocomplete(autocompleteInstance);

    autocompleteInstance.addListener("place_changed", () => {
      const place = autocompleteInstance.getPlace();
      if (place.geometry) {
        console.log(place)
        setFormData((prev) => ({
          ...prev,
          address: place.formatted_address,
          latitude: place.geometry.location.lat(),
          longitude: place.geometry.location.lng(),
          suburb: place.vicinity,
          fullAddress: place.formatted_address
        }));
      }
    });

    // Ensure Google Maps suggestions have higher z-index
    setTimeout(() => {
      const pacContainer = document.querySelector(".pac-container");
      if (pacContainer) {
        pacContainer.style.zIndex = "1500";
      }
    }, 100);
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRentChange = (value) => {
    setFormData((prev) => ({ ...prev, rent: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);

    try {
      // Upload images to Imgur
      const imgurLinks = await Promise.all(
        localPhotos.map(async (photo) => {
          const formData = new FormData();
          formData.append("image", photo.file);

          const response = await axios.post(
            "https://api.imgur.com/3/image",
            formData,
            {
              headers: {
                Authorization: `Client-ID a7989f713ee9a39`, // Replace with your Imgur Client ID
              },
            }
          );

          return response.data.data.link; // Imgur URL
        })
      );

      // Prepare data for POST request
      const postData = {
        id: uuidv4(),
        heading: formData.heading,
        description: formData.description,
        photos: imgurLinks,
        rent: [formData.rent],
        location: [formData.latitude, formData.longitude], 
        suburb: formData.suburb,
        full_address: formData.formatted_address,
        owner_id: user.sub,
        owner_name: user.nickname
      };

      // Send data to API endpoint
      const res = await axios.post("http://localhost:3000/api/post", postData);
      console.log(res)
      if (res.status === 201) {
        toast({
          title: "Post Created",
          description: "Your post has been successfully created.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
            toast({
                title: "Error",
                description: "Something went wrong.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
      }


    } catch (error) {
      console.error("Error submitting data:", error);
    } finally {
        onSubmit();
      setLoading(false);
    }
  };

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

                const pacContainer = document.querySelector(".pac-container");
                if (pacContainer) {
                  pacContainer.style.zIndex = "1500";
                }
              }
            }}
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
          <FormLabel>Photos</FormLabel>
          <Box
            {...getRootProps()}
            border="2px dashed gray"
            p={4}
            borderRadius="md"
          >
            <input {...getInputProps()} />
            <p>Drag and drop some photos here, or click to select photos</p>
          </Box>

          <Stack direction="row" mt={2} spacing={2}>
            {localPhotos.map((photo, index) => (
              <Image
                key={index}
                src={photo.preview}
                alt={`Photo ${index + 1}`}
                boxSize="100px"
                objectFit="cover"
              />
            ))}
          </Stack>
        </FormControl>
      </Stack>

      {loading && <p>Uploading images and submitting data...</p>}

      <Stack direction="row" spacing={4} mt={4} mb={5}>
        <Button onClick={handleSubmit} isLoading={loading}>
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
