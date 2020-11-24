import React from 'react';
import Sidebar from '../../../../Common/Sidebar/Sidebar';
import MakeAdminForm from '../MakeAdminForm/MakeAdminForm';

const MakeAdmin = () => {
    return (
        <section>
            <div className="row">
                <div className="col-md-2 for_mobile_responsive">
                    <Sidebar/>
                </div>
                <div className="col-md-10 dashboard_r_div_container">
                    <div  className='dashboard_right_container'>
                        <h5 className='text-left mb-3'>Make Admin</h5>
                        <MakeAdminForm/>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MakeAdmin;