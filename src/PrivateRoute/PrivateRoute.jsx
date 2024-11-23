import { Routes, Route } from "react-router-dom";
import Layout from '../Components/Dashboard/Layout';
import Home from "../Components/Home/Home";
import LocationList from "../Components/Location/LocationList";
import EditLocation from '../Components/Location/EditLocation';
import AddLocation from "../Components/Location/AddLocation";

import LocationMappingList from "../Components/LocationMaping/LocationMappingList";
import AddLocationMapping from "../Components/LocationMaping/AddLocationMapping";
import EditLocationMapping from "../Components/LocationMaping/EditLocationmapping";

import AddDepartment from "../Components/Department/AddDepartment";
import DepartmentList from "../Components/Department/DepartmentList";
import EditDepartment from "../Components/Department/EditDepartment";
import ShowDepartment from "../Components/Department/ShowDepartment";

import ClinicianList from "../Components/Clinician/ClinicianList";
import AddClinician from "../Components/Clinician/AddClinician";
import EditUnitList from "../Components/Clinician/EditUnitList";
import EditClinicianList from "../Components/Clinician/EditClinicianList";
import ShowClinician from "../Components/Clinician/ShowClinician";
import ShowUnit from "../Components/Clinician/ShowUnit";
import DutyRoster from "../Components/DutyRoster/DutyRoster";
import AddDutyRoaster from "../Components/DutyRoster/AddDutyRoster";
import TimingScheduling from "../Components/DutyRoster/TimeSheduling";
import AssignShift from "../Components/DutyRoster/AssignShift";
import EditDutyRoster from "../Components/DutyRoster/EditDutyRoster";
import PageNotFound from "../PageNotFound/PageNotFound";


const PrivateRoute = () => {
  return (
    <Layout className="body">

      <Routes>
        <Route path="/" element={<Home />} />

        {/* location */}
        <Route path="/locations/add-location" element={<AddLocation />} />
        <Route path="/locations" element={<LocationList />} />
        <Route path='/locations/edit-location/:locationId' element={<AddLocation />} />

        {/* location mapping */}
        <Route path="/location-mapping" element={<LocationMappingList />} />
        <Route path="/location-mapping/add-location-mapping" element={<AddLocationMapping />} />
        <Route path="/location-mapping/edit-location-mapping/:locationMappingId" element={<EditLocationMapping />} />

        {/* department */}
        <Route path="/department-list/add-department" element={<AddDepartment />} />
        <Route path="/department-list" element={<DepartmentList />} />
        <Route path='/department-list/show-department/:departmentId' element={<ShowDepartment />} />
        <Route path="/department-list/edit-department/:departmentId" element={<EditDepartment />} />

        {/* clinicians */}
        <Route path="/clinican-list" element={<ClinicianList />} />
        <Route path="/clinican-list/add-clinician" element={<AddClinician />} />
        <Route path="/clinican-list/edit-unitList/:unitId" element={<EditUnitList />} />
        <Route path="/clinican-list/edit-clinician/:clinicianId" element={<EditClinicianList />} />
        <Route path="/clinican-list/show-clinican/:clinicianId" element={<ShowClinician />} />
        <Route path="/clinican-list/show-unit-details/:unitId" element={<ShowUnit />} />

        {/* duty roster */}
        <Route path="/duty-roster" element={<DutyRoster />} />
        <Route path='/duty-roster/add-duty-roster' element={<AddDutyRoaster />} />
        <Route path="/duty-roster/time-scheduling/:id" element={<TimingScheduling />} />
        <Route path="/duty-roster/assign-shifts" element={<AssignShift />} />
        <Route path="/duty-roster/edit-duty-roster/:id" element={<EditDutyRoster />} />

        {/* page not found */}
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    </Layout>
  )
}


export default PrivateRoute
