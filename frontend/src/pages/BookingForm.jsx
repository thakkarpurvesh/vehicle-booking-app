import React, { useState, useEffect } from 'react';
import { TextField, Button, RadioGroup, FormControlLabel, Radio, Typography } from '@mui/material';
import api from '../api/api';

const BookingForm = () => {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    wheels: '',
    vehicleTypeId: '',
    vehicleId: '',
    startDate: '',
    endDate: ''
  });

  const [vehicleTypes, setVehicleTypes] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [error, setError] = useState('');

  // Fetch vehicle types when wheels are selected
  useEffect(() => {
    const fetchVehicleTypes = async () => {
      try {
        if (formData.wheels) {
          const res = await api.get(`/types?wheels=${formData.wheels}`);
          setVehicleTypes(res.data);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchVehicleTypes();
  }, [formData.wheels]);

  // Fetch vehicles when vehicleTypeId is selected
  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        if (formData.vehicleTypeId) {
          const res = await api.get(`/vehicles/${formData.vehicleTypeId}`);
          setVehicles(res.data);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchVehicles();
  }, [formData.vehicleTypeId]);

  const handleNext = () => {
    if (step === 5) {
      const today = new Date().toISOString().split("T")[0];
      if (formData.startDate < today || formData.endDate < today) {
        return setError("Dates must be today or in the future");
      }
    }

    setError('');
    switch (step) {
      case 1:
        if (!formData.firstName || !formData.lastName) return setError('Enter both first and last name');
        break;
      case 2:
        if (!formData.wheels) return setError('Select number of wheels');
        break;
      case 3:
        if (!formData.vehicleTypeId) return setError('Select vehicle type');
        break;
      case 4:
        if (!formData.vehicleId) return setError('Select vehicle');
        break;
      case 5:
        if (!formData.startDate || !formData.endDate)
          return setError('Select start and end dates');
        if (new Date(formData.startDate) > new Date(formData.endDate))
          return setError('Start date cannot be after end date');
        break;
      default:
        break;
    }
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
    setError('');
  };

  const handleSubmit = async () => {
    try {
      await api.post('/booking', formData);
      alert('Booking submitted successfully!');
      setFormData({
        firstName: '',
        lastName: '',
        wheels: '',
        vehicleTypeId: '',
        vehicleId: '',
        startDate: '',
        endDate: ''
      });
      setStep(1);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || 'Booking failed');
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <Typography variant="h6" className="mb-2">What is your name?</Typography>
            <div className="flex gap-4 mb-4">
              <TextField
                label="First Name"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              />
              <TextField
                label="Last Name"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              />
            </div>
          </>
        );
      case 2:
        return (
          <>
            <Typography variant="h6" className="mb-2">Number of wheels?</Typography>
            <RadioGroup
              row
              value={formData.wheels}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  wheels: e.target.value,
                  vehicleTypeId: '',
                  vehicleId: ''
                });
              }}
            >
              <FormControlLabel value="2" control={<Radio />} label="2" />
              <FormControlLabel value="4" control={<Radio />} label="4" />
            </RadioGroup>
          </>
        );
      case 3:
        return (
          <>
            <Typography variant="h6" className="mb-2">Type of vehicle?</Typography>
            <RadioGroup
              value={formData.vehicleTypeId}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  vehicleTypeId: e.target.value,
                  vehicleId: ''
                });
              }}
            >
              {vehicleTypes.map((type) => (
                <FormControlLabel
                  key={type.id}
                  value={type.id.toString()}
                  control={<Radio />}
                  label={type.name}
                />
              ))}
            </RadioGroup>
          </>
        );
      case 4:
        return (
          <>
            <Typography variant="h6" className="mb-2">Select specific model</Typography>
            <RadioGroup
              value={formData.vehicleId}
              onChange={(e) => setFormData({ ...formData, vehicleId: e.target.value })}
            >
              {vehicles.map((v) => (
                <FormControlLabel
                  key={v.id}
                  value={v.id.toString()}
                  control={<Radio />}
                  label={v.model}
                />
              ))}
            </RadioGroup>
          </>
        );
      case 5:
        return (
          <>
            <Typography variant="h6" className="mb-2">Pick date range</Typography>
            <div className="flex gap-4">
              <TextField
                type="date"
                label="Start Date"
                InputLabelProps={{ shrink: true }}
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
              />
              <TextField
                type="date"
                label="End Date"
                InputLabelProps={{ shrink: true }}
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
              />
            </div>
          </>
        );
      case 6:
        return (
          <>
            <Typography variant="h6" className="mb-4">Review Your Booking</Typography>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200 rounded-md shadow text-sm">
                <tbody>
                  <tr className="border-b">
                    <td className="p-2 font-medium text-gray-700">First Name</td>
                    <td className="p-2">{formData.firstName}</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2 font-medium text-gray-700">Last Name</td>
                    <td className="p-2">{formData.lastName}</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2 font-medium text-gray-700">Wheels</td>
                    <td className="p-2">{formData.wheels}</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2 font-medium text-gray-700">Vehicle Type</td>
                    <td className="p-2">
                      {vehicleTypes.find(v => v.id.toString() === formData.vehicleTypeId)?.name || '-'}
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2 font-medium text-gray-700">Model</td>
                    <td className="p-2">
                      {vehicles.find(v => v.id.toString() === formData.vehicleId)?.model || '-'}
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2 font-medium text-gray-700">Start Date</td>
                    <td className="p-2">{formData.startDate}</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-medium text-gray-700">End Date</td>
                    <td className="p-2">{formData.endDate}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <Button variant="contained" color="primary" className="mt-4" onClick={handleSubmit}>
              Submit Booking
            </Button>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-xl p-6 bg-white rounded shadow">
      {renderStep()}
      {error && <p className="text-red-500 mt-2">{error}</p>}

      <div className="mt-6 flex justify-between">
        {step > 1 && step < 6 && (
          <Button variant="outlined" onClick={handleBack}>Back</Button>
        )}
        {step < 6 && (
          <Button variant="contained" onClick={handleNext}>
            Next
          </Button>
        )}
      </div>
    </div>
  );
};

export default BookingForm;
