import React, { useState } from 'react';
import CustomerSearch from './CustomerSearch';
import SelectService from './SelectService';
import SelectVehicle from './SelectVehicle';

function AddOrder() {
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  const [selectedVehicleId, setSelectedVehicleId] = useState(null);

  return (
    <section className='contact-section container'>
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
          <SelectService customerId={selectedCustomerId} vehicleId={selectedVehicleId} />
        )}
      </div>
    </section>
  );
}

export default AddOrder;
