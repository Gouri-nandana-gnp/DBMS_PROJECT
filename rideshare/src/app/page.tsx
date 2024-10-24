import React from 'react';
import UberLanding from './(admin)/login/page';
import HomePage from './(admin)/home/page';
import TableComponent from './(admin)/notification/page';

const page = () => {
  return (
    <div>
      <HomePage />
      <TableComponent/>
    </div>
  );
}

export default page;
