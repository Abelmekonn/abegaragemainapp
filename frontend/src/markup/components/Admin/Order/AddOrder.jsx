import React, { useState } from 'react';
import CustomerSearch from './CustomerSearch';
import SelectService from './SelectService';
import SelectVehicle from './SelectVehicle';

function AddOrder() {
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  const [selectedVehicleId, setSelectedVehicleId] = useState(null);
  const [selectedServices, setSelectedServices] = useState([]);

  const handleSubmit = () => {
    if (!selectedCustomerId || !selectedVehicleId || selectedServices.length === 0) {
      alert("Please complete all selections before submitting.");
      return;
    }
    // Submit the order logic here
    console.log("Order submitted:", {
      customerId: selectedCustomerId,
      vehicleId: selectedVehicleId,
      services: selectedServices,
    });
  };

  return (
    <section className='contact-section container'>
      <div className='progress d-flex justify-content-between'>
        <div className='col-5 d-flex'>
          <p className='circle p-2'>Add user</p>
          <p className={selectedCustomerId ? 'circle-1 ' : 'd-none'}></p>
        </div>
        <div className='col-5'>
          <p className='circle p-2'>Add Vehicle</p>
          <p className={selectedVehicleId  ? 'circle-1 ' : 'd-none'}></p>
        </div>
        <div className='col-2'>
          <p className='circle p-2'>Add Service</p>
        </div>
      </div>
      <div className='container'>
        <div className="contact-title">
          <h2>Create a new order</h2>
        </div>
        {!selectedCustomerId && (
          <CustomerSearch onSelectCustomer={setSelectedCustomerId} />
        )}
        {selectedCustomerId && !selectedVehicleId && (
          <SelectVehicle customerId={selectedCustomerId} onSelectVehicle={setSelectedVehicleId} />
        )}
        {selectedCustomerId && selectedVehicleId && (
          <SelectService customerId={selectedCustomerId} vehicleId={selectedVehicleId} onSelectService={setSelectedServices} />
        )}
        {selectedCustomerId && selectedVehicleId && selectedServices.length > 0 && (
          <button onClick={handleSubmit}>Submit Order</button>
        )}
      </div>
    </section>
  );
}

export default AddOrder;
