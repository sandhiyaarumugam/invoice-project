import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Card, Button, InputGroup } from 'react-bootstrap';
import InvoiceItem from './InvoiceItem';  // Ensure the path is correct
import InputGroupText from 'react-bootstrap/esm/InputGroupText';
import InvoiceModal from './InvoiceModal';  // Ensure it's imported correctly

export default function InvoiceForm() {
    const [state, setState] = useState({
        currency: '₹',
        currentDate: new Date().toDateString(),
        invoiceNumber: 1,
        billTo: "",
        billToAddress: "",
        billToEmail: "",
        billFrom: 'Sandhiya',
        billFromEmail: 'sandhiya@gmail.com',
        billFromAddress: "Coimbatore",
        notes: "",
        subTotal: "0.00",
        taxRate: 0,
        taxAmount: "0.00",
        discountRate: 0,
        discountAmount: "0.00",
        total: "0.00",
        isOpen: false
    });

    const [items, setItems] = useState([{
        id: "0",
        name: "",
        description: "",
        price: 1.00,
        quantity: 1,
    }]);

    const onItemizedItemEdit = (name, value, id) => {
        setItems(prevItems =>
            prevItems.map(item =>
                item.id === id ? { ...item, [name]: value } : item
            )
        );
    };

    const onAddItem = () => {
        const id = `${Date.now()}-${Math.floor(Math.random() * 999999)}`;
        setItems(prevItems => [
            ...prevItems,
            { id, name: "", description: "", price: 1.00, quantity: 1 }
        ]);
    };

    const handleRowDel = (id) => {
        const updatedItems = items.filter(item => item.id !== id);
        setItems(updatedItems);
    };

    const onCurrencyChange = (selectedOption) => {
        setState(state => ({
            ...state,
            currency: selectedOption.currency
        }));
    };

    const onChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        });
    };

    // Total calculation
    const calculateTotal = () => {
        const subTotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
        const taxAmount = (state.taxRate / 100) * subTotal;
        const discountAmount = (state.discountRate / 100) * subTotal;
        const total = (subTotal + taxAmount - discountAmount).toFixed(2);

        setState(prevState => ({
            ...prevState,
            subTotal: subTotal.toFixed(2),
            taxAmount: taxAmount.toFixed(2),
            discountAmount: discountAmount.toFixed(2),
            total
        }));
    };

    useEffect(() => {
        calculateTotal();
    }, [items, state.taxRate, state.discountRate]);

    return (
        <Form
            onSubmit={(e) => {
                e.preventDefault();
                setState(state => ({ ...state, isOpen: true }));
            }}
        >
            <Row>
                <Col md={8} lg={9}>
                    <Card className="d-flex p-4 p-xl-5 my-3 my-xl-4">
                        <div className="d-flex justify-content-between mb-3">
                            <div className="d-flex flex-row">
                                <span className="fw-bold">Current Date: </span>
                                <span className="current-date">{state.currentDate}</span>
                            </div>
                            <div className="d-flex flex-row">
                                <span className="fw-bold">Invoice Number: </span>
                                <span className="current-date">{state.invoiceNumber}</span>
                            </div>
                        </div>
                        <hr className="mb-4" />
                        <Row className="mb-5">
                            <Col>
                                <Form.Label className="fw-bold">Customer Name:</Form.Label>
                                <Form.Control
                                    placeholder="Enter Customer Name"
                                    value={state.billTo}
                                    type="text"
                                    name="billTo"
                                    className="my-2"
                                    onChange={e => setState(prevState => ({ ...prevState, billTo: e.target.value }))}
                                    required
                                />
                                <Form.Control
                                    placeholder="Enter Email"
                                    value={state.billToEmail}
                                    type="email"
                                    name="billToEmail"
                                    className="my-2"
                                    onChange={e => setState(prevState => ({ ...prevState, billToEmail: e.target.value }))}
                                    required
                                />
                                <Form.Control
                                    placeholder="Enter Address"
                                    value={state.billToAddress}
                                    type="text"
                                    name="billToAddress"
                                    className="my-2"
                                    onChange={e => setState(prevState => ({ ...prevState, billToAddress: e.target.value }))}
                                />
                            </Col>
                            <Col>
                                <Form.Label className="fw-bold">Bill From:</Form.Label>
                                <Form.Control value={state.billFrom} className="my-2" disabled />
                                <Form.Control value={state.billFromEmail} className="my-2" disabled />
                                <Form.Control value={state.billFromAddress} className="my-2" disabled />
                            </Col>
                        </Row>

                        {/* Invoice items table */}
                        <InvoiceItem
                            items={items}
                            onItemizedItemEdit={onItemizedItemEdit}
                            onRowAdd={onAddItem}
                            onRowDel={handleRowDel}
                            currency={state.currency}
                        />
                        <Row className="mt-4 justify-content-end">
                            <Col lg={6}>
                                <div className="d-flex flex-row align-items-start justify-content-between">
                                    <span className="fw-bold">Subtotal:</span>
                                    <span >
                                        {state.currency}{state.subTotal}
                                    </span>
                                </div>
                                <div className="d-flex flex-row align-items-start justify-content-between mt-2">
                                    <span className="fw-bold">Discount:</span>
                                    <span >
                                        {state.discountRate}% {state.currency}{state.discountAmount}
                                    </span>
                                </div>
                                <div className="d-flex flex-row align-items-start justify-content-between mt-2">
                                    <span className="fw-bold">Tax:</span>
                                    <span >
                                        {state.currency}{state.taxAmount}
                                    </span>
                                </div>
                                <div className="d-flex flex-row align-items-start justify-content-between mt-2">
                                    <span className="fw-bold">Total:</span>
                                    <span >
                                        {state.currency}{state.total}
                                    </span>
                                </div>
                            </Col>
                        </Row>
                    </Card>
                </Col>
                <Col md={4} lg={3}>
                    <Button
                        variant="primary"
                        type="submit"
                        className="d-block w-100 mb-3"
                        onClick={() => setState(state => ({ ...state, isOpen: true }))}
                    >
                        Review Invoice
                    </Button>

                    <Form.Group className="mb-3">
                        <Form.Label className="fw-bold">Currency:</Form.Label>
                        <Form.Select
                            onChange={(e) => onCurrencyChange({ currency: e.target.value })}
                            className="btn light my-1"
                        >
                            <option value='₹'>INR</option>
                            <option value="$">USD</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="my-3">
                        <Form.Label className="fw-bold">Tax Rate:</Form.Label>
                        <InputGroup className="my-1 flex-nowrap">
                            <Form.Control
                                name="taxRate"
                                type="number"
                                value={state.taxRate}
                                onChange={onChange}
                                className="bg-white-border"
                                placeholder="0.00"
                                min="0.00"
                                step="0.01"
                                max="100.00"
                            />
                            <InputGroupText className="bg-light fw-bold text-secondary small">
                                %
                            </InputGroupText>
                        </InputGroup>
                    </Form.Group>
                    <Form.Group className="my-3">
                        <Form.Label className="fw-bold">Discount Rate:</Form.Label>
                        <InputGroup className="my-1 flex-nowrap">
                            <Form.Control
                                name="discountRate"
                                type="number"
                                value={state.discountRate}
                                onChange={onChange}
                                className="bg-white-border"
                                placeholder="0.00"
                                min="0.00"
                                step="0.01"
                                max="100.00"
                            />
                            <InputGroupText className="bg-light fw-bold text-secondary small">
                                %
                            </InputGroupText>
                        </InputGroup>
                    </Form.Group>
                </Col>
            </Row>

            {/* Modal Component */}
            <InvoiceModal
    showModal={state.isOpen}
    closeModal={() => setState(prevState => ({ ...prevState, isOpen: false }))}
    info={state}
    total={state.total}
    currency={state.currency}
    items={items}  
/>

        </Form>
    );
}
