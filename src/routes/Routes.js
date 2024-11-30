import React from "react"

import { Route, Routes } from "react-router-dom"
import Home from "../pages/Home"
import DataSet from "../pages/DataSet"
import DetailDataSet from "../pages/DetailDataSet"

const AppRoutes = () => {

    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/data-set" element={<DataSet/>} />
            <Route path="/data-set/:id/show" element={<DetailDataSet/>} />
        </Routes>
    )

}

export default AppRoutes