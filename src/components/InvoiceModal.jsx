// import React from 'react';
// import { Modal, Row, Col, Table, Button } from 'react-bootstrap';
// import { jsPDF } from 'jspdf';

// export default function InvoiceModal(props) {
//     // Log to check incoming props
//     console.log('InvoiceModal props:', props);

//     // Function to calculate the subtotal, discount, tax, and total
//     const calculateInvoiceDetails = () => {
//         const subtotal = props.items.reduce((acc, item) => acc + item.quantity * item.price, 0);
//         const discount = props.info.discount || 0;  // Default to 0 if no discount
//         const tax = props.info.tax || 0;            // Default to 0 if no tax
//         const total = subtotal - discount + tax;
//         return { subtotal, discount, tax, total };
//     };

//     const { subtotal, discount, tax, total } = calculateInvoiceDetails();

//     // Corrected downloadPDF function to generate and download PDF
//     const downloadPDF = (event) => {
//         event.preventDefault();  // Prevent default behavior if clicked in any form context
//         const doc = new jsPDF();
//         let y = 10;

//         // Invoice Header Information
//         doc.text(`Invoice #${props.info.invoiceNumber}`, 10, y);
//         y += 10;
//         doc.text(`Billed To: ${props.info.billTo}`, 10, y);
//         y += 10;
//         doc.text(`Billed Address: ${props.info.billToAddress}`, 10, y);
//         y += 10;
//         doc.text(`Email: ${props.info.billToEmail}`, 10, y);
//         y += 10;
//         doc.text(`Amount Due: ${props.currency} ${total.toFixed(2)}`, 10, y);
//         y += 20;

//         // Item Details Section (without description)
//         doc.text("Item Details:", 10, y);
//         y += 10;

//         props.items.forEach((item) => {
//             doc.text(`${item.name}`, 10, y);  // Only showing item name
//             doc.text(`Qty: ${item.quantity} | Price: ${props.currency} ${item.price.toFixed(2)}`, 10, y + 10);
//             y += 20;
//         });

//         // Summary Section
//         doc.text(`Subtotal: ${props.currency} ${subtotal.toFixed(2)}`, 10, y);
//         y += 10;
//         doc.text(`Discount: ${props.currency} ${discount.toFixed(2)}`, 10, y);
//         y += 10;
//         doc.text(`Tax: ${props.currency} ${tax.toFixed(2)}`, 10, y);
//         y += 10;
//         doc.text(`Total: ${props.currency} ${total.toFixed(2)}`, 10, y + 10);

//         // Save the PDF
//         doc.save(`Invoice_${props.info.invoiceNumber}.pdf`);
//     };

//     console.log('Invoice calculated details:', { subtotal, discount, tax, total });

//     return (
//         <Modal
//             show={props.showModal}
//             onHide={props.closeModal}
//             size="lg"
//             centered
//         >
//             <Modal.Header closeButton>
//                 <Modal.Title>Invoice #{props.info.invoiceNumber}</Modal.Title>
//             </Modal.Header>
//             <Modal.Body>
//                 <div id="invoicecapture">
//                     <div className="d-flex flex-row justify-content-between align-items-start bg-light w-100 p-4">
//                         <div className="w-100">
//                             <h4 className="fw-bold text-secondary mb-1">
//                                 {props.info.billFrom}
//                             </h4>
//                             <h6 className="fw-bold text-secondary mb-1">
//                                 Invoice #:{props.info.invoiceNumber}
//                             </h6>
//                         </div>
//                         <div className="text-end ms-4">
//                             <h6 className="fw-bold mt-1 mb-2">Amount Due:</h6>
//                             <h5 className="fw-bold text-secondary">
//                                 {props.currency} {total.toFixed(2)}
//                             </h5>
//                         </div>
//                     </div>

//                     <Row className="mb-4">
//                         <Col md={4}>
//                             <div className="fw-bold">Billed to:</div>
//                             <div>{props.info.billTo || ""}</div>
//                             <div>{props.info.billToAddress || ""}</div>
//                             <div>{props.info.billToEmail || ""}</div>
//                         </Col>
//                         <Col md={4}>
//                             <div className="fw-bold">Billed From:</div>
//                             <div>{props.info.billFrom || ""}</div>
//                             <div>{props.info.billFromAddress || ""}</div>
//                             <div>{props.info.billFromEmail || ""}</div>
//                         </Col>
//                         <Col md={4}>
//                             <div className="fw-bold mt-2">Date of Issue:</div>
//                             <div>{new Date().toLocaleDateString()}</div>
//                         </Col>
//                     </Row>

//                     {/* Items Table */}
//                     <Table bordered className="mt-4">
//                         <thead>
//                             <tr>
//                                 <th>Item</th>
//                                 <th>Quantity</th>
//                                 <th>Price/Rate</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {props.items.map(item => (
//                                 <tr key={item.id}>
//                                     <td>{item.name}</td>
//                                     <td>{item.quantity}</td>
//                                     <td>{props.currency} {item.price}</td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </Table>

//                     {/* Invoice Summary */}
//                     <Row className="mt-4">
//                         <Col md={6}></Col>
//                         <Col md={6} className="text-end">
//                             <div className="fw-bold">Subtotal: {props.currency} {subtotal.toFixed(2)}</div>
//                             <div className="fw-bold">Discount: {props.currency} {discount.toFixed(2)}</div>
//                             <div className="fw-bold">Tax: {props.currency} {tax.toFixed(2)}</div>
//                             <div className="fw-bold mt-2">Total: {props.currency} {total.toFixed(2)}</div>
//                         </Col>
//                     </Row>

//                     {/* Download PDF Button */}
//                     <Button variant="primary" type="button" onClick={downloadPDF} className="mt-4">
//                         Download PDF
//                     </Button>
//                 </div>
//             </Modal.Body>
//         </Modal>
//     );
// }
import React from 'react';
import { Modal, Row, Col, Table, Button } from 'react-bootstrap';
import { jsPDF } from 'jspdf';

export default function InvoiceModal(props) {
    // Log to check incoming props
    console.log('InvoiceModal props:', props);

    const calculateInvoiceDetails = () => {
        // Calculate subtotal
        const subtotal = props.items.reduce((acc, item) => acc + item.quantity * item.price, 0);
    
        // Discount and Tax
        const discount = props.info.discountRate || 0;  // Default to 0 if no discount
        const tax = props.info.taxRate || 0;            // Default to 0 if no tax
    
        // Calculate the tax on the original subtotal (before discount)
        const taxAmount = (tax / 100) * subtotal;
    
        // Apply discount (as a percentage) and then calculate total
        const discountAmount = (discount / 100) * subtotal; // If discount is a percentage
        const subtotalAfterDiscount = subtotal - discountAmount;
    
        // Total = Subtotal after discount + tax
        const total = subtotalAfterDiscount + taxAmount;
    
        return { subtotal, discountAmount, taxAmount, total };
    };
    

    const { subtotal, discountAmount, taxAmount, total } = calculateInvoiceDetails();

    // Corrected downloadPDF function to generate and download PDF
    const downloadPDF = (event) => {
        event.preventDefault();  // Prevent default behavior if clicked in any form context
        const doc = new jsPDF();
        let y = 10;

        // Invoice Header Information
        doc.text(`Invoice #${props.info.invoiceNumber}`, 10, y);
        y += 10;
        doc.text(`Billed To: ${props.info.billTo}`, 10, y);
        y += 10;
        doc.text(`Billed Address: ${props.info.billToAddress}`, 10, y);
        y += 10;
        doc.text(`Email: ${props.info.billToEmail}`, 10, y);
        y += 10;
        doc.text(`Amount Due: ${props.currency} ${total.toFixed(2)}`, 10, y);
        y += 20;

        // Item Details Section (including description)
        doc.text("Item Details:", 10, y);
        y += 10;

        props.items.forEach((item) => {
            doc.text(`${item.name} - ${item.description || 'No description available'}`, 10, y);  // Show item name and description
            doc.text(`Qty: ${item.quantity} | Price: ${props.currency} ${item.price.toFixed(2)}`, 10, y + 10);
            y += 20;
        });

        // Summary Section
        doc.text(`Subtotal: ${props.currency} ${subtotal.toFixed(2)}`, 10, y);
        y += 10;
        doc.text(`Discount: ${props.currency} ${discountAmount.toFixed(2)}`, 10, y);
        y += 10;
        doc.text(`Tax: ${props.currency} ${taxAmount.toFixed(2)}`, 10, y);
        y += 10;
        doc.text(`Total: ${props.currency} ${total.toFixed(2)}`, 10, y + 10);

        // Save the PDF
        doc.save(`Invoice_${props.info.invoiceNumber}.pdf`);
    };

    console.log('Invoice calculated details:', { subtotal, discountAmount, taxAmount, total });

    return (
        <Modal
            show={props.showModal}
            onHide={props.closeModal}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>Invoice #{props.info.invoiceNumber}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div id="invoicecapture">
                    <div className="d-flex flex-row justify-content-between align-items-start bg-light w-100 p-4">
                        <div className="w-100">
                            <h4 className="fw-bold text-secondary mb-1">
                                {props.info.billFrom}
                            </h4>
                            <h6 className="fw-bold text-secondary mb-1">
                                Invoice #:{props.info.invoiceNumber}
                            </h6>
                        </div>
                        <div className="text-end ms-4">
                            <h6 className="fw-bold mt-1 mb-2">Amount Due:</h6>
                            <h5 className="fw-bold text-secondary">
                                {props.currency} {total.toFixed(2)}
                            </h5>
                        </div>
                    </div>

                    <Row className="mb-4">
                        <Col md={4}>
                            <div className="fw-bold">Billed to:</div>
                            <div>{props.info.billTo || ""}</div>
                            <div>{props.info.billToAddress || ""}</div>
                            <div>{props.info.billToEmail || ""}</div>
                        </Col>
                        <Col md={4}>
                            <div className="fw-bold">Billed From:</div>
                            <div>{props.info.billFrom || ""}</div>
                            <div>{props.info.billFromAddress || ""}</div>
                            <div>{props.info.billFromEmail || ""}</div>
                        </Col>
                        <Col md={4}>
                            <div className="fw-bold mt-2">Date of Issue:</div>
                            <div>{new Date().toLocaleDateString()}</div>
                        </Col>
                    </Row>

                    {/* Items Table */}
                    <Table bordered className="mt-4">
                        <thead>
                            <tr>
                                <th>Item</th>
                                <th>Description</th> {/* Added description column */}
                                <th>Quantity</th>
                                <th>Price/Rate</th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.items.map(item => (
                                <tr key={item.id}>
                                    <td>{item.name}</td>
                                    <td>{item.description || 'No description available'}</td> {/* Show description if available */}
                                    <td>{item.quantity}</td>
                                    <td>{props.currency} {item.price}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>

                    {/* Invoice Summary */}
                    <Row className="mt-4">
                        <Col md={6}></Col>
                        <Col md={6} className="text-end">
                            <div className="fw-bold">Subtotal: {props.currency} {subtotal.toFixed(2)}</div>
                            <div className="fw-bold">Discount: {props.currency} {discountAmount.toFixed(2)}</div>
                            <div className="fw-bold">Tax: {props.currency} {taxAmount.toFixed(2)}</div>
                            <div className="fw-bold">Total: {props.currency} {total.toFixed(2)}</div>
                        </Col>
                    </Row>

                    {/* Download PDF Button */}
                    <Button variant="primary" type="button" onClick={downloadPDF} className="mt-4">
                        Download PDF
                    </Button>
                </div>
            </Modal.Body>
        </Modal>
    );
}
