import React from 'react';

const ProtectedRouter = ({ userDataToken, hrChild, userChild }) => {
    return (
        <div>
            {
                userDataToken?.role === "USER" && userChild

            }
            {
                userDataToken?.role === "COMPANY_HR" && hrChild
            }
        </div>
    );
}

export default ProtectedRouter;
