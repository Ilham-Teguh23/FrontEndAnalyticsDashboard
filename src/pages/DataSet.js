import React, { useEffect, useState } from "react";
import { Badge, Button, Col, Form, InputGroup, Pagination, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../redux/slices/dataSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTaxi, faThList } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "../layouts/css/Pagination.css"
import { formatDateTime } from "../components/Utils";

const DataSet = () => {

    const dispatch = useDispatch();
    const { items, loading, error, totalPages } = useSelector((state) => state.data);
    const [page, setPage] = useState(1);
    const [limit] = useState(10)
    const [selectedPayment, setSelectedPayment] = useState("0")
    const [selectedRangeFareAmount, setRangeFareAmount] = useState("0")
    const [selectedTripDistance, setSelectedTripDistance] = useState("0");

    const [pickupStartDate, setPickupStartDate] = useState("");
    const [pickupEndDate, setPickupEndDate] = useState("");

    const [dropoffStartDate, setDropoffStartDate] = useState("");
    const [dropoffEndDate, setDropoffEndDate] = useState("");

    const [getTripDistance] = useState([
        {
            key: "payment_type_0",
            value: "0",
            defaultValue: "Semua Jarak"
        },
        {
            key: "payment_type_1",
            value: "1",
            defaultValue: "0 - 10"
        },
        {
            key: "payment_type_2",
            value: "2",
            defaultValue: "11 - 20"
        },
        {
            key: "payment_type_3",
            value: "3",
            defaultValue: "21 - 30"
        },
        {
            key: "payment_type_4",
            value: "4",
            defaultValue: "31 - 40"
        },
        {
            key: "payment_type_5",
            value: "5",
            defaultValue: "41 - 50"
        },
        {
            key: "payment_type_6",
            value: "6",
            defaultValue: "51 - 60"
        },
        {
            key: "payment_type_7",
            value: "7",
            defaultValue: "61 - 70"
        },
        {
            key: "payment_type_8",
            value: "8",
            defaultValue: "71 - 80"
        },
        {
            key: "payment_type_9",
            value: "9",
            defaultValue: "81 - 90"
        },
        {
            key: "payment_type_10",
            value: "10",
            defaultValue: "91 - 100"
        },
    ])

    const [getFareAmount] = useState([
        {
            key: "fare_amount_0",
            value: "0",
            defaultValue: "All Range"
        },
        {
            key: "fare_amount_1",
            value: "1",
            defaultValue: "0 - 10"
        },
        {
            key: "fare_amount_2",
            value: "2",
            defaultValue: "11 - 20"
        },
        {
            key: "fare_amount_3",
            value: "3",
            defaultValue: "21 - 30"
        },
        {
            key: "fare_amount_4",
            value: "4",
            defaultValue: "31 - 40"
        },
        {
            key: "fare_amount_5",
            value: "5",
            defaultValue: "41 - 50"
        },
        {
            key: "fare_amount_6",
            value: "6",
            defaultValue: "51 - 60"
        },
        {
            key: "fare_amount_7",
            value: "7",
            defaultValue: "61 - 70"
        },
        {
            key: "fare_amount_8",
            value: "8",
            defaultValue: "71 - 80"
        },
        {
            key: "fare_amount_9",
            value: "9",
            defaultValue: "81 - 90"
        },
        {
            key: "fare_amount_10",
            value: "10",
            defaultValue: "91 - 100"
        },
    ])

    const [getPaymentType] = useState([
        {
            key: "payment_type_0",
            value: "0",
            defaultValue: "Semua Pembayaran"
        },
        {
            key: "payment_type_1",
            value: "1",
            defaultValue: "Cash"
        },
        {
            key: "payment_type_2",
            value: "2",
            defaultValue: "Credit"
        },
        {
            key: "payment_type_3",
            value: "3",
            defaultValue: "No Charge"
        },
        {
            key: "payment_type_4",
            value: "4",
            defaultValue: "Unknown"
        }
    ])

    useEffect(() => {
        let paymentType, fareAmount = ""

        if (selectedPayment === "1") {
            paymentType = "CSH"
        } else if (selectedPayment === "2") {
            paymentType = "CRD"
        } else if (selectedPayment === "3") {
            paymentType = "NOC"
        } else if (selectedPayment === "4") {
            paymentType = "UNK"
        }

        if (selectedRangeFareAmount) {
            fareAmount = selectedRangeFareAmount
        }

        dispatch(fetchData({ page, limit: 10, paymentType, fareAmount }));
    }, [dispatch, page]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    const handlePageChange = (pageNumber) => {
        setPage(pageNumber);
    };

    const getPaginationItems = () => {
        const pagination = [];

        if (totalPages <= 5) {
            for (let i = 1; i <= totalPages; i++) {
                pagination.push(i);
            }
        } else {
            if (page > 3) pagination.push(1);
            if (page > 4) pagination.push('...');
            const start = Math.max(page - 1, 2);
            const end = Math.min(page + 1, totalPages - 1);

            for (let i = start; i <= end; i++) {
                pagination.push(i);
            }

            if (page < totalPages - 2) pagination.push('...');
            pagination.push(totalPages);
        }

        return pagination;
    };

    const handleSearchData = () => {
        
        let paymentType, fareAmount, tripDistance = ""

        if (selectedPayment === "1") {
            paymentType = "CSH"
        } else if (selectedPayment === "2") {
            paymentType = "CRD"
        } else if (selectedPayment === "3") {
            paymentType = "NOC"
        } else if (selectedPayment === "4") {
            paymentType = "UNK"
        }
        
        if (selectedRangeFareAmount) {
            fareAmount = selectedRangeFareAmount
        }

        if (selectedTripDistance) {
            tripDistance = selectedTripDistance
        }

        const filters = {}
        if (paymentType) filters.paymentType = paymentType
        if (fareAmount) filters.fareAmount = fareAmount
        if (tripDistance) filters.tripDistance = tripDistance

        if (Object.keys(filters).length > 0) {
            dispatch(fetchData({ page, limit, ...filters }))
        } else {
            dispatch(fetchData({ page, limit }))
        }
    };

    return (
        <>
            <h4 className="fw-bold">
                <FontAwesomeIcon icon={faTaxi} /> Data Set Tracking Yellow Taxi
            </h4>
            <hr />

            <Row className="mb-3">
                <Col md={1}>
                    <Form.Group id="trip_distance">
                        <Form.Label>Distance</Form.Label>
                        <Form.Select
                            name="trip_distance"
                            value={selectedTripDistance}
                            onChange={(e) => setSelectedTripDistance(e.target.value)}
                        >
                            {getTripDistance.map((item) => (
                                <option key={item.key} value={item.value}>
                                    {item.defaultValue}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                </Col>
                <Col md={1}>
                    <Form.Group id="payment_type">
                        <Form.Label>Payment</Form.Label>
                        <Form.Select
                            name="transaction_status"
                            value={selectedPayment}
                            onChange={(e) => setSelectedPayment(e.target.value)}
                        >
                            {getPaymentType.map((item) => (
                                <option key={item.key} value={item.value}>
                                    {item.defaultValue}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                </Col>
                <Col md={2}>
                    <Form.Group id="range_fare_amount">
                        <Form.Label>Range Fare Amount</Form.Label>
                        <Form.Select
                            name="range_fare_amount"
                            value={selectedRangeFareAmount}
                            onChange={(e) => setRangeFareAmount(e.target.value)}
                        >
                            {getFareAmount.map((item) => (
                                <option key={item.key} value={item.value}>
                                    {item.defaultValue}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                </Col>
                <Col md={4}>
                    <Form.Group id="topbarSearch">
                        <Form.Label>Tanggal Penjemputan</Form.Label>
                        <InputGroup>
                            <Form.Control
                                type="date"
                                name="start_date_time"
                                step="1"
                                required
                                value={pickupStartDate}
                                onChange={(e) => setPickupStartDate(e.target.value)}
                            />
                            <InputGroup.Text>&#x2192;</InputGroup.Text>
                            <Form.Control
                                type="date"
                                name="end_date_time"
                                step="1"
                                required
                                value={pickupEndDate}
                                onChange={(e) => setPickupEndDate(e.target.value)}
                            />
                        </InputGroup>
                    </Form.Group>
                </Col>
                <Col md={4}>
                    <Form.Group id="topbarSearch">
                        <Form.Label>Tanggal Pengantaran</Form.Label>
                        <InputGroup>
                            <Form.Control
                                type="date"
                                name="start_date_time"
                                step="1"
                                required
                                value={dropoffStartDate}
                                onChange={(e) => setDropoffStartDate(e.target.value)}
                            />
                            <InputGroup.Text>&#x2192;</InputGroup.Text>
                            <Form.Control
                                type="date"
                                name="end_date_time"
                                step="1"
                                required
                                value={dropoffEndDate}
                                onChange={(e) => setDropoffEndDate(e.target.value)}
                            />
                        </InputGroup>
                    </Form.Group>
                </Col>
            </Row>

            <Button
                variant="primary"
                className="mt-2 fw-bold"
                style={{ width: '100%', textTransform: 'uppercase' }}
                onClick={handleSearchData}
            >
                <FontAwesomeIcon icon={faSearch} /> Cari Transaksi Data
            </Button>

            <hr />

            <div className="table-responsive">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th className="text-center">No.</th>
                            <th className="text-center">Tanggal Penjemputan</th>
                            <th className="text-center">Tanggal Pengantaran</th>
                            <th className="text-center">Payment Type</th>
                            <th className="text-center">Fare Amount</th>
                            <th className="text-center">Trip Distance</th>
                            <th className="text-center">Detail</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item, index) => (
                            <tr key={item.id}>
                                <td className="text-center">
                                    {10 * (page - 1) + (index + 1)}
                                </td>
                                <td className="text-center">
                                    {formatDateTime(item.pickup_datetime)}
                                </td>
                                <td className="text-center">
                                    {formatDateTime(item.dropoff_datetime)}
                                </td>
                                <td className="text-center" style={{ textTransform: "uppercase" }}>
                                    <Badge
                                        bg={
                                            item.payment_type === "CRD"
                                                ? "primary"
                                                : item.payment_type === "CSH"
                                                    ? "success"
                                                    : item.payment_type === "UNK" ? "warning" : "dark"
                                        }
                                    >
                                        {item.payment_type === "CRD"
                                            ? "Credit"
                                            : item.payment_type === "CSH"
                                                ? "Cash"
                                                : item.payment_type === "UNK" ? "Unknown" : item.payment_type === "NOC" ? "No Charge" : item.payment_type}
                                    </Badge>
                                </td>
                                <td className="text-center">{item.fare}</td>
                                <td className="text-center">{parseFloat(item.trip_distance).toFixed(2)}</td>
                                <td className="text-center">
                                    <Link to={`/data-set/${item.id}/show`}>
                                        <Button variant="dark" size="sm" style={{ fontWeight: "bold" }}>
                                            <FontAwesomeIcon icon={faThList} /> Detail
                                        </Button>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan={5} className="pt-4 pb-3 text-end">
                                <Pagination>
                                    <Pagination.First onClick={() => handlePageChange(1)} disabled={page === 1} />
                                    <Pagination.Prev onClick={() => handlePageChange(page - 1)} disabled={page === 1} />
                                    {getPaginationItems().map((item, idx) => (
                                        item === '...' ? (
                                            <Pagination.Ellipsis key={idx} />
                                        ) : (
                                            <Pagination.Item
                                                key={item}
                                                active={page === item}
                                                onClick={() => handlePageChange(item)}
                                            >
                                                {item}
                                            </Pagination.Item>
                                        )
                                    ))}
                                    <Pagination.Next onClick={() => handlePageChange(page + 1)} disabled={page === totalPages} />
                                    <Pagination.Last onClick={() => handlePageChange(totalPages)} disabled={page === totalPages} />
                                </Pagination>
                            </td>
                        </tr>
                    </tfoot>
                </Table>
            </div>
        </>
    );
};

export default DataSet;
