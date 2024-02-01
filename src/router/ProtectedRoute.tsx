
import { useState } from 'react';
import {Navigate, useLocation} from "react-router-dom"

function ProtectedRoute({ children }: any) {


    let location = useLocation();
    const phrase = localStorage.getItem("phraseHash")


        if (phrase) {
            return <Navigate to="/app" state={{ from: location}} replace />
        }

        return (children)
    }






export default ProtectedRoute;